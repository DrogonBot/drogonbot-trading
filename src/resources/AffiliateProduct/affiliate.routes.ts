import { Router } from 'express';

import { PostHelper } from '../../utils/PostHelper';
import { TS } from '../../utils/TS';
import { Post } from '../Post/post.model';

// @ts-ignore
const affiliateRouter = new Router();

affiliateRouter.get('/affiliate', async (req, res) => {

  const { slug } = req.query;

  // try to find a post that matches this slug

  try {
    const post = await Post.findOne({
      slug
    })

    if (post) {
      const affiliatedProducts = await PostHelper.getRelatedAffiliateProducts(post);

      return res.status(200).send(affiliatedProducts)

    } else {
      return res.status(200).send({
        status: 'error',
        message: TS.string('post', 'postNotFound')
      })
    }




  }
  catch (error) {
    console.error(error);
    return res.status(200).send({
      status: 'error',
      message: TS.string('post', 'postFetchError')
    })
  }




});


export { affiliateRouter }