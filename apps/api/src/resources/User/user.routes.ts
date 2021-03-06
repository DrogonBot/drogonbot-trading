import { EncryptionHelper, MixpanelEvent, MixpanelHelper, RouterHelper, TextHelper } from '@drogonbot/helpers';
import { AuthType, ILoginData, UserType } from '@drogonbot/types';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { readFileSync } from 'fs';
import { OAuth2Client } from 'google-auth-library';
import _ from 'lodash';
import multer from 'multer';
import randomstring from 'randomstring';
import sharp from 'sharp';

import { GenericEmailManager } from '../../emails/GenericEmailManager';
import { TS } from '../../libs/TS';
import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { RequestMiddleware } from '../../middlewares/request.middleware';
import { UserMiddleware } from '../../middlewares/user.middleware';
import { Log } from '../Log/log.model';
import { User } from './user.model';

// @ts-ignore
const userRouter = new Router();

// load auth middleware for adding into specific routes!

/*#############################################################|
|  >>> PUBLIC ROUTES
*##############################################################*/

// User => get users

userRouter.get("/users/search/:keyword", async (req, res) => {
  const { keyword } = req.params;

  console.log(`Searching for ${keyword}`);

  const users = await User.find({
    name: { $regex: keyword, $options: "i" },
  });

  // show only user name and id (for obvious security reasons!)
  const publicUsers = users.map((user) =>
    _.pick(user, ["name", "_id", "type", "avatarUrl"])
  );

  return res.status(200).send(publicUsers);
});

userRouter.get("/policy/ptbr", async (req, res) => {
  const data = readFileSync(
    `./src/public/pages/policy_ptbr.html`,
    "utf-8"
  ).toString();

  return res.status(200).send(data);
});

userRouter.get("/policy", async (req, res) => {
  const data = readFileSync(
    `./src/public/pages/policy.html`,
    "utf-8"
  ).toString();

  return res.status(200).send(data);
});

// userRouter.get("/unsubscribe", async (req, res) => {
//   const { hashEmail, lang } = req.query;

//   const encryptionHelper = new EncryptionHelper();
//   const email = encryptionHelper.decrypt(hashEmail);

//   console.log(`unsubscribing email ${email}`);

//   // try to find a lead or email with this data, and unsubscribe it

//   const user = await User.findOne({ email });

//   if (user) {
//     user.unsubscribed = true;

//     await user.save();
//   } else {
//     const lead = await Lead.findOne({ email });

//     if (lead) {
//       lead.unsubscribed = true;
//       await lead.save();
//     }
//   }

//   const data = readFileSync(
//     `./src/public/pages/unsubscribe_${lang}.html`,
//     "utf-8"
//   ).toString();

//   return res.status(200).send(data);
// });

// Authentication ========================================

// User => Logger ========================================

userRouter.get("/users/log/test", userAuthMiddleware, async (req, res) => {
  const { user } = req;

  const log = new Log({
    action: "Test action",
    emitter: user._id,
    target: user._id,
  });
  await log.save();

  return res.status(200).send({
    status: "success",
    message: "Log saved",
  });
});

// User => Login (default email/password route)

userRouter.post("/users/login", async (req, res) => {
  const { email, password }: ILoginData = req.body;

  const preparedEmail = TextHelper.stringPrepare(email);

  console.log(`logging user: ${preparedEmail}`);

  try {
    const user = await User.findByCredentials(preparedEmail, password);
    const token = await user.generateAuthToken();

    MixpanelHelper.track(MixpanelEvent.USER_LOGIN, {
      distinct_id: user._id,
    });

    return res.status(200).send({
      user,
      token,
    });
  } catch (error) {
    res.status(400).send({
      error: error.toString(),
    });
  }
});

