import Link from 'next/link';
import styled from 'styled-components';
import { Url } from 'url';

import { colors } from '../../../constants/UI/Colors.constant';

interface IProps {
  parent: string;
  child: string;
  parentLink?: Url;
  childLink?: Url;
}

export const Breadcumb = ({ parent, child, parentLink, childLink }: IProps) => {
  const onRenderParent = () => {
    if (parent) {
      if (parentLink) {
        return (
          <Link href={parentLink}>
            <DarkBoldText>{parent}</DarkBoldText>
          </Link>
        );
      } else {
        return <DarkBoldText>{parent}</DarkBoldText>;
      }
    }
  };

  const onRenderChild = () => {
    if (child) {
      if (childLink) {
        return <Link href={childLink}>{child}</Link>;
      } else {
        return child;
      }
    }
  };

  return (
    <BreadcumbContainer>
      {onRenderParent()}
      {` › `}
      {onRenderChild()}
    </BreadcumbContainer>
  );
};

const BreadcumbContainer = styled.div`
  font-size: 12px;
  color: ${() => colors.silver};
`;

const DarkBoldText = styled.span`
  color: ${() => colors.dark};
  font-weight: 500;
`;
