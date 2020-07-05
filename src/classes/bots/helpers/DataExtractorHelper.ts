import { PostBenefits, PostCategory, PostPositionType } from '../../../resources/Post/post.types';


export class DataExtractorHelper {

  private static _readBenefits(hasLifeInsurance, hasMealAssistance, hasTransportAssistance, hasHealthPlan, hasDentalPlan): PostBenefits[] {

    let benefits: PostBenefits[] = []

    if (hasLifeInsurance) {
      benefits = [...benefits, PostBenefits.LifeInsurance]
    }
    if (hasMealAssistance) {
      benefits = [...benefits, PostBenefits.FoodTicket]
    }

    if (hasTransportAssistance) {
      benefits = [...benefits, PostBenefits.Transportation]
    }

    if (hasHealthPlan) {
      benefits = [...benefits, PostBenefits.HealthCare]
    }

    if (hasDentalPlan) {
      benefits = [...benefits, PostBenefits.DentalPlan]
    }

    return benefits

  }

  private static _readCategory(isTemporary, isCLT, isInternship) {

    if (isCLT) {
      return PostCategory.Job
    }

    if (isTemporary) {
      return PostCategory.Temporary
    }

    if (isInternship) {
      return PostCategory.Internship
    }
    return PostCategory.Job

  }

  private static _tryExtractingData(rawPost, regex, replace?) {
    try {

      if (replace) {
        return rawPost.match(regex)[0].replace(replace, '').trim()
      } else {
        return rawPost.match(regex)[0]
      }

    }
    catch (error) {
      return null
    }
  }

  private static _repairEmail = (email: string) => {
    const lastChar = email[email.length - 1]
    if (lastChar === "." || lastChar === ",") {
      email = email.slice(0, email.length - 1) // remove last char
    }
    return email
  }

  private static _extractSalary = (content: string) => {

    try {
      const match = content.match(/(R\$\s?)\d{3,5}((\.|,)\d{2})?/g) || content.match(/\d+\s(reais)/g)

      if (!match) {
        return null;
      }

      let salaryString = match[0]

      salaryString = salaryString.replace(new RegExp(/R\$/, 'g'), "");

      const salaryMainValue = salaryString.split('.')[0] || salaryString.split(',')[0]

      console.log(salaryMainValue);

      return parseFloat(salaryString)
    }
    catch (error) {
      console.error(error);
      return null;
    }

  }

  public static extractJobData = async (rawPost) => {

    rawPost = rawPost.replace(new RegExp('\n', 'g'), " ");

    // This function will extract as much data as we can from a raw job post. Unfortunately, it's not able to fill all of the required IPost fields, so you should do some extra checks to do so (like infering the sector and jobRoles)

    let salary: number | null = null
    try {
      salary = DataExtractorHelper._extractSalary(rawPost)
    }
    catch (error) {
      salary = null
    }

    let phone = null
    try {
      phone = rawPost.replace(/\./g, '').match(/(\(?\d{2}\)?\.?\s?)?(\d{4,5}(\-?|\s?)\d{4})/g)[0]
        .replace(/\./g, "")
        .replace(/\-/g, "")
        .replace(/(\()/g, "")
        .replace(/(\))/g, "")
        .replace(/\s/g, "")
    }
    catch (error) {
      phone = null
    }



    const isPartTime = (/(meio período)/).test(rawPost)
    const isTemporary = (/(Temporario|Temporário)/).test(rawPost)
    const isCLT = (/(CLT|Efetivo|Carteira assinada|Assinado em carteira)/ig).test(rawPost)
    const isInternship = /est(agio|ágio|agiario)/i.test(rawPost)
    const hasLifeInsurance = /(seguro de vida)/i.test(rawPost)
    const hasMealAssistance = /(vale |ticket |Cartão )(alimenta(cao|ção))|(refei(cao|ção))/i.test(rawPost)
    const hasTransportAssistance = /(vale )(transporte)/i.test(rawPost)
    const hasHealthPlan = /(plano de\s|Assistência\s)?(saude|saúde|médica|medica)/i.test(rawPost)
    const hasDentalPlan = /(plano\s|Assistência\s)?(odonto|dent)/i.test(rawPost)
    const isExperienceRequired = /(com\s)?experi(\w+)\s?(necess\w+)?/i.test(rawPost) || /(Necessário)?\s?experi\W+/i.test(rawPost)

    const benefits: PostBenefits[] = DataExtractorHelper._readBenefits(hasLifeInsurance, hasMealAssistance, hasTransportAssistance, hasHealthPlan, hasDentalPlan)

    // Extract and validate email
    const email = DataExtractorHelper._tryExtractingData(rawPost, /\S+@\S+\.\S+/ig)


    const externalUrl = DataExtractorHelper._tryExtractingData(rawPost, /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/ig);


    return {
      category: DataExtractorHelper._readCategory(isTemporary, isCLT, isInternship),
      positionType: isPartTime ? PostPositionType.PartTime : PostPositionType.FullTime,
      benefits,
      content: DataExtractorHelper._tryExtractingData(rawPost, /((Descrição|Descricao|Atividades|Função|Funcao)\:?\n?)\s?(.+\n){1,100}/i, /(Descrição|Descricao|Atividades):\n?\s?/i),
      email,
      monthlySalary: salary || null,
      yearlySalary: (salary && salary * 12) || null,
      hourlySalary: (salary && (salary * 12) / 1920) || null,
      experienceRequired: isExperienceRequired,
      externalUrl,
      phone,
      requisites: DataExtractorHelper._tryExtractingData(rawPost, /(((Pre|Pré)?\-?(Requisitos|Essencial))\:?\n?)\s?(.+\n){1,100}/i, /((Pre|Pré)?\-?Requisitos|Essencial)\:?\n?\s?/i),
      schedule: DataExtractorHelper._tryExtractingData(rawPost, /((Horario|horário)\:?\n?)\s?(.+\n){1,100}/i, /(Horario|horário):\n?\s?/i),
      companyName: DataExtractorHelper._tryExtractingData(rawPost, /((Empresa):(\n)?)\s?.+(\n)?/ig, /(Empresa):\s?/)
    };











  }


}




