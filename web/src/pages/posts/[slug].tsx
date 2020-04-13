import {
  faBriefcase,
  faBriefcaseMedical,
  faBusAlt,
  faBusinessTime,
  faClock,
  faDrumstickBite,
  faMagic,
  faMapMarkedAlt,
  faMoneyBill,
  faTicketAlt,
  faUser,
  faUserClock,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';
import { JobPostingJsonLd } from 'next-seo';
import Linkify from 'react-linkify';
import styled from 'styled-components';

import { SearchContainer, SearchHeader, SearchMain } from '.';
import { Breadcumb } from '../../components/elements/ui/Breadcumb';
import { InfoTag } from '../../components/elements/ui/InfoTag';
import { PostCTA } from '../../components/pages/posts/PostCTA';
import { SearchBar } from '../../components/pages/posts/SearchBar';
import { SearchLogo } from '../../components/pages/posts/SearchLogo';
import { NextSEOPost } from '../../components/seo/NextSEOPost';
import { appEnv } from '../../constants/Env.constant';
import { colors } from '../../constants/UI/Colors.constant';
import { H1, H2, Small } from '../../constants/UI/Common.constant';
import { UI } from '../../constants/UI/UI.constant';
import { DateHelper } from '../../helpers/DateHelper';
import { TS } from '../../helpers/LanguageHelper';
import { loadCountryProvinces } from '../../store/actions/form.actions';
import { postReadOne } from '../../store/actions/post.action';
import { IProvince } from '../../types/Form.types';
import { IPost, PostBenefits, PostCategory, PostPositionType } from '../../types/Post.types';

interface IProps {
  post: IPost;
  provinces: IProvince[];
}

const IndividualPage = ({ post, provinces }: IProps) => {
  //human readable date
  const humanDate = DateHelper.displayHumanDate(post.createdAt);

  const onRenderPositionType = () => {
    switch (post.positionType) {
      case PostPositionType.FullTime:
        return (
          <InfoTag
            icon={<FontAwesomeIcon icon={faBriefcase} />}
            text={TS.string("post", "postPositionTypeFullTime")}
          />
        );

      case PostPositionType.PartTime:
        return (
          <InfoTag
            icon={<FontAwesomeIcon icon={faClock} />}
            text={TS.string("post", "postPositionTypePartTime")}
          />
        );

      case PostPositionType.Custom:
        return (
          <InfoTag
            icon={<FontAwesomeIcon icon={faUserClock} />}
            text={TS.string("post", "postPositionTypeCustom")}
          />
        );
    }
  };

  const onRenderExperienceRequired = () => {
    if (post.experienceRequired) {
      return (
        <InfoTag
          icon={<FontAwesomeIcon icon={faMagic} />}
          text={TS.string("post", "postExperienceNotRequired")}
        />
      );
    }

    return null;
  };

  const onRenderCategory = () => {
    switch (post.category) {
      case PostCategory.Job:
        return (
          <InfoTag
            icon={<FontAwesomeIcon icon={faUserTie} />}
            text={TS.string("post", "postCategoryJob")}
          />
        );
      case PostCategory.Internship:
        return (
          <InfoTag
            icon={<FontAwesomeIcon icon={faUser} />}
            text={TS.string("post", "postCategoryInternship")}
          />
        );

      case PostCategory.Temporary:
        return (
          <InfoTag
            icon={<FontAwesomeIcon icon={faBusinessTime} />}
            text={TS.string("post", "postCategoryTemporary")}
          />
        );
    }
  };

  const onRenderBenefits = () => {
    return post.benefits?.map(benefit => {
      switch (benefit) {
        case PostBenefits.FoodTicket:
          return (
            <InfoTag
              key={benefit}
              icon={<FontAwesomeIcon icon={faTicketAlt} />}
              text={TS.string("post", "postBenefitFoodTicket")}
            />
          );
        case PostBenefits.HealthCare:
          return (
            <InfoTag
              key={benefit}
              icon={<FontAwesomeIcon icon={faBriefcaseMedical} />}
              text={TS.string("post", "postBenefitHealthCare")}
            />
          );
        case PostBenefits.Meal:
          return (
            <InfoTag
              key={benefit}
              icon={<FontAwesomeIcon icon={faDrumstickBite} />}
              text={TS.string("post", "postBenefitMeal")}
            />
          );
        case PostBenefits.Transportation:
          return (
            <InfoTag
              key={benefit}
              icon={<FontAwesomeIcon icon={faBusAlt} />}
              text={TS.string("post", "postBenefitTransportation")}
            />
          );
      }
    });
  };

  const onRenderSalary = () => {
    return (
      post.monthlySalary && (
        <InfoTag
          icon={<FontAwesomeIcon icon={faMoneyBill} />}
          text={`${TS.string("post", "currency")} ${post.monthlySalary}`}
        />
      )
    );
  };

  const getFacebookLink = (stateCode: string) => {
    const facebookGroupLinks = {
      ES: "https://www.facebook.com/groups/empregoses/",
      SP: "https://www.facebook.com/groups/empregosessp/",
      MG: "https://www.facebook.com/groups/grupoempregosbh/"
    };

    return facebookGroupLinks[stateCode];
  };

  const getJobJsonLDType = () => {
    switch (post.positionType) {
      case PostPositionType.FullTime:
        return "FULL_TIME";
      case PostPositionType.PartTime:
        return "PART_TIME";
      default:
        return "OTHER";
    }
  };

  return (
    <>
      <NextSEOPost
        jobRole={post.jobRoles[0] || post.title}
        title={post.title}
        description={post.content}
        link={post.externalUrl || appEnv.serverUrl}
        city={post.city}
        stateCode={post.stateCode}
      />
      <JobPostingJsonLd
        datePosted={post.createdAt}
        description={post.content}
        hiringOrganization={{
          name: post.companyName,
          sameAs: null
        }}
        jobLocation={{
          streetAddress: post.neighborhood,
          addressLocality: post.city,
          addressRegion: post.stateCode,
          postalCode: post.zipCode,
          addressCountry: "Brasil"
        }}
        title={post.title}
        baseSalary={{
          currency: "BRL",
          value: post.monthlySalary,
          unitText: "MONTH"
        }}
        employmentType={getJobJsonLDType()}
        jobLocationType={null}
        validThrough={null}
        applicantLocationRequirements={null}
      />
      <SearchContainer>
        <SearchHeader>
          <SearchLogo />
          <SearchBar provinces={provinces} />
        </SearchHeader>
      </SearchContainer>

      <Cover>
        <PostCTA
          phone={post.phone}
          externalUrl={post.externalUrl}
          email={post.email}
        />
      </Cover>
      <SearchContainer>
        <SearchMain>
          <H1>{post.title}</H1>
          <Breadcumb parent={post.sector} child={post.jobRoles.join(", ")} />
          <Small>{humanDate}</Small>
          <ContentArea>
            <Linkify properties={{ target: "_blank" }}>{post.content}</Linkify>
          </ContentArea>

          <InfoTagsContainer>
            <InfoTag
              icon={<FontAwesomeIcon icon={faMapMarkedAlt} />}
              text={`${post.city}, ${post.stateCode}`}
            />
            {onRenderPositionType()}
            {onRenderExperienceRequired()}
            {onRenderCategory()}
            {onRenderBenefits()}
            {onRenderSalary()}
          </InfoTagsContainer>
          <H2>{TS.string("global", "joinOurCommunity")}</H2>
          <CommunitiesContainer>
            <a
              href={`http://bit.ly/emprego-urgente-${post.stateCode.toLowerCase()}4`}
              target="_blank"
            >
              <Button variant="outlined" className="btnWhatsapp">
                WHATSAPP
              </Button>
            </a>

            <a href={getFacebookLink(post.stateCode)} target="_blank">
              <Button variant="outlined" className="btnFacebook">
                FACEBOOK
              </Button>
            </a>

            <a href={`https://bit.ly/emprego-urgente-link1`} target="_blank">
              <Button variant="outlined" className="btnEU">
                APP
              </Button>
            </a>
          </CommunitiesContainer>
        </SearchMain>
      </SearchContainer>
    </>
  );
};

IndividualPage.getInitialProps = async ctx => {
  const { slug } = ctx.query;

  await ctx.store.dispatch(loadCountryProvinces(appEnv.appCountry));
  await ctx.store.dispatch(postReadOne(null, slug));
  const provinces = ctx.store.getState().formReducer.states;
  const post = ctx.store.getState().postReducer.post;

  return {
    post,
    provinces
  };
};

export default IndividualPage;

const Cover = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${colors.primary};
  background-repeat: no-repeat;
  background-image: url("/images/posts/post-1.webp");
  background-blend-mode: multiply;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 3rem;
  margin-bottom: 3rem;

  /*MOBILE ONLY CODE*/
  @media screen and (max-width: ${UI.mediumLayoutBreak}px) {
    justify-content: center;
  }
`;

const ContentArea = styled.p`
  color: ${colors.silver};
  white-space: pre-wrap;
`;

const CommunitiesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 80%;
  justify-content: space-between;

  .btnWhatsapp {
    background-color: white;
    border: 1px solid ${colors.whatsappGreen};
    color: ${colors.whatsappGreen};
  }
  .btnFacebook {
    background-color: white;
    border: 1px solid ${colors.facebookBlue};
    color: ${colors.facebookBlue};
  }

  .btnEU {
    background-color: white;
    border: 1px solid ${colors.accent};
    color: ${colors.accent};
  }
`;
