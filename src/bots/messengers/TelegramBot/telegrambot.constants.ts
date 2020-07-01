import { ITelegramChannel } from '../../../typescript/telegrambot.types';

export const telegramChannels: ITelegramChannel[] = [
  {
    stateCode: "ES",
    city: "all",
    chatId: '@empregourgenteESc'
  },
  {
    stateCode: "RJ",
    city: "Rio de Janeiro",
    chatId: "@empregourgenteRJc"
  },
  {
    stateCode: "MG",
    city: "Belo Horizonte",
    chatId: '@empregourgenteMGc'
  },
  {
    stateCode: "SP",
    city: "São Paulo",
    chatId: "@empregourgenteSPc"
  },
  // ! DEV TEST
  // {
  //   stateCode: "SP",
  //   city: "São Paulo",
  //   chatId: "@empregourgentetest"
  // },
]