// User => Google OAuth login
userRouter.post("/users/login/google-oauth", async (req, res) => {
  const { idToken, appClientId, language, type } = req.body;

  console.log("Google OAuth Login");

  const client = new OAuth2Client();

  const verify = async () => {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: appClientId,
    });
    const payload: any = ticket.getPayload();

    // const userid = payload.sub;
    // If request specified a G Suite domain:
    // const domain = payload['hd'];

    // Check if user does not exists. If it already exists, just return token.
    const foundUser = await User.findOne({
      email: payload.email,
    });

    if (!foundUser) {
      // if it doesnt exist in our database, create new one.

      console.log("User not found... creating new one!");

      let user;

      try {
        const emailAlreadyExists = await User.findOne({ email: payload.email });

        if (emailAlreadyExists) {
          return res.status(400).send({
            status: "error",
            message: TS.string(
              "user",
              "userEmailAlreadyRegistered"
            ),
          });
        }
      } catch (error) {
        console.error(error);
      }

      try {
        user = new User({
          name: payload.name,
          givenName: payload.given_name,
          familyName: payload.family_name,
          avatarUrl: payload.picture,
          authType: AuthType.GoogleOAuth,
          email: payload.email,
          language,
          type,
        });

        console.log(payload);

        await user.save();
      } catch (error) {
        console.log(error);

        return res.status(400).send({
          status: "error",
          message: TS.string(
            "user",
            "userFailedLoginOAuth"
          ),
          details: error.message,
        });
      }

      const { token } = await user.registerUser(req);

      return res.status(201).send({
        user,
        token,
      });
    } else {
      // if he does exist, let's just login...

      console.log("User was found, sending back current info!");

      MixpanelHelper.track(MixpanelEvent.USER_LOGIN, {
        distinct_id: foundUser._id,
      });

      const token = await foundUser.generateAuthToken();

      return res.status(200).send({
        user: foundUser,
        token,
      });
    }
  };
  verify().catch((error) => {
    return res.status(400).send({
      status: "error",
      message: TS.string("user", "userFailedLoginOAuth"),
      details: error.message,
    });
  });

  // Validate idToken
});
// User => Facebook OAuth login
userRouter.post("/users/login/facebook-oauth", async (req, res) => {
  const { accessToken, language, type } = req.body;

  console.log("Facebook - OAuth - Login");

  // do a request do get user information based on this access token provided

  const response = await axios.get(
    `https://graph.facebook.com/me?fields=id,email,first_name,last_name,name,name_format,picture,short_name&access_token=${accessToken}`
  );

  const payload = response.data;

  console.log(payload);

  const foundUser = await User.findOne({
    facebookId: payload.id,
    email: payload.email,
  });

  // Check if user does not exists. If it already exists, just return token.

  if (!foundUser) {
    // if it doesnt exist in our database (through facebook auth only!), create new one.

    console.log("User not found... creating new one!");

    let user;

    try {
      const emailAlreadyExists = await User.findOne({ email: payload.email });

      if (emailAlreadyExists) {
        return res.status(400).send({
          status: "error",
          message: TS.string(
            "user",
            "userEmailAlreadyRegistered"
          ),
        });
      }
    } catch (error) {
      console.error(error);
    }

    try {
      user = new User({
        facebookId: payload.id,
        name: payload.name,
        givenName: payload.first_name,
        familyName: payload.last_name,
        avatarUrl: payload.picture.data.url,
        authType: AuthType.FacebookOAuth,
        email: payload.email,
        language,
        type,
      });

      await user.save();
    } catch (error) {
      return res.status(400).send({
        status: "error",
        message: TS.string(
          "user",
          "userFailedLoginOAuth"
        ),
        details: error.message,
      });
    }

    const { token } = await user.registerUser(req);

    return res.status(201).send({
      user,
      token,
    });
  } else {
    // if he does exist, let's just login...

    console.log("User was found, sending back current info!");

    MixpanelHelper.track(MixpanelEvent.USER_LOGIN, {
      distinct_id: foundUser._id,
    });

    const token = await foundUser.generateAuthToken();

    return res.status(200).send({
      user: foundUser,
      token,
    });
  }
});

// User => Reset password ========================================

// This is the route that the user will submit a post request from the App with his e-mail, receiving a password reset link that should be clicked
userRouter.post("/users/reset-password", async (req, res) => {
  const { email } = req.body;

  const encryptionHelper = new EncryptionHelper();

  // generate encrypted email
  const encryptedEmail = encryptionHelper.encrypt(email);

  const randomPassword = randomstring.generate({
    length: 12,
    charset: "alphanumeric",
  });

  const encryptedPassword = encryptionHelper.encrypt(randomPassword);

  const user: any = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(400).send({
      status: "error",
      message: TS.string("user", "userNotFound"),
    });
  }

  MixpanelHelper.track(MixpanelEvent.USER_RESET_PASSWORD, {
    distinct_id: user._id,
  });

  // if user is found, let's send him an email with a reset password link

  const genericEmailManager = new GenericEmailManager();

  genericEmailManager.sendEmail(
    user.email,
    `${TextHelper.capitalizeFirstLetter(user.name)}, reset your password`,
    "password-reset",
    {
      name: TextHelper.capitalizeFirstLetter(user.name),
      action_url: `${process.env.WEB_APP_URL}/users/reset-password/link?ecem=${encryptedEmail}&p=${encryptedPassword}`,
      new_password: randomPassword,
    }
  );

  return res.status(200).send({
    status: "success",
    message: TS.string(
      "user",
      "userForgotPasswordResetLink"
    ),
  });
});

