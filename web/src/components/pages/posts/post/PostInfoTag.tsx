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
import React from 'react';
import styled from 'styled-components';

import { UI } from '../../../../constants/UI/UI.constant';
import { TS } from '../../../../helpers/LanguageHelper';
import { IPost, PostBenefits, PostCategory, PostPositionType } from '../../../../types/Post.types';
import { InfoTag } from '../../../elements/ui/InfoTag';

interface IProps {
  post: IPost;
}

export const PostInfoTag = ({ post }: IProps) => {
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
    return post.benefits?.map((benefit) => {
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

  return (
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
  );
};

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
