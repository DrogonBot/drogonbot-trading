import { IUser } from '../types/User.types';

export class PromoterHelper {
  public static getShareableLink = (user: IUser) => {
    let payerId: number;

    // payerId = 1; // Seu Jobs
    // return `https://emprego-urgente.netlify.app/?stateCode=SP&promoterId=${user._id}&payerId=${payerId}&ro=true`;

    payerId = 0; // Emprego Urgente
    return `https://emprego-urgente.netlify.app/?stateCode=${user.stateCode}&promoterId=${user._id}&payerId=${payerId}&ro=true`;

    // switch (user.stateCode) {
    //   case "SP":
    //     payerId = 1; // Seu Jobs
    //     return `https://emprego-urgente.netlify.app/?stateCode=${user.stateCode}&promoterId=${user._id}&payerId=${payerId}&ro=true`;

    //   default:
    //     payerId = 0; // Emprego Urgente
    //     return `https://emprego-urgente.netlify.app/?stateCode=${user.stateCode}&promoterId=${user._id}&payerId=${payerId}&ro=true`;
    // }
  };
}
