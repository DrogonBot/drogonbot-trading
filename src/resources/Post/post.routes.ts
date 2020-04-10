import { Router } from 'express';
import _ from 'lodash';

import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { LanguageHelper } from '../../utils/LanguageHelper';
import { PostHelper } from '../../utils/PostHelper';
import { IFileSaveOptions, ISaveFileToFolderResult, UploadHelper, UploadOutputResult } from '../../utils/UploadHelper';
import { Resume } from '../Resume/resume.model';
import { IPost, IPostApplication, IPostApplicationStatus, Post } from './post.model';

// @ts-ignore
const postRouter = new Router();

export interface IJobReminder {
  userPush: string,
  jobs: IPost[]
}

postRouter.get('/post', async (req, res) => {

  const { id, keyword, limit, page, slug } = req.query;


  // Fetching one post only ========================================

  if (id || slug) {


    try {


      const prePostQuery = {
        _id: req.query.id,
        slug: req.query.slug
      }

      // remove undefined fields from query
      const postQuery = _.pickBy(prePostQuery, _.identity);



      const post = await Post.findOne({
        $or: [postQuery]
      })

      if (post) {
        return res.status(200).send(post)
      } else {
        return res.status(401).send({
          status: 'error',
          message: LanguageHelper.getLanguageString('post', 'postNotFound')
        })
      }




    }
    catch (error) {
      console.error(error);
      return res.status(401).send({
        status: 'error',
        message: LanguageHelper.getLanguageString('post', 'postFetchError')
      })
    }



  }


  // Fetching multiple posts ========================================

  // prepare our query

  let rawQuery = {
    ...req.query,
    _id: id
  }
  delete rawQuery.id; // delete this id, since we'll use _id instead
  delete rawQuery.keyword; // remove this key, since we'll pass a specific query below
  // delete offset and limit, because we'll use it for pagination only
  delete rawQuery.page;
  delete rawQuery.limit;

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

    const paginationOptions = {
      populate: 'owner',
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sort: { createdAt: -1 },

    }

    // @ts-ignore
    const searchPosts = await Post.paginate(searchQuery, paginationOptions)

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
      slug: PostHelper.generateTitleSlug(req.body.title),
      owner: user._id,
      benefits: req.body.benefits,
      images: []
    })



    if (email && newPost.email) {
      newPost.email = newPost.email.toLowerCase()
    }

    await newPost.save();

    // send push notification to users about new post: //TODO: customize user groups who will receive this notification

    // const users = await User.find({})

    // for (const u of users) {
    //   if (u.pushToken !== user.pushToken) {
    //     PushNotificationHelper.sendPush([u.pushToken], {
    //       sound: "default",
    //       body: LanguageHelper.getLanguageString('post', 'postCreationNotification', {
    //         userName: user.name // post owner's name
    //       })
    //       // TODO: Add parameter that redirect users that click on this notification to the recently created post
    //     })
    //   }
    // }


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