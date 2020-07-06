import { JobPostingJsonLd } from 'next-seo';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { AdsenseHelper } from '../../components/ads/AdsenseAds';
import { Body, PageContainer } from '../../components/elements/common/layout';
import { TermsOfService } from '../../components/elements/form/TermsOfService';
import { Breadcumb } from '../../components/elements/ui/Breadcumb';
import { Footer } from '../../components/pages/index/Footer';
import { Header } from '../../components/pages/index/Header/Header';
import { ActionButtons } from '../../components/pages/posts/post/ActionButtons';
import { LeadModal } from '../../components/pages/posts/post/LeadModal';
import { PostContent } from '../../components/pages/posts/post/PostContent';
import { PostCTA } from '../../components/pages/posts/post/PostCTA';
import { PostFAQ } from '../../components/pages/posts/post/PostFAQ';
import { PostInfoTag } from '../../components/pages/posts/post/PostInfoTag';
import { RelatedPosts } from '../../components/pages/posts/post/RelatedPosts';
import { SubscriptionModal } from '../../components/pages/posts/post/SubscriptionModal';
import { SearchTop } from '../../components/pages/posts/SearchTop';
import { NextSEOPost } from '../../components/seo/NextSEOPost';
import { appEnv } from '../../constants/Env.constant';
import { colors } from '../../constants/UI/Colors.constant';
import { H1, Small } from '../../constants/UI/Common.constant';
import { UI } from '../../constants/UI/UI.constant';
import { DateHelper } from '../../helpers/DateHelper';
import { TS } from '../../helpers/LanguageHelper';
import { loadAllJobRoles, loadCountryProvinces } from '../../store/actions/form.actions';
import { postReadFeed, postReadOne } from '../../store/actions/post.action';
import { AppState } from '../../store/reducers/index.reducers';
import { AdsenseAdsTypes } from '../../types/Ads.types';
import { IProvince } from '../../types/Form.types';
import { IPost, PostPositionType, RelatedPostType } from '../../types/Post.types';
import { IUser } from '../../types/User.types';

interface IProps {
  post: IPost;
  provinces: IProvince[];
  relatedPosts: IPost[];
  jobRoles: string[];
  // affiliatedProducts: IAffiliateProduct[];
}

const IndividualPage = ({
  post,
  provinces,
  relatedPosts,
  jobRoles,
}: // affiliatedProducts,
IProps) => {
  const user = useSelector<AppState, IUser>((state) => state.userReducer.user);

  //  human readable date -
  const humanDate = DateHelper.displayHumanDate(post.createdAt);

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

  // const onRenderAffiliateProducts = () => {
  //   return affiliatedProducts.map((product, i) => (
  //     <div key={i}>
  //       <AffiliateProductCard affiliateProduct={product} />
  //     </div>
  //   ));
  // };

  return (
    <>
      <Header />
      <Body>
        <NextSEOPost
          jobRole={post.jobRoles[0] || post.title}
          title={post.title}
          description={post.content}
          link={appEnv.appUrl + post.slug}
          city={post.city}
          stateCode={post.stateCode}
          sector={post.sector}
        />

        <JobPostingJsonLd
          datePosted={post.createdAt}
          description={post.content}
          hiringOrganization={{
            name: post.companyName || "Não Informado",
            sameAs: null,
          }}
          jobLocation={{
            streetAddress: post.neighborhood,
            addressLocality: post.city,
            addressRegion: post.stateCode,
            postalCode: post.zipCode,
            addressCountry: "Brasil",
          }}
          title={post.title}
          baseSalary={{
            currency: "BRL",
            value: post.monthlySalary,
            unitText: "MONTH",
          }}
          employmentType={getJobJsonLDType()}
          jobLocationType={null}
          validThrough={null}
          applicantLocationRequirements={null}
        />
        <PageContainer>
          <SearchTop provinces={provinces} defaultProvince={post.stateCode} />
        </PageContainer>

        <Cover backgroundImagePath={`/images/seo/${post.sector}.jpg`}>
          <PostCTA post={post} />
        </Cover>

        <MainContainer>
          <LeftColumn>
            {AdsenseHelper.showAds(AdsenseAdsTypes.ResponsiveAndNative)}
            <TitleContainer>
              <H1>{post.title}</H1>
            </TitleContainer>

            <Breadcumb parent={post.sector} child={post.jobRoles.join(", ")} />
            <Small>{humanDate}</Small>
            <PostContent post={post} />

            <PostInfoTag post={post} />

            <PostCTA post={post} />

            <TermsOfService href={`/terms?language=${appEnv.language}`}>
              {TS.string("terms", "tosAgree")}
            </TermsOfService>

            {AdsenseHelper.showAds(AdsenseAdsTypes.ResponsiveAndNative)}
          </LeftColumn>

          <RelatedPosts
            relatedPosts={relatedPosts}
            type={RelatedPostType.Desktop}
          />

          {/* <RightColumn> */}
          {/* <H2> {TS.string("post", "postImproveSkills")}</H2>
            <Small>{TS.string("post", "postImproveSkillsDescription")}</Small>
            <AffiliateProductsContainerDesktop>
              {onRenderAffiliateProducts()}
            </AffiliateProductsContainerDesktop> */}

          {/* </RightColumn> */}
        </MainContainer>

        {/* <AffiliateProductsContainerMobile>
          <InternalContainer>
            <H2> {TS.string("post", "postImproveSkills")}</H2>
            <Small>{TS.string("post", "postImproveSkillsDescription")}</Small>
          </InternalContainer>
          <Slider {...carouselSettings}>{onRenderAffiliateProducts()}</Slider>
        </AffiliateProductsContainerMobile> */}

        {post.premiumOnly &&
        !user?.isPremium &&
        appEnv.payment.subscriptionSystemActive ? (
          <SubscriptionModal
            stateCode={post.stateCode}
            city={post.city}
            jobRole={post.jobRoles[0]}
          />
        ) : (
          <LeadModal post={post} jobRoles={jobRoles} />
        )}

        <RelatedPosts
          relatedPosts={relatedPosts}
          type={RelatedPostType.Mobile}
        />

        <ActionButtons post={post} />

        <PostFAQ post={post} />
      </Body>
      <Footer />
    </>
  );
};

