import sgMail from '@sendgrid/mail';
import mailjet from 'node-mailjet';

export const emailProviders = [
  {
    key: "SENDGRID", freeTierThreshold: 1300, emailSendingFunction: async (to, from, subject, html, text) => {
      // @ts-ignore
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      sgMail.send({
        to,
        from,
        subject,
        html,
        text
      })
    }
  }, {
    key: "MAILJET",
    freeTierThreshold: 200,
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