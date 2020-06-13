import { IPost, IPostApplication } from '../resources/Post/post.types';
import {
  IResume,
  IResumeAdditionalInfo,
  IResumeAward,
  IResumeEducation,
  IResumeExperience,
} from '../resources/Resume/resume.types';
import { IUser } from '../resources/User/user.model';
import { DateTimeHelper } from '../utils/DateTimeHelper';
import { TS } from '../utils/LanguageHelper';
import { EmailType, TransactionalEmailManager } from './TransactionalEmailManager';

export class JobsEmailManager extends TransactionalEmailManager {

  private _generateEmailBody = (template: string, emailType: EmailType, resume: IResume, user: IUser, application: IPostApplication) => {

    const resumeEducations = this._generateEducations(resume.educations, emailType)
    const resumeExperiences = this._generateExperiences(resume.experiences, emailType)
    const resumeAwards = this._generateAwards(resume.awards, emailType)
    const resumeAdditionalInfos = this._generateAdditionalInfos(resume.additionalInfos, emailType)

    const jobName = application.jobRole

    const customVars = {
      jobsEmailTitle: TS.string('post', 'jobsEmailTitle', {
        jobName
      }),
      jobsEmailDearHiringManager: TS.string('post', 'jobsEmailDearHiringManager'),
      jobsEmailMyNameIs: TS.string('post', 'jobsEmailMyNameIs', {
        userName: user.name,
        jobName,
      }),
      jobsEmailHeresMyResume: TS.string('post', 'jobsEmailHeresMyResume', {
        userEmail: user.email,
        userPhone: resume.phone
      }),
      jobsEmailHighlights: TS.string('post', 'jobsEmailHighlights'),
      jobsEmailLocation: TS.string('post', 'jobsEmailLocation'),
      jobsEmailAddress: TS.string("post", 'jobsEmailAddress'),
      jobsEmailPhone: TS.string("post", "jobsEmailPhone"),
      jobsEmailEducation: TS.string("post", "jobsEmailEducation"),
      jobsEmailExperiences: TS.string("post", "jobsEmailExperiences"),
      jobsEmailAwards: TS.string("post", "jobsEmailAwards"),
      jobsEmailAdditionalInfos: TS.string("post", "jobsEmailAdditionalInfos"),
      jobName,
      resumeHighlights: resume.highlights,
      resumeCity: resume.city,
      resumeStateCode: resume.stateCode,
      resumeAddress: resume.address,
      resumePhone: resume.phone,
      resumeEmail: user.email,
      userName: user.name,
      resumeEducations,
      resumeExperiences,
      resumeAwards,
      resumeAdditionalInfos
    }

    return this.loadTemplate(
      emailType,
      template,
      customVars
    );


  }


  public sendResume = async (
    from: string,
    subject: string,
    template: string,
    resume: IResume,
    post: IPost,
    user: IUser,
    application: IPostApplication
  ) => {

    console.log('Sending resume...');



    try {

      const htmlEmail = this._generateEmailBody(template, EmailType.Html, resume, user, application)
      const textEmail = this._generateEmailBody(template, EmailType.Text, resume, user, application)

      console.log(`Sending resume to ${post.email} - from ${from}`);

      await this.smartSend(
        post.email,
        from,
        subject,
        htmlEmail,
        textEmail
      );

    }
    catch (error) {
      console.log('Failed while trying to submit this resume...');
      console.error(error);
    }

  }

  private _generateResumeItem(title: string, value, emailType: EmailType) {

    if (!value) {
      return ``;
    }

    switch (emailType) {
      case EmailType.Html:
        return `<tr>
        <td
          class="attributes_item"
          style='word-break: break-word; font-family: "Nunito Sans", Helvetica, Arial, sans-serif; font-size: 16px; padding: 0;'
        >
          <span class="padding-left">
            <strong>${title}:</strong>
            ${value}
          </span>
        </td>
      </tr>`
      case EmailType.Text:
        return `${title}: ${value}`
    }





  }

