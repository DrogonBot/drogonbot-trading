import cheerio from 'cheerio';
import { Router } from 'express';

import { LanguageHelper } from '../../utils/LanguageHelper';
import { UserType } from '../User/user.types';
import { Lead } from './lead.model';

// @ts-ignore
const leadsRouter = new Router();

leadsRouter.post('/leads/save', async (req, res) => {

  const { name, email, stateCode, country, jobRoles, phone, city, type } = req.body;

  try {

    // check if lead was already added to our database

    const leadExists = await Lead.exists({ email });

    if (leadExists) {
      return res.status(200).send({
        status: 'error',
        message: LanguageHelper.getLanguageString('lead', 'leadAlreadyExists')
      })
    }

    // if it doesn't exist yet, lets create it

    const lead = new Lead({
      name, email, stateCode, country, jobRoles, phone, city, type
    })

    await lead.save();

    return res.status(200).send({
      status: 'success',
      message: LanguageHelper.getLanguageString('lead', 'leadSaved')
    })

  }
  catch (error) {
    console.error(error);
    return res.status(200).send({
      status: 'error',
      message: LanguageHelper.getLanguageString('lead', 'leadSavingFailed')
    })
  }

})


leadsRouter.post('/leads/whatsapp/scrap', async (req, res) => {

  const { htmlContent } = req.body;


  const adminNumbers = ['+55 11 95322-9854', '+55 21 98314-0109', '+55 21 98557-2503', '+55 21 98831-9261', '+55 21 98891-0663', '+55 21 99662-2975',
    '+55 21 98891-0663', '+55 21 99662-2975', '+55 21 99771-0744', '+55 21 99868-8549', '+55 11 95322-9854', '+55 21 99902-7674', '+55 31 8473-6403', '+55 81 8913-1180', '+55 11 95322-9854', '+55 21 99902-7674', '+55 21 9954-7581', '+55 21 99625-0863', '+55 21 99881-9824', '+55 31 9594-5171', '+55 84 8111-7924', '+55 84 8784-5837', '+55 85 8169-8813', '+55 31 9886-7530', '+55 31 7148-2965', '+55 31 8223-3106', '+55 31 8473-6403', '+55 31 9711-1424', '+55 21 96765-0352', '+55 22 99104-0336', '+55 31 9807-1021', '+55 84 8752-3118', '+55 22 98143-0383', '+55 31 8336-4982', '+55 31 8803-2085', '+55 31 9214-7555', '+55 31 9807-1021', '+55 51 8924-7059', '+55 51 9770-4895', '+55 84 8752-3118', '+55 27 99271-2210', '+55 27 99292-4645']


  const $ = cheerio.load(htmlContent);


  const leadsList = $('span[dir="auto"][title*="+"]');

  leadsList.each(async (i, el) => {
    const leadPhone = $(el).text();

    if (!adminNumbers.includes(leadPhone)) { // to avoid issues, lets not scrap admin numbers =D

      const phoneExists = await Lead.exists({ phone: leadPhone })

      if (!phoneExists) {
        try {
          const newLead = new Lead({
            type: UserType.SMSLead,
            stateCode: "MG",
            city: "Belo Horizonte",
            country: "Brazil",
            phone: leadPhone
          })

          await newLead.save();
          console.log(`Saved ${leadPhone} into database => ${newLead.stateCode}`);
        }
        catch (error) {
          console.log(`Error while trying to save lead ${leadPhone} in our database.`);
          console.error(error.message);
        }
      } else {
        console.log(`Skipping ${leadPhone}, since it already exists!`);
      }



    }





  })

  return res.status(200).send({
    status: 'ok',
    message: "success"
  })




});



export { leadsRouter }