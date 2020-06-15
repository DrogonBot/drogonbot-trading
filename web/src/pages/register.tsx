import Head from 'next/head';
import React from 'react';

import { Body, PageContainer, PageContent } from '../components/elements/common/layout';
import { Footer } from '../components/pages/index/Footer';
import { Header } from '../components/pages/index/Header/Header';
import { SearchTop } from '../components/pages/posts/SearchTop';
import { RegisterWizard } from '../components/pages/register/RegisterWizard';
import { NextSEOIndex } from '../components/seo/NextSEOIndex';
import { appEnv } from '../constants/Env.constant';
import { TS } from '../helpers/LanguageHelper';
import { loadAllJobRoles, loadCountryProvinces } from '../store/actions/form.actions';
import { IProvince } from '../types/Form.types';

interface IProps {
  provinces: IProvince[];
  jobRoles: string[];
}

const Register = ({ provinces, jobRoles }: IProps) => {
  return (
    <>
      <Head>
        <title>{`${appEnv.appName} | ${TS.string(
          "account",
          "registerButtonText"
        )}`}</title>
        <meta
          property="description"
          content="Registre-se gratuitamente no Emprego Urgente e tenha acesso a milhares de vagas em sua região"
        />
      </Head>
      <NextSEOIndex />
      <Header />

      <Body>
        <PageContainer>
          <SearchTop provinces={provinces} />
        </PageContainer>
        <PageContent>
          <h1>{TS.string("account", "registerCreateYourAccount")}</h1>

          <RegisterWizard jobRoles={jobRoles} />
        </PageContent>
      </Body>
      <Footer />
    </>
  );
};

Register.getInitialProps = async (ctx) => {
  await ctx.store.dispatch(loadCountryProvinces(appEnv.appCountry));

  await ctx.store.dispatch(loadAllJobRoles());

  const provinces = ctx.store.getState().formReducer.states;
  const jobRoles = ctx.store.getState().formReducer.jobRoles;

  return {
    provinces,
    jobRoles,
  };
};

export default Register;