// This is the route that actually changes the user's password to a random one
userRouter.get("/users/reset-password/link", async (req, res) => {
  const { ecem, p } = req.query;

  const encryptionHelper = new EncryptionHelper();
  const email = encryptionHelper.decrypt(ecem);
  const newPassword = encryptionHelper.decrypt(p);

  console.log(`User ${email} changed its password`);

  const user = await User.findOne({
    email,
  });

  if (user) {
    MixpanelHelper.track(MixpanelEvent.USER_RESET_PASSWORD_LINK, {
      distinct_id: user._id,
    });
  }

  if (!user) {
    return res.status(401).send({
      status: "error",
      message: "User not found!",
    });
  }

  user.password = newPassword;

  await user.save();

  const data = readFileSync(
    `${process.env.TEMPLATES_FOLDER}/password-reset-confirmation/content.html`,
    "utf-8"
  ).toString();

  return res.status(200).send(data);
});

// User => Sign Up
userRouter.post(
  "/users",
  RequestMiddleware.allowedRequestKeys([
    "name",
    "email",
    "password",
    "passwordConfirmation",
    "type",
    "language",
    "stateCode",
    "country",
    "city",
    "genericPositionsOfInterest",
    "accountBalance",
    "accountNotionalBalance"
  ]),
  async (req, res) => {
    const {
      name,
      email,
      password,
      passwordConfirmation,
      language,
      type,
      stateCode,
      city,
    } = req.body;

    if (stateCode && stateCode === "default") {
      return res.status(400).send({
        status: "error",
        message: TS.string(
          null,
          "globalInvalidValueForField",
          {
            invalidField: TS.string(
              "resume",
              "genericProvince"
            ),
          }
        ),
      });
    }

    if (city && city === "default") {
      return res.status(400).send({
        status: "error",
        message: TS.string(
          null,
          "globalInvalidValueForField",
          {
            invalidField: TS.string(
              "resume",
              "genericCity"
            ),
          }
        ),
      });
    }

    try {
      if (password !== passwordConfirmation) {
        return res.status(400).send({
          status: "error",
          message: TS.string(
            "user",
            "userPasswordConfirmationDontMatch"
          ),
        });
      }

      // force lowercase and trim
      const preparedEmail = TextHelper.stringPrepare(email);

      const emailAlreadyExists = await User.findOne({ email: preparedEmail });

      if (emailAlreadyExists) {
        console.log("Email already exists");

        return res.status(400).send({
          status: "error",
          message: TS.string(
            "user",
            "userEmailAlreadyRegistered"
          ),
        });
      }

      const user = new User({
        ...req.body,
        email: preparedEmail,
      });

      await user.save();

      const { token } = await user.registerUser(req);

      return res.status(201).send({
        user,
        token,
      });
    } catch (error) {
      res.status(500).send({
        status: "error",
        message: TS.string("user", "userCreationError"),
        details: error.message,
      });
    }
  }
);

userRouter.post(
  "/users/push-notification",
  userAuthMiddleware,
  async (req, res) => {
    const { user } = req;
    const { pushToken } = req.body;

    try {
      user.pushToken = pushToken;
      await user.save();

      return res.status(200).send({
        status: "success",
        message: TS.string(
          "user",
          "userPushNotificationSaveSuccess"
        ),
      });
    } catch (error) {
      console.error(error);
      return res.status(400).send({
        status: "error",
        message: TS.string(
          "user",
          "userPushNotificationSaveError"
        ),
        details: error.message,
      });
    }
  }
);

// Authentication routes ========================================

