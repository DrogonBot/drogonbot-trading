import Tooltip from '@material-ui/core/Tooltip';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Link from 'next/link';
import styled from 'styled-components';

import { colors } from '../../../../constants/UI/Colors.constant';
import { UI } from '../../../../constants/UI/UI.constant';
import { DateHelper } from '../../../../helpers/DateHelper';
import { TS } from '../../../../helpers/LanguageHelper';
import { ToolTipText } from '../../../elements/common/layout';
import { Breadcumb } from '../../../elements/ui/Breadcumb';

interface IProps {
  id: string;
  category: string;
  tags: string;
  title: string;
  date: string;
  description: string;
  slug: string;
  stateCode: string;
  city: string;
  isTrustableSource: boolean;
}

export const SearchItem = ({
  id,
  category,
  tags,
  title,
  date,
  description,
  slug,
  stateCode,
  city,
  isTrustableSource,
}: IProps) => {
  const humanDate = DateHelper.displayHumanDate(date);

  return (
    <Container>
      <Breadcumb parent={`${stateCode} › ${city} › ${category}`} child={tags} />
      <Link href={`/posts/[slug]`} passHref as={`/posts/${slug}`}>
        <Title>
          {title}
          {isTrustableSource && <VerifiedIcon />}
        </Title>
      </Link>
      <MobileDate>{humanDate}</MobileDate>
      <Link href={`/posts/[slug]`} passHref as={`/posts/${slug}`}>
        <Description>
          <DesktopDate>
            {humanDate}
            {" - "}
          </DesktopDate>
          {description}
        </Description>
      </Link>
    </Container>
  );
};

const VerifiedIcon = () => (
  <VerifiedIconContainer>
    <Tooltip
      title={
        <ToolTipText>{TS.string("post", "postTrustableSource")}</ToolTipText>
      }
    >
      <VerifiedUserIcon />
    </Tooltip>
  </VerifiedIconContainer>
);

const VerifiedIconContainer = styled.div`
  position: relative;
  top: -0.1rem;
  font-size: 1.3rem;
  margin-left: 0.3rem;
  svg {
    color: ${colors.green};
  }
`;

const Container = styled.div`
  flex: 100%;
  background-color: #fff;
  margin: 0 0 10px 0;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  border-radius: 8px;
  border-bottom: 1px hidden #fff;
  padding: 1.5rem;
  word-break: break-all;

  /*DESKTOP ONLY CODE*/
  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    box-shadow: none;
    padding-left: 0;
    max-width: 652px;
  }
`;

const Title = styled.a`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.8rem;
  font-size: 18px;
  margin-top: 1rem;
  font-weight: 300;
  color: ${() => colors.primary};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Description = styled.a`
  display: block;
  cursor: pointer;

  color: ${() => colors.dark};
  font-size: 14px;
  margin-top: 0.5rem;
  line-height: 1.4;
  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  max-height: 7.3em;
  line-height: 1.8em;
  max-width: 100%;

  &:hover {
    text-decoration: underline;
  }
`;

const MobileDate = styled.div`
  /*MOBILE ONLY CODE*/
  @media screen and (max-width: ${UI.mediumLayoutBreak}px) {
    color: ${() => colors.silver};
    margin-top: 1rem;
    font-size: 14px;
    display: block;
  }

  display: none;
`;

const DesktopDate = styled.span`
  /*DESKTOP ONLY CODE*/
  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    color: ${() => colors.silver};
    font-size: 14px;
    display: inline;
  }

  display: none;
`;
