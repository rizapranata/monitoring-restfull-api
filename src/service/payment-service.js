import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createPaymentValidation,
  getPaymentValidation,
  updatePaymentValidation,
} from "../validation/payment-validation.js";
import { validate } from "../validation/validation.js";

const create = async (user, request) => {
  const payment = validate(createPaymentValidation, request);

  const totalDataInDatabase = await prismaClient.payment.count({
    where: {
      projectId: payment.projectId,
    },
  });

  if (totalDataInDatabase === 1) {
    throw new ResponseError(400, "Project is already eist");
  }

  return prismaClient.payment.create({
    data: payment,
    include: {
      project: true,
    },
  });
};

const get = async (user, paymentId) => {
  paymentId = validate(getPaymentValidation, paymentId);

  const totalDataInDatabase = await prismaClient.payment.count({
    where: {
      id: paymentId,
    },
  });

  if (totalDataInDatabase !== 1) {
    throw new ResponseError(400, "Project is not found");
  }

  return prismaClient.payment.findFirst({
    where: {
      id: paymentId,
    },
    include: {
      project: true,
    },
  });
};

const getAll = async (user) => {
  const totalDataInDatabase = await prismaClient.payment.count();

  if (totalDataInDatabase <= 0) {
    throw new ResponseError(400, "Payment is empty");
  }

  return prismaClient.payment.findMany({
    include: {
      project: true,
    },
  });
};

const update = async (user, request) => {
  const payment = validate(updatePaymentValidation, request);
  console.log("payload service:", payment);

  const totalDataInDatabase = await prismaClient.payment.count({
    where: {
      id: payment.id,
    },
  });

  if (totalDataInDatabase !== 1) {
    throw new ResponseError(400, "Project is not found");
  }

  return prismaClient.payment.update({
    where: {
      id: payment.id,
    },
    data: {
      id: payment.id,
      isSettle: payment.isSettle,
    },
    include: {
      project: true,
    },
  });
};

export default {
  create,
  get,
  update,
  getAll
};
