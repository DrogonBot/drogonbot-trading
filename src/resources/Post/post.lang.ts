export const strings = {
  postCreationError: {
    eng: 'Error while trying to create your post.',
    ptBr: "Erro ao tentar criar seu post."
  },
  postNotFound: {
    eng: 'Post not found.',
    ptBr: "Post não encontrado."
  },
  postFetchError: {
    eng: 'Error while fetching your post.',
    ptBr: "Erro ao carregar seu post."
  },
  postLikeError: {
    eng: 'Error while trying to perform a like action in your post.',
    ptBr: "Erro ao tentar dar like em sua postagem.",
  },
  postNotOwner: {
    eng: "You cannot delete this post because you're not the owner of it",
    ptBr: "Você não pode excluir esta postagem porque não é o proprietário dela"
  },
  postDeletionError: {
    eng: 'Error while trying to delete your post.',
    ptBr: "Erro ao tentar excluir sua postagem."
  },

  postNotification: {
    eng: "A new post for {{jobRole}} was just added!",
    ptBr: "Uma nova vaga de {{jobRole}} acabou de ser adicionada!"
  },


  postCreationNotification: {
    eng: "{{userName}} just created a new post! Check it out!",
    ptBr: "{{userName}} acabou de criar uma nova postagem! Confira!"
  },
  postApplicationError: {
    eng: "Error while applying to this job.",
    ptBr: 'Ocorreu um erro ao tentar aplicar para esta vaga.'
  },
  postApplicationUserAlreadyApplied: {
    eng: "You already applied for this position!",
    ptBr: "Você já aplicou para esta vaga!"
  },
  postEmailAndPhoneNotFound: {
    eng: 'At least an e-mail or a phone should be submitted.',
    ptBr: 'Ao menos um e-mail ou telefone deve ser enviado.'
  },

  postResumeDoesNotExists: {
    eng: "The submitted resume is invalid. Please create and select a new one.",
    ptBr: "O currículo enviado é inválido. Por favor, crie e selecione um novo."
  },

  // JOBS EMAIL ========================================

  jobsEmailTitle: {
    eng: 'New Application for {{jobName}}',
    ptBr: 'Currículo para {{jobName}}'
  },
  jobsEmailDearHiringManager: {
    eng: "Dear Hiring Manager,",
    ptBr: "Prezado recrutador,",
  },
  jobsEmailMyNameIs: {
    eng: "My name is {{userName}} and I'm writing this email to thank you for taking the time to consider me for the position of {{jobName}}. I am very excited about the possibility of being a part of your organization. Utilizing my skills and abilities to benefit your company is an exciting possibility for me.",
    ptBr: "Meu nome é {{userName}} e estou escrevendo este e-mail para agradecer seu tempo para me considerar na posição de {{jobName}}. Estou muito animado com a possibilidade de fazer parte da sua organização, visto que acredito poder utilizar minhas habilidades para beneficiar sua empresa."
  },
  jobsEmailHeresMyResume: {
    eng: "Here's my resume. Please, send a message to {{userPhone}} if you have any questions.",
    ptBr: "Aqui está o meu currículo. Por favor, envie uma mensagem para {{userPhone}} caso tenha alguma dúvida."
  },
  jobsEmailHighlights: {
    eng: "Highlights",
    ptBr: "Objetivo Profissional"
  },
  jobsEmailLocation: {
    eng: "Location",
    ptBr: "Localização"
  },
  jobsEmailAddress: {
    eng: "Address",
    ptBr: "Endereço"
  },
  jobsEmailPhone: {
    eng: "Phone",
    ptBr: "Telefone"
  },
  jobsEmailEducation: {
    eng: "Education",
    ptBr: "Formação"
  },
  jobsEmailExperiences: {
    eng: "Professional Experience",
    ptBr: "Experiência Profissional"
  },
  jobEmailEducationTitleString: {
    eng: "Title",
    ptBr: "Título"
  },
  jobsEmailStartingDate: {
    eng: "Starting Date",
    ptBr: "Data de início"
  },
  jobsEmailEndingDate: {
    eng: "Ending Date",
    ptBr: "Data de Término"
  },
  jobsEmailInProgress: {
    eng: "In progress",
    ptBr: "Em andamento"
  },
  jobsEmailDetails: {
    eng: "Details",
    ptBr: "Detalhes"
  },
  jobsEmailInstitution: {
    eng: "Instituition",
    ptBr: "Instituição"
  },
  jobsEmailCompany: {
    eng: "Company",
    ptBr: "Empresa"
  },
  jobsEmailPosition: {
    eng: "Position",
    ptBr: "Cargo"
  },
  jobsEmailDescription: {
    eng: "Description",
    ptBr: "Descrição"
  },
  jobsEmailAwards: {
    eng: "Awards",
    ptBr: "Prêmios"
  },
  jobsEmailAdditionalInfos: {
    eng: "Additional Infos",
    ptBr: "Informações adicionais"
  },

  jobsEmailNoData: {
    eng: "No Data",
    ptBr: "Sem dados"
  },

  // Jobs notification email ========================================

  jobsNotificationSubject: {
    eng: "New position for {{jobRole}} ({{postTitle}})",
    ptBr: "Nova vaga para {{jobRole}} ({{postTitle}})"
  },
  jobsNotificationPostCTA: {
    eng: "See Post",
    ptBr: "Acessar Vaga"
  },
  jobsNotificationFirstPhrase: {
    eng: "Hey {{userName}}, how are things going?",
    ptBr: "Ei {{userName}}, tudo certo?"
  },
  jobsNotificationFirstPhrase2: {
    eng: "Hello {{userName}}! How are you in your job search.",
    ptBr: "Ei {{userName}}! Como está sua procura por emprego?"
  },
  jobsNotificationSecondParagraph: {
    eng: "We've found a job post that may interest you",
    ptBr: "Encontramos uma vaga que pode ser de seu interesse:"
  },
  jobsNotificationSecondParagraph2: {
    eng: "Our system found some interesting job roles for you:",
    ptBr: "Nosso sistema encontrou uma vaga que provavelmente lhe interessa:"
  },
  jobsNotificationClosing: {
    eng: `We suggest that <strong> apply immediately </strong>,
         because generally the first candidates have higher
         chances of getting an interview.
    <br />
    <br />

Good Luck!

<br />
                        <br />

                       JobAlert Team


    `,
    ptBr: `Sugerimos que <strong>aplique imediatamente</strong>,
    pois geralmente os primeiros candidatos têm maiores
    chances de conseguir uma entrevista.

    <br />
    <br />

    Boa sorte!

    <br />
    <br />

    Equipe EmpregoUrgente


    `
  },
  jobsNotificationClosing2: {
    eng: `We advice that you <strong> apply immediately </strong>,
         because generally the first candidates have higher
         chances of getting an interview.

    <br/><br/>
    * Note that we only forward on opportunities! All information we have is inside the post.
    <br />
    <br />

Good Luck!

<br />
                        <br />

                       JobAlert Team


    `,
    ptBr: `Sugerimos fortemente que <strong>aplique para esta vaga</strong>,
    pois geralmente os primeiros candidatos têm maiores
    chances de conseguir uma entrevista.

    <br/><br/>
    * Lembrando que apenas repassamos oportunidades! Todas informações que temos encontram-se no post.

    <br />
    <br />

    Boa sorte!

    <br />
    <br />

    Equipe EmpregoUrgente


    `
  }




};

