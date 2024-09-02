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
      title: req.query.title,
    };

    const result = await progressService.search(user, request);
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

export default {
  create,
  search,
  remove
};
