import { Link } from '@material-ui/core';
import { JobPostingJsonLd } from 'next-seo';
import { useEffect } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import { AdsenseHelper } from '../../components/ads/AdsenseAds';
import { Body, PageContainer } from '../../components/elements/common/layout';
import { Breadcumb } from '../../components/elements/ui/Breadcumb';
import { Footer } from '../../components/pages/index/Footer';
import { Header } from '../../components/pages/index/Header/Header';
import { FlagPost } from '../../components/pages/posts/post/FlagPost';
import { JoinCommunities } from '../../components/pages/posts/post/JoinCommunities';
import { PostCard } from '../../components/pages/posts/post/PostCard';
import { PostContent } from '../../components/pages/posts/post/PostContent';
import { PostCTA } from '../../components/pages/posts/post/PostCTA';
import { PostInfoTag } from '../../components/pages/posts/post/PostInfoTag';
import { WhatsAppLeadModal } from '../../components/pages/posts/post/WhatsAppLeadModal';
import { SearchTop } from '../../components/pages/posts/SearchTop';
import { NextSEOPost } from '../../components/seo/NextSEOPost';
import { appEnv } from '../../constants/Env.constant';
import { colors } from '../../constants/UI/Colors.constant';
import { ContainerDesktop, ContainerMobile, H1, H2, Small } from '../../constants/UI/Common.constant';
import { UI } from '../../constants/UI/UI.constant';
import { DateHelper } from '../../helpers/DateHelper';
import { TS } from '../../helpers/LanguageHelper';
import { loadCountryProvinces } from '../../store/actions/form.actions';
import { postReadFeed, postReadOne } from '../../store/actions/post.action';
import { AdsenseAdsTypes } from '../../types/Ads.types';
import { IProvince } from '../../types/Form.types';
import { IPost, PostPositionType } from '../../types/Post.types';

interface IProps {
  post: IPost;
  provinces: IProvince[];
  relatedPosts: IPost[];
  // affiliatedProducts: IAffiliateProduct[];
}

const carouselSettings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 1,
  speed: 500,
};

const IndividualPage = ({
  post,
  provinces,
  relatedPosts,
}: // affiliatedProducts,
IProps) => {
  //  human readable date -
  const humanDate = DateHelper.displayHumanDate(post.createdAt);

  // const router = useRouter();

  useEffect(() => {
    console.log(`Referrer: ${document.referrer}`);
  }, []);

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

  const onRenderRelatedPosts = () => {
    if (!relatedPosts) {
      return null;
    }

    return relatedPosts.map((relatedPost) => (
      <PostCard
        key={relatedPost._id}
        title={relatedPost.title}
        sector={relatedPost.sector}
        content={relatedPost.content}
        slug={relatedPost.slug}
        stateCode={relatedPost.stateCode}
        city={relatedPost.city}
      />
    ));
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
            name: post.companyName,
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
              <H1>{post.title}</H1>{" "}
            </TitleContainer>

            <Breadcumb parent={post.sector} child={post.jobRoles.join(", ")} />
            <Small>{humanDate}</Small>
            <PostContent post={post} />

            <PostInfoTag post={post} />

            <PostCTA post={post} />

            <TOSContainer>
              <Link href={`/terms?language=${appEnv.language}`}>
                {TS.string("terms", "tosAgree")}
              </Link>
            </TOSContainer>

            {AdsenseHelper.showAds(AdsenseAdsTypes.ResponsiveAndNative)}

            <FlagPost post={post} />

            <JoinCommunities post={post} />

            <ContainerDesktop>
              {relatedPosts?.length ? (
                <InternalContainer>
                  <RelatedPosts>
                    <H2>{TS.string("post", "postSimilar")}</H2>
                    <RelatedPostsContainer>
                      {onRenderRelatedPosts()}
                    </RelatedPostsContainer>
                  </RelatedPosts>
                </InternalContainer>
              ) : null}
            </ContainerDesktop>
          </LeftColumn>

          {/* <RightColumn>
            <H2> {TS.string("post", "postImproveSkills")}</H2>
            <Small>{TS.string("post", "postImproveSkillsDescription")}</Small>
            <AffiliateProductsContainerDesktop>
              {onRenderAffiliateProducts()}
            </AffiliateProductsContainerDesktop>
          </RightColumn> */}
        </MainContainer>

        {/* <AffiliateProductsContainerMobile>
          <InternalContainer>
            <H2> {TS.string("post", "postImproveSkills")}</H2>
            <Small>{TS.string("post", "postImproveSkillsDescription")}</Small>
          </InternalContainer>
          <Slider {...carouselSettings}>{onRenderAffiliateProducts()}</Slider>
        </AffiliateProductsContainerMobile> */}

        <ContainerMobile>
          {relatedPosts?.length ? (
            <InternalContainer>
              <H2>{TS.string("post", "postSimilar")}</H2>
              <Slider {...carouselSettings}> {onRenderRelatedPosts()}</Slider>
            </InternalContainer>
          ) : null}
        </ContainerMobile>

        <WhatsAppLeadModal post={post} />
      </Body>
      <Footer />
    </>
  );
};

IndividualPage.getInitialProps = async (ctx) => {
  const { slug } = ctx.query;

  await ctx.store.dispatch(loadCountryProvinces(appEnv.appCountry));
  await ctx.store.dispatch(postReadOne(null, slug));
  const provinces = await ctx.store.getState().formReducer.states;
  const post: IPost = await ctx.store.getState().postReducer.post;

  // await ctx.store.dispatch(postReadAffiliatedProducts(post));

  // const affiliatedProducts: IAffiliateProduct[] = await ctx.store.getState()
  //   .postReducer.affiliatedProducts;

  if (post?.jobRoles?.length > 0) {
    await ctx.store.dispatch(
      postReadFeed(1, 10, post.stateCode, post.jobRoles[0], false)
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
    // affiliatedProducts,
  };
};

export default IndividualPage;

const InternalContainer = styled.div`
  padding: 1.5rem;
`;

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

const RelatedPosts = styled.div`
  margin-top: 3rem;
`;

const RelatedPostsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  /*MOBILE ONLY CODE*/
  @media screen and (max-width: ${UI.mediumLayoutBreak}px) {
    justify-content: center;
  }
`;

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

const TOSContainer = styled.p`
  font-size: 0.9rem;
  color: ${colors.silver};
  text-align: center;
  margin-top: 3rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 1.5rem;
`;
