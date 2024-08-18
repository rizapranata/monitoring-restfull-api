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
        data: result
    });
  } catch (e) {
    next(e);
  }
}

export default {
    create,
}