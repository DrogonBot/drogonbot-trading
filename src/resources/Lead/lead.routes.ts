import { Router } from 'express';

import { LanguageHelper } from '../../utils/LanguageHelper';
import { Lead } from './lead.model';

// @ts-ignore
const leadsRouter = new Router();

leadsRouter.post('/leads/save', async (req, res) => {

  const { name, email, stateCode, country, jobRoles, phone, city } = req.body;

  try {
    const lead = new Lead({
      name, email, stateCode, country, jobRoles, phone, city
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