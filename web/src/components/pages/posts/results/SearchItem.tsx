import ShareIcon from '@material-ui/icons/Share';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Link from 'next/link';
import styled from 'styled-components';

import { colors } from '../../../../constants/UI/Colors.constant';
import { UI } from '../../../../constants/UI/UI.constant';
import { DateHelper } from '../../../../helpers/DateHelper';
import { TS } from '../../../../helpers/LanguageHelper';
import { IPost } from '../../../../types/Post.types';
import { Breadcumb } from '../../../elements/ui/Breadcumb';
import { ToolTipIcon } from '../../../elements/ui/ToolTipIcon';

interface IProps {
  post: IPost;
}

export const SearchItem = ({ post }: IProps) => {
  const humanDate = DateHelper.displayHumanDate(post.createdAt);

  const tags = post.jobRoles.join(",");

  const postLink = `/posts/${post.slug}`;

  return (
    <Container>
      <Breadcumb
        parent={`${post.stateCode} › ${post.city} › ${post.sector}`}
        child={tags}
      />
      <Link href={`/posts/[slug]`} passHref as={postLink}>
        <Title>
          {post.title}
          {post.isTrustableSource && <VerifiedIcon />}
        </Title>
      </Link>
      <ActionsContainer>
        <ShareAction postLink={postLink} />
      </ActionsContainer>
      <MobileDate>{humanDate}</MobileDate>
      <Link href={`/posts/[slug]`} passHref as={postLink}>
        <Description>
          <DesktopDate>
            {humanDate}
            {" - "}
          </DesktopDate>
          {post.content}
        </Description>
      </Link>
    </Container>
  );
};

const ShareAction = ({ postLink }) => (
  <ShareContainer
    href={`whatsapp://send?text=${postLink}?ref=whatsapp`}
    data-action="share/whatsapp/share"
  >
    <ToolTipIcon text={TS.string("post", "postShare")}>
      <ShareIcon />
    </ToolTipIcon>
  </ShareContainer>
);

const VerifiedIcon = () => (
  <VerifiedIconContainer>
    <ToolTipIcon text={TS.string("post", "postTrustableSource")}>
      <VerifiedUserIcon />
    </ToolTipIcon>
  </VerifiedIconContainer>
);

const ShareContainer = styled.a`
  font-size: 0.8rem;
  svg {
    color: ${colors.primary};
  }
`;

const VerifiedIconContainer = styled.div`
  position: relative;
  top: -0.1rem;
  font-size: 1rem;
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
  margin-bottom: 0.5rem;
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

const ActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
