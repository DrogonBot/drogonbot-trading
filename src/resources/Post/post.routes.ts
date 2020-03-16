import { Router } from 'express';
import _ from 'lodash';

import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { PagePattern, ScrapperHelper } from '../../scrappers/helpers/ScrapperHelper';
import { ScrapperFacebook } from '../../scrappers/scrappers/ScrapperFacebook';
import { LanguageHelper } from '../../utils/LanguageHelper';
import { PushNotificationHelper } from '../../utils/PushNotificationHelper';
import { IFileSaveOptions, ISaveFileToFolderResult, UploadHelper, UploadOutputResult } from '../../utils/UploadHelper';
import { Resume } from '../Resume/resume.model';
import { User } from '../User/user.model';
import { IPostApplication, IPostApplicationStatus, Post } from './post.model';

// @ts-ignore
const postRouter = new Router();


// TODO: remove this route. It's just for testing!
postRouter.get('/scrap', userAuthMiddleware, async (req, res) => {


  /*#############################################################|
     |  >>> ESPIRITO SANTO
     *##############################################################*/


  // await ScrapperHelper.init('OLX => ES', {
  //   crawlLinksFunction: ScrapperOLX.crawlLinks,
  //   crawlPageDataFunction: ScrapperOLX.crawlPageData
  // }, PagePattern.ListAndInternalPosts, "https://es.olx.com.br/vagas-de-emprego", {
  //   country: "Brazil",
  //   stateCode: "ES",

  // })


  // await ScrapperHelper.init('OLX => SP/CAPITAL', {
  //   crawlLinksFunction: ScrapperOLX.crawlLinks,
  //   crawlPageDataFunction: ScrapperOLX.crawlPageData
  // }, PagePattern.ListAndInternalPosts, "https://sp.olx.com.br/vagas-de-emprego", {
  //   country: "Brazil",
  //   stateCode: "SP",

  // })


  // await ScrapperHelper.init('OLX => MG/BH', {
  //   crawlLinksFunction: ScrapperOLX.crawlLinks,
  //   crawlPageDataFunction: ScrapperOLX.crawlPageData
  // }, PagePattern.ListAndInternalPosts, "https://mg.olx.com.br/belo-horizonte-e-regiao/vagas-de-emprego", {
  //   country: "Brazil",
  //   stateCode: "MG",

  // })



  await ScrapperHelper.init('Facebook => Empregos ES', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/empregoses/', {
    country: "Brazil",
    stateCode: "ES",
    city: "Vitória",
  })



  await ScrapperHelper.init('Facebook => Emprego Urgente ES', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/255725088176388', {
    country: "Brazil",
    stateCode: "ES",
    city: "Vitória",
  })


  await ScrapperHelper.init('Vagas e Oportunidades ES', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/jo.darc.13/', {
    country: "Brazil",
    stateCode: "ES",
    city: "Vitória",
  })


  await ScrapperHelper.init('Facebook => Emprego ES', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/470386613006396/', {
    country: "Brazil",
    stateCode: "ES",
    city: "Vitória",
  })



  await ScrapperHelper.init('Facebook => Empregos Vitoria ES', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/462576003935602', {
    country: "Brazil",
    stateCode: "ES",
    city: "Vitória",
  })


  await ScrapperHelper.init('Facebook => Empregos Vila Velha', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/1002682889820586/', {
    country: "Brazil",
    stateCode: "ES",
    city: "Vila Velha",
  })

  await ScrapperHelper.init('Facebook => Empregos Guarapari', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/145238849184087/', {
    country: "Brazil",
    stateCode: "ES",
    city: "Guarapari",
  })

  /*#############################################################|
  |  >>> BELO HORIZONTE
  *##############################################################*/

  await ScrapperHelper.init('Facebook => Vagas de Empregos BH', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/grupoempregosbh/', {
    country: "Brazil",
    stateCode: "MG",
    city: "Belo Horizonte",
  })

  await ScrapperHelper.init('Facebook => Empregos BH', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/597673520276895/', {
    country: "Brazil",
    stateCode: "MG",
    city: "Belo Horizonte",
  })

  await ScrapperHelper.init('Facebook => Empregos em Belo Horizonte', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/833818616764376/', {
    country: "Brazil",
    stateCode: "MG",
    city: "Belo Horizonte",
  })

  await ScrapperHelper.init('Facebook => Empregos Urgentes BH', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/empregosbhmg/', {
    country: "Brazil",
    stateCode: "MG",
    city: "Belo Horizonte",
  })

  await ScrapperHelper.init('Facebook => Emprego BH', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/557833854267297/', {
    country: "Brazil",
    stateCode: "MG",
    city: "Belo Horizonte",
  })

  await ScrapperHelper.init('Facebook => Melhor Emprego BH', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/718029571552489/', {
    country: "Brazil",
    stateCode: "MG",
    city: "Belo Horizonte",
  })



  /*#############################################################|
  |  >>> SAO PAULO
  *##############################################################*/

  await ScrapperHelper.init('Facebook => Empregos SP', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/empregosessp/', {
    country: "Brazil",
    stateCode: "SP",
    city: "São Paulo",
  })

  await ScrapperHelper.init('Facebook => Grupo Vagas de Emprego Sao Paulo SP', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/grupovagasdeempregosaopaulo', {
    country: "Brazil",
    stateCode: "SP",
    city: "São Paulo",
  })

  await ScrapperHelper.init('Facebook => Vagas de Empregos SP', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/508765489527560/', {
    country: "Brazil",
    stateCode: "SP",
    city: "São Paulo",
  })


  await ScrapperHelper.init('Facebook => Vagas de Empregos SP', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/508765489527560/', {
    country: "Brazil",
    stateCode: "SP",
    city: "São Paulo",
  })

  await ScrapperHelper.init('Facebook => Empregos em Osasco', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/252483528524808/', {
    country: "Brazil",
    stateCode: "SP",
    city: "Osasco",
  })

  await ScrapperHelper.init('Facebook => Empregos Marilia - SP', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/empregosmariliasp/', {
    country: "Brazil",
    stateCode: "SP",
    city: "Marília",
  })

  await ScrapperHelper.init('Facebook => Empregos Marilia SP', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/901278506627755/', {
    country: "Brazil",
    stateCode: "SP",
    city: "Marília",
  })

  await ScrapperHelper.init('Facebook => Ribeirao Preto', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/923149231033037/', {
    country: "Brazil",
    stateCode: "SP",
    city: "Ribeirão Preto",
  })








  return res.status(200).send({
    status: 'ok'
  })
})

