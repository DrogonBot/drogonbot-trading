import { appName, supportEmail } from './env';

export const devServerConfig = {
  app: {
    name: appName,
    port: 3000,
    url: "http://localhost:3000/",
    mongodbConnectionUrl: "mongodb://mongo:27017/app"
  },
  email: {
    supportEmail,
    mailchimpAPIKey: "bad3b9754ab37c1329a284621d9bc307-us4",
    mailchimpDefaultList: "816cff1b6d", // https://mailchimp.com/pt/help/find-audience-id/
    sendGridAPIKey:
      "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",
    templatesFolder: "./src/emails/templates",
    globalTemplateVars: {
      "Product Name": appName,
      "Sender Name": "Joao",
      "Company Name, LLC": "App Boilerplate Inc",
      "Company Address": "1234, Street Rd. Suite 1234"
    }
  },
  env: "dev",
  maintenanceMode: false,
  language: "eng",
  jwtSecret: "pez9SHY+4By+ce4PFMevcg=="
};
