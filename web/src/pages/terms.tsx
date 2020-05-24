import { useRouter } from 'next/router';

import { Body, PageContainer, PageContent } from '../components/elements/common/layout';
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

const Terms = ({ provinces }: IProps) => {
  const router = useRouter();

  const { language } = router.query;

  const onRenderTermsText = () => {
    switch (language) {
      case AvailableLanguages.eng:
        return (
          <>
            <h1> TERMS OF SERVICE </h1>

            <h2> OVERVIEW </h2>

            <p>
              This site is operated by Urgent Employment. Throughout the site,
              terms “we”, “us” and “our” refer to Urgent Employment. O Urgent
              Employment provides this website, including all information, tools
              and services available from this site to you, the user, with the
              condition of your acceptance of all terms, conditions, policies
              and notices stated here.
            </p>

            <p>
              {" "}
              When visiting our website and / or buying something on our
              website, you are using our "Services". Consequently, you agree to
              the following terms and conditions (“Terms of Service”, “Terms”),
              including additional terms and conditions and policies mentioned
              in this document and / or available by hyperlink. Those Terms of
              service apply to all users of the site, including, without
              limitation, users who are browsers, suppliers, customers, tenants
              and / or content contributors.
            </p>

            <p>
              Please read these Terms of Service carefully before access or use
              our website. When accessing or using any part of the site, you
              agree to the Terms of Service. If you do not agree to all terms
              and conditions of that agreement, then you cannot access the site
              or use any services. If these Terms of service are considered an
              offer, acceptance is expressly limited to these Terms of Service.
            </p>

            <p>
              Any new features or tools that are added to the user profile
              should also be subject to the Terms of Service service. You can
              review the most current version of the Terms of service whenever
              you want on this page. We reserve the right to update, change or
              exchange any part of these Terms of service by posting updates and
              / or changes to our website. IS your responsibility to verify the
              changes made on this page periodically. Your continued use or
              access to the website after publication of any changes constitutes
              acceptance of such changes.
            </p>

            <h2> SECTION 1 - TERMS </h2>

            <p>
              By agreeing to the Terms of Service, you confirm that you are age
              of majority in your state or province of residence and that you
              gave us your consent to allow any of your underage dependents use
              this site.
            </p>

            <p>
              You must not use our products for any illegal purpose or not
              authorized. You also cannot, when using this Service, violate any
              laws in your jurisdiction (including, but not limited to limited
              to copyright laws).
            </p>

            <p>
              {" "}
              You must not transmit any viruses or any code destructive nature.
            </p>

            <p>
              {" "}
              Violating any of the Terms results in termination of your
              Services.
            </p>

            <h2> SECTION 2 - GENERAL CONDITIONS </h2>

            <p>
              We reserve the right to refuse service to anyone for any reason at
              any time.
            </p>

            <p>
              You agree that we only pass vacancies on our platform for using
              robots, not being responsible for any damages direct or indirect
              effects that they may cause, being the beware of fraudulent
              situations that exceptionally such waves may cause. Because we
              have an automated system for attracting vacancies, unfortunately
              we cannot verify the veracity of 100% of the vacancies on our
              platform, but not we go to great lengths to remove any posts with
              indications of fraud.
            </p>

            <p>
              You understand that your content (not including information about
              credit card), can be transferred without encryption and can: (a)
              be transmitted over several networks; and (b) undergo changes to
              adapt and adapt to the technical requirements of connecting
              networks or devices. Credit card information is always encrypted
              during transfer between networks.
            </p>

            <p>
              You agree not to reproduce, duplicate, copy, sell, resell or
              exploit any part of the Service, use of the Service, access to the
              Service, or any contact on the website through which service is
              provided without our express written permission.
            </p>

            <p>
              The securities used in this agreement are included only for
              convenience and do not limit or affect the Terms.
            </p>

            <h2>SECTION 3 - ACCURACY, INTEGRITY AND UPDATE OF INFORMATION</h2>

            <p>
              {" "}
              We are not responsible for information provided on this site that
              are not accurate, complete or current. The material on this site
              is provided for informational purposes only and should not be used
              as the only basis for making decisions without consulting sources
              of primary information, more accurate, more complete or more
              current. Any use of the material on this site is at your own risk
              and risk.
            </p>

            <p>
              {" "}
              This website may contain certain historical information. At
              historical information may not be current and is provided just for
              your reference. We reserve the right to modify the content on that
              site at any time, but we don't have obligation to update any
              information on our website. You agrees that it is your
              responsibility to monitor changes in Our site.
            </p>

            <h2> SECTION 4 - MODIFICATIONS OF THE SERVICE AND PRICES </h2>

            <p>
              The prices of our plans are subject to change without
              notification.
            </p>

            <p>
              We reserve the right, at any time, to modify or discontinue the
              Service (or any part or content thereof) without notification at
              any time.
            </p>

            <p>
              We are not responsible for you or any third party for any
              modification, price change, suspension or discontinuation of the
              Service.
            </p>

            <h2> SECTION 5 - PRODUCTS OR SERVICES (if applicable) </h2>

            <p>
              Certain products or services may be available exclusively online
              through the website. Such products or services may have limited
              quantities and are subject to return or exchange only, in
              accordance with our Return Policy.
            </p>

            <p>
              We made every possible effort in the most accurate way the colors
              and images of our products that appear in the store. We can not
              ensure that the display of any color on your computer's monitor
              computer will be accurate.
            </p>

            <p>
              We reserve the right, but are not obliged, to limit sales of our
              products or Services to anyone, region geography or jurisdiction.
              We can exercise this right according to the case. We reserve the
              right to limit the quantities of any products or services we
              offer. All descriptions of products or product prices are subject
              to change at any time without notice at our sole discretion. We
              reserve the right to discontinue any product at any time. Any
              offer made for any product or service on that site is void where
              prohibited by law.
            </p>

            <p>
              We do not guarantee that the quality of any products, services,
              information or other materials purchased or obtained by you will
              meet your expectations, or that any errors in the Service will be
              corrected.
            </p>

            <h2> SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION </h2>

            <p>
              We reserve the right to refuse any request you make to us. do. We
              may, at our own discretion, limit or cancel the number of products
              per person, per household or per order. Such restrictions may
              include orders placed on the same customer account, on the same
              credit card, and / or orders that use the same invoice and / or
              shipping address. If we make changes or cancel a request, we may
              notify you by email and / or billing address / phone number
              provided at the time that the order was placed. We reserve the
              right to limit or prohibit requests that, in our sole discretion,
              appear to be made by merchants, resellers or distributors.
            </p>

            <p>
              You agree to provide your account and purchase information
              complete for all purchases made in our system. You you agree to
              promptly update your account and other information, including your
              email, credit card numbers and dates of so that we can complete
              your transactions and contact you when I need to.
            </p>

            <h2> SECTION 7 - OPTIONAL TOOLS </h2>

            <p>
              We can give you access to third-party tools that are not we
              monitor and we don't even have any control.
            </p>

            <p>
              You acknowledge and agree that we provide access to such tools ”as
              they are” and “as available” without any warranties,
              representations or conditions of any kind and without any
              endorsement. We are not responsible in any way for your use of
              optional third party tools.
            </p>

            <p>
              Any use of optional tools offered through the website is entirely
              at your own risk and you become familiar and approve the terms of
              the tools that are provided by third party supplier (s).
            </p>

            <p>
              We may also, in the future, offer new services and / or features
              through the website (including the launch of new tools and
              resources). Such new features and / or services must also be
              subject to these Terms of Service.
            </p>

            <h2> SECTION 8 - THIRD PARTY LINKS </h2>

            <p>
              Certain products, content and services available from our Service
              may include third party materials.
            </p>

            <p>
              {" "}
              Third party links on this site may redirect you to sites from
              third parties that are not affiliated with us. Not us we are
              responsible for examining or evaluating the content or accuracy.
              We do not guarantee and have no obligation or responsibility for
              any third party materials or websites, or by any other materials,
              products or services of third parties.
            </p>

            <p>
              We are not responsible for any damages or losses related to the
              purchase or use of goods, services, resources, content, or any
              other transactions made in connection with any third party
              websites. Please review with be careful with third party policies
              and practices and make sure you understand them before making any
              transactions. The complaints, complaints, concerns or questions
              regarding third parties should be directed to the third party.
            </p>

            <h2> SECTION 9 - COMMENTS, FEEDBACK, ETC. USER </h2>

            <p>
              If, at our request, you send certain specific items (for example,
              example, participation in a contest), or without our request, you
              submit creative ideas, suggestions, proposals, plans, or other
              materials, whether online, by email, by mail, or otherwise
              (collectively called 'comments'), you agree that we can, at any
              time, without restriction, edit, copy, publish, distribute,
              translate and otherwise use any comments you forward to us. Not us
              we are responsible for: (1) keeping any comments confidential; (2)
              indemnify for any comments; or (3) respond any comments.
            </p>

            <p>
              We can, but are under no obligation, to monitor, edit or remove
              content that we determine in our sole discretion to be against the
              law, offensive, threatening, slanderous, defamatory, pornographic,
              obscene or objectionable or that violates property intellectual
              property or these Terms of Service.
            </p>

            <p>
              {" "}
              You agree that your comments will not violate any rights third
              parties, including copyright, trademark, privacy, personality or
              other personal or property. You agree that your comments will not
              contain defamatory, illegal, abusive or obscene material. They
              also don't contain no computer viruses or other malware that could
              affect the operation of the Service or any related website. You
              can't use a fake email address, pretend to be someone different
              from yourself, or otherwise deceive us or third parties as to the
              source of any comments. You're the only one responsible for any
              comments you make and for their veracity. We do not assume any
              responsibility or liability obligation for any comments posted by
              you or by any third party.
            </p>

            <h2> SECTION 10 - PERSONAL INFORMATION </h2>

            <p>
              {" "}
              The sending of your personal information through our website is
              governed by our Privacy Policy. See our Policy privacy.
            </p>

            <h2> SECTION 11 - ERRORS, INACCURACIES AND OMISSIONS </h2>

            <p>
              Occasionally, there may be information on our website or the
              Service that contains typographical errors, inaccuracies or
              omissions that may relate to product descriptions, prices,
              promotions, offers, product shipping fees, shipping times and
              availability. We reserve the right to correct any errors,
              inaccuracies or omissions, and to change or update information or
              cancel orders if any information on the Service or on any related
              website is inaccurate at any time and without notice (even after
              you have submitted your order).
            </p>

            <p>
              We assume no obligation to update, change or clarify information
              on the Service or any related website, including, without
              limitation, pricing information, except as required by law. No
              specific updates or date updates to the Service or any related
              website, you must be used to indicate that all information in the
              Service or on any related website have been modified or updated.
            </p>

            <h2> SECTION 12 - PROHIBITED USES </h2>

            <p>
              In addition to other prohibitions, as set out in the Terms of
              service, you are prohibited from using the website or content to:
              (a) illicit purposes; (b) asking other people to perform or
              participate in any unlawful acts; (c) violate any international,
              provincial, state or federal regulations, local rules, laws or
              regulations; (d) infringe or violate our intellectual property
              rights or the rights of intellectual property of others; (e) to
              harass, abuse, insult, damage, defame, slander, disparage,
              intimidate or discriminate based on gender, sexual orientation,
              religion, ethnicity, race, age, nationality or disability; (f)
              present false or misleading information; (g) send or transmit
              viruses or any other type of malicious code that will be or may be
              used to affect the functionality or operation of the Service or
              any related website, other websites, or the Internet; (h) collect
              or track personal information from other people; (i) to send spam,
              phishing, pharm, pretext, spider, crawl, or scrape; (j) for
              obscene or immoral purposes; or (k) to interfere with or
              circumvent the security features of the Service or any related
              website, other websites, or the Internet. We reserve the right to
              terminate your use of the Service or any related website for
              violating any of the uses prohibited.
            </p>

            <h2>
              {" "}
              SECTION 13 - DISCLAIMER OF WARRANTIES; LIMITATION OF
              RESPONSIBILITY
            </h2>

            <p>
              We do not guarantee, represent or justify that your use of our
              service will be punctual, secure, without errors or interruptions.
              Not we guarantee that the results that can be obtained by using
              the service will be accurate or reliable. You agree that from time
              to time we may at times remove the service for indefinite periods
              of time time or cancel at any time without notifying you. You
              agree that your use or inability to use the service is at your
              sole discretion account and risk. The service and all products and
              services delivered through the service are, except as stated by
              us) provided without warranty and subject to availability for your
              use, without any representations, warranties or conditions of any
              either express or implied, including all warranties implied or
              commercial conditions, quantity, suitability to a specific
              purpose, durability, title, and not violation. Under no
              circumstances should Urgent Employment, our directors, officers,
              employees, affiliates, agents, contractors, interns, suppliers,
              service providers or licensors will be responsible for any loss,
              loss, direct, indirect, incidental, punitive damages or claims,
              special or consequential claims of any kind, including without
              limitation, lost profits, lost revenue, lost savings, data loss,
              replacement costs, or any damages similar, whether on the basis of
              a contract, an unlawful act (including negligence), strict
              liability or otherwise, arising out of your use of any of the
              services or any products purchased using the service, or for any
              other complaint related in any way to your use of the service or
              any product, including, but not limited to, any errors or
              omissions in any content, or any loss or damage to any kind as a
              result of using the service or any content (or product) published,
              transmitted or otherwise available through the service, even if
              alerted to such possibility. Since some states or jurisdictions do
              not allow exclusion or limitation of liability for consequential
              damages or incidental, in such states or jurisdictions, our
              liability shall be limited to the maximum extent permitted by law.
            </p>

            <h2> SECTION 14 - INDEMNIFICATION </h2>

            <p>
              You agree to indemnify, defend and exempt Urgent Employment and
              our subsidiaries, affiliates, partners, employees, directors,
              agents, contractors, licensors, service providers services,
              subcontractors, suppliers, interns and employees, of any claim or
              demand, including attorneys' fees, by any third party due to the
              breach these Terms of Service or the documents they incorporate by
              reference, or the violation of any law or the rights of a third.
            </p>

            <h2> SECTION 15 - INDEPENDENCE </h2>

            <p>
              In the event that any provision of these Terms of Service is
              considered illegal, void or ineffective, such provision however,
              be applicable up to the maximum limit permitted by law applicable,
              and the unenforceable portion will be considered separate from
              those Service Terms. Such determination does not affect the
              validity and applicability of any other remaining provisions.
            </p>

            <h2> SECTION 16 - TERMINATION </h2>

            <p>
              The obligations and responsibilities of the parties incurred
              before the termination date must continue after termination of
              this agreement to all effects. These Terms of Service are in
              effect, unless that is terminated by you or us. You can terminate
              these Terms of service at any time, notifying us that you are no
              longer want to use our services, or when you stop using our
              website. If in our sole discretion you do not comply with any term
              or provision of these Terms of Service, we also we may terminate
              this agreement at any time without notice advance and you will be
              responsible for all amounts due until the date of termination; we
              can also deny you access to our Services (or any part of them).
            </p>

            <h2> SECTION 17 - INTEGRAL AGREEMENT </h2>

            <p>
              If we do not exercise or enforce any right or provision of these
              Terms of Service, this will not constitute a waiver of such right
              or provision. These Terms of Service and any operational policies
              or standards posted by us on this site or on the service
              constitutes the entire agreement among us. These terms govern your
              use of the Service, replacing any prior or contemporary
              agreements, communications and proposals, whether verbal or
              written, between you and us (including, but not limited to any
              previous versions of the Terms of service). Any ambiguities in the
              interpretation of these Terms of service should not be interpreted
              against the party who drafted them.
            </p>

            <h2> SECTION 18 - APPLICABLE LAW </h2>

            <p>
              These Terms of Service and any separate agreements under which we
              we provide you with the Services must be governed and interpreted
              according to the laws of Canada.{" "}
            </p>

            <h2> SECTION 19 - CHANGES TO TERMS OF SERVICE </h2>

            <p>
              You can review the most current version of the Terms of Service at
              any time on that page. We reserve the right, at our discretion
              discretion, to update, modify or replace any part of these Terms
              of Service when posting updates and changes to the Our site. It is
              your responsibility to check our website periodically. Your
              continued use of or access to our website or Service after posting
              any changes to these Terms service constitutes acceptance of those
              changes.{" "}
            </p>

            <h2> SECTION 20 - CONTACT INFORMATION </h2>

            <p>
              Questions about the Terms of Service should be sent to us through
              the
              {appEnv.appEmail}.
            </p>
          </>
        );
      case AvailableLanguages.ptBr:
        return (
          <>
            <h1>TERMOS DE SERVIÇO</h1>
            <h2>VISÃO GERAL</h2>
            <p>
              Esse site é operado pelo Emprego Urgente. Em todo o site, os
              termos “nós”, “nos” e “nosso” se referem ao Emprego Urgente. O
              Emprego Urgente proporciona esse site, incluindo todas as
              informações, ferramentas e serviços disponíveis deste site para
              você, o usuário, com a condição da sua aceitação de todos os
              termos, condições, políticas e avisos declarados aqui.
            </p>
            <p>
              {" "}
              Ao visitar nosso site e/ou comprar alguma coisa no nosso site,
              você está utilizando nossos “Serviços”. Consequentemente, você
              concorda com os seguintes termos e condições (“Termos de serviço”,
              “Termos”), incluindo os termos e condições e políticas adicionais
              mencionados neste documento e/ou disponíveis por hyperlink. Esses
              Termos de serviço se aplicam a todos os usuários do site,
              incluindo, sem limitação, os usuários que são navegadores,
              fornecedores, clientes, lojistas e/ou contribuidores de conteúdo.
            </p>
            <p>
              Por favor, leia esses Termos de serviço cuidadosamente antes de
              acessar ou utilizar o nosso site. Ao acessar ou usar qualquer
              parte do site, você concorda com os Termos de serviço. Se você não
              concorda com todos os termos e condições desse acordo, então você
              não pode acessar o site ou usar quaisquer serviços. Se esses
              Termos de serviço são considerados uma oferta, a aceitação é
              expressamente limitada a esses Termos de serviço.
            </p>
            <p>
              Quaisquer novos recursos ou ferramentas que forem adicionados ao
              perfil de usuário também devem estar sujeitos aos Termos de
              serviço. Você pode revisar a versão mais atual dos Termos de
              serviço quando quiser nesta página. Reservamos o direito de
              atualizar, alterar ou trocar qualquer parte desses Termos de
              serviço ao publicar atualizações e/ou alterações no nosso site. É
              sua responsabilidade verificar as alterações feitas nesta página
              periodicamente. Seu uso contínuo ou acesso ao site após a
              publicação de quaisquer alterações constitui aceitação de tais
              alterações.
            </p>
            <h2>SEÇÃO 1 - TERMOS</h2>
            <p>
              Ao concordar com os Termos de serviço, você confirma que você é
              maior de idade em seu estado ou província de residência e que você
              nos deu seu consentimento para permitir que qualquer um dos seus
              dependentes menores de idade usem esse site.
            </p>
            <p>
              Você não deve usar nossos produtos para qualquer fim ilegal ou não
              autorizado. Você também não pode, ao usufruir deste Serviço,
              violar quaisquer leis em sua jurisdição (incluindo, mas não
              limitado, a leis de direitos autorais).
            </p>
            <p>
              {" "}
              Você não deve transmitir nenhum vírus ou qualquer código de
              natureza destrutiva.
            </p>
            <p>
              {" "}
              Violar qualquer um dos Termos tem como consequência a rescisão
              imediata dos seus Serviços.
            </p>
            <h2>SEÇÃO 2 - CONDIÇÕES GERAIS</h2>
            <p>
              Reservamos o direito de recusar o serviço a qualquer pessoa por
              qualquer motivo a qualquer momento.
            </p>
            <p>
              Você concorda que apenas repassamos vagas em nossa plataforma por
              meio de robôs, não nos responsabilizando por quaisquer danos
              diretos ou indiretos que as mesmas possam causar, cabendo ao
              usuário se precaver de situações fraudulentas que excepcionalmente
              tais vagas possam causar. Por termos um sistema automatizado de
              captação de vagas, infelizmente não temos como verificar a
              veracidade de 100% das vagas de nossa plataforma, porém não
              medimos esforços em remover quaisquer postagens com indícios de
              fraude.
            </p>
            <p>
              Você entende que o seu conteúdo (não incluindo informações de
              cartão de crédito), pode ser transferido sem criptografia e pode:
              (a) ser transmitido por várias redes; e (b) sofrer alterações para
              se adaptar e se adequar às exigências técnicas de conexão de redes
              ou dispositivos. As informações de cartão de crédito sempre são
              criptografadas durante a transferência entre redes.
            </p>
            <p>
              Você concorda em não reproduzir, duplicar, copiar, vender,
              revender ou explorar qualquer parte do Serviço, uso do Serviço,
              acesso ao Serviço, ou qualquer contato no site através do qual o
              serviço é fornecido, sem nossa permissão expressa por escrito.
            </p>
            <p>
              Os títulos usados neste acordo são incluídos apenas por
              conveniência e não limitam ou afetam os Termos.
            </p>
            <h2>
              SEÇÃO 3 - PRECISÃO, INTEGRIDADE E ATUALIZAÇÃO DAS INFORMAÇÕES
            </h2>
            <p>
              {" "}
              Não somos responsáveis por informações disponibilizadas neste site
              que não sejam precisas, completas ou atuais. O material desse site
              é fornecido apenas para fins informativos e não deve ser usado
              como a única base para tomar decisões sem consultar fontes de
              informações primárias, mais precisas, mais completas ou mais
              atuais. Qualquer utilização do material desse site é por sua conta
              e risco.
            </p>
            <p>
              {" "}
              Esse site pode conter certas informações históricas. As
              informações históricas podem não ser atuais e são fornecidas
              apenas para sua referência. Reservamos o direito de modificar o
              conteúdo desse site a qualquer momento, mas nós não temos
              obrigação de atualizar nenhuma informação em nosso site. Você
              concorda que é de sua responsabilidade monitorar alterações no
              nosso site.
            </p>
            <h2>SEÇÃO 4 - MODIFICAÇÕES DO SERVIÇO E PREÇOS</h2>
            <p>
              Os preços dos nossos planos são sujeitos a alterações sem
              notificação.
            </p>
            <p>
              Reservamos o direito de, a qualquer momento, modificar ou
              descontinuar o Serviço (ou qualquer parte ou conteúdo do mesmo)
              sem notificação em qualquer momento.
            </p>
            <p>
              Não nos responsabilizados por você ou por qualquer terceiro por
              qualquer modificação, alteração de preço, suspensão ou
              descontinuação do Serviço.
            </p>
            <h2>SEÇÃO 5 - PRODUTOS OU SERVIÇOS (caso aplicável)</h2>
            <p>
              Certos produtos ou serviços podem estar disponíveis exclusivamente
              online através do site. Tais produtos ou serviços podem ter
              quantidades limitadas e são sujeitos a apenas devolução ou troca,
              de acordo com nossa Política de devolução.
            </p>
            <p>
              Fizemos todo o esforço possível da forma mais precisa as cores e
              imagens dos nossos produtos que aparecem na loja. Não podemos
              garantir que a exibição de qualquer cor no monitor do seu
              computador será precisa.
            </p>
            <p>
              Reservamos o direito, mas não somos obrigados, a limitar as vendas
              de nossos produtos ou Serviços para qualquer pessoa, região
              geográfica ou jurisdição. Podemos exercer esse direito conforme o
              caso. Reservamos o direito de limitar as quantidades de quaisquer
              produtos ou serviços que oferecemos. Todas as descrições de
              produtos ou preços de produtos são sujeitos a alteração a qualquer
              momento sem notificação, a nosso critério exclusivo. Reservamos o
              direito de descontinuar qualquer produto a qualquer momento.
              Qualquer oferta feita por qualquer produto ou serviço nesse site é
              nula onde for proibido por lei.
            </p>
            <p>
              Não garantimos que a qualidade de quaisquer produtos, serviços,
              informações ou outros materiais comprados ou obtidos por você vão
              atender às suas expectativas, ou que quaisquer erros no Serviço
              serão corrigidos.
            </p>
            <h2>SEÇÃO 6 - PRECISÃO DE INFORMAÇÕES DE FATURAMENTO E CONTA</h2>
            <p>
              Reservamos o direito de recusar qualquer pedido que você nos
              fizer. Podemos, a nosso próprio critério, limitar ou cancelar o
              número de produtos por pessoa, por domicílio ou por pedido. Tais
              restrições podem incluir pedidos feitos na mesma conta de cliente,
              no mesmo cartão de crédito, e/ou pedidos que usam a mesma fatura
              e/ou endereço de envio. Caso façamos alterações ou cancelemos um
              pedido, pode ser que o notifiquemos por e-mail e/ou
              endereço/número de telefone de faturamento fornecidos no momento
              que o pedido foi feito. Reservamos o direito de limitar ou proibir
              pedidos que, a nosso critério exclusivo, parecem ser feitos por
              comerciantes, revendedores ou distribuidores.
            </p>
            <p>
              Você concorda em fornecer suas informações de conta e compra
              completas para todas as compras feitas em nosso sistema. Você
              concorda em atualizar prontamente sua conta e outras informações,
              incluindo seu e-mail, números de cartão de crédito e datas de
              validade, para que possamos completar suas transações e contatar
              você quando preciso.
            </p>
            <h2>SEÇÃO 7 - FERRAMENTAS OPCIONAIS</h2>
            <p>
              Podemos te dar acesso a ferramentas de terceiros que não
              monitoramos e nem temos qualquer controle.
            </p>
            <p>
              Você reconhece e concorda que nós fornecemos acesso a tais
              ferramentas ”como elas são” e “conforme a disponibilidade” sem
              quaisquer garantias, representações ou condições de qualquer tipo
              e sem qualquer endosso. Não nos responsabilizamos de forma alguma
              pelo seu uso de ferramentas opcionais de terceiros.
            </p>
            <p>
              Qualquer uso de ferramentas opcionais oferecidas através do site é
              inteiramente por sua conta e risco e você se familiarizar e
              aprovar os termos das ferramentas que são fornecidas por
              fornecedor(es) terceiro(s).
            </p>
            <p>
              Também podemos, futuramente, oferecer novos serviços e/ou recursos
              através do site (incluindo o lançamento de novas ferramentas e
              recursos). Tais recursos e/ou serviços novos também devem estar
              sujeitos a esses Termos de serviço.
            </p>
            <h2>SEÇÃO 8 - LINKS DE TERCEIROS</h2>
            <p>
              Certos produtos, conteúdos e serviços disponíveis pelo nosso
              Serviço podem incluir materiais de terceiros.
            </p>
            <p>
              {" "}
              Os links de terceiros neste site podem te redirecionar para sites
              de terceiros que não são afiliados a nós. Não nos
              responsabilizamos por examinar ou avaliar o conteúdo ou precisão.
              Não garantimos e nem temos obrigação ou responsabilidade por
              quaisquer materiais ou sites de terceiros, ou por quaisquer outros
              materiais, produtos ou serviços de terceiros.
            </p>
            <p>
              Não somos responsáveis por quaisquer danos ou prejuízos
              relacionados com a compra ou uso de mercadorias, serviços,
              recursos, conteúdo, ou quaisquer outras transações feitas em
              conexão com quaisquer sites de terceiros. Por favor, revise com
              cuidado as políticas e práticas de terceiros e certifique-se que
              você as entende antes de efetuar qualquer transação. As queixas,
              reclamações, preocupações ou questões relativas a produtos de
              terceiros devem ser direcionadas ao terceiro.
            </p>
            <h2>SEÇÃO 9 - COMENTÁRIOS, FEEDBACK, ETC. DO USUÁRIO</h2>
            <p>
              Se, a nosso pedido, você enviar certos itens específicos (por
              exemplo, participação em um concurso), ou sem um pedido nosso,
              você enviar ideias criativas, sugestões, propostas, planos, ou
              outros materiais, seja online, por e-mail, pelo correio, ou de
              outra forma (em conjunto chamados de 'comentários'), você concorda
              que podemos, a qualquer momento, sem restrição, editar, copiar,
              publicar, distribuir, traduzir e de outra forma usar quaisquer
              comentários que você encaminhar para nós. Não nos
              responsabilizamos por: (1) manter quaisquer comentários em sigilo;
              (2) indenizar por quaisquer comentários; ou (3) responder
              quaisquer comentários.
            </p>
            <p>
              Podemos, mas não temos a obrigação, de monitorar, editar ou
              remover conteúdo que nós determinamos a nosso próprio critério ser
              contra a lei, ofensivo, ameaçador, calunioso, difamatório,
              pornográfico, obsceno ou censurável ou que viole a propriedade
              intelectual de terceiros ou estes Termos de serviço.
            </p>
            <p>
              {" "}
              Você concorda que seus comentários não violarão qualquer direito
              de terceiros, incluindo direitos autorais, marcas registradas,
              privacidade, personalidade ou outro direito pessoal ou de
              propriedade. Você concorda que os seus comentários não vão conter
              material difamatório, ilegal, abusivo ou obsceno. Eles também não
              conterão nenhum vírus de computador ou outro malware que possa
              afetar a operação do Serviço ou qualquer site relacionado. Você
              não pode usar um endereço de e-mail falso, fingir ser alguém
              diferente de si mesmo, ou de outra forma enganar a nós ou
              terceiros quanto à origem de quaisquer comentários. Você é o único
              responsável por quaisquer comentários que você faz e pela
              veracidade deles. Nós não assumimos qualquer responsabilidade ou
              obrigação por quaisquer comentários publicados por você ou por
              qualquer terceiro.
            </p>
            <h2>SEÇÃO 10 - INFORMAÇÕES PESSOAIS</h2>
            <p>
              {" "}
              O envio de suas informações pessoais através do nosso site é
              regido pela nossa Política de privacidade. Ver nossa Política de
              privacidade.
            </p>
            <h2>SEÇÃO 11 - ERROS, IMPRECISÕES E OMISSÕES</h2>
            <p>
              Ocasionalmente, pode haver informações no nosso site ou no Serviço
              que contém erros tipográficos, imprecisões ou omissões que possam
              relacionar-se a descrições de produtos, preços, promoções,
              ofertas, taxas de envio do produto, o prazo de envio e
              disponibilidade. Reservamos o direito de corrigir quaisquer erros,
              imprecisões ou omissões, e de alterar ou atualizar informações ou
              cancelar encomendas caso qualquer informação no Serviço ou em
              qualquer site relacionado seja imprecisa, a qualquer momento e sem
              aviso prévio (até mesmo depois de você ter enviado o seu pedido).
            </p>
            <p>
              Não assumimos nenhuma obrigação de atualizar, alterar ou
              esclarecer informações no Serviço ou em qualquer site relacionado,
              incluindo, sem limitação, a informações sobre preços, exceto
              conforme exigido por lei. Nenhuma atualização específica ou data
              de atualização no Serviço ou em qualquer site relacionado, deve
              ser utilizada para indicar que todas as informações do Serviço ou
              em qualquer site relacionado tenham sido modificadas ou
              atualizadas.
            </p>
            <h2>SEÇÃO 12 - USOS PROIBIDOS</h2>
            <p>
              Além de outras proibições, conforme estabelecido nos Termos de
              serviço, você está proibido de usar o site ou o conteúdo para: (a)
              fins ilícitos; (b) solicitar outras pessoas a realizar ou
              participar de quaisquer atos ilícitos; (c) violar quaisquer
              regulamentos internacionais, provinciais, estaduais ou federais,
              regras, leis ou regulamentos locais; (d) infringir ou violar
              nossos direitos de propriedade intelectual ou os direitos de
              propriedade intelectual de terceiros; (e) para assediar, abusar,
              insultar, danificar, difamar, caluniar, depreciar, intimidar ou
              discriminar com base em gênero, orientação sexual, religião,
              etnia, raça, idade, nacionalidade ou deficiência; (f) apresentar
              informações falsas ou enganosas; (g) fazer o envio ou transmitir
              vírus ou qualquer outro tipo de código malicioso que será ou
              poderá ser utilizado para afetar a funcionalidade ou operação do
              Serviço ou de qualquer site relacionado, outros sites, ou da
              Internet; (h) coletar ou rastrear as informações pessoais de
              outras pessoas; (i) para enviar spam, phishing, pharm, pretext,
              spider, crawl, ou scrape; (j) para fins obscenos ou imorais; ou
              (k) para interferir ou contornar os recursos de segurança do
              Serviço ou de qualquer site relacionado, outros sites, ou da
              Internet. Reservamos o direito de rescindir o seu uso do Serviço
              ou de qualquer site relacionado por violar qualquer um dos usos
              proibidos.
            </p>
            <h2>
              {" "}
              SEÇÃO 13 - ISENÇÃO DE RESPONSABILIDADE DE GARANTIAS; LIMITAÇÃO DE
              RESPONSABILIDADE
            </h2>

            <p>
              Nós não garantimos, representamos ou justificamos que o seu uso do
              nosso serviço será pontual, seguro, sem erros ou interrupções. Não
              garantimos que os resultados que possam ser obtidos pelo uso do
              serviço serão precisos ou confiáveis. Você concorda que de tempos
              em tempos, podemos remover o serviço por períodos indefinidos de
              tempo ou cancelar a qualquer momento, sem te notificar. Você
              concorda que o seu uso ou incapacidade de usar o serviço é por sua
              conta e risco. O serviço e todos os produtos e serviços entregues
              através do serviço são, exceto conforme declarado por nós)
              fornecidos sem garantia e conforme a disponibilidade para seu uso,
              sem quaisquer representações, garantias ou condições de qualquer
              tipo, expressas ou implícitas, incluindo todas as garantias
              implícitas ou condições de comercialização, quantidade, adequação
              a uma finalidade específica, durabilidade, título, e não violação.
              Em nenhuma circunstância o Emprego Urgente, nossos diretores,
              oficiais, funcionários, afiliados, agentes, contratantes,
              estagiários, fornecedores, prestadores de serviços ou
              licenciadores serão responsáveis por qualquer prejuízo, perda,
              reclamação ou danos diretos, indiretos, incidentais, punitivos,
              especiais ou consequentes de qualquer tipo, incluindo, sem
              limitação, lucros cessantes, perda de receita, poupanças perdidas,
              perda de dados, custos de reposição, ou quaisquer danos
              semelhantes, seja com base em contrato, ato ilícito (incluindo
              negligência), responsabilidade objetiva ou de outra forma,
              decorrentes do seu uso de qualquer um dos serviços ou quaisquer
              produtos adquiridos usando o serviço, ou para qualquer outra
              reclamação relacionada de alguma forma ao seu uso do serviço ou
              qualquer produto, incluindo, mas não limitado a, quaisquer erros
              ou omissões em qualquer conteúdo, ou qualquer perda ou dano de
              qualquer tipo como resultado do uso do serviço ou qualquer
              conteúdo (ou produto) publicado, transmitido ou de outra forma
              disponível através do serviço, mesmo se alertado ​​de tal
              possibilidade. Como alguns estados ou jurisdições não permitem a
              exclusão ou a limitação de responsabilidade por danos consequentes
              ou incidentais, em tais estados ou jurisdições, a nossa
              responsabilidade será limitada à extensão máxima permitida por
              lei.
            </p>

            <h2>SEÇÃO 14 - INDENIZAÇÃO</h2>

            <p>
              Você concorda em indenizar, defender e isentar Emprego Urgente e
              nossos subsidiários, afiliados, parceiros, funcionários,
              diretores, agentes, contratados, licenciantes, prestadores de
              serviços, subcontratados, fornecedores, estagiários e
              funcionários, de qualquer reclamação ou demanda, incluindo
              honorários de advogados, por quaisquer terceiros devido à violação
              destes Termos de serviço ou aos documentos que incorporam por
              referência, ou à violação de qualquer lei ou os direitos de um
              terceiro.
            </p>

            <h2>SEÇÃO 15 - INDEPENDÊNCIA</h2>

            <p>
              No caso de qualquer disposição destes Termos de serviço ser
              considerada ilegal, nula ou ineficaz, tal disposição deve,
              contudo, ser aplicável até ao limite máximo permitido pela lei
              aplicável, e a porção inexequível será considerada separada desses
              Termos de serviço. Tal determinação não prejudica a validade e
              aplicabilidade de quaisquer outras disposições restantes.
            </p>
            <h2>SEÇÃO 16 - RESCISÃO</h2>
            <p>
              As obrigações e responsabilidades das partes incorridas antes da
              data de rescisão devem continuar após a rescisão deste acordo para
              todos os efeitos. Estes Termos de Serviço estão em vigor, a menos
              que seja rescindido por você ou por nós. Você pode rescindir estes
              Termos de serviço a qualquer momento, notificando-nos que já não
              deseja utilizar os nossos serviços, ou quando você deixar de usar
              o nosso site. Se em nosso critério exclusivo você não cumprir com
              qualquer termo ou disposição destes Termos de serviço, nós também
              podemos rescindir este contrato a qualquer momento sem aviso
              prévio e você ficará responsável por todas as quantias devidas até
              a data da rescisão; também podemos lhe negar acesso a nossos
              Serviços (ou qualquer parte deles).
            </p>

            <h2>SEÇÃO 17 - ACORDO INTEGRAL</h2>

            <p>
              Caso não exerçamos ou executemos qualquer direito ou disposição
              destes Termos de serviço, isso não constituirá uma renúncia de tal
              direito ou disposição. Estes Termos de serviço e quaisquer
              políticas ou normas operacionais postadas por nós neste site ou no
              que diz respeito ao serviço constituem a totalidade do acordo
              entre nós. Estes termos regem o seu uso do Serviço, substituindo
              quaisquer acordos anteriores ou contemporâneos, comunicações e
              propostas, sejam verbais ou escritos, entre você e nós (incluindo,
              mas não limitado a quaisquer versões anteriores dos Termos de
              serviço). Quaisquer ambiguidades na interpretação destes Termos de
              serviço não devem ser interpretadas contra a parte que os redigiu.
            </p>

            <h2>SEÇÃO 18 - LEGISLAÇÃO APLICÁVEL</h2>
            <p>
              Esses Termos de serviço e quaisquer acordos separados em que nós
              lhe fornecemos os Serviços devem ser regidos e interpretados de
              acordo com as leis do Canadá.{" "}
            </p>

            <h2>SEÇÃO 19 - ALTERAÇÕES DOS TERMOS DE SERVIÇO</h2>

            <p>
              Você pode rever a versão mais atual dos Termos de serviço a
              qualquer momento nessa página. Reservamos o direito, a nosso
              critério, de atualizar, modificar ou substituir qualquer parte
              destes Termos de serviço ao publicar atualizações e alterações no
              nosso site. É sua responsabilidade verificar nosso site
              periodicamente. Seu uso contínuo ou acesso ao nosso site ou ao
              Serviço após a publicação de quaisquer alterações a estes Termos
              de serviço constitui aceitação dessas alterações.{" "}
            </p>

            <h2>SEÇÃO 20 - INFORMAÇÕES DE CONTATO </h2>

            <p>
              As perguntas sobre os Termos de serviço devem ser enviadas para
              nós através do
              {appEnv.appEmail}.
            </p>
          </>
        );
    }
  };

  return (
    <>
      <Header />

      <Body>
        <PageContainer>
          <SearchTop provinces={provinces} />
        </PageContainer>
        <PageContent>{onRenderTermsText()}</PageContent>
      </Body>
      <Footer />
    </>
  );
};

Terms.getInitialProps = async (ctx) => {
  await ctx.store.dispatch(loadCountryProvinces(appEnv.appCountry));
  const provinces = ctx.store.getState().formReducer.states;

  return {
    provinces,
  };
};

export default Terms;
