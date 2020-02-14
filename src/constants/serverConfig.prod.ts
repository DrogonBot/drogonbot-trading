import { APP_NAME, LANGUAGE, SUPPORT_EMAIL } from './server.constants';

export const prodServerConfig = {
  app: {
    name: APP_NAME,
    port: 3000,
    url: "https://empregourgente.com:3000/",
    mongodbConnectionUrl: "mongodb://mongo-eu:27017/emprego-urgente"
  },
  email: {
    supportEmail: SUPPORT_EMAIL,
    mailchimpAPIKey: "c504a460b23bf5dd85c7de19c121a583-us4",
    mailchimpDefaultList: "778a708d3d", // https://mailchimp.com/pt/help/find-audience-id/
    sendGridAPIKey:
      "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",
    templatesFolder: "./src/emails/templates",
    globalTemplateVars: {
      "Product Name": APP_NAME,
      "Sender Name": "Emprego Urgente",
      "Company Name, LLC": "Emprego Urgente Inc",
      "Company Address": "Av. Rio Branco, Vitoria ES"
    },
    oAuth: {
      gmail: {
        clientID:
          "1053239267142-0111itnk33e9mqbpe61gig0isril9p2o.apps.googleusercontent.com",
        clientSecret: "0kc7WazuJhNlyNZvSy4wF5Rm"
      }
    }
  },
  tracking: {
    mixpanelToken: "d87cd0f8669fbce8a13732f13bf43ff8"
  },
  maintenanceMode: false,
  language: LANGUAGE,
  jwtSecret: "CfQbhtmMn5#pez9SHY+4By+ce4PFMevcg=="
};
