import axios from 'axios';
import express from 'express';
import pagseguro from 'pagseguro';
import xml2Js from 'xml2js';

/*#############################################################|
|  >>> PROTECTED ROUTES
*##############################################################*/

// @ts-ignore
const paymentRouter = new express.Router();


// ! This route is triggered by our payment provider (Pagseguro), whenever a transaction occurs
paymentRouter.post("/payment/notification/", async (req, res) => {


  const { notificationCode, notificationType } = req.body;

  console.log(notificationCode);
  console.log(notificationType);

  // Now, lets do a request to fetch this transaction info

  const response = await axios({
    method: "GET",
    url: `${process.env.PAGSEGURO_API_URL}/v2/transactions/notifications/${notificationCode}?email=${process.env.PAGSEGURO_SELLER_EMAIL}&token=${process.env.PAGSEGURO_SELLER_TOKEN}`
  })

  const parsedXml = await xml2Js.parseStringPromise(response.data)

  console.log(parsedXml);


  return res.status(200).send({
    status: 'ok'
  })
});


paymentRouter.get('/payment/checkout', async (req, res) => {

  const pag = new pagseguro({
    email: process.env.PAGSEGURO_SELLER_EMAIL,
    token: process.env.PAGSEGURO_SELLER_TOKEN,
    mode: "sandbox"
  })
  console.log(process.env.PAGSEGURO_SELLER_EMAIL);
  console.log(process.env.PAGSEGURO_SELLER_TOKEN);

  pag.currency("BRL");
  pag.reference("12345")

  pag.addItem({
    id: 1,
    description: 'Descrição do primeiro produto',
    amount: "19.99",
    quantity: 3,
    weight: 2342
  });


  // Configurando as informações do comprador
  pag.buyer({
    name: 'José Comprador',
    email: 'testador@sandbox.pagseguro.com.br',
    phoneAreaCode: '51',
    phoneNumber: '12345678'
  });

  // Configurando a entrega do pedido

  pag.shipping({
    type: 1,
    street: 'Rua Alameda dos Anjos',
    number: '367',
    complement: 'Apto 307',
    district: 'Parque da Lagoa',
    postalCode: '01452002',
    city: 'São Paulo',
    state: 'RS',
    country: 'BRA'
  });

  // Enviando o xml ao pagseguro
  pag.send(async (err, pagResponse) => {
    if (err) {
      console.log(err);
    }


    const parsedXml = await xml2Js.parseStringPromise(pagResponse)

    console.log(parsedXml);

    const checkoutCode = parsedXml.checkout.code;

    const paymentUrl = `${process.env.PAGSEGURO_REDIRECT_CHECKOUT_URL}?code=${checkoutCode}`

    return res.status(200).send({
      checkoutCode,
      paymentUrl
    })


  });





})



export { paymentRouter };