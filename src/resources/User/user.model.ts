import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Model, model, Schema } from 'mongoose';

import { AccountEmailManager } from '../../emails/account.email';
import { MarketingEmailManager } from '../../emails/MarketingEmailManager';
import { GenericHelper } from '../../utils/GenericHelper';
import { MixpanelEvent, MixpanelHelper } from '../../utils/MixpanelHelper';
import { TextHelper } from '../../utils/TextHelper';
import { TS } from '../../utils/TS';
import { AuthType, IUserDocument, UserType } from './user.types';

/*#############################################################|
|  >>> MODEL FUNCTIONS (static, methods)
*##############################################################*/


// methods
export interface IUser extends IUserDocument {
  hashPassword: (string) => string;
  generateAuthToken: () => string;
  getFirstName: () => string
  toJSON: () => Object;
  registerUser: (req?: any) => { token: string };
}

// static methods
export interface IUserModel extends Model<IUser> {
  findByCredentials: (email: string, password: string) => any;
}

// Statics ========================================

export const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      trim: true
    },
    cpf: {
      type: String,
    },
    genericPositionsOfInterest: {
      type: [String],
      default: []
    },
    language: {
      type: String,
      trim: true,
      default: "ptBr"
    },
    country: {
      type: String,
      default: "Brazil"
    },
    stateCode: {
      type: String,
      default: "ES"
    },
    city: {
      type: String,
      default: "Vitória"
    },
    postalCode: {
      type: String,

    },
    street: {
      type: String,

    },
    streetNumber: {
      type: String,

    },
    streetNeighborhood: {
      type: String,

    },
    type: {
      type: String,
      default: UserType.JobSeeker
    },
    givenName: {
      type: String
    },
    familyName: {
      type: String
    },
    password: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      lowercase: true,
      trim: true
    },
    pushToken: {
      type: String
    },
    authType: { type: String, default: AuthType.EmailPassword },

    facebookId: {
      type: String
    },
    phone: {
      type: String
    },
    postReportItems: [
      {
        slug: String,
        title: String,
        jobRoles: [String],
        premiumOnly: Boolean
      }
    ],

    tokens: [
      // this will allow multi device sign in (different devices with different tokens)
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    avatar: {
      type: Buffer
    },
    avatarUrl: {
      type: String
    },
    lastNotification: {
      data: Object,
      visualized: Boolean
    },
    unsubscribed: Boolean,


    isPremium: {
      type: Boolean,
      default: false
    }

  },
  {
    timestamps: true
  }
);

// statics are methods that you add to your model, making it possible to access them anywhere

userSchema.statics.hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 8);
};

// methods create a normal method (instance needs to be declared). Statics functions, otherwise, doesn't need to be declared. It can be accessed directly through the model

// here we use function() instead of an arrow function because we need access to "this", that's not present on the later.

userSchema.methods.getFirstName = function (): string {
  return this.name.split(" ")[0]
}

userSchema.methods.registerUser = async function (req?) {
  const user = this;

  const token = await user.generateAuthToken();

  console.log(`User created: ${user.email}`);

  const accountEmailManager = new AccountEmailManager();


  // Register on mixpanel

  const splittedName = user.name.split(' ');

  const firstName = splittedName[0];
  const lastName = splittedName[splittedName.length - 1];

  try {
    MixpanelHelper.peopleSet(user._id, {
      $first_name: firstName,
      $last_name: lastName,
      $created: (new Date()).toISOString(),
      $email: user.email,
      type: user.type,
      authType: user.authType,
      IP: GenericHelper.getUserIp(req)
    })

    MixpanelHelper.track(MixpanelEvent.USER_REGISTER, {
      distinct_id: user._id
    })

  }
  catch (error) {
    console.log('Mixpanel: failed to register new user');
    console.error(error);

  }


  // Send transactional email

  await accountEmailManager.sendEmail(
    user.email,
    TS.string('user', 'newAccountEmailSubject', {
      userName: firstName,
      appName: process.env.APP_NAME
    }),
    "welcome",
    {
      name: TextHelper.capitalizeFirstLetter(user.name),
      userName: firstName,
      userEmail: user.email,
      support_email: process.env.SUPPORT_EMAIL,
      action_url: process.env.WEB_APP_URL,
      newAccountEmailFirstParagraph: TS.string('user', 'newAccountEmailFirstParagraph', {
        appName: process.env.APP_NAME
      }),
      newAccountEmailTitle: TS.string('user', 'newAccountEmailTitle', {
        firstName
      }),
      newAccountEmailForReference: TS.string('user', 'newAccountEmailForReference'),
      newAccountEmailBottom: TS.string('user', 'newAccountEmailBottom', {
        appName: process.env.APP_NAME
      }),
      newAccountWhatsAppGroup: TS.string('user', 'newAccountWhatsAppGroup')
    }
  );

  // register user on mailchimp

  const marketingEmailManager = new MarketingEmailManager();

  try {
    await marketingEmailManager.subscribe(user.email);
  } catch (error) {
    console.error(error);
    console.log("Failed to add new subscriber...");
  }

  return {
    token
  };
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  let token;
  if (process.env.JWT_SECRET) {
    token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  } else {
    throw new Error('Error while generating auth token')
  }


  // we can also pass an optional configuration object
  // const token = jwt.sign({ _id: user._id.toString() }, serverConfig.jwtSecret), { expiresIn: '7 days'});

  user.tokens = [...user.tokens, { token }];

  await user.save();

  return token;
};

// this will be fired whenever our model is converted to JSON!!

userSchema.methods.toJSON = function () {
  // this code will delete keys that shouldn't be displayed publicly

  const user = this;
  const userObject = user.toObject(); // convert Mongoose model to Object

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

userSchema.statics.findByCredentials = async (
  email: string,
  password: string
): Promise<string> => {
  const user: any = await User.findOne({ email });

  if (!user) {
    throw new Error(
      TS.string("user", "userNotFoundOnLogin")
    );
  }

  // if our provided password is equal to the stored password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error(
      TS.string("user", "userWrongPassword")
    );
  }

  return user; // return the user if everything is ok
};

/*#############################################################|
|  >>> MODEL MIDDLEWARES
*##############################################################*/

userSchema.pre("save", async function (next) {
  const user: any = this;

  // console.log('user :: middleware => Running pre "save" code');

  // this is the document being saved

  // check if password was modified (updated or created)
  if (user.isModified("password")) {
    user.password = await userSchema.statics.hashPassword(user.password);
  }

  next(); // proceed...
});

// model ========================================

const User: IUserModel = model<IUser, IUserModel>("User", userSchema);

export { User };
