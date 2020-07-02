import { IWhatsAppGroup } from '../../types/whatsappbot.types';


export const whatsAppGroups: IWhatsAppGroup[] = [

  // !DEV GROUP
  // {
  //   name: "EmpregoUrgente.com DEV",
  //   chatId: "17787897362-1593289812@g.us",
  //   stateCode: "SP",
  //   cities: ["São Paulo", "Guarulhos"],
  // },
  // {
  //   name: "EmpregoUrgente.com DEV 2",
  //   chatId: "17788467427-1593461051@g.us",
  //   stateCode: "ES",
  // },


  // ! ES GROUPS

  // ES Geral groups ========================================

  {
    name: "EmpregoUrgente.com ES #1",
    chatId: "17788467427-1579921785@g.us",
    stateCode: "ES"
  },

  {
    name: "EmpregoUrgente.com ES #2",
    chatId: "17788467427-1579921815@g.us",
    stateCode: "ES",
  },
  {
    name: "EmpregoUrgente.com ES #3",
    chatId: "17788467427-1579921841@g.us",
    stateCode: "ES",
  },
  {
    name: "EmpregoUrgente.com ES #4",
    chatId: "17788467427-1581563540@g.us",
    stateCode: "ES",
  },
  {
    name: "EmpregoUrgente.com ES #5",
    chatId: "17788467427-1582860331@g.us",
    stateCode: "ES",
  },
  {
    name: "EmpregoUrgente.com ES #6",
    chatId: "17788467427-1593200580@g.us",
    stateCode: "ES",
  },
  {
    name: "EmpregoUrgente.com ES #7",
    chatId: "17788467427-1593200947@g.us",
    stateCode: "ES",
  },

  // Niche groups ========================================
  {
    name: "Vagas Adm & Atend ES 1",
    chatId: "17788467427-1590869680@g.us",
    sectors: ["Administração", "Atendimento ao cliente", "Finanças, Ciências Contábeis, Estatística e Matemática"],
    stateCode: "ES",
    isNicheGroup: true,
  },
  {
    name: "Vagas Adm & Atend ES 2",
    chatId: "17788467427-1593220862@g.us",
    sectors: ["Administração", "Atendimento ao cliente", "Finanças, Ciências Contábeis, Estatística e Matemática"],
    stateCode: "ES",
    isNicheGroup: true,
    isLeaf: true
  },
  {
    name: "Vagas Estética - ES 1",
    chatId: "17788467427-1590869891@g.us",
    sectors: ["Beleza & Estética"],
    stateCode: "ES",
    isNicheGroup: true,
    isLeaf: true
  },
  {
    name: "Emprego Urgente - AdGroup",
    chatId: "5527999333180-1593282827@g.us",
    isPartnerGroup: true,
    jobRoles: [
      "Desenho Mecânico",
      "Caldeireiro",
      "Serralheiro",
      "Marceneiro",
      "Mecânico Industrial",
      "Projetista Mecânico",
      "Técnico Mecânico",
      "Técnico em Planejamento Projetista",
      "Inspetor",
      "Torneiro",
      "Fresador",
      "Maçariqueiro",
      "Ajustador",
      "Técnico de Suprimentos Engenheiro",
      "Mecânico",
      "Analista Mecânico",
      "Mecânico de Manutenção",
      "Operador de Máquinas Operatrizes",
      "Fiscal de Campo",
      "Forjador",
    ],
    stateCode: "ES",
    isNicheGroup: true
  },

  {
    name: "Constr, Indust, Log ES 1",
    chatId: "17788467427-1590870112@g.us",
    sectors: ["Desenho Industrial", "Decoração", "Engenharia", "Construção Civil", "Indústria, Offshore e Metalurgia", "Logística, Transporte e Operações"],
    stateCode: "ES",
    isNicheGroup: true,
    isLeaf: true
  },

  {
    name: "Saude, Limp, Cuidad ES 1",
    chatId: "17788467427-1590870214@g.us",
    sectors: ["Saúde & Cuidados", "Limpeza"],
    stateCode: "ES",
    isNicheGroup: true,
    isLeaf: true
  },
  {
    name: "Vagas Segur & Patr ES 1",
    chatId: "17788467427-1590870335@g.us",
    sectors: ["Segurança & Patrimônio"],
    stateCode: "ES",
    isNicheGroup: true,
    isLeaf: true
  },
  {
    name: "Vagas - Vend & Comer ES 1",
    chatId: "17788467427-1590870592@g.us",
    sectors: ["Vendas & Comércio"],
    stateCode: "ES",
    isNicheGroup: true,
    isLeaf: true
  },




  // ! SP GROUPS



  // General groups ========================================

  {
    name: "EmpregoUrgente.com SP #1",
    chatId: "17788467427-1579925753@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"]
  },
  {
    name: "EmpregoUrgente.com SP #2",
    chatId: "17788467427-1579925840@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"]
  },
  {
    name: "EmpregoUrgente.com SP #3",
    chatId: "17788467427-1581563654@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"]
  },
  {
    name: "EmpregoUrgente.com SP #4",
    chatId: "17788467427-1582860789@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"]
  },
  {
    name: "EmpregoUrgente.com SP #5",
    chatId: "17788467427-1592927861@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"]
  },
  {
    name: "EmpregoUrgente.com SP #6",
    chatId: "17788467427-1593035467@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"]
  },
  {
    name: "EmpregoUrgente.com SP #7",
    chatId: "17788467427-1593035676@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],

  },

  // SP Partners ========================================
  {
    name: "Vagas Emprego - SÃO PAULO",
    chatId: "5511959978310-1565321131@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Procurando Emprego",
    chatId: "5511959978310-1573681724@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Vagas ABCD Regiao de SP 1",
    chatId: "5511961113147-1513611054@g.us",
    stateCode: "SP",
    cities: ["Santo André", "São Bernardo do Campo", "São Caetano do Sul", "Diadema"],
    isPartnerGroup: true,
  },
  {
    name: "Vagas em geral",
    chatId: "5511959077348-1518726547@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Vagas de Empregos",
    chatId: "5511985552366-1524520567@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Vagas de emprego",
    chatId: "5511967318264-1488493401@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Empregos Grande Sao Paulo",
    chatId: "5511957623298-1504574473@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Vagas de emprego do dia 3",
    chatId: "5511981815440-1490633419@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Empregos Grande Sao Paulo",
    chatId: "5511960766830-1521741327@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },

  {
    name: "VAGAS DE EMPREGOS",
    chatId: "5519993548538-1497623042@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },

  {
    name: "Combine seu Emprego",
    chatId: "5511966165753-1498086073@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },

  {
    name: "EMPREGOS SÃO PAULO E ABC",
    chatId: "5511949355975-1530060358@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Juntos somos mais fortes",
    chatId: "5511999379600-1527117307@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Sao paulo emprega",
    chatId: "5511941376034-1485286433@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "VAGAS DE EMPREGO",
    chatId: "5511985492859-1516125660@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "FOCO NO EMPREGO 1",
    chatId: "5511992443665-1526830311@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "FOCO NO EMPREGO 2",
    chatId: "5511992443665-1526831821@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "FOCO NO EMPREGO 3",
    chatId: "5511977958024-1526852927@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "FOCO NO EMPREGO 4",
    chatId: "5511992443665-1526859820@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Empregos e servicos 1",
    chatId: "5511942485291-1487094310@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Empregos e servicos 2",
    chatId: "5511942485291-1487253638@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Empregos e servicos 5",
    chatId: "5511942485291-1496767314@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Vagas P/ SAO PAULO 1",
    chatId: "557187778372-1523411008@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Vagas P/ Sao Paulo",
    chatId: "557187778372-1523482883@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Empregos Curso e Concurso",
    chatId: "5511949371624-1485308744@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Recolocacao e Negocios",
    chatId: "5511997321026-1504531840@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Ha vagas de empregos",
    chatId: "5511959085755-1496358646@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Empregos 3 Empenhos",
    chatId: "5511954486362-1498652403@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Emprego.com",
    chatId: "5511953719003-1514412871@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Oportunidades SP",
    chatId: "5511984802014-1501719505@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "JOB.SP/GRUPO DE EMPREGOS",
    chatId: "5511999000672-1499907367@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Temos Vagas SP G7.",
    chatId: "5511947696989-1508354954@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Vagas de Emprego",
    chatId: "5511981688668-1514990913@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Anuncios de Emprego (2)",
    chatId: "5511959978310-1527005858@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Empregos",
    chatId: "5511976135457-1516719239@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Emprego em Geral",
    chatId: "5511976135457-1524077127@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "TriChat Vagas",
    chatId: "5511988777747-1520895313@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Anuncios de Emprego (3)",
    chatId: "5511959978310-1528859485@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Vagas de Empregos",
    chatId: "5511977655347-1555255014@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },
  {
    name: "Vagas de Emprego",
    chatId: "5511981688668-1514990913@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,
  },

  // SeuJobs
  {
    name: "Empregos SP 53",
    chatId: "5511933616045-1583519409@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,

  },
  {
    name: "Empregos SP 54",
    chatId: "5511933616045-1583764406@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,

  },
  {
    name: "Empregos SP 55",
    chatId: "5511933616045-1583785547@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,

  },
  {
    name: "Empregos SP 56",
    chatId: "558189131180-1583924550@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,

  },
  {
    name: "Empregos SP 57",
    chatId: "558189131180-1583924788@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,

  },
  {
    name: "Empregos SP 58",
    chatId: "558189131180-1583924945@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,

  },
  {
    name: "Empregos SP 59",
    chatId: "558189131180-1583925114@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,

  },
  {
    name: "Empregos SP 60",
    chatId: "558189131180-1583925278@g.us",
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isPartnerGroup: true,

  },

  // Niche groups ========================================

  {
    name: "Vagas Adm & Atend SP 1",
    chatId: "17788467427-1590871268@g.us",
    sectors: ["Administração", "Atendimento ao cliente", "Finanças, Ciências Contábeis, Estatística e Matemática"],
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isNicheGroup: true,
    isLeaf: true
  },
  {
    name: "Vagas Estética - SP 1",
    chatId: "17788467427-1590871415@g.us",
    sectors: ["Beleza & Estética"],
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isNicheGroup: true,
    isLeaf: true
  },
  {
    name: "Constr, Indust, Log SP 1",
    chatId: "17788467427-1590871529@g.us",
    sectors: ["Desenho Industrial", "Decoração", "Engenharia", "Construção Civil", "Indústria, Offshore e Metalurgia", "Logística, Transporte e Operações"],
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isNicheGroup: true,
    isLeaf: true
  },
  {
    name: "Vagas Segur & Patr SP 1",
    chatId: "17788467427-1590871845@g.us",
    sectors: ["Segurança & Patrimônio"],
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isNicheGroup: true,
    isLeaf: true
  },
  {
    name: "Vagas - Vend & Comer SP 1",
    chatId: "17788467427-1590871903@g.us",
    sectors: ["Vendas & Comércio"],
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isNicheGroup: true,
    isLeaf: true
  },
  {
    name: "Saude, Limp, Cuidad SP 1",
    chatId: "17788467427-1590872048@g.us",
    sectors: ["Saúde & Cuidados", "Limpeza"],
    stateCode: "SP",
    cities: ["São Paulo", "Guarulhos"],
    isNicheGroup: true,
    isLeaf: true
  },





  // ! MG GROUPS - BH

  // General groups ========================================

  {
    name: "EmpregoUrgente.com BH #1",
    chatId: "17788467427-1579939385@g.us",
    stateCode: "MG",
    cities: ["Belo Horizonte"]
  },
  {
    name: "EmpregoUrgente.com BH #1",
    chatId: "17788467427-1582860474@g.us",
    stateCode: "MG",
    cities: ["Belo Horizonte"]
  },
  {
    name: "EmpregoUrgente.com BH #3",
    chatId: "17788467427-1582860514@g.us",
    stateCode: "MG",
    cities: ["Belo Horizonte"]
  },
  {
    name: "EmpregoUrgente.com BH #4",
    chatId: "17788467427-1589328651@g.us",
    stateCode: "MG",
    cities: ["Belo Horizonte"]
  },
  {
    name: "EmpregoUrgente.com BH #5",
    chatId: "17788467427-1589328731@g.us",
    stateCode: "MG",
    cities: ["Belo Horizonte"],
  },

  // Niche groups ========================================

  {
    name: "Vagas Adm & Atend BH 1",
    chatId: "17788467427-1590872646@g.us",
    sectors: ["Administração", "Atendimento ao cliente", "Finanças, Ciências Contábeis, Estatística e Matemática"],
    stateCode: "MG",
    cities: ["Belo Horizonte"],
    isNicheGroup: true,
    isLeaf: true
  },
  {
    name: "Vagas Estética - BH 1",
    chatId: "17788467427-1590872676@g.us",
    sectors: ["Beleza & Estética"],
    stateCode: "MG",
    cities: ["Belo Horizonte"],
    isNicheGroup: true,
    isLeaf: true
  },
  {
    name: "Constr, Indust, Log BH 1",
    chatId: "17788467427-1590873489@g.us",
    sectors: ["Desenho Industrial", "Decoração", "Engenharia", "Construção Civil", "Indústria, Offshore e Metalurgia", "Logística, Transporte e Operações"],
    stateCode: "MG",
    cities: ["Belo Horizonte"],
    isNicheGroup: true,
    isLeaf: true
  },

  {
    name: "Saude, Limp, Cuidad BH 1",
    chatId: "17788467427-1590873718@g.us",
    sectors: ["Saúde & Cuidados", "Limpeza"],
    stateCode: "MG",
    cities: ["Belo Horizonte"],
    isNicheGroup: true,
    isLeaf: true
  },

  {
    name: "Vagas Segur & Patr BH 1",
    chatId: "17788467427-1590873815@g.us",
    sectors: ["Segurança & Patrimônio"],
    stateCode: "MG",
    cities: ["Belo Horizonte"],
    isNicheGroup: true,
    isLeaf: true
  },

  {
    name: "Vagas - Vend & Comer BH 1",
    chatId: "17788467427-1590873918@g.us",
    sectors: ["Vendas & Comércio"],
    stateCode: "MG",
    cities: ["Belo Horizonte"],
    isNicheGroup: true,
    isLeaf: true
  },


  // ! RJ GROUPS

  // General groups ========================================

  {
    name: "EmpregoUrgente.com RJ #1",
    chatId: "17788467427-1588872901@g.us",
    stateCode: "RJ",
    cities: ["Rio de Janeiro"]
  },
  {
    name: "EmpregoUrgente.com RJ #2",
    chatId: "17788467427-1588872966@g.us",
    stateCode: "RJ",
    cities: ["Rio de Janeiro"]
  },
  {
    name: "EmpregoUrgente.com RJ #3",
    chatId: "17788467427-1588872998@g.us",
    stateCode: "RJ",
    cities: ["Rio de Janeiro"]
  },

  // Partner groups ========================================
  {
    name: "Empregos RJ",
    chatId: "5511953229854-1581727129@g.us",
    stateCode: "RJ",
    cities: ["Rio de Janeiro"],
    isPartnerGroup: true,
  },

  // Niche groups ========================================

  {
    name: "Vagas Adm & Atend RJ 1",
    chatId: "17788467427-1590877892@g.us",
    sectors: ["Administração", "Atendimento ao cliente", "Finanças, Ciências Contábeis, Estatística e Matemática"],
    stateCode: "RJ",
    cities: ["Rio de Janeiro"],
    isNicheGroup: true,
    isLeaf: true
  },
  {
    name: "Vagas Estética - RJ 1",
    chatId: "17788467427-1590878024@g.us",
    sectors: ["Beleza & Estética"],
    stateCode: "RJ",
    cities: ["Rio de Janeiro"],
    isNicheGroup: true,
    isLeaf: true
  },

  {
    name: "Constr, Indust, Log RJ 1",
    chatId: "17788467427-1590878131@g.us",
    sectors: ["Desenho Industrial", "Decoração", "Engenharia", "Construção Civil", "Indústria, Offshore e Metalurgia", "Logística, Transporte e Operações"],
    stateCode: "RJ",
    cities: ["Rio de Janeiro"],
    isNicheGroup: true,
    isLeaf: true
  },

  {
    name: "Saude, Limp, Cuidad RJ 1",
    chatId: "17788467427-1590878222@g.us",
    sectors: ["Saúde & Cuidados", "Limpeza"],
    stateCode: "RJ",
    cities: ["Rio de Janeiro"],
    isNicheGroup: true,
    isLeaf: true
  },

  {
    name: "Vagas Segur & Patr RJ 1",
    chatId: "17788467427-1590878500@g.us",
    sectors: ["Segurança & Patrimônio"],
    stateCode: "RJ",
    cities: ["Rio de Janeiro"],
    isNicheGroup: true,
    isLeaf: true
  },

  {
    name: "Vagas - Vend & Comer RJ 1",
    chatId: "17788467427-1590878606@g.us",
    sectors: ["Vendas & Comércio"],
    stateCode: "RJ",
    cities: ["Rio de Janeiro"],
    isNicheGroup: true,
    isLeaf: true
  },






]