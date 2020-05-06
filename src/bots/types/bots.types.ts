import { PostSource } from '../../resources/Post/post.types';

export interface ICredential {
  login: string,
  password: string
}

export interface IScrappingTarget {
  name: string;
  externalSource: string;
  dataOverride: any;
  source: PostSource;
  priority: TargetPriority
}

export enum TargetPriority {
  High = 2,
  Medium = 1,
  Low = 0
}

export enum ProxyType {
  FreeProxy,
  ZenScrape
}

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

export interface IBotAvailableGroups {
  stateCode: string,
  groups: string[]
}

export interface IBot {
  name: string,
  email: string,
  password: string,
  availableGroups: IBotAvailableGroups[],
  randomPosts: string[]
}