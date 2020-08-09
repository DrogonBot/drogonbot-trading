import jwt from 'jsonwebtoken';

import { IUser, User } from '../resources/User/user.model';


export class MiddlewareHelper {

  public static getUserFromRequest = async (req) => {

    const token: string = req.header('Authorization').replace('Bearer ', ''); // remove Bearer string

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");

    // find an user with the correct id (passed through the token), that has the particular token stored.

    const user: IUser | null = await User.findOne({
      _id: decoded._id,
      'tokens.token': token
    });

    return { user, token };

  }



}