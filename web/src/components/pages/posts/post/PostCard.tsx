import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../../constants/UI/Colors.constant';
import { TS } from '../../../../helpers/LanguageHelper';

interface IProps {
  title: string;
  sector: string;
  content: string;
  slug: string;
  stateCode: string;
  city: string;
  isPremium: boolean;
}

export const PostCard = ({
  title,
  sector,
  content,
  slug,
  stateCode,
  city,
  isPremium,
}: IProps) => {
  const shortContent =
    content.length >= 70 ? content.substr(0, 70) + "..." : content;

  return (
    <Container isPremium={isPremium}>
      <Link href={`/posts/${slug}`}>
        <Card>
          <CardTopHeader>
            <Typography color="textSecondary" gutterBottom>
              {`${city}, ${stateCode}`}
            </Typography>
          </CardTopHeader>
          <CardActionArea>
            {/* <CardMedia
              component="img"
              alt={`Vaga: ${title}`}
              height="140"
              image={`${appEnv.appUrl}/images/seo/${sector}.jpg`}
              title={title}
            /> */}
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {shortContent}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link href={`/posts/${slug}`}>
              <Button size="small" color="primary">
                {TS.string(null, "genericLearnMore")}
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  max-width: 315px;
  margin: 1rem;
  .MuiPaper-root {
    background-color: ${(props) => props.isPremium && colors.lightYellow};
  }
`;

const CardTopHeader = styled.div`
  margin-left: 1.3rem;
  margin-top: 1rem;
`;