// User ==> Logout
userRouter.post("/users/logout", userAuthMiddleware, async (req, res) => {
  const { user } = req;
  const reqToken = req.token;

  MixpanelHelper.track(MixpanelEvent.USER_LOGOUT, {
    distinct_id: user._id,
  });

  try {
    // remove the token that's being used for the user from our user tokens array in our database
    user.tokens = user.tokens.filter((tokenObj) => tokenObj.token !== reqToken);

    console.log(`Logging out user: ${user.email}`);

    await user.save(); // save user model to update records

    return res.status(200).send({
      status: "success",
      message: TS.string("user", "userLogoutSuccess"),
    });
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: TS.string("user", "userLogoutError"),
      details: error.message,
    });
  }
});

// User ==> Logout all connected devices

userRouter.post("/users/logout/all", userAuthMiddleware, async (req, res) => {
  const { user } = req;

  try {
    user.tokens = [];

    await user.save();

    return res.status(200).send({
      status: "success",
      message: TS.string("user", "userLogoutAllSuccess"),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: TS.string("user", "userLogoutAllError"),
      details: error.message,
    });
  }
});

// User ==> Upload profile picture

const upload = multer({
  // multer (upload library) configuration

  limits: {
    fileSize: 1000000, // 1.000.000 bytes = 1 mb
  },
  fileFilter(req, file, cb) {
    // file type restriction

    console.log(`received file ${file.originalname}`);

    if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
      // reject file callback
      return cb(
        new Error(
          TS.string(
            "user",
            "userErrorFileUploadFormat",
            {
              format: "png or jpg",
            }
          )
        )
      );
    }

    cb(undefined, true); // acccept file callback
  },
});

// !upload-key should match postman's form-data key. set key as 'file' instead of text
userRouter.post(
  "/profile/avatar",
  [userAuthMiddleware, upload.single("avatar")],
  async (req, res) => {
    console.log("uploading your file...");

    // here we're saving the file directly in our database
    const { user } = req;
    const { buffer } = req.file;

    // Let's use sharp library to change the file (crop, change format, etc)

    const editedImageBuffer = await sharp(buffer)
      .resize({
        width: 250,
        height: 250,
      })
      .png()
      .toBuffer();

    user.avatar = editedImageBuffer;
    await user.save();

    return res.status(200).send({
      status: "success",
      message: TS.string("user", "userAvatarUploaded"),
    });
  },
  (error, req, res, next) => {
    return res.status(500).send({
      status: "error",
      message: TS.string(
        "user",
        "userAvatarErrorUpload"
      ),
      details: error.message,
    });
  }
);

// CRUD routes ========================================

// User => Serve avatar picture ========================================

userRouter.get("/user/:id/profile", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      return res.status(500).send({
        status: "error",
        message: TS.string(
          "user",
          "userAvatarUploadEmpty"
        ),
      });
    }

    res.set("Content-Type", "image/png");

    return res.send(user.avatar);
  } catch (error) {
    return res.status(404).send();
  }
});

// User => Delete avatar picture ========================================

userRouter.delete("/users/profile/me", userAuthMiddleware, async (req, res) => {
  try {
    const { user } = req;

    user.avatar = undefined;
    user.save();

    return res.status(200).send({
      status: "success",
      message: TS.string(
        "user",
        "userAvatarUploadDeleted"
      ),
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: TS.string(
        "user",
        "userAvatarUploadDeletedError"
      ),
      details: error.message,
    });
  }
});

userRouter.get("/users/profile", userAuthMiddleware, async (req, res) => {
  const { user } = req;
  const reqToken = req.token;

  try {
    return res.status(200).send({
      user,
      token: reqToken,
    }); // req.user is coming from the authMiddleware
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: TS.string("user", "userProfileGetError"),
      details: error.message,
    });
  }
});

userRouter.post("/users/change-password", async (req, res) => {
  const { email, currentPassword, newPassword, repeatNewPassword } = req.body;
  let user;

  const preparedEmail = TextHelper.stringPrepare(email);

  try {
    user = await User.findByCredentials(preparedEmail, currentPassword);

    if (user) {
      MixpanelHelper.track(MixpanelEvent.USER_CHANGE_PASSWORD, {
        distinct_id: user._id,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      status: "error",
      message: TS.string(
        "user",
        "userInvalidCredentials"
      ),
    });
  }

  // check if received password is equal our current stored password

  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    return res.status(400).send({
      status: "error",
      message: TS.string(
        "user",
        "userCurrentPasswordIncorrect"
      ),
    });
  }

  // Check if new passwords matches

  if (newPassword !== repeatNewPassword) {
    return res.status(400).send({
      status: "error",
      message: TS.string(
        "user",
        "userNewPasswordsDoesntMatch"
      ),
    });
  }

  // Update user password and send confirmation message

  user.password = newPassword;

  await user.save();

  return res.status(200).send({
    status: "success",
    message: TS.string(
      "user",
      "userPasswordChangedSuccess"
    ),
  });
});

