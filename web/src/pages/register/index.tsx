import { PageBody, PageContainer } from '../../components/elements/common/layout';
import { SearchTop } from '../../components/pages/posts/SearchTop';
import { appEnv } from '../../constants/Env.constant';
import { loadCountryProvinces } from '../../store/actions/form.actions';
import { IProvince } from '../../types/Form.types';

interface IProps {
  provinces: IProvince[];
}

const Register = ({ provinces }: IProps) => {
  return (
    <>
      <PageContainer>
        <SearchTop provinces={provinces} />
      </PageContainer>

      <PageContainer>
        <PageBody />
      </PageContainer>
    </>
  );
};

export default Register;

Register.getInitialProps = async (ctx) => {
  await ctx.store.dispatch(loadCountryProvinces(appEnv.appCountry));
  const provinces = ctx.store.getState().formReducer.states;

  return {
    provinces,
  };
};
