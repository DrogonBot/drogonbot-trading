import { Router } from 'express';

import { USER_PER_CLICK_CREDIT_MULTIPLIER } from '../../constants/credits.constant';
import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { RequestMiddleware } from '../../middlewares/request.middleware';
import { UserMiddleware } from '../../middlewares/user.middleware';
import { CreditsHelper } from '../../utils/CreditsHelper';
import { TS } from '../../utils/TS';
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
    const { promoterId, payerId } = req.body;

    const user = await User.findOne({
      _id: promoterId,
    });

    if (!user) {
      return res.status(200).send({
        status: "error",
        message: TS.string(
          "user",
          "userNotFoundByToken"
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

    // if everything is ok and we have a new user, compute as new credit

    // fetch payer information
    let payer = payerSites.find((p) => p.id === Number(payerId))

    if (!payer) {
      payer = {
        id: -1,
        name: "FREE",
        ppc: 0
      }
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