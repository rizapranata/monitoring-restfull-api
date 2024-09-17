import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createImageValidation,
  getImageValidation,
} from "../validation/images-validation.js";
import {
  createProgressValidation,
  getProgressValidation,
  searchProgressValidation,
  updateProgressValidation,
} from "../validation/progress-validation.js";
import { validate } from "../validation/validation.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const create = async (user, request) => {
  const imageList = [];
  const requestFile = request.files;
  let requestBody = request.body;

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
      `../public/upload/${fileName}`
    );

    fileNameList.push(fileName);
    // (1) baca file yg masih dilokasi sementara
    const src = fs.createReadStream(tmpPath);
    // (2) pindahkan file ke lokasi permanen
    const dest = fs.createWriteStream(targetPath);
    src.pipe(dest);
  });

  console.log("request file:", fileNameList);
  const progress = validate(createProgressValidation, requestBody);
  const result = await prismaClient.progress.create({
    data: {
      title: progress.title,
      desc: progress.desc,
      username: user.username,
      projectId: progress.projectId,
      usernameClient: progress.usernameClient,
    },
    include: {
      images: true,
    },
  });

  fileNameList.map((image) => {
    payloadImage = {
      imageUrl: image,
      progressId: result.id,
    };
    imageList.push(validate(createImageValidation, payloadImage));
  });

  return prismaClient.image.createMany({
    data: imageList,
  });
};

const search = async (user, request) => {
  request = validate(searchProgressValidation, request);
  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 10

  console.log("req query:", request);


  const skip = (request.page - 1) * request.size;

  const filters = [];

  if (request.title) {
    filters.push({
      title: {
        contains: request.title,
      },
    });
  }

  const progress = await prismaClient.progress.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
    include: {
      images: true,
    },
  });

  const totalItems = await prismaClient.progress.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: progress,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
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

  const totalProgressInDatabase =  await prismaClient.progress.count({
    where: {
      id: progress.id
    }
  })

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
    },
  });
};

const remove = async (user, progressId) => {
  progressId = validate(getProgressValidation, progressId);
  const totalDataInDatabase = await prismaClient.progress.count({
    where: {
      id: progressId,
    },
  });

  if (totalDataInDatabase !== 1) {
    throw new ResponseError(400, "Project is not found");
  }

  return prismaClient.progress.delete({
    where: {
      id: progressId,
    },
    include: {
      images: true,
    },
  });
};

const addImage = async (request) => {
  const requestFile = request.file;
  const progressId = request.body.progressId;
  let __filename = fileURLToPath(import.meta.url);
  let __dirname = path.dirname(__filename);

  let tmpPath = requestFile.path;
  let originalExt =
    requestFile.originalname.split(".")[
      requestFile.originalname.split(".").length - 1
    ];

  let fileName = requestFile.filename + "." + originalExt;
  let targetPath = path.resolve(
    path.resolve(__dirname, ".."),
    `../public/upload/${fileName}`
  );

  // (1) baca file yg masih dilokasi sementara
  const src = fs.createReadStream(tmpPath);
  // (2) pindahkan file ke lokasi permanen
  const dest = fs.createWriteStream(targetPath);
  src.pipe(dest);

  const payloadImage = {
    imageUrl: fileName,
    progressId: progressId,
  };

  const image = validate(createImageValidation, payloadImage);

  return prismaClient.image.createMany({
    data: image,
  });
};

const removeImage = async (imageId) => {
  imageId = validate(getImageValidation, imageId);
  const totalDataInDatabase = await prismaClient.image.count({
    where: {
      id: imageId,
    },
  });

  if (totalDataInDatabase !== 1) {
    throw new ResponseError(400, "Project is not found");
  }

  return prismaClient.image.delete({
    where: {
      id: imageId,
    },
  });
};

export default {
  create,
  get,
  search,
  update,
  remove,
  addImage,
  removeImage,
};