postRouter.get('/post', userAuthMiddleware, async (req, res) => {

  const { id, keyword } = req.query;

  // prepare our query

  let rawQuery = {
    ...req.query,
    _id: id
  }
  delete rawQuery.id; // delete this id, since we'll use _id instead
  delete rawQuery.keyword; // remove this key, since we'll pass a specific query below

  if (keyword) {
    const keywordRegex = { $regex: keyword, $options: "i" }

    // add our search query keyword
    rawQuery = {
      ...rawQuery,
      $or: [{ jobRoles: keywordRegex }, { title: keywordRegex }]
    }
  }

  // lets remove any undefined fields from our rawQuery, since we may or not pass stateCode or city
  const searchQuery = _.pickBy(rawQuery, _.identity);

  try {
    const searchPosts = await Post.find(searchQuery).populate('owner')

    if (!searchPosts) {
      return res.status(200).send({
        status: 'error',
        message: LanguageHelper.getLanguageString('post', 'postNotFound')
      })
    }

    return res.status(200).send(searchPosts)
  }
  catch (error) {
    console.error(error);

    return res.status(200).send([])
  }

})

// Like a new post ========================================

postRouter.post('/post/like', userAuthMiddleware, async (req, res) => {

  const { user } = req;

  const { id } = req.body;

  try {

    const post: any = await Post.findOne({ _id: id })

    if (!post) {
      return res.status(401).send({
        status: 'Error',
        message: LanguageHelper.getLanguageString('post', 'postNotFound')
      })
    }

    // check if user didn't like it yet. If so, lets remove a like and remove the users from 'usersWhoLiked' list

    if (post.usersWhoLiked.includes(user._id)) {

      // check if there're likes to reduce

      if (post.likes >= 1) {
        post.likes -= 1;
        post.usersWhoLiked = post.usersWhoLiked.filter((ids) => !user._id.equals(ids))
        await post.save();

      }
      return res.status(200).send(post)
    }


    // if post is found, lets like it



    post.likes += 1;
    post.usersWhoLiked = [
      ...post.usersWhoLiked,
      user._id
    ]
    await post.save()

    return res.status(200).send(post)

  }
  catch (error) {
    console.error(error);

    return res.status(401).send({
      status: 'error',
      message: LanguageHelper.getLanguageString('post', 'postLikeError'),
      details: error.message
    })

  }


})

// Apply to a job post ========================================

