import { Router } from 'express';

import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { RequestMiddleware } from '../../middlewares/request.middleware';
import { UserMiddleware } from '../../middlewares/user.middleware';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
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
    const { promoterId, lead } = req.body;
    const payerId = Number(req.body.payerId)

    console.log("req.body");
    console.log(req.body);

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
      ConsoleHelper.coloredLog(ConsoleColor.BgYellow, ConsoleColor.FgWhite, `🤖: Warning: User ${user.name}/${user.email} is trying to log new credits for the same IP! (${clientIp})`)

      return res.status(200).send({
        status: "error",
        message: TS.string(
          "user",
          "userClickAlreadyLogged"
        ),
      });
    } else {

      // ! Lets log credits for this user

      let payer;

      // fetch payer information
      if (payerId === undefined || payerId === null) {
        payer = {
          id: -1,
          name: "FREE",
          ppc: 0
        }
      } else {

        // payer = payerSites.find((p) => p.id === payerId)

        // ! Gambiarra! I'm paying for seujobs credits because they're inactive for now and their link redirects to my groups
        payer = (payerId === 0 || payerId === 1) ? payerSites.find((p) => p.id === 0) : payerSites.find((p) => p.id === payerId);
      }


      const newCredit = new Credit({
        userId: user._id,
        payer: payer.name,
        referralIP: clientIp,
        status: CreditStatus.UNPAID,
        value: payer.ppc,
        quantity: 1
      })
      await newCredit.save();

      // if everything is ok and we have a new user, compute as new credit

      if (lead && newCredit) {
        const newLead = new ExternalLead({
          ...lead,
          owner: payer.name
        })
        await newLead.save()
      }


      ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: Computing new credit for user: ${user.name} (${user.email} - Payer: ${payer.name} - value: ${newCredit.value * newCredit.quantity} - referralIP: ${newCredit.referralIP})`)

      return res.status(200).send({
        status: "success",
        message: TS.string("user", "userClickComputed"),
      });
    }


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