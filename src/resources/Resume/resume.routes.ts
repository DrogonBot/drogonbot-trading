import express from 'express';

import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { LanguageHelper } from '../../utils/LanguageHelper';
import { Resume } from './resume.model';

// @ts-ignore
const resumeRouter = new express.Router();

resumeRouter.get("/resume/:userId", userAuthMiddleware, async (req, res) => {

  const { userId } = req.params

  try {
    const resume = await Resume.findOne({
      ownerId: userId
    })

    return res.status(200).send(resume);
  }
  catch (error) {
    res.status(400).send({
      status: 'error',
      message: LanguageHelper.getLanguageString('resume', 'resumeNotFound')
    })

  }
});

resumeRouter.post('/resume', userAuthMiddleware, async (req, res) => {

  const { user } = req;

  try {
    const resume = new Resume({
      ...req.body,
      ownerId: user._id,
      certificates: []
    })
    await resume.save()

    res.status(200).send(resume)



  }
  catch (error) {
    res.status(400).send({
      status: 'error',
      message: LanguageHelper.getLanguageString('resume', 'resumeCreationError'),
      details: error.message
    })
  }


})

resumeRouter.delete("/resume/:resumeId", userAuthMiddleware, async (req, res) => {

  const { user } = req

  const { resumeId } = req.params;

  try {

    const resume = await Resume.findOne({
      _id: resumeId
    })

    // check if this user is really the owner of this post

    if (resume) {
      if (!resume.ownerId.equals(user._id)) {
        return res.status(400).send({
          status: 'error',
          message: LanguageHelper.getLanguageString('post', 'postNotOwner')
        })
      }

      await resume.remove()



      return res.status(200).send(resume);
    } else {
      res.status(400).send({
        status: 'error',
        message: LanguageHelper.getLanguageString('resume', 'resumeNotFound')
      });
    }

  } catch (error) {
    res.status(400).send({
      status: 'error',
      message: LanguageHelper.getLanguageString('resume', 'resumeDeletionError'),
      details: error.message
    });
  }
});


export { resumeRouter };