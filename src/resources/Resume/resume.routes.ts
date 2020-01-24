import express from 'express';

import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { LanguageHelper } from '../../utils/LanguageHelper';
import { RouterHelper } from '../../utils/RouterHelper';
import { IFileSaveOptions, ISaveFileToFolderResult, UploadHelper, UploadOutputResult } from '../../utils/UploadHelper';
import { Place } from '../Place/place.model';
import { IResumeAttachment, Resume } from './resume.model';

// @ts-ignore
const resumeRouter = new express.Router();

resumeRouter.get("/resume/:resumeId", userAuthMiddleware, async (req, res) => {

  const { resumeId } = req.params

  try {
    const resume = await Resume.findOne({
      _id: resumeId
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
  const { stateCode, cityName } = req.body

  try {

    const place = await Place.findOne({ stateCode });

    if (!place) {
      throw new SyntaxError('Invalid stateCode');
    }

    const city = place.cities.find((cityData) => cityData.cityName === cityName)

    if (!city) {
      throw new SyntaxError('City not found');
    }

    place.cities = [city]

    const resume = new Resume({
      ...req.body,
      ownerId: user._id,
      certificates: [],
      place
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

resumeRouter.patch('/resume/:resumeId', userAuthMiddleware, async (req, res) => {

  const { user } = req;
  const { resumeId } = req.params

  try {
    const resume = await Resume.findOne({
      _id: resumeId
    })

    if (!resume) {
      return res.status(400).send({
        status: 'error',
        message: LanguageHelper.getLanguageString('resume', 'resumeNotFound'),
      })
    }

    if (!resume.ownerId.equals(user._id)) {

      console.log(resume._id);
      console.log(user._id);

      return res.status(400).send({
        status: 'error',
        message: LanguageHelper.getLanguageString('resume', 'resumeUserNotAuthorized'),
      })
    }


    if (
      !RouterHelper.isAllowedKey(req.body, ["positionsOfInterest", "highlights", "country", "stateUf", "city", "address", "phone", "linkedInUrl", "educations", "attachments", "experiences", "awards", "additionalInfos"])
    ) {
      return res.status(400).send({
        status: "error",
        message: LanguageHelper.getLanguageString(
          "resume",
          "resumePatchForbiddenKeys"
        )
      });
    }

    // if everything is allright, execute the update

    const keysToUpdate = Object.keys(req.body)

    keysToUpdate.forEach((key) => resume[key] = req.body[key])

    await resume.save();

    return res.status(200).send(resume)

  }
  catch (error) {
    console.error(error);

    return res.status(400).send({
      status: 'error',
      message: LanguageHelper.getLanguageString('resume', 'resumeUpdateError'),
      details: error.message
    })


  }



})



resumeRouter.post('/resume/:resumeId/attachments', userAuthMiddleware, async (req, res) => {

  const { user } = req;
  const { resumeId } = req.params;
  const { attachments } = req.body

  // find resume and check if user is the owner

  const resume = await Resume.findOne({
    _id: resumeId
  })

  // Resume not found
  if (!resume) {
    return res.status(400).send({
      status: 'error',
      message: LanguageHelper.getLanguageString('resume', 'resumeNotFound')
    })
  }

  // check if request user is really the owner of this resource

  if (!resume.ownerId.equals(user._id)) {
    return res.status(400).send({
      status: 'error',
      message: LanguageHelper.getLanguageString('resume', 'resumeUserNotAuthorized')
    })
  }

  // lets start the upload process

  const options: IFileSaveOptions = {
    maxFileSizeInMb: 15,
    allowedFileExtensions: ['png', 'jpg', 'jpeg', 'bmp', 'pdf', 'doc', 'docx'],
    resizeWidthHeight: {
      width: null,
      height: 600
    }
  }

  const uploadResource = {
    id: resume._id,
    name: 'resume'
  }

  const uploadedFileResult: ISaveFileToFolderResult[] | false = await UploadHelper.uploadFile(uploadResource, 'resume', attachments, options)



  // search for errors

  if (!uploadedFileResult) {
    return res.status(400).send({
      status: 'error',
      message: LanguageHelper.getLanguageString('resume', 'resumeAttachmentNotFound')
    })
  }


  const hasError = uploadedFileResult.some((result) => result.status === "error")

  if (hasError) {


    for (const result of uploadedFileResult) {
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

    const newAttachments: IResumeAttachment[] = uploadedFileResult.map((result) => {
      return { name: result.fileName, link: result.uri }
    })

    resume.attachments = [
      ...resume.attachments,
      ...newAttachments
    ]

    await resume.save()

    return res.status(200).send(resume.attachments)
  }
  catch (error) {
    return res.status(400).send({
      status: 'error',
      message: LanguageHelper.getLanguageString('resume', 'resumeFileUploadError'),
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