import { useRouter } from 'next/router';

import { PageBody, PageContainer } from '../components/elements/common/layout';
import { Footer } from '../components/pages/index/Footer';
import { Header } from '../components/pages/index/Header/Header';
import { SearchTop } from '../components/pages/posts/SearchTop';
import { appEnv } from '../constants/Env.constant';
import { loadCountryProvinces } from '../store/actions/form.actions';
import { IProvince } from '../types/Form.types';
import { AvailableLanguages } from '../types/Global.types';

interface IProps {
  provinces: IProvince[];
}

const Privacy = ({ provinces }: IProps) => {
  const router = useRouter();

  const { language } = router.query;

  const onRenderPrivacyText = () => {
    switch (language) {
      case AvailableLanguages.eng:
        return (
          <>
            <h1>PRIVACY POLICY</h1>
            <p>
              This Privacy Policay describes how your personal information is
              collected, used, and shared when you visit or make a purchase from
              https://empregourgente.com (the “Site”).
            </p>
            <h2>PERSONAL INFORMATION WE COLLECT</h2>
            <p>
              When you visit the Site, we automatically collect certain
              information about your device, including information about your
              web browser, IP address, time zone, and some of the cookies that
              are installed on your device. Additionally, as you browse the
              Site, we collect information about the individual web pages or
              products that you view, what websites or search terms referred you
              to the Site, and information about how you interact with the Site.
              We refer to this automatically-collected information as “Device
              Information.”
            </p>
            <h3>
              We collect Device Information using the following technologies:
            </h3>
            <p>
              - “Cookies” are data files that are placed on your device or
              computer and often include an anonymous unique identifier. For
              more information about cookies, and how to disable cookies, visit
              http://www.allaboutcookies.org. - “Log files” track actions
              occurring on the Site, and collect data including your IP address,
              browser type, Internet service provider, referring/exit pages, and
              date/time stamps. - “Web beacons,” “tags,” and “pixels” are
              electronic files used to record information about how you browse
              the Site.
            </p>
            <p>
              Additionally when you make a purchase or attempt to make a
              purchase through the Site, we collect certain information from
              you, including your name, billing address, shipping address,
              payment information (including credit card numbers ), email
              address, and phone number. We refer to this information as “Order
              Information.” When we talk about “Personal Information” in this
              Privacy Policy, we are talking both about Device Information and
              Order Information.
            </p>
            <h2>HOW DO WE USE YOUR PERSONAL INFORMATION?</h2>
            <p>
              We use the Order Information that we collect generally to fulfill
              any orders placed through the Site (including processing your
              payment information, arranging for shipping, and providing you
              with invoices and/or order confirmations). Additionally, we use
              this Order Information to: Communicate with you; Screen our orders
              for potential risk or fraud; and When in line with the preferences
              you have shared with us, provide you with information or
              advertising relating to our products or services. We use the
              Device Information that we collect to help us screen for potential
              risk and fraud (in particular, your IP address), and more
              generally to improve and optimize our Site (for example, by
              generating analytics about how our customers browse and interact
              with the Site, and to assess the success of our marketing and
              advertising campaigns).
            </p>
            <h2>SHARING YOUR PERSONAL INFORMATION</h2>
            <p>
              We share your Personal Information with third parties to help us
              use your Personal Information, as described above. We use Google
              Analytics to help us understand how our customers use the
              Site--you can read more about how Google uses your Personal
              Information here:
              https://www.google.com/intl/en/policies/privacy/. You can also
              opt-out of Google Analytics here:
              https://tools.google.com/dlpage/gaoptout.
            </p>
            <p>
              Finally, we may also share your Personal Information to comply
              with applicable laws and regulations, to respond to a subpoena,
              search warrant or other lawful request for information we receive,
              or to otherwise protect our rights.
            </p>
            <p>
              As described above, we use your Personal Information to provide
              you with targeted advertisements or marketing communications we
              believe may be of interest to you. For more information about how
              targeted advertising works, you can visit the Network Advertising
              Initiative’s (“NAI”) educational page at
              http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.
            </p>
            <p>
              You can opt out of targeted advertising by: FACEBOOK -
              https://www.facebook.com/settings/?tab=ads GOOGLE -
              https://www.google.com/settings/ads/anonymous BING -
              https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads
              Additionally, you can opt out of some of these services by
              visiting the Digital Advertising Alliance’s opt-out portal at:
              http://optout.aboutads.info/.
            </p>
            <h2>DO NOT TRACK</h2>
            <p>
              Please note that we do not alter our Site’s data collection and
              use practices when we see a Do Not Track signal from your browser.
            </p>
            <h2>YOUR RIGHTS</h2>
            <p>
              If you are a European resident, you have the right to access
              personal information we hold about you and to ask that your
              personal information be corrected, updated, or deleted. If you
              would like to exercise this right, please contact us through the
              contact information below.
            </p>
            <p>
              Additionally, if you are a European resident we note that we are
              processing your information in order to fulfill contracts we might
              have with you (for example if you make an order through the Site),
              or otherwise to pursue our legitimate business interests listed
              above. Additionally, please note that your information will be
              transferred outside of Europe, including to Canada and the United
              States.
            </p>
            <h2>DATA RETENTION</h2>
            <p>
              When you place an order through the Site, we will maintain your
              Order Information for our records unless and until you ask us to
              delete this information.
            </p>
            The Site is not intended for individuals under the age of 18 years.
            <h2>CHANGES</h2>
            <p>
              We may update this privacy policy from time to time in order to
              reflect, for example, changes to our practices or for other
              operational, legal or regulatory reasons.
            </p>
            <h2>CONTACT US</h2>
            <p>
              For more information about our privacy practices, if you have
              questions, or if you would like to make a complaint, please
              contact us by e-mail at {appEnv.appEmail}
            </p>
          </>
        );
      case AvailableLanguages.ptBr:
        return (
          <>
            <h1>POLÍTICA DE PRIVACIDADE </h1>
            <p>
              Esta Política de Privacidade descreve como suas informações
              pessoais são coletadas, usadas ​​e compartilhadas quando você
              visita ou faz alguma compra em nosso site,
              https://empregourgente.com (o "Site").
            </p>
            <h2> INFORMAÇÕES PESSOAIS QUE COLETAMOS </h2>
            <p>
              Quando você visita o site, coletamos automaticamente certos
              informações sobre o seu dispositivo, incluindo informações sobre o
              seu navegador da web, endereço IP, fuso horário e alguns dos
              cookies que estão instalados no seu dispositivo. Além disso,
              conforme você navega no Site, coletamos informações sobre as
              páginas da web individuais ou produtos visualizados, quais sites
              ou termos de pesquisa o indicaram ao site e informações sobre como
              você interage com o site. Nós nos referimos a essas informações
              coletadas automaticamente como "Dispositivo Em formação."
            </p>
            <h3>
              Coletamos informações do dispositivo usando as seguintes
              tecnologias:
            </h3>
            <p>
              - "Cookies" são arquivos de dados que são colocados no seu
              dispositivo ou computador e geralmente incluem um identificador
              exclusivo anônimo. Para mais informações sobre cookies e como
              desativar cookies, visite http://www.allaboutcookies.org. -
              "Arquivos de log" rastreiam ações ocorrendo no Site e colete
              dados, incluindo seu endereço IP, tipo de navegador, provedor de
              serviços de Internet, páginas de referência / saída e carimbos de
              data / hora. - "Web beacons", "tags" e "pixels" são arquivos
              eletrônicos usados ​​para registrar informações sobre como você
              navega o site.
            </p>
            <p>
              Além disso, quando você faz uma compra ou tenta fazer uma compra
              através do site, coletamos certas informações de você, incluindo
              seu nome, endereço de cobrança, endereço de entrega, informações
              de pagamento (incluindo números de cartão de crédito, endereço de
              e-mail e número de telefone. Nós nos referimos a essas informações
              como "Informações do pedido". Quando conversamos sobre
              "Informações pessoais" nesta Política de Privacidade, estamos
              falando sobre informações do dispositivo e informações do pedido.
            </p>
            <h2> COMO USAMOS AS SUAS INFORMAÇÕES PESSOAIS? </h2>
            <p>
              Usamos as Informações do Pedido que coletamos geralmente para
              atender quaisquer pedidos feitos através do Site (incluindo o
              processamento do seu informações de pagamento, organizando o envio
              e fornecendo a você com faturas e / ou confirmações de pedidos).
              Além disso, usamos Informações deste Pedido para: Comunicar com
              você; Examinar nossos pedidos por risco potencial ou fraude; e
              Quando estiver de acordo com as preferências você compartilhou
              conosco, forneça informações ou publicidade relacionada aos nossos
              produtos ou serviços. Nós usamos o Informações do dispositivo que
              coletamos para nos ajudar a rastrear possíveis risco e fraude (em
              particular, seu endereço IP) e muito mais geralmente para melhorar
              e otimizar nosso site (por exemplo, por gerando análises sobre
              como nossos clientes navegam e interagem com o Site e para avaliar
              o sucesso de nosso marketing e campanhas publicitárias).
            </p>
            <h2> COMPARTILHANDO SUAS INFORMAÇÕES PESSOAIS </h2>
            <p>
              Compartilhamos suas informações pessoais com terceiros para nos
              ajudar use suas informações pessoais, conforme descrito acima. Nós
              usamos o Google Analytics para nos ajudar a entender como nossos
              clientes usam o Site - você pode ler mais sobre como o Google usa
              seu Personal Informações aqui:
              https://www.google.com/intl/en/policies/privacy/. Você também pode
              opt-out do Google Analytics aqui:
              https://tools.google.com/dlpage/gaoptout.
            </p>
            <p>
              Por fim, também podemos compartilhar suas informações pessoais
              para cumprir com as leis e regulamentos aplicáveis, para responder
              a uma intimação, mandado de busca ou outra solicitação legal de
              informações que recebemos, ou para proteger nossos direitos.
            </p>
            <p>
              Conforme descrito acima, usamos suas informações pessoais para
              fornecer você com anúncios direcionados ou comunicações de
              marketing que acredito que pode ser do seu interesse. Para mais
              informações sobre como publicidade direcionada, você pode visitar
              a Rede de publicidade Página educacional da Iniciativa (“NAI”) em
              http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.
            </p>
            <p>
              Você pode desativar a publicidade direcionada: FACEBOOK -
              https://www.facebook.com/settings/?tab=ads GOOGLE -
              https://www.google.com/settings/ads/anonymous BING -
              https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads
              Além disso, você pode optar por não receber alguns desses serviços
              visitando o portal de desativação da Digital Advertising Alliance
              em: http://optout.aboutads.info/.
            </p>
            <h2> NÃO RASTREAR </h2>
            <p>
              Observe que não alteramos a coleta de dados do nosso site e use
              práticas quando virmos um sinal de Não rastrear no seu navegador.
            </p>
            <h2> SEUS DIREITOS </h2>
            <p>
              Se você é um residente europeu, tem o direito de acessar
              informações pessoais que mantemos sobre você e para solicitar que
              informações pessoais sejam corrigidas, atualizadas ou excluídas.
              Se vocês gostaria de exercer esse direito, entre em contato
              conosco através do informações de contato abaixo.
            </p>
            <p>
              Além disso, se você é um residente europeu, notamos que poderemos
              processar suas informações para cumprir contratos que possamos ter
              com você (por exemplo, se você fizer um pedido pelo Site), ou de
              outra forma, perseguir nossos interesses comerciais legítimos
              listados acima. Além disso, observe que suas informações serão
              transferidos para fora da Europa, inclusive para o Canadá e os
              Estados Unidos Unidos.
            </p>
            <h2> RETENÇÃO DE DADOS </h2>
            <p>
              Quando você faz um pedido pelo Site, manteremos sua informações
              para nossos registros, a menos e até que você nos peça apague esta
              informação.
            </p>
            O Site não se destina a indivíduos com menos de 18 anos.
            <h2> ALTERAÇÕES </h2>
            <p>
              Podemos atualizar esta política de privacidade periodicamente, a
              fim de refletir, por exemplo, mudanças em nossas práticas ou em
              outros razões operacionais, legais ou regulamentares.
            </p>
            <h2> CONTATE-NOS </h2>
            <p>
              Para obter mais informações sobre nossas práticas de privacidade,
              se você tiver perguntas, ou se você gostaria de fazer uma
              reclamação, por favor entre em contato conosco por e-mail em{" "}
              {appEnv.appEmail}
            </p>
          </>
        );
    }
  };

  return (
    <>
      <Header />
      <PageContainer>
        <SearchTop provinces={provinces} />
      </PageContainer>

      <PageContainer>
        <PageBody>{onRenderPrivacyText()}</PageBody>
      </PageContainer>
      <Footer />
    </>
  );
};

Privacy.getInitialProps = async (ctx) => {
  await ctx.store.dispatch(loadCountryProvinces(appEnv.appCountry));
  const provinces = ctx.store.getState().formReducer.states;

  return {
    provinces,
  };
};

export default Privacy;
