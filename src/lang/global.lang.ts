export const globalStrings = {
  currency: {
    eng: "CAD",
    ptBr: "R$",
  },
  methodNotAllowed: {
    eng: 'Sorry, this request method is not allowed.',
    ptBr: 'Desculpe, este método de solicitação não é permitido.'
  },
  appMaintenanceMode: {
    eng: 'Sorry, app is in maintenance mode',
    ptBr: "Nos desculpe. Nossa api encontra-se em manutenção."
  },

  // File upload global strings

  globalFileTypeError: {
    eng: 'Invalid file type: {{extension}}. Please, use one of the following types: {{acceptedTypes}}.',
    ptBr: 'Tipo de arquivo inválido: {{extension}}. Por favor, use um dos seguintes tipos: {{acceptTypes}}.'
  },
  globalFileMaximumSize: {
    eng: 'Your uploaded file exceeds the maximum allowed size of {{size}} mb.',
    ptBr: 'Seu arquivo enviado excede o tamanho máximo permitido de {{size}} mb.'
  },
  globalFileUploadError: {
    eng: 'An error occurred while trying to upload your files. Please contact the support.',
    ptBr: 'Ocorreu um erro ao tentar fazer upload de seus arquivos. Entre em contato com o suporte.'
  },

  globalDateFormat: {
    eng: "MM/DD/YYYY",
    ptBr: "DD/MM/YYYY"
  },
  unsubscribeLink: {
    eng: `<br/><br/><p style="text-align: center; display: block; font-size: 12px;">
    <a style="color: rgb(168,170,175)" href='{{unsubscribeUrl}}'>If you'd like to stop receiving these e-mails, just click here</a>
    </p>
    `,
    ptBr: `<br/><br/><p style="text-align: center; display: block; font-size: 12px;">
    <a style="color: rgb(168,170,175)" href='{{unsubscribeUrl}}'> Se você quer parar de receber esses e-mails, clique aqui</a>
    </p>`
  },

  globalInvalidKeys: {
    eng: "This request does not accept the following keys: {{forbiddenKeys}}",
    ptBr: "Esta solicitação não aceita as seguintes chaves: {{forbiddenKeys}}"
  },
  globalInvalidValueForField: {
    eng: "Invalid value for the field: {{invalidField}}",
    ptBr: "Valor inválido para o campo: {{invalidField}}"
  },
  globalGenericAnd: {
    eng: "and",
    ptBr: "e"
  }
};