postRouter.post('/post/apply', userAuthMiddleware, async (req, res) => {

  const { user } = req;

  const { resumeId, postId, jobRole } = req.body;



  try {

    const appliedToPost = await Post.findOne({ _id: postId })

    if (!appliedToPost) {
      return res.status(401).send({
        status: 'error',
        message: LanguageHelper.getLanguageString('post', 'postNotFound')
      })
    }

    // check if the resume exists

    const resume = await Resume.findOne({ _id: resumeId });

    if (!resume) {
      return res.status(200).send({
        status: 'error',
        message: LanguageHelper.getLanguageString('post', 'postResumeDoesNotExists')
      })
    }

    // check if user already applied to this position

    if (appliedToPost.applications.some((application) => application.resumeId === resumeId)) {
      return res.status(200).send({
        status: 'error',
        message: LanguageHelper.getLanguageString('post', 'postApplicationUserAlreadyApplied')
      })
    }



    const newApplication: IPostApplication = {
      resumeId,
      status: IPostApplicationStatus.Pending,
      jobRole
    }

    appliedToPost.applications = [
      ...appliedToPost.applications,
      newApplication
    ]

    await appliedToPost.save()

    return res.status(200).send(newApplication)

  }
  catch (error) {
    console.error(error);

    return res.status(401).send({
      status: 'error',
      message: LanguageHelper.getLanguageString('post', 'postApplicationError'),
      details: error.message
    })

  }





})




// Post a new post ========================================



postRouter.post('/post', userAuthMiddleware, async (req, res) => {

  const { user } = req;

  const { images, email, phone, } = req.body


  if (!email && !phone) {
    return res.status(400).send({
      status: 'error',
      message: LanguageHelper.getLanguageString('post', 'postEmailAndPhoneNotFound')
    })
  }

  // Post creation ========================================

  try {

    const newPost = new Post({
      ...req.body,

      owner: user._id,
      benefits: req.body.benefits,
      images: []
    })



    if (email && newPost.email) {
      newPost.email = newPost.email.toLowerCase()
    }

    await newPost.save();

    // send push notification to users about new post: //TODO: customize user groups who will receive this notification

    const users = await User.find({})

    for (const u of users) {
      if (u.pushToken !== user.pushToken) {
        PushNotificationHelper.sendPush([u.pushToken], {
          sound: "default",
          body: LanguageHelper.getLanguageString('post', 'postCreationNotification', {
            userName: user.name // post owner's name
          })
          // TODO: Add parameter that redirect users that click on this notification to the recently created post
        })
      }
    }


    // Images file upload ========================================

    const options: IFileSaveOptions = {
      maxFileSizeInMb: 15,
      allowedFileExtensions: ['png', 'jpg', 'jpeg', 'bmp'],
      resizeWidthHeight: {
        width: null,
        height: 600
      }
    }

    const uploadResource = {
      id: newPost._id,
      name: 'post'
    }

    const uploadedFileResult: false | ISaveFileToFolderResult[] = await UploadHelper.uploadFile(uploadResource, 'post', images, options)

    // search for errors

    if (!uploadedFileResult) {
      // if not files were send for upload, just send the new post without images!
      return res.status(200).send(newPost)
    }


    const hasError = uploadedFileResult.some((result) => result.status === "error")

    if (hasError) {


      for (const result of uploadedFileResult) {

        console.log(uploadedFileResult);

        switch (result.errorType) {
          case UploadOutputResult.UnallowedExtension:
            return res.status(400).send({
              status: 'error',
              message: LanguageHelper.getLanguageString(null, 'globalFileTypeError', {
                extension: result.extension,
                acceptedTypes: options.allowedFileExtensions
              })
            })
          case UploadOutputResult.MaxFileSize:
            return res.status(400).send({
              status: 'error',
              message: LanguageHelper.getLanguageString(null, 'globalFileMaximumSize', {
                size: options.maxFileSizeInMb
              })
            })
        }
      }

    }

    try {
      // Save links on database
      const newPostImages = uploadedFileResult.map((result) => result.uri)
      newPost.images = newPostImages
      await newPost.save()
      return res.status(200).send(newPost)
    }
    catch (error) {
      return res.status(400).send({
        status: 'error',
        message: LanguageHelper.getLanguageString(null, 'globalFileUploadError')
      })
    }


  }
  catch (error) {
    console.error(error);
    return res.status(400).send({
      status: 'error',
      message: LanguageHelper.getLanguageString('post', 'postCreationError'),
      details: error.message
    })
  }
})

// delete a new post

postRouter.delete('/post/:id', userAuthMiddleware, async (req, res) => {

  const { user } = req;
  const { id } = req.params

  const post: any = await Post.findOne({
    _id: id
  })



  if (!post) {
    return res.status(404).send({
      status: 'error',
      message: LanguageHelper.getLanguageString('post', 'postNotFound')
    })
  }

  // check if this user is really the owner of this post


  if (!(post.owner._id).equals(user._id)) {
    return res.status(400).send({
      status: 'error',
      message: LanguageHelper.getLanguageString('post', 'postNotOwner')
    })
  }


  try {
    await post.remove();

    return res.status(200).send(post)


  }
  catch (error) {
    console.error(error);
    return res.status(400).send({
      status: 'error',
      message: LanguageHelper.getLanguageString('post', 'postDeletionError'),
      details: error.message
    })
  }



})


export { postRouter }