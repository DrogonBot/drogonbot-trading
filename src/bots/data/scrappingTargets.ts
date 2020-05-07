import { PostSource } from '../../resources/Post/post.types';
import { IScrappingTarget, TargetPriority } from '../types/bots.types';



export const scrappingTargets: IScrappingTarget[] = [

  // ! FACEBOOK ========================================

  // ES ========================================

  {
    name: "Facebook => Empregos ES",
    externalSource: "https://www.facebook.com/groups/empregoses/",
    priority: TargetPriority.High,
    dataOverride: {
      country: "Brazil",
      stateCode: "ES",
      city: "Vitória",
    },
    source: PostSource.Facebook
  },
  {
    name: "Facebook => Emprego ES",
    externalSource: "https://www.facebook.com/groups/470386613006396/",
    priority: TargetPriority.Medium,
    dataOverride: {
      country: "Brazil",
      stateCode: "ES",
      city: "Vitória",
    },
    source: PostSource.Facebook
  },
  {
    name: "Facebook => Emprego Urgente ES",
    externalSource: "https://www.facebook.com/groups/255725088176388",
    priority: TargetPriority.Low,
    dataOverride: {
      country: "Brazil",
      stateCode: "ES",
      city: "Vitória",
    },
    source: PostSource.Facebook
  },
  {
    name: "Vagas e Oportunidades ES",
    externalSource: "https://www.facebook.com/groups/jo.darc.13/",
    priority: TargetPriority.Medium,
    dataOverride: {
      country: "Brazil",
      stateCode: "ES",
      city: "Vitória",
    },
    source: PostSource.Facebook
  },
  {
    name: "Facebook => Gazeta Empregos ES",
    externalSource: "https://www.facebook.com/groups/2143865589172147/",
    priority: TargetPriority.Medium,
    dataOverride: {
      country: "Brazil",
      stateCode: "ES",
      city: "Vitória",
    },
    source: PostSource.Facebook
  },
  {
    name: "Facebook => Empregos Vila Velha",
    externalSource: "https://www.facebook.com/groups/1002682889820586/",
    priority: TargetPriority.Low,
    dataOverride: {
      country: "Brazil",
      stateCode: "ES",
      city: "Vila Velha",
    },
    source: PostSource.Facebook
  },
  {
    name: "Facebook => Empregos Guarapari",
    externalSource: "https://www.facebook.com/groups/145238849184087/",
    priority: TargetPriority.Low,
    dataOverride: {
      country: "Brazil",
      stateCode: "ES",
      city: "Guarapari",
    },
    source: PostSource.Facebook
  },
  // RJ ========================================

  {
    name: "Facebook => Emprego Ja RJ",
    externalSource: "https://www.facebook.com/groups/469601746456911/",
    priority: TargetPriority.Medium,
    dataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "Rio de Janeiro",
    },
    source: PostSource.Facebook
  },
  {
    name: "Facebook => Empregos RJ",
    externalSource: "https://www.facebook.com/groups/275875912532721/",
    priority: TargetPriority.Medium,
    dataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "Rio de Janeiro",
    },
    source: PostSource.Facebook
  },
  {
    name: "Facebook => Rio Empregos RJ",
    externalSource: "https://www.facebook.com/groups/329968764389737/",
    priority: TargetPriority.High,
    dataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "Rio de Janeiro",
    },
    source: PostSource.Facebook
  },
  {
    name: "Facebook => Empregos TI - RJ",
    externalSource: "https://www.facebook.com/groups/1606191799609992/",
    priority: TargetPriority.Low,
    dataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "Rio de Janeiro",
    },
    source: PostSource.Facebook
  },


  // SP ========================================

  {
    name: "Facebook => Grupo Vagas de Emprego Sao Paulo SP",
    externalSource: "https://www.facebook.com/groups/grupovagasdeempregosaopaulo",
    priority: TargetPriority.High, // Top group 589k members!
    dataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "São Paulo",
    },
    source: PostSource.Facebook
  },
  {
    name: "Facebook => Empregos SP",
    priority: TargetPriority.High,
    externalSource: "https://www.facebook.com/groups/empregosessp/",
    dataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "São Paulo",
    },
    source: PostSource.Facebook
  },
  {
    name: "Facebook => SP EMPREGO SAO PAULO",
    externalSource: "https://www.facebook.com/groups/Temostrampo/",
    priority: TargetPriority.Low,
    dataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "São Paulo",
    },
    source: PostSource.Facebook
  },
  {
    name: "Facebook => Grupo Vagas de Emprego Sao Paulo - SP",
    externalSource: "https://www.facebook.com/groups/508765489527560/",
    priority: TargetPriority.Low,
    dataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "São Paulo",
    },
    source: PostSource.Facebook
  },
  {
    name: "Facebook => Empregos em Osasco",
    externalSource: "https://www.facebook.com/groups/252483528524808/",
    priority: TargetPriority.Low,
    dataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "Osasco",
    },
    source: PostSource.Facebook
  },
  {
    name: "Facebook => Empregos Marilia - SP",
    externalSource: "https://www.facebook.com/groups/empregosmariliasp/",
    priority: TargetPriority.Medium,
    dataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "Marília",
    },
    source: PostSource.Facebook
  },

  {
    name: "Facebook => Ribeirao Preto",
    externalSource: "https://www.facebook.com/groups/923149231033037/",
    priority: TargetPriority.Medium,
    dataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "Ribeirão Preto",
    },
    source: PostSource.Facebook
  },

  // MG ========================================


  {
    name: "Facebook => Vagas de Empregos BH",
    externalSource: "https://www.facebook.com/groups/grupoempregosbh/",
    priority: TargetPriority.Medium,
    dataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Belo Horizonte",
    },
    source: PostSource.Facebook
  },
  {
    name: "Facebook => Empregos BH",
    externalSource: "https://www.facebook.com/groups/597673520276895/",
    priority: TargetPriority.Medium,
    dataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Belo Horizonte",
    },
    source: PostSource.Facebook
  },
  {
    name: "Facebook => Empregos em Belo Horizonte",
    externalSource: "https://www.facebook.com/groups/833818616764376/",
    priority: TargetPriority.Medium,
    dataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Belo Horizonte",
    },
    source: PostSource.Facebook
  },
  {
    name: "Facebook => Empregos Urgentes BH",
    externalSource: "https://www.facebook.com/groups/empregosbhmg/",
    priority: TargetPriority.Medium,
    dataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Belo Horizonte",
    },
    source: PostSource.Facebook
  },
  {
    name: "Facebook => Emprego BH",
    externalSource: "https://www.facebook.com/groups/557833854267297/",
    priority: TargetPriority.Medium,
    dataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Belo Horizonte",
    },
    source: PostSource.Facebook
  },
  {
    name: "Facebook => Melhor Emprego BH",
    externalSource: "https://www.facebook.com/groups/718029571552489/",
    priority: TargetPriority.Medium,
    dataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Belo Horizonte",
    },
    source: PostSource.Facebook
  },
  {
    name: "Facebook => Empregos de A&Z Extrema-MG e regiao",
    externalSource: "https://www.facebook.com/groups/963229973714703/",
    priority: TargetPriority.Low,
    dataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Extrema",
    },
    source: PostSource.Facebook
  },
  {
    name: "Facebook => Balcao de empregos - Betim MG",
    externalSource: "https://www.facebook.com/groups/1641409356177065/",
    priority: TargetPriority.Low,
    dataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Betim",
    },
    source: PostSource.Facebook
  },
  {
    name: "Facebook => Cambui - MG",
    externalSource: "https://www.facebook.com/groups/838499019528802",
    priority: TargetPriority.Low,
    dataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Cambuí",
    },
    source: PostSource.Facebook
  },

  // ! OLX ========================================

  // ES ========================================

  {
    name: "OLX => ES",
    externalSource: "https://es.olx.com.br/vagas-de-emprego?sf=1",
    priority: TargetPriority.High,
    dataOverride: {
      country: "Brazil",
      stateCode: "ES"
    },
    source: PostSource.OLX
  },
  {
    name: "OLX => Vitoria",
    externalSource: "https://es.olx.com.br/norte-do-espirito-santo/vitoria/vagas-de-emprego?sf=1",
    priority: TargetPriority.High,
    dataOverride: {
      country: "Brazil",
      stateCode: "ES",
      city: "Vitória"
    },
    source: PostSource.OLX
  },
  {
    name: "OLX => Vila Velha",
    externalSource: "https://es.olx.com.br/norte-do-espirito-santo/vila-velha/vagas-de-emprego?sf=1",
    priority: TargetPriority.High,
    dataOverride: {
      country: "Brazil",
      stateCode: "ES",
      city: "Vila Velha"
    },
    source: PostSource.OLX
  },
  {
    name: "OLX => Serra",
    externalSource: "https://es.olx.com.br/norte-do-espirito-santo/outras-cidades/serra/vagas-de-emprego?sf=1",
    priority: TargetPriority.High,
    dataOverride: {
      country: "Brazil",
      stateCode: "ES",
      city: "Serra"
    },
    source: PostSource.OLX
  },
  {
    name: "OLX => Cariacica",
    externalSource: "https://es.olx.com.br/norte-do-espirito-santo/outras-cidades/cariacica/vagas-de-emprego?f=p&sf=1",
    priority: TargetPriority.Low,
    dataOverride: {
      country: "Brazil",
      stateCode: "ES",
      city: "Cariacica"
    },
    source: PostSource.OLX
  },

  // RJ ========================================

  {
    name: "OLX => RJ/CAPITAL",
    externalSource: "https://rj.olx.com.br/vagas-de-emprego",
    priority: TargetPriority.High,
    dataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "Rio de Janeiro"
    },
    source: PostSource.OLX
  },
  {
    name: "OLX => RJ/Sao Goncalo",
    externalSource: "https://rj.olx.com.br/rio-de-janeiro-e-regiao/sao-goncalo/vagas-de-emprego",
    priority: TargetPriority.High,
    dataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "São Gonçalo"
    },
    source: PostSource.OLX
  },
  {
    name: "OLX => RJ/Campo Grande",
    externalSource: "https://rj.olx.com.br/rio-de-janeiro-e-regiao/zona-oeste/campo-grande/vagas-de-emprego",
    priority: TargetPriority.High,
    dataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "Campo Grande"
    },
    source: PostSource.OLX
  },
  {
    name: "OLX => RJ/Duque de Caxias",
    externalSource: "https://rj.olx.com.br/rio-de-janeiro-e-regiao/baixada-fluminense/duque-de-caxias/vagas-de-emprego",
    priority: TargetPriority.High,
    dataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "Duque de Caxias"
    },
    source: PostSource.OLX
  },
  {
    name: "OLX => RJ/Nova Iguacu",
    externalSource: "https://rj.olx.com.br/rio-de-janeiro-e-regiao/baixada-fluminense/nova-iguacu/vagas-de-emprego",
    priority: TargetPriority.High,
    dataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "Nova Iguaçu"
    },
    source: PostSource.OLX
  },
  {
    name: "OLX => RJ/Niteroi",
    externalSource: "https://rj.olx.com.br/rio-de-janeiro-e-regiao/niteroi/vagas-de-emprego",
    priority: TargetPriority.Medium,
    dataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "Niterói"
    },
    source: PostSource.OLX
  },
  {
    name: "OLX => RJ/Belford Roxo",
    externalSource: "https://rj.olx.com.br/rio-de-janeiro-e-regiao/baixada-fluminense/belford-roxo/vagas-de-emprego",
    priority: TargetPriority.Medium,
    dataOverride: {
      country: "Brazil",
      stateCode: "RJ",
      city: "Belford Roxo"
    },
    source: PostSource.OLX
  },


  // SP ========================================


  {
    name: "OLX => SP/CAPITAL",
    externalSource: "https://sp.olx.com.br/vagas-de-emprego",
    priority: TargetPriority.High,
    dataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "São Paulo"
    },
    source: PostSource.OLX
  },
  {
    name: "OLX => SP/Guarulhos",
    externalSource: "https://sp.olx.com.br/sao-paulo-e-regiao/outras-cidades/guarulhos/vagas-de-emprego",
    priority: TargetPriority.High,
    dataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "Guarulhos"
    },
    source: PostSource.OLX
  },
  {
    name: "OLX => SP/Campinas",
    externalSource: "https://sp.olx.com.br/grande-campinas/vagas-de-emprego",
    priority: TargetPriority.High,
    dataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "Campinas"
    },
    source: PostSource.OLX
  },
  {
    name: "OLX => SP/Sao bernardo do campo",
    externalSource: "https://sp.olx.com.br/sao-paulo-e-regiao/abcd/sao-bernardo-do-campo/vagas-de-emprego",
    priority: TargetPriority.High,
    dataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "São Bernardo do Campo"
    },
    source: PostSource.OLX
  },
  {
    name: "OLX => SP/Sao jose dos campos",
    externalSource: "https://sp.olx.com.br/vale-do-paraiba-e-litoral-norte/vale-do-paraiba/sao-jose-dos-campos/vagas-de-emprego",
    priority: TargetPriority.Low,
    dataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "São José dos Campos"
    },
    source: PostSource.OLX
  },
  {
    name: "OLX => SP/Santo andre",
    externalSource: "https://sp.olx.com.br/sao-paulo-e-regiao/abcd/santo-andre/vagas-de-emprego",
    priority: TargetPriority.Low,
    dataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "Santo André"
    },
    source: PostSource.OLX
  },
  {
    name: "OLX => SP/Ribeirao Preto",
    externalSource: "https://sp.olx.com.br/regiao-de-ribeirao-preto/vagas-de-emprego",
    priority: TargetPriority.Low,
    dataOverride: {
      country: "Brazil",
      stateCode: "SP",
      city: "Ribeirão Preto"
    },
    source: PostSource.OLX
  },

  // MG ========================================

  {
    name: "OLX => MG/BH",
    externalSource: "https://mg.olx.com.br/belo-horizonte-e-regiao/vagas-de-emprego",
    priority: TargetPriority.High,
    dataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Belo Horizonte",
    },
    source: PostSource.OLX
  },
  {
    name: "OLX => MG/Uberlandia",
    externalSource: "https://mg.olx.com.br/regiao-de-uberlandia-e-uberaba/triangulo-mineiro/uberlandia/vagas-de-emprego",
    priority: TargetPriority.High,
    dataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Uberlândia"
    },
    source: PostSource.OLX
  },
  {
    name: "OLX => MG/Contagem",
    externalSource: "https://mg.olx.com.br/belo-horizonte-e-regiao/grande-belo-horizonte/contagem/vagas-de-emprego",
    priority: TargetPriority.High,
    dataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Contagem"
    },
    source: PostSource.OLX
  },
  {
    name: "OLX => MG/Juiz de Fora",
    externalSource: "https://mg.olx.com.br/regiao-de-juiz-de-fora/vagas-de-emprego",
    priority: TargetPriority.Low,
    dataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Juiz de Fora"
    },
    source: PostSource.OLX
  },
  {
    name: "OLX => MG/Betim",
    externalSource: "https://mg.olx.com.br/belo-horizonte-e-regiao/grande-belo-horizonte/betim/vagas-de-emprego",
    priority: TargetPriority.Low,
    dataOverride: {
      country: "Brazil",
      stateCode: "MG",
      city: "Betim"
    },
    source: PostSource.OLX
  },
]

