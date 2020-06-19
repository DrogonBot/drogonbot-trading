import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Router from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Body } from '../components/elements/common/layout';
import { ProvinceCityDropdown } from '../components/elements/form/ProvinceCityDropdown';
import { Footer } from '../components/pages/index/Footer';
import { Header } from '../components/pages/index/Header/Header';
import { Logo } from '../components/pages/index/Logo';
import { NextSEOIndex } from '../components/seo/NextSEOIndex';
import { appEnv } from '../constants/Env.constant';
import { colors } from '../constants/UI/Colors.constant';
import { UI } from '../constants/UI/UI.constant';
import { GAnalyticsHelper } from '../helpers/GAnalyticsHelper';
import { TS } from '../helpers/LanguageHelper';
import { loadCountryProvinces } from '../store/actions/form.actions';
import { postClearAll } from '../store/actions/post.action';
import { setSearchKey } from '../store/actions/ui.action';
import { IProvince } from '../types/Form.types';

interface IProps {
  provinces: IProvince[];
}

const Home = (props: IProps) => {
  const [hookSearchField, hookSetSearchField] = useState<string>("");

  const { searchProvince } = useSelector<any, any>((state) => state.uiReducer);

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting search");

    // track what was searched in GA

    GAnalyticsHelper.logEvent("search", hookSearchField);

    // validate and set our keyword to the state

    await dispatch(setSearchKey("searchKeyword", hookSearchField));

    await dispatch(postClearAll()); // clear post state, if present.

    Router.push({
      pathname: "/posts",
      query: {
        searchProvince,
        searchKeyword: hookSearchField,
      },
    });
  };

  return (
    <>
      <Header />
      <NextSEOIndex />

      <Body>
        <Logo />

        <Form id="search-form" onSubmit={onSubmit}>
          <SearchBarContainer>
            <ProvinceCityDropdown provinces={props.provinces} />

            <SearchInput
              type="text"
              placeholder={TS.string("form", "indexSearchInput")}
              id="searchInput"
              value={hookSearchField}
              onChange={(e) => {
                hookSetSearchField(e.target.value);
              }}
              aria-label="search input"
            />
          </SearchBarContainer>

          <BlueSearchButton
            type="submit"
            form="search-form"
            name="blueSearchButton"
            aria-label="Blue search button"
          >
            <FontAwesomeIcon icon={faSearch} />
          </BlueSearchButton>

          <CTAButtonsContainer>
            <SearchLargeDeviceButton type="submit" form="search-form">
              {TS.string("landing", "searchButton")}
            </SearchLargeDeviceButton>
          </CTAButtonsContainer>
        </Form>
      </Body>
      <Footer />
    </>
  );
};

export default Home;

Home.getInitialProps = async (ctx) => {
  await ctx.store.dispatch(loadCountryProvinces(appEnv.appCountry));

  const provinces = ctx.store.getState().formReducer.states;

  return {
    provinces,
  };
};

const SearchBarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  position: relative;
  max-width: 100%;

  flex: 10;

  [class*="ProvinceCityDropdown__Container"] {
    position: absolute;
    top: 0;
    left: 21px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    width: 168.9px;
    justify-content: space-evenly;

    [class*="ProvincesContainer"] {
      margin-right: 0.5rem;
    }
    [class*="CitiesContainer"] [class*="MuiInputBase-root"] {
      max-width: 120px;
    }
  }

  label {
    flex: 100%;
  }
`;

const Form = styled.form`
  width: 95%;
  max-width: 550px;
  display: flex;
  margin: 15px auto;

  position: relative;
  button,
  input {
    outline: none;
  }

  label {
    display: none;
  }
`;

const SearchInput = styled.input`
  flex-grow: 1;
  border: 1px solid #d9d9d9;
  padding: 0.7em;
  width: 100%;
  flex: 8;
  padding-left: 14.8rem;

  /*MOBILE ONLY CODE*/
  @media screen and (max-width: ${UI.mediumLayoutBreak}px) {
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
  }

  /*DESKTOP ONLY CODE*/
  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    border-radius: 24px;
  }
`;

const BlueSearchButton = styled.button`
  border-radius: 0 3px 3px 0;
  background-color: ${colors.primary};
  border: 1px solid ${colors.primaryDark};
  padding: 0.7em;
  z-index: 1;

  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    display: none;
  }

  svg {
    color: white;
    height: 15px;
  }
`;

const CTAButtonsContainer = styled.div`
  @media screen and (max-width: ${UI.mediumLayoutBreak}px) {
    display: none;
  }

  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    font-family: arial, sans-serif;
    position: absolute;
    top: 70px;
    width: 260px;
    left: 0;
    right: 0;
    margin: 0 auto;
    font-size: medium;
    justify-content: center;
    display: flex;

    button {
      color: #757575;
      background-color: #f2f2f2;
      height: 36px;
      font-size: 0.8em;
      font-weight: bold;
      border: 1px solid #f2f2f2;
      border-radius: 2px;
    }
  }
`;

const SearchLargeDeviceButton = styled.button`
  @media screen and (min-width: 750px) {
    margin-right: 0.5em;
  }
`;
