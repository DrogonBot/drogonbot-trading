import { PostSource } from '../../resources/Post/post.types';
import { ScrapperAGazetaEmpregosES } from '../scrappers/ScrapperAGazetaEmpregosES';
import { ScrapperBHJobs } from '../scrappers/ScrapperBHJobs';
import { ScrapperCaptativaSP } from '../scrappers/ScrapperCaptativaSP';
import { ScrapperCBDVMG } from '../scrappers/ScrapperCBDVMG';
import { ScrapperEmpregoPortasAbertasMG } from '../scrappers/ScrapperEmpregoPortasAbertasMG';
import { ScrapperEmpregosES } from '../scrappers/ScrapperEmpregosES';
import { ScrapperEmpregosMG } from '../scrappers/ScrapperEmpregosMG';
import { ScrapperEmpregosSaoPaulo } from '../scrappers/ScrapperEmpregosSaoPaulo';
import { ScrapperEmpregosSaoPauloRegioes } from '../scrappers/ScrapperEmpregosSaoPauloRegioes';
import { ScrapperGlobalEmpregosSP } from '../scrappers/ScrapperGlobalEmpregosSP';
import { ScrapperGrupoResolveSP } from '../scrappers/ScrapperGrupoResolveSP';
import { ScrapperMaisVagasES } from '../scrappers/ScrapperMaisVagasES';
import { ScrapperOLX } from '../scrappers/ScrapperOLX';
import { ScrapperParceriaSocialDeEmpregos } from '../scrappers/ScrapperParceriaSocialDeEmpregos';
import { ScrapperQuatreMG } from '../scrappers/ScrapperQuatreMG';
import { ScrapperRandstad } from '../scrappers/ScrapperRandstad';
import { ScrapperRecrutamentoInteligenteMG } from '../scrappers/ScrapperRecrutamentoInteligenteMG';
import { ScrapperRJEmpregosNet } from '../scrappers/ScrapperRJEmpregosNet';
import { ScrapperSeuJobs } from '../scrappers/ScrapperSeuJobs';
import { ScrapperSociiRHMG } from '../scrappers/ScrapperSociiRHMG';
import { ScrapperVagasDeEmpregoGV } from '../scrappers/ScrapperVagasDeEmpregoGV';
import { ScrapperVagasUrgentesMG } from '../scrappers/ScrapperVagasUrgentesMG';
import { IScrappingTarget, PagePattern, TargetPriority } from '../types/bots.types';
import { ScrapperTrabalhaBrasil } from './../scrappers/ScrapperTrabalhaBrasil';
import { ScrapperVeroRH } from './../scrappers/ScrapperVeroRHSP';



