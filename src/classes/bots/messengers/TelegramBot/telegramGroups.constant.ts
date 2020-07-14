import { IChatChannel } from '../../types/whatsappbot.types';

export const telegramChannels: IChatChannel[] = [
  {
    name: "EmpregoUrgente.com ES",
    chatId: '@empregourgenteESc',
    stateCode: "ES",
  },
  {
    name: "EmpregoUrgente.com RJ",
    stateCode: "RJ",
    chatId: "@empregourgenteRJc"
  },
  {
    name: "EmpregoUrgente.com MG",
    stateCode: "MG",
    cities: ["Belo Horizonte"],
    chatId: '@empregourgenteMGc'
  },
  {
    name: "EmpregoUrgente.com MG",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    chatId: "@empregourgenteSPc"
  },
  // ! DEV TEST

  // {
  //   name: "EmpregoUrgente.com Dev",
  //   stateCode: "SP",
  //   cities: ["São Paulo", "Guarulhos"],
  //   chatId: "@empregourgentetest"
  // },
]