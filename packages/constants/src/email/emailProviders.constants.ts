import sgMail from '@sendgrid/mail';
import mailjet from 'node-mailjet';
import SibApiV3Sdk from 'sib-api-v3-sdk';


export interface IEmailProvider {
  key: string,
  credits: number
  emailSendingFunction: Function
}


export const emailProviders: IEmailProvider[] = [
  {
    // TODO: SENDGRID Free tier is 100 only
    key: "SENDGRID", credits: 200, emailSendingFunction: async (to, from, subject, html, text) => {
      // @ts-ignore
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      sgMail.send({
        to,
        from: {
          email: from,
          name: process.env.APP_NAME
        },
        subject,
        html,
        text
      })
    }
  },
  {
    key: "SENDINBLUE",
    credits: 300,
    emailSendingFunction: async (to, from, subject, html, text) => {
      const defaultClient = SibApiV3Sdk.ApiClient.instance;

      // Configure API key authorization: api-key
      const apiKey = defaultClient.authentications['api-key'];
      apiKey.apiKey = process.env.SENDINBLUE_API_KEY
      // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
      // apiKey.apiKeyPrefix['api-key'] = "Token"

      // Configure API key authorization: partner-key
      const partnerKey = defaultClient.authentications['partner-key'];
      partnerKey.apiKey = process.env.SENDINBLUE_API_KEY
      // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
      // partnerKey.apiKeyPrefix['partner-key'] = "Token"


      const apiInstance = new SibApiV3Sdk.SMTPApi();

      const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

      sendSmtpEmail.to = [{ email: to }]
      sendSmtpEmail.sender = { email: from, name: process.env.APP_NAME }
      sendSmtpEmail.htmlContent = html
      sendSmtpEmail.textContent = text
      sendSmtpEmail.subject = subject

      try {
        const sendInBlueRequest = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('SendInBlue: API called successfully. Returned data: ');
        console.log(JSON.stringify(sendInBlueRequest, null, 2));

      }
      catch (error) {
        console.log('Error in SendInBlue request!');
        console.error(error);

      }
    }
  }

  , {
    key: "MAILJET",
    credits: 200,
    emailSendingFunction: async (to, from, subject, html, text) => {
      const mailjetClient = mailjet.connect(
        process.env.MAILJET_API_KEY_PUBLIC,
        process.env.MAILJET_API_KEY_PRIVATE
      );

      try {
        await mailjetClient.post("send", { version: 'v3.1' }).request(
          {
            "Messages": [
              {
                "From": {
                  "Email": from,
                  "Name": process.env.APP_NAME
                },
                "To": [
                  {
                    "Email": to,
                  }
                ],
                "Subject": subject,
                "TextPart": text,
                "HTMLPart": html
              }
            ]
          }
        );
      }
      catch (error) {
        console.error(error);
      }
    }
  }

]