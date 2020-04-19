export interface IProxyItem {
  ip: string;
  port: string;
}

export enum PagePattern {
  ListAndInternalPosts = "ListAndInternalPost", // Example: https://es.olx.com.br/vagas-de-emprego
  Feed = "Feed" // Example: https://www.facebook.com/oportunidadesdeempregoes/
}

export interface ICrawlerFunctions {
  crawlLinksFunction?: (externalSource: string) => Promise<IScrapperLink[]>,
  crawlPageDataFunction?: (link: string) => any,
  crawlFeedFunction?: (link: string) => Promise<any>
}

export interface IBestMatchAndSector {
  jobRoleBestMatch: string,
  sector: string
}

export interface IScrapperLink {
  link: string,
  scrapped: boolean
}