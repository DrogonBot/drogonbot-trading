


export class SubscriptionHelper {

  public static getSectorPremiumChance = (sector: string): number => {

    switch (sector) {
      case "Atendimento ao cliente":
      case "Administração":
        return 55

      case "Vendas & Comércio":
      case "Construção Civil":
      case "Alimentação & Restaurantes":
        return 45;

      case "Finanças, Ciências Contábeis, Estatística e Matemática":
        return 45;

      case "Logística, Transporte e Operações":
      case "Indústria, Offshore e Metalurgia":
      case "Engenharia":
      case "Comunicação & Marketing":
        return 45;

      case "Limpeza":
      case "Saúde & Cuidados":
      case "Segurança & Patrimônio":
      case "Farmácia":
        return 40;

      default:
        return 35;
    }

  }




}