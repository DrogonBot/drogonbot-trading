import Link from 'next/link';
import styled from 'styled-components';

import { colors } from '../../../../constants/UI/Colors.constant';
import { UI } from '../../../../constants/UI/UI.constant';
import { DateHelper } from '../../../../helpers/DateHelper';
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
}: IProps) => {
  const humanDate = DateHelper.displayHumanDate(date);

  return (
    <Container>
      <Breadcumb parent={`${stateCode} - ${category}`} child={tags} />
      <Link href={`/posts/[slug]`} passHref as={`/posts/${slug}`}>
        <Title>{title}</Title>
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
  display: block;
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
  white-space: pre-wrap;

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