  private _generateExperiences(resumeExperiences: IResumeExperience[], emailType: EmailType) {

    if (resumeExperiences.length === 0) {
      return TS.string('post', 'jobsEmailNoData')
    }

    let htmlOutput = "";

    for (const resumeExperience of resumeExperiences) {
      const endingDate = resumeExperience.inProgress ? TS.string('post', 'jobsEmailInProgress') : DateTimeHelper.convertNodeTSToDate(resumeExperience.endingDate, TS.string(null, 'globalDateFormat'))


      htmlOutput += `
      ${this._generateResumeItem(TS.string('post', 'jobsEmailCompany'), resumeExperience.company, emailType)}
      ${this._generateResumeItem(TS.string('post', 'jobsEmailPosition'), resumeExperience.position, emailType)}
      ${this._generateResumeItem(TS.string('post', 'jobsEmailLocation'), resumeExperience.location, emailType)}
      ${this._generateResumeItem(TS.string('post', 'jobsEmailStartingDate'), DateTimeHelper.convertNodeTSToDate(resumeExperience.startingDate, TS.string(null, 'globalDateFormat')), emailType)}
      ${this._generateResumeItem(TS.string('post', 'jobsEmailEndingDate'), endingDate, emailType)}
      ${this._generateResumeItem(TS.string('post', 'jobsEmailDetails'), resumeExperience.details, emailType)}
   `

      htmlOutput += `<br/>`
    }

    return htmlOutput


  }

  private _generateEducations(resumeEducations: IResumeEducation[], emailType: EmailType) {

    if (resumeEducations.length === 0) {
      return TS.string('post', 'jobsEmailNoData')
    }

    let htmlOutput = "";

    for (const resumeEducation of resumeEducations) {

      const endingDate = resumeEducation.inProgress ? TS.string('post', 'jobsEmailInProgress') : DateTimeHelper.convertNodeTSToDate(resumeEducation.endingDate, TS.string(null, 'globalDateFormat'))

      htmlOutput += `
      ${this._generateResumeItem(TS.string('post', 'jobEmailEducationTitleString'), resumeEducation.title, emailType)}
      ${this._generateResumeItem(TS.string('post', 'jobsEmailInstitution'), resumeEducation.institution, emailType)}
      ${this._generateResumeItem(TS.string('post', 'jobsEmailLocation'), resumeEducation.location, emailType)}
      ${this._generateResumeItem(TS.string("post", 'jobsEmailStartingDate'), DateTimeHelper.convertNodeTSToDate(resumeEducation.startingDate, TS.string(null, 'globalDateFormat')), emailType)}
      ${this._generateResumeItem(TS.string('post', 'jobsEmailEndingDate'), endingDate, emailType)}
      ${this._generateResumeItem(TS.string('post', 'jobsEmailDetails'), resumeEducation.details, emailType)}
  `

      htmlOutput += emailType === EmailType.Html ? `<br/>` : `\n`
    }

    return htmlOutput


  }

  private _generateAwards(resumeAwards: IResumeAward[], emailType: EmailType) {
    if (resumeAwards.length === 0) {
      return TS.string('post', 'jobsEmailNoData')
    }

    let htmlOutput = "";

    for (const resumeAward of resumeAwards) {

      htmlOutput += `
      ${this._generateResumeItem(TS.string('post', 'jobEmailEducationTitleString'), resumeAward.title, emailType)}
      ${this._generateResumeItem(TS.string('post', 'jobsEmailDescription'), resumeAward.description, emailType)}
  `
      htmlOutput += emailType === EmailType.Html ? `<br/>` : `\n`
    }

    return htmlOutput
  }

  private _generateAdditionalInfos(resumeAdditionalInfos: IResumeAdditionalInfo[], emailType: EmailType) {

    if (resumeAdditionalInfos.length === 0) {
      return TS.string('post', 'jobsEmailNoData')
    }

    let htmlOutput = "";

    for (const resumeAdditionalInfo of resumeAdditionalInfos) {

      htmlOutput += `
      ${this._generateResumeItem(TS.string('post', 'jobEmailEducationTitleString'), resumeAdditionalInfo.title, emailType)}
      ${this._generateResumeItem(TS.string('post', 'jobEmailEducationTitleString'), resumeAdditionalInfo.title, emailType)}
      ${this._generateResumeItem(TS.string('post', 'jobsEmailDescription'), resumeAdditionalInfo.description, emailType)}
  `
      htmlOutput += emailType === EmailType.Html ? `<br/>` : `\n`
    }

    return htmlOutput
  }



}