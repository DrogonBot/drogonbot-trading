import { Router } from 'express';

import { USER_PER_CLICK_CREDIT_MULTIPLIER } from '../../constants/credits.constant';
import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { RequestMiddleware } from '../../middlewares/request.middleware';
import { UserMiddleware } from '../../middlewares/user.middleware';
import { CreditsHelper } from '../../utils/CreditsHelper';
import { TS } from '../../utils/TS';
import { ExternalLead } from '../ExternalLead/externallead.model';
import { User } from '../User/user.model';
import { UserType } from '../User/user.types';
import { payerSites } from './credit.constant';
import { Credit } from './credit.model';
import { CreditStatus } from './credit.types';


// @ts-ignore
const creditRouter = new Router();

// Fetch all credits from a specific user
creditRouter.get('/credit', userAuthMiddleware, async (req, res) => {

  const user = req.user;

  const credits = await Credit.find({ userId: user._id, payer: { $ne: "FREE" } })

  const { totalCredits, paidCredits, unpaidCredits, totalIncome, pendingPayment, totalPaidCredits } = CreditsHelper.getCreditsInfo(credits)

  return res.status(200).send({
    totalCredits,
    paidCredits,
    unpaidCredits,
    totalIncome,
    pendingPayment,
    totalPaidCredits
  })


})

// Create new credit based on unique IP click
creditRouter.post(
  "/credit",
  [RequestMiddleware.getRequestIP],
  async (req, res) => {
    const { clientIp } = req;
    const { promoterId, payerId, lead } = req.body;

    // Try to fetch promoterId
    const user = await User.findOne({
      _id: promoterId,
    });

    if (!user) {
      return res.status(200).send({
        status: "error",
        message: TS.string(
          "credit",
          "creditPromoterUserNotFound"
        ),
      });
    }

    const isCreditAlreadyLoggedByThisUser = await Credit.exists({
      userId: user._id,
      referralIP: clientIp
    })


    if (isCreditAlreadyLoggedByThisUser) {
      return res.status(200).send({
        status: "error",
        message: TS.string(
          "user",
          "userClickAlreadyLogged"
        ),
      });
    }

    let payer;

    // fetch payer information
    if (!payerId) {
      payer = {
        id: -1,
        name: "FREE",
        ppc: 0
      }
    } else {
      // ! Gambiarra! I'm paying for seujobs credits because they're inactive for now and their link redirects to my groups
      if (payerId === 0 || payerId === 1) {
        payer = payerSites.find((p) => p.id === 0) // Emprego Urgente
      } else {
        payer = payerSites.find((p) => p.id === payerId)
      }
    }

    // if everything is ok and we have a new user, compute as new credit

    if (lead) {
      const newLead = new ExternalLead({
        ...lead
      })
      await newLead.save()
    }


    const newCredit = new Credit({
      userId: user._id,
      payer: payer.name,
      referralIP: clientIp,
      status: CreditStatus.UNPAID,
      value: payer.ppc,
      quantity: USER_PER_CLICK_CREDIT_MULTIPLIER
    })
    await newCredit.save();

    return res.status(200).send({
      status: "success",
      message: TS.string("user", "userClickComputed"),
    });
  }
);

creditRouter.get("/credit/user", [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {

  const { userEmail } = req.body

  const user = await User.findOne({
    email: userEmail,
  });

  if (!user) {
    return res.status(200).send({
      status: "error",
      message: "User not found"
    });
  }

  const credits = await Credit.find({ userId: user._id, payer: { $ne: "FREE" } })

  const { totalCredits, paidCredits, unpaidCredits, totalIncome, pendingPayment, totalPaidCredits } = CreditsHelper.getCreditsInfo(credits)

  return res.status(200).send({
    totalCredits,
    paidCredits,
    unpaidCredits,
    totalIncome,
    pendingPayment,
    totalPaidCredits
  })


})

creditRouter.get("/credit/all", [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {

  const credits = await Credit.find({ payer: { $ne: "FREE" } })

  const { totalCredits, paidCredits, unpaidCredits, totalIncome, pendingPayment, totalPaidCredits } = CreditsHelper.getCreditsInfo(credits)

  return res.status(200).send({
    totalCredits,
    paidCredits,
    unpaidCredits,
    totalIncome,
    pendingPayment,
    totalPaidCredits
  })


})


creditRouter.post("/credit/pay", [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {

  const { userEmail } = req.body;

  const user = await User.findOne({ email: userEmail });

  if (!user) {
    return res.status(200).send({
      status: "error",
      message: "User not found"
    })
  }

  const credits = await Credit.find({ userId: user._id, payer: { $ne: "FREE" } });

  let paidCredits = 0;
  let paidValue = 0;

  for (const credit of credits) {
    if (credit.status === CreditStatus.UNPAID) {
      credit.status = CreditStatus.PAID
      paidCredits += credit.quantity;
      paidValue += credit.quantity * credit.value
      await credit.save()
    }
  }


  return res.status(200).send({
    status: "success",
    message: `${paidCredits} credits paid (R$${paidValue}) to user ${user.email}  successfully`
  });

})


export { creditRouter }