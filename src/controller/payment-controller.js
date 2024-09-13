import paymentService from "../service/payment-service.js";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;

    console.log("req body:", request);

    const result = await paymentService.create(user, request);
    res.status(200).json({
      data: result,
      status: "success",
      message: "create payment successful",
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const paymentId = req.params.paymentId;
    request.id = parseInt(paymentId);

    console.log("req update:", request);

    const result = await paymentService.update(user, request);
    res.status(200).json({
      data: result,
      status: "success",
      message: "update payment successful",
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const user = req.user;
    const paymentId = req.params.paymentId;
    const result = await paymentService.get(user, paymentId);

    res.status(200).json({
      status: "success",
      message: "get payment detail successful",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await paymentService.getAll(user);

    res.status(200).json({
      status: "success",
      message: "get all payment successful",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  update,
  get,
  getAll
};
