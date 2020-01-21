import fileType from 'file-type';
import fs from 'fs';
import randomstring from 'randomstring';
import sharp from 'sharp';

import { publicDirectory } from '..';

interface IResizeObj {
  width: number | null,
  height: number
}

export interface IFileSaveOptions {
  maxFileSizeInMb: number;

  allowedFileExtensions: string[],
  resizeWidthHeight?: IResizeObj
}

export interface IUploadResource {
  id: string,
  name: string,
}

export enum UploadOutputResult {
  UnallowedExtension,
  MaxFileSize
}

export interface ISaveFileToFolderResult {
  status: String,
  fileName?: String,
  errorType?: UploadOutputResult,
  extension?: String,
  uri?: String
}

export class UploadHelper {

  public static uploadFile = async (resource: IUploadResource, fileSubdirectory: string, filesStreamArray: any[], options: IFileSaveOptions) => {
    return Promise.all(filesStreamArray.map(async (fileStream) => {

      // read file and buffer
      const data = fs.readFileSync(fileStream.path);
      const buffer = Buffer.from(data)
      // @ts-ignore
      const fileExtension = fileType(buffer).ext;


      return UploadHelper.saveFileToFolder(fileSubdirectory, resource.id, fileExtension, buffer, options)

    }))


  }



  public static checkAllowedExtension = (extension, allowedExtensions) => {

    if (!allowedExtensions.includes(extension)) {
      return false
    }
    return true;

  }

  // imagesSubdirectory: should be a directory name inside public/images



  public static saveFileToFolder = async (fileSubdirectory: string, fileName: string, extension: string, buffer: Buffer, options: IFileSaveOptions): Promise<ISaveFileToFolderResult> => {

    if (!UploadHelper.checkAllowedExtension(extension, options.allowedFileExtensions)) {
      return {
        status: 'error',
        errorType: UploadOutputResult.UnallowedExtension,
        extension,
      }
    }

    if (buffer.byteLength >= (options.maxFileSizeInMb * 1000000)) {
      return {
        status: 'error',
        errorType: UploadOutputResult.MaxFileSize
      }
    }


    let editedImageBuffer;

    if (extension === "png" || extension === "jpg" || extension === "bmp" || extension === "jpeg") {
      // edit only if its an image
      editedImageBuffer = await sharp(buffer)
        .resize(options.resizeWidthHeight)
        .jpeg()
        .toBuffer();
    } else {
      editedImageBuffer = buffer; // do nothing
    }



    // Subdirectories creation ========================================

    const imagesSubdirectoryPath = `${publicDirectory}/files/${fileSubdirectory}`

    if (!fs.existsSync(imagesSubdirectoryPath)) {
      fs.mkdirSync(imagesSubdirectoryPath)
    }

    const fileDirectory = `${publicDirectory}/files/${fileSubdirectory}/${fileName}`

    // check if directory does not exists

    if (!fs.existsSync(fileDirectory)) {
      fs.mkdirSync(fileDirectory) // create if it doesnt
    }

    // check number of files we already have on the folder
    const files = fs.readdirSync(fileDirectory)
    const randomHash = randomstring.generate({
      length: 12,
      charset: 'alphabetic'
    });
    const fileFullName = `${randomHash}_${files.length}.${extension}`; // make sure we always have an unique name

    const filePath = `${fileDirectory}/${fileFullName}`

    fs.writeFileSync(filePath, editedImageBuffer)


    return {
      status: 'success',
      fileName,
      uri: `/files/${fileSubdirectory}/${fileName}/${fileFullName}`,
      extension
    };
  }
}