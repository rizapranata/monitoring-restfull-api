import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createProjectValidation,
  getProjectValidation,
  searchProjectValidation,
  updateProjectValidation,
} from "../validation/project-validation.js";
import { validate } from "../validation/validation.js";

const create = async (user, request) => {
  const project = validate(createProjectValidation, request);
  project.username = user.username;

  const totalDataInDatabase = await prismaClient.project.count({
    where: {
      name: project.name,
    },
  });

  if (totalDataInDatabase === 1) {
    throw new ResponseError(400, "Project is already eist");
  }

  const result = await prismaClient.project.create({
    data: project,
    include: {
      progress: true,
    },
  });

  // membuat payment data setelah membuat project baru
  return prismaClient.payment.create({
    data: {
      isSettle: false,
      projectId: result.id,
    },
  });
};

const get = async (user, projectId) => {
  projectId = validate(getProjectValidation, projectId);

  const totalDataInDatabase = await prismaClient.project.count({
    where: {
      id: projectId,
    },
  });

  if (totalDataInDatabase !== 1) {
    throw new ResponseError(400, "Project is not found");
  }

  return prismaClient.project.findFirst({
    where: {
      id: projectId,
    },
    select: {
      name: true,
      desc: true,
      progress: true,
      usernameClient: true,
    },
  });
};

const getAll = async () => {
  return await prismaClient.project.findMany();
}

const search = async (user, request) => {
  request = validate(searchProjectValidation, request);

  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 10
  const skip = (request.page - 1) * request.size;

  const filters = [];

  if (request.name) {
    filters.push({
      name: {
        contains: request.name,
      },
    });
  }

  if (request.usernameClient) {
    filters.push({
      usernameClient: {
        contains: request.usernameClient,
      },
    });
  }

  console.log("filters:", filters);

  const project = await prismaClient.project.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
    include: {
      progress: true,
    },
  });

  const totalItems = await prismaClient.project.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: project,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

const update = async (user, request) => {
  const project = validate(updateProjectValidation, request);
  const totalDataInDatabase = await prismaClient.project.count({
    where: {
      id: project.id,
    },
  });

  if (totalDataInDatabase !== 1) {
    throw new ResponseError(400, "Project is not found");
  }

  return prismaClient.project.update({
    where: {
      id: project.id,
    },
    data: {
      id: project.id,
      name: project.name,
      desc: project.desc,
      // usernameClient: project.usernameClient,
    },
  });
};

const remove = async (user, projectId) => {
  projectId = validate(getProjectValidation, projectId);
  const totalDataInDatabase = await prismaClient.project.count({
    where: {
      id: projectId,
    },
  });

  if (totalDataInDatabase !== 1) {
    throw new ResponseError(400, "Project is not found");
  }

  return prismaClient.project.delete({
    where: {
      id: projectId,
    },
  });
};

export default {
  create,
  get,
  getAll,
  update,
  remove,
  search,
};
