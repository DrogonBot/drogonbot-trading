import { Router } from 'express';

import { LanguageHelper } from '../../utils/LanguageHelper';
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



export { leadsRouter }