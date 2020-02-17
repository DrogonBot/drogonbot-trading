import { AvailableLanguages } from '../constants/server.constants';
import { Post } from '../resources/Post/post.model';
import { IResumeEducation, IResumeExperience, Resume } from '../resources/Resume/resume.model';
import { User } from '../resources/User/user.model';
import { DateTimeHelper } from '../utils/DateTimeHelper';
import { LanguageHelper } from '../utils/LanguageHelper';
import { EmailType, TransactionalEmailManager } from './TransactionalEmailManager';

export class JobsEmailManager extends TransactionalEmailManager {

  public sendResume = async (
    to: string,
    from: string,
    subject: string,
    template: string,
    resumeId: string,
    postId: string,
    companyLanguage: AvailableLanguages
  ) => {


    console.log(`Sending resume to ${to} - from ${from}`);

    try {
      const resume = await Resume.findOne({ _id: resumeId })

      if (!resume) {
        throw new Error('Resume not found')
      }

      const user = await User.findOne({ _id: resume?.ownerId })

      if (!user) {
        throw new Error('User not found')
      }

      const jobPost = await Post.findOne({ _id: postId })

      if (!jobPost) {
        throw new Error('Post not found')
      }

      const resumeEducations = this.generateEducations(resume.educations)
      const resumeExperiences = this.generateExperiences(resume.experiences)

      const jobName = jobPost.title;// TODO: Switch for tag!


      const translationStrings = {
        jobsEmailTitle: LanguageHelper.getLanguageString('post', 'jobsEmailTitle', {
          jobName
        }),
        jobsEmailDearHiringManager: LanguageHelper.getLanguageString('post', 'jobsEmailDearHiringManager'),
        jobsEmailMyNameIs: LanguageHelper.getLanguageString('post', 'jobsEmailMyNameIs', {
          userName: user.name,
          jobName,
        }),
        jobsEmailHeresMyResume: LanguageHelper.getLanguageString('post', 'jobsEmailHeresMyResume', {
          userEmail: user.email,
          userPhone: resume.phone
        }),
        jobsEmailHighlights: LanguageHelper.getLanguageString('post', 'jobsEmailHighlights'),
        jobsEmailLocation: LanguageHelper.getLanguageString('post', 'jobsEmailLocation'),
        jobsEmailAddress: LanguageHelper.getLanguageString("post", 'jobsEmailAddress'),
        jobsEmailPhone: LanguageHelper.getLanguageString("post", "jobsEmailPhone"),
        jobsEmailEducation: LanguageHelper.getLanguageString("post", "jobsEmailEducation"),
        jobsEmailExperiences: LanguageHelper.getLanguageString("post", "jobsEmailExperiences")
      }


      const customVars = {
        ...translationStrings,
        jobName,
        resumeHighlights: resume.highlights,
        resumeCity: resume.city,
        resumeStateCode: resume.stateCode,
        resumeAddress: resume.address,
        resumePhone: resume.phone,
        resumeEmail: user.email,
        userName: user.name,
        resumeEducations,
        resumeExperiences

      }


      const htmlEmail = this.loadTemplate(
        EmailType.Html,
        template,
        customVars
      );
      const textEmail = this.loadTemplate(
        EmailType.Text,
        template,
        customVars
      );


      this.sendGrid.send({
        to,
        from,
        subject,
        html: htmlEmail,
        text: textEmail
      });

    }
    catch (error) {
      console.log('Failed while trying to submit this resume...');
      console.error(error);


    }

  }

  public generateResumeItem(title: string, value) {

    if (!value) {
      return ``;
    }

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


  }

  public generateExperiences(resumeExperiences: IResumeExperience[]) {

    let htmlOutput = "";

    for (const resumeExperience of resumeExperiences) {
      const endingDate = resumeExperience.inProgress ? LanguageHelper.getLanguageString('post', 'jobsEmailInProgress') : DateTimeHelper.convertNodeTSToDate(resumeExperience.endingDate, LanguageHelper.getLanguageString(null, 'globalDateFormat'))


      htmlOutput += `
      ${this.generateResumeItem(LanguageHelper.getLanguageString('post', 'jobsEmailCompany'), resumeExperience.company)}
      ${this.generateResumeItem(LanguageHelper.getLanguageString('post', 'jobsEmailPosition'), resumeExperience.position)}
      ${this.generateResumeItem(LanguageHelper.getLanguageString('post', 'jobsEmailLocation'), resumeExperience.location)}
      ${this.generateResumeItem(LanguageHelper.getLanguageString('post', 'jobsEmailStartingDate'), DateTimeHelper.convertNodeTSToDate(resumeExperience.startingDate, LanguageHelper.getLanguageString(null, 'globalDateFormat')))}

      ${this.generateResumeItem(LanguageHelper.getLanguageString('post', 'jobsEmailEndingDate'), endingDate)}

      ${this.generateResumeItem(LanguageHelper.getLanguageString('post', 'jobsEmailDetails'), resumeExperience.details)}
   `

      htmlOutput += `<br/>`
    }

    return htmlOutput


  }

  public generateEducations(resumeEducations: IResumeEducation[]) {

    let htmlOutput = "";

    for (const resumeEducation of resumeEducations) {


      const endingDate = resumeEducation.inProgress ? LanguageHelper.getLanguageString('post', 'jobsEmailInProgress') : DateTimeHelper.convertNodeTSToDate(resumeEducation.endingDate, LanguageHelper.getLanguageString(null, 'globalDateFormat'))



      htmlOutput += `
      ${this.generateResumeItem(LanguageHelper.getLanguageString('post', 'jobsEmailEducationTitle'), resumeEducation.title)}
      ${this.generateResumeItem(LanguageHelper.getLanguageString('post', 'jobsEmailInstituition'), resumeEducation.institution)}
      ${this.generateResumeItem(LanguageHelper.getLanguageString('post', 'jobsEmailLocation'), resumeEducation.location)}
      ${this.generateResumeItem(LanguageHelper.getLanguageString("post", 'jobsEmailStartingDate'), DateTimeHelper.convertNodeTSToDate(resumeEducation.startingDate, LanguageHelper.getLanguageString(null, 'globalDateFormat')))}
      ${this.generateResumeItem(LanguageHelper.getLanguageString('post', 'jobsEmailEndingDate'), endingDate)}
      ${this.generateResumeItem(LanguageHelper.getLanguageString('post', 'jobsEmailDetails'), resumeEducation.details)}
  `

      htmlOutput += `<br/>`
    }

    return htmlOutput


  }



}