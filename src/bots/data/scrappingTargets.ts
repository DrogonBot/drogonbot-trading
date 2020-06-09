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
import { ScrapperRecrutamentoInteligenteMG } from '../scrappers/ScrapperRecrutamentoInteligenteMG';
import { ScrapperRJEmpregosNet } from '../scrappers/ScrapperRJEmpregosNet';
import { ScrapperSeuJobs } from '../scrappers/ScrapperSeuJobs';
import { ScrapperSociiRH } from '../scrappers/ScrapperSociiRH';
import { ScrapperVagasDeEmpregoGV } from '../scrappers/ScrapperVagasDeEmpregoGV';
import { ScrapperVagasUrgentesMG } from '../scrappers/ScrapperVagasUrgentesMG';
import { IScrappingTarget, PagePattern, TargetPriority } from '../types/bots.types';



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
    redirectToSourceOnly: true
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
    bypassPostContentFilter: true
  },
  {
    name: "Blog => SociiRH Blog",
    externalSource: "https://sociisrh.doubt.com.br/",
    priority: TargetPriority.Medium,
    postDataOverride: {
      country: "Brazil",
      stateCode: "MG",
    },
    source: PostSource.Blog,
    pagePattern: PagePattern.ListAndInternalPosts,
    scrapperClass: ScrapperSociiRH,
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
    bypassPostContentFilter: true
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
    bypassPostContentFilter: true
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

