import { policyFor } from "../policy/index.js";
import projectService from "../service/project-service.js";

const create = async (req, res, next) => {
  const policy = policyFor(req.user);
  if (!policy.can("create", "Project")) {
    return res.json({
      error: 1,
      message: `You're not allowed to perform this action`,
    });
  }

  try {
    const user = req.user;
    const request = req.body;

    const result = await projectService.create(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "Project")) {
    return res.json({
      error: 1,
      message: `You're not allowed to perform this action`,
    });
  }

  try {
    const user = req.user;
    const request = req.body;
    const projectId = req.params.projectId;
    request.id = projectId;

    const result = await projectService.update(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "Project")) {
    return res.json({
      error: 1,
      message: `You're not allowed to perform this action`,
    });
  }

  try {
    const user = req.user;
    const projectId = req.params.projectId;
    const result = await projectService.get(user, projectId);

    res.status(200).json({
      status: "success",
      message: "get project detail successful",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const search = async (req, res, next) => {
  let policy = policyFor(req.user);
  if (!policy.can("view", "Project")) {
    return res.json({
      error: 1,
      message: `You're not allowed to perform this action`,
    });
  }

  try {
    const user = req.user;
    const request = {
      name: req.query.name,
      usernameClient: req.query.usernameClient,
      page: req.query.page,
      size: req.query.size,
    };

    const result = await projectService.search(user, request);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    res.json({
      error: 1,
      message: e.message,
    });
    next(e);
  }
};

const remove = async (req, res, next) => {
  let policy = policyFor(req.user);
  if (!policy.can("delete", "Project")) {
    return res.json({
      error: 1,
      message: `You're not allowed to perform this action`,
    });
  }


  try {
    const user = req.user;
    const projectId = req.params.projectId;
    const result = await projectService.remove(user, projectId);
    res.status(200).json({
      message: `Project id ${projectId} is success deleted`,
      data: result,
    });
  } catch (e) {
    res.json({
      error: 1,
      message: e.message,
    });
    next(e);
  }
};

export default {
  create,
  update,
  search,
  remove,
  get,
};
