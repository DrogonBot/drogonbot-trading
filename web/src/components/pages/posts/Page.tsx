import { Head } from 'next/document';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { appEnv } from '../../../constants/Env.constant';
import { loadCountryProvinces } from '../../../store/actions/form.actions';
import { AppState } from '../../../store/reducers/index.reducers';
import { IProvince } from '../../../types/Form.types';
import { IUser } from '../../../types/User.types';
import { Body, PageContainer, PageContent } from '../../elements/common/layout';
import { Footer } from '../index/Footer';
import { Header } from '../index/Header/Header';
import { SearchTop } from './SearchTop';

interface IProps {
  children: React.ReactNode;
  metaTitle: string;
  metaDescription: string;
  isAuthenticated: boolean;
  provinces?: IProvince[];
}

export const withPage = (WrappedComponent) => {
  const Wrapper = (props: IProps) => {
    const router = useRouter();
    const user = useSelector<AppState, IUser>(
      (state) => state.userReducer.user
    );

    if (this.props.isAuthenticated && process.browser) {
      if (!user) {
        alert("Você precisa estar logado para acessar essa página!");
        router.push("/login");
      }
    }

    return (
      <WrappedComponent {...props}>
        <Container>
          <Head>
            <title>{this.props.metaTitle}</title>
            <meta property="description" content={this.props.metaDescription} />
          </Head>
          <Header />

          <Body>
            <PageContainer>
              <SearchTop provinces={this.props.provinces} />
            </PageContainer>

            <PageContent>{this.props.children}</PageContent>
          </Body>
          <Footer />
        </Container>
      </WrappedComponent>
    );
  };

  Wrapper.getInitialProps = async (ctx) => {
    await ctx.store.dispatch(loadCountryProvinces(appEnv.appCountry));
    const provinces = ctx.store.getState().formReducer.states;
    return {
      provinces,
    };
  };

  return Wrapper;
};

const Container = styled.div``;