export const scrappingTargets: IScrappingTarget[] = [

  // ! ALL ============================================

  {
    name: "Blog => Seu Jobs",
    externalSource: "https://www.seujobs.com/",
    priority: TargetPriority.High,
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperSeuJobs,
    bypassPostContentFilter: true,
    redirectToSourceOnly: true,
    postDataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "São Paulo"
    },
  },

  // MG ========================================

  {
    name: "Blog => Vagas Urgentes MG",
    externalSource: "https://www.vagasurgentesmg.com.br/",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "MG",
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperVagasUrgentesMG,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "Blog => SociiRH Blog MG",
    externalSource: "https://sociisrh.doubt.com.br/",
    priority: TargetPriority.Medium,
    postDataOverride: {
      country: "Brazil",
      stateCode: "MG",
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperSociiRHMG,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "Blog => CBDV BH",
    externalSource: "https://cbdv.com.br/",
    priority: TargetPriority.Medium,
    postDataOverride: {
      country: "Brazil",
      stateCode: "MG",
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperCBDVMG,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "BH Jobs",
    externalSource: "https://www.bhjobs.com.br/",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "MG"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperBHJobs,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "Empregos Portas Abertas BH",
    externalSource: "https://www.empregoportasabertas.com/",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "MG"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperEmpregoPortasAbertasMG,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "Blog => Empregos MG",
    externalSource: "https://www.empregosmg.com.br/",
    priority: TargetPriority.Medium,
    postDataOverride: {
      country: "Brazil",
      stateCode: "MG",
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperEmpregosMG,
    bypassPostContentFilter: true
  },
  {
    name: "Blog => Recrutamento Inteligente MG",
    externalSource: "https://vagas.recrutamentointeligente.net/",
    priority: TargetPriority.Medium,
    postDataOverride: {
      country: "Brazil",
      stateCode: "MG",
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperRecrutamentoInteligenteMG,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "Quattre RH - MG",
    externalSource: "https://www.quatre.com.br/oportunidades/",
    priority: TargetPriority.Medium,
    postDataOverride: {
      country: "Brazil",
      stateCode: "MG",
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperQuatreMG,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },



  // ! OLX ========================================

  // ES ========================================
  {
    name: "Randstad - ES",
    externalSource: "https://www.randstad.com.br/empregos/espirito-santo/",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "ES",
      city: "Vitória"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperRandstad,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "TrabalhaBrasil - ES - Vitoria",
    externalSource: "https://www.trabalhabrasil.com.br/vagas-empregos-em-vitoria-es",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "ES",
      city: "Vitória"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperTrabalhaBrasil,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "TrabalhaBrasil - ES - Vila Velha",
    externalSource: "https://www.trabalhabrasil.com.br/vagas-empregos-em-vila-velha-es",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "ES",
      city: "Vila Velha"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperTrabalhaBrasil,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "TrabalhaBrasil - ES - Serra",
    externalSource: "https://www.trabalhabrasil.com.br/vagas-empregos-em-serra-es",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "ES",
      city: "Serra"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperTrabalhaBrasil,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "TrabalhaBrasil - ES - Cariacica",
    externalSource: "https://www.trabalhabrasil.com.br/vagas-empregos-em-cariacica-es",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "ES",
      city: "Cariacica"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperTrabalhaBrasil,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "TrabalhaBrasil - ES - Viana",
    externalSource: "https://www.trabalhabrasil.com.br/vagas-empregos-em-viana-es",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "ES",
      city: "Viana"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperTrabalhaBrasil,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "A Gazeta Empregos ES",
    externalSource: "https://www.agazetaempregos.com.br/",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "ES"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperAGazetaEmpregosES,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "Empregos ES",
    externalSource: "https://empregoses.com.br/category/noticias-de-vagas/",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "ES"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperEmpregosES,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "Mais Vagas ES",
    externalSource: "https://maisvagases.com.br/",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "ES"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperMaisVagasES,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "Vagas de Emprego GV",
    externalSource: "https://vagasdeempregogv.com.br/categoria/vagas/",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "ES"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperVagasDeEmpregoGV,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "OLX => ES",
    externalSource: "https://es.olx.com.br/vagas-de-emprego?sf=1",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "ES"
    },
    source: PostSource.OLX,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperOLX
  },
  {
    name: "OLX => Vitoria",
    externalSource: "https://es.olx.com.br/norte-do-espirito-santo/vitoria/vagas-de-emprego?sf=1",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "ES",
      city: "Vitória"
    },
    source: PostSource.OLX,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperOLX
  },
  {
    name: "OLX => Vila Velha",
    externalSource: "https://es.olx.com.br/norte-do-espirito-santo/vila-velha/vagas-de-emprego?sf=1",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "ES",
      city: "Vila Velha"
    },
    source: PostSource.OLX,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperOLX
  },
  {
    name: "OLX => Serra",
    externalSource: "https://es.olx.com.br/norte-do-espirito-santo/outras-cidades/serra/vagas-de-emprego?sf=1",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "ES",
      city: "Serra"
    },
    source: PostSource.OLX,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperOLX
  },
  {
    name: "OLX => Cariacica",
    externalSource: "https://es.olx.com.br/norte-do-espirito-santo/outras-cidades/cariacica/vagas-de-emprego?f=p&sf=1",
    priority: TargetPriority.Low,
    postDataOverride: {
      country: "Brazil",
      stateCode: "ES",
      city: "Cariacica"
    },
    source: PostSource.OLX,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperOLX
  },

  // RJ ========================================
  {
    name: "Randstad - RJ",
    externalSource: "https://www.randstad.com.br/empregos/rio-de-janeiro/",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "Rio de Janeiro"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperRandstad,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "TrabalhaBrasil - RJ - Rio de Janeiro",
    externalSource: "https://www.trabalhabrasil.com.br/vagas-empregos-em-rio-de-janeiro-rj",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "Rio de Janeiro"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperTrabalhaBrasil,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "TrabalhaBrasil - RJ - São Gonçalo",
    externalSource: "https://www.trabalhabrasil.com.br/vagas-empregos-em-sao-goncalo-rj",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "São Gonçalo"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperTrabalhaBrasil,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },

  {
    name: "TrabalhaBrasil - RJ - Duque de Caxias",
    externalSource: "https://www.trabalhabrasil.com.br/vagas-empregos-em-duque-de-caxias-rj",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "Duque de Caxias"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperTrabalhaBrasil,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "TrabalhaBrasil - RJ - Nova Iguacu",
    externalSource: "https://www.trabalhabrasil.com.br/vagas-empregos-em-nova-iguacu-rj",
    priority: TargetPriority.Low,
    postDataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "Nova Iguaçu"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperTrabalhaBrasil,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "TrabalhaBrasil - RJ - Niteroi",
    externalSource: "https://www.trabalhabrasil.com.br/vagas-empregos-em-niteroi-rj",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "Niterói"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperTrabalhaBrasil,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "TrabalhaBrasil - RJ - Belford Roxo",
    externalSource: "https://www.trabalhabrasil.com.br/vagas-empregos-em-belford-roxo-rj",
    priority: TargetPriority.Low,
    postDataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "Belford Roxo"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperTrabalhaBrasil,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },

  {
    name: "Blog => Rj Empregos Net",
    externalSource: "https://rjempregos.net/",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "RJ",
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperRJEmpregosNet,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "OLX => RJ/CAPITAL",
    externalSource: "https://rj.olx.com.br/vagas-de-emprego",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "Rio de Janeiro"
    },
    source: PostSource.OLX,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperOLX
  },
  {
    name: "OLX => RJ/Sao Goncalo",
    externalSource: "https://rj.olx.com.br/rio-de-janeiro-e-regiao/sao-goncalo/vagas-de-emprego",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "São Gonçalo"
    },
    source: PostSource.OLX,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperOLX
  },
  {
    name: "OLX => RJ/Campo Grande",
    externalSource: "https://rj.olx.com.br/rio-de-janeiro-e-regiao/zona-oeste/campo-grande/vagas-de-emprego",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "Campo Grande"
    },
    source: PostSource.OLX,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperOLX
  },
  {
    name: "OLX => RJ/Duque de Caxias",
    externalSource: "https://rj.olx.com.br/rio-de-janeiro-e-regiao/baixada-fluminense/duque-de-caxias/vagas-de-emprego",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "Duque de Caxias"
    },
    source: PostSource.OLX,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperOLX
  },
  {
    name: "OLX => RJ/Nova Iguacu",
    externalSource: "https://rj.olx.com.br/rio-de-janeiro-e-regiao/baixada-fluminense/nova-iguacu/vagas-de-emprego",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "Nova Iguaçu"
    },
    source: PostSource.OLX,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperOLX
  },
  {
    name: "OLX => RJ/Niteroi",
    externalSource: "https://rj.olx.com.br/rio-de-janeiro-e-regiao/niteroi/vagas-de-emprego",
    priority: TargetPriority.Medium,
    postDataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "Niterói"
    },
    source: PostSource.OLX,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperOLX
  },
  {
    name: "OLX => RJ/Belford Roxo",
    externalSource: "https://rj.olx.com.br/rio-de-janeiro-e-regiao/baixada-fluminense/belford-roxo/vagas-de-emprego",
    priority: TargetPriority.Medium,
    postDataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "Belford Roxo"
    },
    source: PostSource.OLX,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperOLX
  },


  // SP ========================================

  {
    name: "Randstad - SP",
    externalSource: "https://www.randstad.com.br/empregos/sao-paulo/",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "São Paulo"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperRandstad,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "TrabalhaBrasil - SP",
    externalSource: "https://www.trabalhabrasil.com.br/vagas-empregos-em-sao-paulo-sp/",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "São Paulo"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperTrabalhaBrasil,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },

  {
    name: "TrabalhaBrasil - SP - Guarulhos",
    externalSource: "https://www.trabalhabrasil.com.br/vagas-empregos-em-guarulhos-sp",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "Guarulhos"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperTrabalhaBrasil,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "TrabalhaBrasil - SP - Campinas",
    externalSource: "https://www.trabalhabrasil.com.br/vagas-empregos-em-campinas%2C-sp-",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "Campinas"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperTrabalhaBrasil,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "TrabalhaBrasil - SP - Sao Bernardo do Campo",
    externalSource: "https://www.trabalhabrasil.com.br/vagas-empregos-em-sao-bernardo-do-campo-sp",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "São Bernardo do Campo"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperTrabalhaBrasil,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "TrabalhaBrasil - SP - Sao Jose dos Campos",
    externalSource: "https://www.trabalhabrasil.com.br/vagas-empregos-em-sao-jose-dos-campos-sp",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "São José dos Campos"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperTrabalhaBrasil,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "TrabalhaBrasil - SP - Santo Andre",
    externalSource: "https://www.trabalhabrasil.com.br/vagas-empregos-em-santo-andre-sp",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "Santo André"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperTrabalhaBrasil,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "TrabalhaBrasil - SP - Ribeirao Preto",
    externalSource: "https://www.trabalhabrasil.com.br/vagas-empregos-em-ribeirao-preto-sp",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "Ribeirão Preto"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperTrabalhaBrasil,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },


  {
    name: "Blog => Captativa RH",
    externalSource: "https://jobs.quickin.io/captativa/jobs/",
    priority: TargetPriority.Low,
    postDataOverride: {
      country: "Brazil",
      stateCode: "SP"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperCaptativaSP,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "Global Empregos - SP",
    externalSource: "https://www.globalempregos.com.br/vagas-de-emprego/sao-paulo/",
    priority: TargetPriority.Medium,
    postDataOverride: {
      country: "Brazil",
      stateCode: "SP"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperGlobalEmpregosSP,
    bypassPostContentFilter: true,
    fixEncoding: true,
    isTrustableSource: true
  },
  {
    name: "VeroRH - SP",
    externalSource: "http://www.verorh.com.br/consulta-vagas/",
    priority: TargetPriority.Medium,
    postDataOverride: {
      country: "Brazil",
      stateCode: "SP",
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperVeroRH,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "Grupo Resolve RH",
    externalSource: "https://www.gruporesolve.com.br/consultarvagas_2.asp",
    priority: TargetPriority.Medium,
    postDataOverride: {
      country: "Brazil",
      stateCode: "SP"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperGrupoResolveSP,
    bypassPostContentFilter: true,
    fixEncoding: true,
    isTrustableSource: true
  },
  {
    name: "Blog => Empregos Sao Paulo e Regioes",
    externalSource: "http://empregossaopauloeregioes.blogspot.com/",
    priority: TargetPriority.Medium,
    postDataOverride: {
      country: "Brazil",
      stateCode: "SP"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperEmpregosSaoPauloRegioes,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "Blog => Empregos Sao Paulo",
    externalSource: "https://empregossaopaulo.com.br/",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "SP"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperEmpregosSaoPaulo,
    bypassPostContentFilter: true
  },
  {
    name: "Blog => Parceria Social de Empregos",
    externalSource: "http://parceriasocialdeempregos.com.br/",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "SP"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperParceriaSocialDeEmpregos,
    bypassPostContentFilter: true
  },
  {
    name: "OLX => SP/CAPITAL",
    externalSource: "https://sp.olx.com.br/vagas-de-emprego",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "São Paulo"
    },
    source: PostSource.OLX,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperOLX
  },
  {
    name: "OLX => SP/Guarulhos",
    externalSource: "https://sp.olx.com.br/sao-paulo-e-regiao/outras-cidades/guarulhos/vagas-de-emprego",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "Guarulhos"
    },
    source: PostSource.OLX,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperOLX
  },
  {
    name: "OLX => SP/Campinas",
    externalSource: "https://sp.olx.com.br/grande-campinas/vagas-de-emprego",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "Campinas"
    },
    source: PostSource.OLX,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperOLX
  },
  {
    name: "OLX => SP/Sao bernardo do campo",
    externalSource: "https://sp.olx.com.br/sao-paulo-e-regiao/abcd/sao-bernardo-do-campo/vagas-de-emprego",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "São Bernardo do Campo"
    },
    source: PostSource.OLX,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperOLX
  },
  {
    name: "OLX => SP/Sao jose dos campos",
    externalSource: "https://sp.olx.com.br/vale-do-paraiba-e-litoral-norte/vale-do-paraiba/sao-jose-dos-campos/vagas-de-emprego",
    priority: TargetPriority.Low,
    postDataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "São José dos Campos"
    },
    source: PostSource.OLX,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperOLX
  },
  {
    name: "OLX => SP/Santo andre",
    externalSource: "https://sp.olx.com.br/sao-paulo-e-regiao/abcd/santo-andre/vagas-de-emprego",
    priority: TargetPriority.Low,
    postDataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "Santo André"
    },
    source: PostSource.OLX,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperOLX
  },
  {
    name: "OLX => SP/Ribeirao Preto",
    externalSource: "https://sp.olx.com.br/regiao-de-ribeirao-preto/vagas-de-emprego",
    priority: TargetPriority.Low,
    postDataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "Ribeirão Preto"
    },
    source: PostSource.OLX,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperOLX
  },

  // MG ========================================

  {
    name: "Randstad - MG",
    externalSource: "https://www.randstad.com.br/empregos/minas-gerais/",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Belo Horizonte"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperRandstad,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "TrabalhaBrasil - MG - BH",
    externalSource: "https://www.trabalhabrasil.com.br/vagas-empregos-em-belo-horizonte-mg",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Belo Horizonte"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperTrabalhaBrasil,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "TrabalhaBrasil - MG - Uberlandia",
    externalSource: "https://www.trabalhabrasil.com.br/vagas-empregos-em-uberlandia-mg",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Uberlândia"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperTrabalhaBrasil,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "TrabalhaBrasil - MG - Contagem",
    externalSource: "https://www.trabalhabrasil.com.br/vagas-empregos-em-contagem-mg",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Contagem"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperTrabalhaBrasil,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "TrabalhaBrasil - MG - Juiz de Fora",
    externalSource: "https://www.trabalhabrasil.com.br/vagas-empregos-em-juiz-de-fora-mg",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Juiz de Fora"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperTrabalhaBrasil,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },
  {
    name: "TrabalhaBrasil - MG - Betim",
    externalSource: "https://www.trabalhabrasil.com.br/vagas-empregos-em-betim-mg",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Betim"
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperTrabalhaBrasil,
    bypassPostContentFilter: true,
    isTrustableSource: true
  },


  {
    name: "OLX => MG/BH",
    externalSource: "https://mg.olx.com.br/belo-horizonte-e-regiao/vagas-de-emprego",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Belo Horizonte",
    },
    source: PostSource.OLX,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperOLX
  },
  {
    name: "OLX => MG/Uberlandia",
    externalSource: "https://mg.olx.com.br/regiao-de-uberlandia-e-uberaba/triangulo-mineiro/uberlandia/vagas-de-emprego",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Uberlândia"
    },
    source: PostSource.OLX,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperOLX
  },
  {
    name: "OLX => MG/Contagem",
    externalSource: "https://mg.olx.com.br/belo-horizonte-e-regiao/grande-belo-horizonte/contagem/vagas-de-emprego",
    priority: TargetPriority.High,
    postDataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Contagem"
    },
    source: PostSource.OLX,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperOLX
  },
  {
    name: "OLX => MG/Juiz de Fora",
    externalSource: "https://mg.olx.com.br/regiao-de-juiz-de-fora/vagas-de-emprego",
    priority: TargetPriority.Low,
    postDataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Juiz de Fora"
    },
    source: PostSource.OLX,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperOLX
  },
  {
    name: "OLX => MG/Betim",
    externalSource: "https://mg.olx.com.br/belo-horizonte-e-regiao/grande-belo-horizonte/betim/vagas-de-emprego",
    priority: TargetPriority.Low,
    postDataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Betim"
    },
    source: PostSource.OLX,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperOLX
  },
]

