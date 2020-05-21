import { useRouter } from 'next/router';
import styled from 'styled-components';

import { PageBody, PageContainer } from '../components/elements/common/layout';
import { Footer } from '../components/pages/index/Footer';
import { Header } from '../components/pages/index/Header/Header';
import { SearchTop } from '../components/pages/posts/SearchTop';
import { appEnv } from '../constants/Env.constant';
import { colors } from '../constants/UI/Colors.constant';
import { loadCountryProvinces } from '../store/actions/form.actions';
import { IProvince } from '../types/Form.types';
import { AvailableLanguages } from '../types/Global.types';

interface IProps {
  provinces: IProvince[];
}

const About = ({ provinces }: IProps) => {
  const router = useRouter();

  const { language } = router.query;

  const onRenderAboutUsPage = () => {
    switch (language) {
      case AvailableLanguages.eng:
        return (
          <>
            <h1>DMCA POLiCY</h1>
            <p>
              {appEnv.appName} is an onLine service provider as defined in the
              Digital Millennium Copyright Act. We provide legal copyright
              owners with the abiLity to self-pubLish on the internet by
              uploading, storing and displaying various media utiLizing our
              services. We do not monitor, screen or otherwise review the media
              which is uploaded to our servers by users of the service. We take
              copyright violation very seriously and will vigorously protect the
              rights of legal copyright owners. If you are the copyright owner
              of content which appears on the {appEnv.appName} website and you
              did not authorize the use of the content you must notify{" "}
              {appEnv.appName} in writing through the e-mail {appEnv.appEmail}{" "}
              in order for us to identify the allegedly infringing content and
              take action.
            </p>

            <p>
              In order to more easily faciLitate the process we have provided a
              form for your use on our contact us page. We will be unable to
              take any action if you do not provide us with the required
              information so please fill out all fields accurately and
              completely. Alternatively you may make a written notice via email,
              facsimile or postal mail to the DMCA AGENT as Listed below. Your
              written notice must include the following:
            </p>

            <ul>
              <Li>
                A physical or electronic signature of the copyright owner or
                person authorized to act on behalf of the owner which expressly
                claims an exclusive right that is allegedly being infringed.
                Specific identification of the copyrighted work which you are
                alleging to have been infringed. If you are alleging
                infringement of multiple copyrighted works with a single
                notification you must submit a representative List which
                specifically identifies each of the works that you allege are
                being infringed.
              </Li>
              <Li>
                Specific identification of the location and description of the
                material that is claimed to be infringing or to be the subject
                of infringing activity with enough detailed information to
                permit {appEnv.appName} to locate the material. You should
                include the specific URL or URLs of the web pages where the
                allegedly infringing material is located.
              </Li>
              <Li>
                Information reasonably sufficient to allow {appEnv.appName} to
                contact the complaining party which may include a name, address,
                telephone number and electronic mail address at which the
                complaining party may be contacted.
              </Li>
              <Li>
                A statement that the complaining party has a good faith beLief
                that use of the material in the manner complained of is not
                authorized by the copyright owner, its agent or the law.
              </Li>
              <Li>
                A statement that the information in the notification is
                accurate, and under penalty of perjury that the complaining
                party is authorized to act on behalf of the owner of an
                exclusive right that is allegedly infringed.
              </Li>
            </ul>

            <p>
              Please also note that under appLicable law, 17 U.S.C. 512(f), any
              person who knowingly materially misrepresents that material or
              activity is infringing may be subject to LiabiLity.
            </p>
          </>
        );
      case AvailableLanguages.ptBr:
        return (
          <>
            <>
              <h1>DMCA</h1>

              <p>
                {appEnv.appName} é um provedor de serviços on-Line, conforme
                definido no Digital Millennium Copyright Act. Fornecemos aos
                proprietários legais de direitos autorais a capacidade de se
                auto-pubLicar na Internet, carregando, armazenando e exibindo
                várias mídias utiLizando nossos serviços. Não monitoramos,
                examinamos ou anaLisamos a mídia carregada em nossos servidores
                pelos usuários do serviço. Levamos muito a sério a violação de
                direitos autorais e protegeremos vigorosamente os direitos dos
                proprietários legais. Se você é o proprietário dos direitos
                autorais do conteúdo que aparece em {appEnv.appName} e você não
                autorizou o uso do conteúdo, você deve notificar{" "}
                {appEnv.appName} por escrito através do e-mail {appEnv.appEmail}
                , para que possamos identificar o conteúdo supostamente infrator
                e tomar medidas.
              </p>

              <p>
                Para faciLitar o processo com mais faciLidade, fornecemos um
                formulário para seu uso em nossa página de contato. Não
                poderemos tomar nenhuma ação se você não nos fornecer as
                informações necessárias, portanto preencha todos os campos com
                precisão e completamente. Como alternativa, você pode fazer uma
                notificação por escrito via e-mail, fax ou correio postal ao
                DMCA AGENT, conforme Listado abaixo. Seu aviso por escrito deve
                incluir o seguinte:
              </p>

              <ul>
                <Li>
                  Uma assinatura física ou eletrônica do proprietário dos
                  direitos autorais ou da pessoa autorizada a agir em nome do
                  proprietário que reivindica expressamente um direito exclusivo
                  que supostamente está sendo violado. Identificação específica
                  do trabalho protegido por direitos autorais que você alega ter
                  sido violado. Se você estiver alegando violação de vários
                  trabalhos protegidos por direitos autorais com uma única
                  notificação, envie uma Lista de representantes que identifique
                  especificamente cada um dos trabalhos que você alega estarem
                  sendo violados.
                </Li>

                <Li>
                  Identificação específica do local e descrição do material que
                  se alega estar em infração ou que está sujeito a atividade de
                  infração com informações detalhadas suficientes para permitir{" "}
                  {appEnv.appName} para locaLizar o material. Você deve incluir
                  o URL ou URLs específicos das páginas da web em que o material
                  supostamente infrator está locaLizado.
                </Li>

                <Li>
                  Informações razoavelmente suficientes para permitir{" "}
                  {appEnv.appName} para entrar em contato com a parte
                  reclamante, que pode incluir um nome, endereço, número de
                  telefone e endereço eletrônico no qual a parte reclamante pode
                  ser contatada.
                </Li>

                <Li>
                  Uma declaração de que a parte reclamante acredita de boa fé
                  que o uso do material da maneira reclamada não é autorizado
                  pelo proprietário dos direitos autorais, por seu agente ou
                  pela lei.{" "}
                </Li>

                <Li>
                  Uma declaração de que as informações contidas na notificação
                  são precisas e, sob pena de perjúrio, de que a parte
                  reclamante está autorizada a agir em nome do proprietário de
                  um direito exclusivo que supostamente foi violado.
                </Li>
              </ul>

              <p>
                Observe também que, de acordo com a lei apLicável, 17 USC 512
                (f), qualquer pessoa que conscientemente frauda o DMCA está
                violando nossos termos e pode estar sujeita a responsabiLidade
                penal.
              </p>
            </>
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

      <Body>
        <PageContainer>
          <PageBody>{onRenderAboutUsPage()}</PageBody>
        </PageContainer>
      </Body>
      <Footer />
    </>
  );
};

About.getInitialProps = async (ctx) => {
  await ctx.store.dispatch(loadCountryProvinces(appEnv.appCountry));
  const provinces = ctx.store.getState().formReducer.states;

  return {
    provinces,
  };
};

export default About;

export const Body = styled.div`
  min-height: 68.4vh;
`;

const Li = styled.li`
  line-height: 1.6;
  color: ${colors.textGray};
  margin-bottom: 2rem;
`;
