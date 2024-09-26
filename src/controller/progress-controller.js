import { policyFor } from "../policy/index.js";
import progressService from "../service/progress-service.js";

const create = async (req, res, next) => {
  let policy = policyFor(req.user);
  if (!policy.can("create", "Progress")) {
    return res.json({
      error: 1,
      message: `You're not allowed to perform this action`,
    });
  }

  try {
    const user = req.user;
    const request = req.body;
    const files = req.files;

    console.log("Request body:", request);
    console.log("Request images:", files);

    const result = await progressService.create(user, req);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getAllProgress = async (req, res, next) => {
  // let policy = policyFor(req.user);
  // if (!policy.can("view", "Progress")) {
  //   return res.json({
  //     error: 1,
  //     message: `You're not allowed to perform this action`,
  //   });
  // }

  try {
    const result = await progressService.getAll();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  let policy = policyFor(req.user);
  if (!policy.can("view", "Progress")) {
    return res.json({
      error: 1,
      message: `You're not allowed to perform this action`,
    });
  }

  try {
    const user = req.user;
    const request = {
      projectId: req.query.projectId,
      title: req.query.title,
      page: req.query.page,
      size: req.query.size,
    };

    const result = await progressService.search(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const user = req.user;
    const progressId = req.params.progressId;

    const result = await progressService.get(user, progressId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  let policy = policyFor(req.user);
  if (!policy.can("update", "Progress")) {
    return res.json({
      error: 1,
      message: `You're not allowed to perform this action`,
    });
  }

  try {
    const user = req.user;
    const request = req.body;
    const progressId = req.params.progressId;
    request.id = progressId;

    const result = await progressService.update(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  let policy = policyFor(req.user);
  if (!policy.can("delete", "Progress")) {
    return res.json({
      error: 1,
      message: `You're not allowed to perform this action`,
    });
  }

  try {
    const user = req.user;
    const progressId = req.params.progressId;
    const result = await progressService.remove(user, progressId);
    res.status(200).json({
      message: `Progress id ${progressId} is success deleted`,
      data: result,
    });
  } catch (error) {
    res.json({
      error: 1,
      message: error.message,
    });
    next(error);
  }
};

const addImage = async (req, res, next) => {
  try {
    const result = await progressService.addImage(req);
    res.status(200).json({
      success: true,
      message: `Added image is success`,
      data: result,
    });
  } catch (error) {
    res.json({
      error: 1,
      success: false,
      message: error.message,
    });
    next(error);
  }
};

const removeImage = async (req, res, next) => {
  try {
    const imageId = req.params.imageId;
    const result = await progressService.removeImage(imageId);
    res.status(200).json({
      success: true,
      message: `Image id ${imageId} is success deleted`,
      data: result,
    });
  } catch (error) {
    res.json({
      error: 1,
      success: false,
      message: error.message,
    });
    next(error);
  }
};

export default {
  create,
  search,
  remove,
  update,
  addImage,
  removeImage,
  getAllProgress,
  get,
};