IndividualPage.getInitialProps = async (ctx) => {
  const { slug } = ctx.query;

  await ctx.store.dispatch(loadAllJobRoles());
  await ctx.store.dispatch(loadCountryProvinces(appEnv.appCountry));
  await ctx.store.dispatch(postReadOne(null, slug));
  const provinces = await ctx.store.getState().formReducer.states;
  const post: IPost = await ctx.store.getState().postReducer.post;
  const jobRoles = ctx.store.getState().formReducer.jobRoles;

  // await ctx.store.dispatch(postReadAffiliatedProducts(post));

  // const affiliatedProducts: IAffiliateProduct[] = await ctx.store.getState()
  //   .postReducer.affiliatedProducts;

  if (post?.jobRoles?.length > 0) {
    await ctx.store.dispatch(
      postReadFeed(1, 10, post.stateCode, post.city, post.jobRoles[0], false)
    );
  }

  // fetch related posts, filter any with same id as current post
  const relatedPosts: IPost[] = await ctx.store
    .getState()
    .postReducer.posts.filter((relatedPost) => relatedPost._id !== post._id);

  return {
    post,
    provinces,
    relatedPosts,
    jobRoles,
    // affiliatedProducts,
  };
};

export default IndividualPage;

const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

// const AffiliateProductsContainerMobile = styled.div`
//   /*DESKTOP ONLY CODE*/
//   @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
//     display: none;
//   }

//   .slick-arrow {
//     display: none !important;
//   }
// `;
// const AffiliateProductsContainerDesktop = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   flex: 100%;
// `;

const LeftColumn = styled.div`
  flex: 50%;
  max-width: 900px;
  padding: 1.5rem;

  /*DESKTOP ONLY CODE*/
  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    padding: 3rem;
  }
`;

// const RightColumn = styled.div`
//   flex: auto;
//   padding: 1.5rem;
//   width: 50%;

//   /*MOBILE ONLY CODE*/
//   @media screen and (max-width: ${UI.mediumLayoutBreak}px) {
//     display: none;
//   }
// `;

const Cover = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${colors.primary};
  background-repeat: no-repeat;
  background-image: url('${(props) => props.backgroundImagePath}');
  background-blend-mode: multiply;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 1.5rem;
`;
