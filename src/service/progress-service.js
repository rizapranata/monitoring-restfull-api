import { prismaClient } from "../application/database.js";
import { createImageValidation } from "../validation/images-validation.js";
import {
  createProgressValidation,
  getProgressValidation,
  updateProgressValidation,
} from "../validation/progress-validation.js";
import { validate } from "../validation/validation.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const generateRandomId = (length = 8) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const create = async (user, request) => {
  const imageList = [];
  const requestBody = request.body;
  const requestFile = request.files;
  const progressId = generateRandomId();
  const progress = validate(createProgressValidation, requestBody);
  let fileNameList = [];
  let __filename = fileURLToPath(import.meta.url);
  let __dirname = path.dirname(__filename);
  let payloadImage = {};

  requestFile.map((item) => {
    let tmpPath = item.path;
    let originalExt =
      item.originalname.split(".")[item.originalname.split(".").length - 1];

    let fileName = item.filename + "." + originalExt;
    let targetPath = path.resolve(
      path.resolve(__dirname, ".."),
      `public/upload/${fileName}`
    );

    fileNameList.push(fileName);
    // (1) baca file yg masih dilokasi sementara
    const src = fs.createReadStream(tmpPath);
    // (2) pindahkan file ke lokasi permanen
    const dest = fs.createWriteStream(targetPath);
    src.pipe(dest);
  });

  console.log("request file:", fileNameList);

  fileNameList.map((image) => {
    payloadImage = {
      imageUrl: image,
      progressId: progressId,
    };
    imageList.push(validate(createImageValidation, payloadImage));
  });

  console.log("payload progress images:", progress);

  return prismaClient.progress.create({
    data: {
      id: progressId,
      title: progress.title,
      desc: progress.desc,
      username: user.username,
      usernameClient: progress.usernameClient,
      images: {
        create: imageList,
      },
    },
  });
};

const getAll = async (user) => {
  return prismaClient.progress.findMany({
    include: {
      images: true,
    },
  });
};

const get = async (user, progressId) => {
  progressId = validate(getProgressValidation, progressId);

  const totalProgressInDatabase = await prismaClient.progress.count({
    where: {
      id: progressId,
    },
  });

  if (totalProgressInDatabase !== 1) {
    throw new ResponseError(404, "Progress is not found");
  }

  return prismaClient.progress.findFirst({
    where: {
      id: progressId,
    },
    include: {
      images: true,
    },
  });
};

const update = async (user, request) => {
  const progress = validate(updateProgressValidation, request);

  const totalProgressInDatabase = prismaClient.progress.count({
    where: {
      id: progress.id,
    },
  });

  if (totalProgressInDatabase !== 1) {
    throw new ResponseError(404, "Progress is not found");
  }

  return prismaClient.progress.update({
    where: {
      id: progress.id,
    },
    data: {
      id: progress.id,
      title: progress.title,
      desc: progress.desc,
      images: progress.images,
    },
  });
};

export default {
  create,
  get,
  getAll,
  update,
};