/*#############################################################|
|  >>> ADMIN ONLY ROUTES
*##############################################################*/

userRouter.get(
  "/users",
  [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)],
  async (req, res) => {
    const users = await User.find({});

    return res.status(200).send(users);
  }
);

// User ==> Delete an account

userRouter.delete(
  "/users/:id",
  [
    userAuthMiddleware,
    (req, res, next) => {
      UserMiddleware.restrictUserType(UserType.Admin);
    },
  ],
  async (req, res) => {
    let user;

    const { id } = req.params;

    user = await User.findOne({
      _id: id,
    });

    try {
      await user.remove();

      return res.status(200).send(user);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "error",
        message: TS.string("user", "userDeleteError"),
        details: error.message,
      });
    }
  }
);

userRouter.patch("/users/me", [userAuthMiddleware], async (req, res) => {
  const { user } = req;

  // check if keys are allowed to be updated
  if (
    !RouterHelper.checkRequestKeysAllowed(req.body, [
      "genericPositionsOfInterest",
      "type",
      "lastNotification",
      "stateCode",
      "country",
      "city",
      "professionalArea",
      "phone",
    ])
  ) {
    return res.status(400).send({
      status: "error",
      message: TS.string(
        "user",
        "userPatchForbiddenKeys"
      ),
    });
  }

  // if our keys to be updated are allowed, proceed!
  try {
    const updatePayload = req.body;

    // update user keys
    Object.entries(updatePayload).map(([key, value]) => {
      user[key] = value;
    });

    await user.save();
    return res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

userRouter.patch(
  "/users/:id",
  [
    userAuthMiddleware,
    (req, res, next) => {
      UserMiddleware.restrictUserType(UserType.Admin);
    },
  ],
  async (req, res) => {
    const updates = Object.keys(req.body);

    if (!RouterHelper.checkRequestKeysAllowed(req.body, ["name", "email"])) {
      return res.status(400).send({
        status: "error",
        message: TS.string(
          "user",
          "userPatchForbiddenKeys"
        ),
      });
    }
    try {
      let user;

      const { id } = req.params;

      user = await User.findOne({
        _id: id,
      });

      if (!user) {
        return res.status(400).send({
          status: "error",
          message: TS.string("user", "userNotFound"),
        });
      }

      // update every key on the user object
      updates.forEach((update) => {
        user[update] = req.body[update];
      });
      await user.save();

      // const user = await User.findByIdAndUpdate(id, req.body, {
      //   new: true, //return updated user
      //   runValidators: true //run our standard validators on update
      // });

      return res.status(200).send(user);
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        status: "error",
        message: TS.string("user", "userFailedUpdate"),
        details: error.message,
      });
    }
  }
);

// userRouter.post(
//   "/users/consume-credit",
//   [userAuthMiddleware],
//   async (req, res) => {
//     const user: IUser | null = req.user;

//     // update user credits
//     if (user) {
//       // check if the user has credits
//       if (!user.credits || user.credits <= 0) {
//         return res.status(200).send({
//           status: "error",
//           message: TS.string(
//             "user",
//             "userCreditsInsuficient"
//           ),
//         });
//       }

//       // if user has credits, proceed
//       try {
//         user.credits -= 1;
//         await user.save();

//         // Log in the system

//         const creditConsumption = new Log({
//           emitter: user._id,
//           action: "USER_CREDIT_CONSUMED",
//           target: user.credits,
//         });
//         await creditConsumption.save();

//         return res.status(200).send({
//           status: "success",
//           message: TS.string(
//             "user",
//             "userCreditsConsumedSuccess"
//           ),
//         });
//       } catch (error) {
//         console.error(error);
//         return res.status(200).send({
//           status: "error",
//           message: TS.string("user", "userCreditsError"),
//         });
//       }
//     } else {
//       return res.status(200).send({
//         status: "error",
//         message: TS.string(
//           "user",
//           "userNotFoundByToken"
//         ),
//       });
//     }
//   }
// );



export { userRouter };
