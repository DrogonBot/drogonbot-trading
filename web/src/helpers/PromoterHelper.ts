import { IUser } from '../types/User.types';

export class PromoterHelper {
  public static getShareableLink = (user: IUser) => {
    let payerId: number;

    switch (user.stateCode) {
      case "SP":
        payerId = 1; // Seu Jobs
        return `https://emprego-urgente.netlify.app/?stateCode=${user.stateCode}&promoterId=${user._id}&payerId=${payerId}&ro=true`;

      default:
        payerId = 0; // Emprego Urgente
        return `https://emprego-urgente.netlify.app/?stateCode=${user.stateCode}&promoterId=${user._id}&payerId=${payerId}&ro=true`;
    }
  };
}
