export const strings = {
  transactionError: {
    eng: 'Error while processing your transaction.',
    ptBr: "Erro ao processar sua transação."
  },
  transactionNoPayments: {
    eng: "No payments were made for this order so far...",
    ptBr: "Sem pagamentos para este pedido"
  },


  // INVOICE EMAIL ========================================

  invoiceNotificationSubject: {
    eng: "{{product}} - {{paymentMethod}} for payment",
    ptBr: "{{product}} - {{paymentMethod}} para pagamento"
  },
  invoiceNotificationGreetings: {
    eng: "Hi {{firstName}},",
    ptBr: "Oi {{firstName}},",
  },
  invoiceNotificationFirstPhrase: {
    eng: "Thanks for using our product! This is an invoice for your recent order.",
    ptBr: "Obrigado por usar nosso produto! Esta é uma fatura para seu pedido mais recente."
  },
  invoiceItemTitle: {
    eng: "Item:",
    ptBr: "Item:"
  },
  invoiceAmountDueTitle: {
    eng: "Amount Due:",
    ptBr: "Valor:"
  },
  invoiceDueByTitle: {
    eng: "Due By:",
    ptBr: "Vencimento:"
  },
  invoicePayCTA: {
    eng: "Pay Invoice",
    ptBr: "Pagar"
  },
  invoiceEndPhrase: {
    eng: `<p
    style="font-size: 16px; line-height: 1.625; color: #51545E; margin: .4em 0 1.1875em;"
  >
  If you have any questions about this invoice, simply reply to this email or reach out to our <a href="mailto:${process.env.SUPPORT_EMAIL}">support team</a> for help.
  </p>

  <p
  style="font-size: 16px; line-height: 1.625; color: #51545E; margin: .4em 0 1.1875em;"
>
Cheers, </br>
The [Product Name] Team
</p>`,
    ptBr: `
    <p
    style="font-size: 16px; line-height: 1.625; color: #51545E; margin: .4em 0 1.1875em;"
  >
  Se você tiver alguma dúvida sobre esta fatura, entre em contato com a <a href="mailto:${process.env.SUPPORT_EMAIL}"> equipe de suporte </a> para obter ajuda.
  </p>


  <p
  style="font-size: 16px; line-height: 1.625; color: #51545E; margin: .4em 0 1.1875em;"
>
Obrigado! </br>
Equipe [Product Name]
</p>
    `
  },

  notificationGreetings: {
    eng: "Hi {{firstName}},",
    ptBr: "Oi {{firstName}},",
  },
  notificationEndPhrase: {
    eng: "{{company}}'s Team",
    ptBr: "Equipe {{company}}"
  }





};
