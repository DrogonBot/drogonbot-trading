

export interface IWhatsAppGroup {
  name: string,
  chatId: string,
  stateCode: string,
  sectors?: string[],
  cities?: string[],
  jobRoles?: string[],
  isNicheGroup?: boolean,
  isLeaf?: boolean, // this tell us if we should stop posting that same post, when reaching this group
  isPartnerGroup?: boolean
}

