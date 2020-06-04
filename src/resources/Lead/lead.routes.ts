import { Router } from 'express';

import { RequestMiddleware } from '../../middlewares/request.middleware';
import { LanguageHelper } from '../../utils/LanguageHelper';
import { Lead } from './lead.model';

// @ts-ignore
const leadsRouter = new Router();

leadsRouter.post('/leads/save', [RequestMiddleware.allowedRequestKeys(['name', 'email', 'stateCode', 'country', 'jobRoles', 'phone', 'city'])], async (req, res) => {

  try {
    const lead = new Lead({
      ...req.body
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