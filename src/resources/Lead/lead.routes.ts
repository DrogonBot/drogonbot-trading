import cheerio from 'cheerio';
import { Router } from 'express';
import ObjectsToCsv from 'objects-to-csv';

import { publicDirectory } from '../..';
import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { UserMiddleware } from '../../middlewares/user.middleware';
import { TS } from '../../utils/TS';
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
        message: TS.string('lead', 'leadAlreadyExists')
      })
    }

    // if it doesn't exist yet, lets create it

    const lead = new Lead({
      name, email, stateCode, country, jobRoles, phone, city, type
    })

    await lead.save();

    return res.status(200).send({
      status: 'success',
      message: TS.string('lead', 'leadSaved')
    })

  }
  catch (error) {
    console.error(error);
    return res.status(200).send({
      status: 'error',
      message: TS.string('lead', 'leadSavingFailed')
    })
  }

})


leadsRouter.get('/leads/export/:stateCode', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {

  const { stateCode } = req.params;

  const leads = await Lead.find({ stateCode })

  let output: string[] = []

  for (const lead of leads) {

    const data = lead;

    if (lead.phone) {
      data.phone = lead.phone.replace('+55 ', "").replace(' ', '').replace('-', '').replace('(', '').replace(')', '')

      output = [
        ...output,
        data.toObject() // convert mongoose model to javascript object (csv lib requirement)
      ]
    }
  }


  const csv = new ObjectsToCsv(output)

  await csv.toDisk(`${publicDirectory}/export/leads.csv`)

  return res.status(200).send({
    status: 'success',
    message: "Leads exported successfully!"
  })




});


// operationRouter.get('/fix-leads', async (req, res) => {

//   const leads = await Lead.find({})

//   for (const lead of leads) {

//     if (lead.phone && !lead.city) {
//       const isMG = /\(3\d\)/.test(lead.phone)
//       if (isMG) {
//         lead.city = "Belo Horizonte"
//       }

//       const isSP = /\(1\d\)/.test(lead.phone)
//       if (isSP) {
//         lead.city = "São Paulo"
//       }

//       await lead.save()
//     }
//   }


leadsRouter.post('/leads/whatsapp/scrap', async (req, res) => {

  const { htmlContent, stateCode, city } = req.body;


  const adminNumbers = ['+55 11 95322-9854', '+55 21 98314-0109', '+55 21 98557-2503', '+55 21 98831-9261', '+55 21 98891-0663', '+55 21 99662-2975',
    '+55 21 98891-0663', '+55 21 99662-2975', '+55 21 99771-0744', '+55 21 99868-8549', '+55 11 95322-9854', '+55 21 99902-7674', '+55 31 8473-6403', '+55 81 8913-1180', '+55 11 95322-9854', '+55 21 99902-7674', '+55 21 99554-7581', '+55 21 99625-0863', '+55 21 99881-9824', '+55 31 9594-5171', '+55 84 8111-7924', '+55 84 8784-5837', '+55 85 8169-8813', '+55 31 9886-7530', '+55 31 7148-2965', '+55 31 8223-3106', '+55 31 8473-6403', '+55 31 9711-1424', '+55 21 96765-0352', '+55 22 99104-0336', '+55 31 9807-1021', '+55 84 8752-3118', '+55 22 98143-0383', '+55 31 8336-4982', '+55 31 8803-2085', '+55 31 9214-7555', '+55 31 9807-1021', '+55 51 8924-7059', '+55 51 9770-4895', '+55 84 8752-3118', '+55 27 99271-2210', '+55 27 99292-4645', '+55 31 9523-5008', '+55 11 94541-9909', '+55 21 96703-2791', '+55 21 96765-0352', '+55 21 97195-3939', '+55 21 97994-5780', '+55 21 99747-8320', '+55 21 99881-9824', '+55 51 8053-8691', '+55 51 9911-4843', '+55 53 9948-9391', '+55 93 9128-6114', '+55 19 98280-5843', '+55 84 8603-1049', '+55 93 9128-6114']

  const $ = cheerio.load(htmlContent);

  const leadsList = $('.-GlrD._2xoTX ._3dtfX');

  leadsList.each(async (i, el) => {

    const leadPhone = $(el).text()

    if (!adminNumbers.includes(leadPhone) && !leadPhone.includes("Group admin")) {

      const phoneExists = await Lead.exists({ phone: leadPhone })

      // check if number has letters (if so, skip)

      const hasLetters = /[a-z]+/i.test(leadPhone)

      if (!phoneExists && !hasLetters) {
        try {
          const newLead = new Lead({
            type: UserType.SMSLead,
            stateCode,
            city,
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