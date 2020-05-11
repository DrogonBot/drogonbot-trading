import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { TS } from '../../../helpers/LanguageHelper';
import { IAffiliateProduct } from '../../../types/Post.types';

const useStyles = makeStyles({
  root: {
    maxWidth: 260,
    margin: 10,
  },
  media: {
    height: 140,
  },
});

interface IProps {
  affiliateProduct: IAffiliateProduct;
}

export const AffiliateProductCard = ({ affiliateProduct }: IProps) => {
  const classes = useStyles();

  return (
    <a href={affiliateProduct.link} target="_blank">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={affiliateProduct.image}
            title={affiliateProduct.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {affiliateProduct.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            {TS.string(null, "genericLearnMore")}
          </Button>
        </CardActions>
      </Card>
    </a>
  );
};
