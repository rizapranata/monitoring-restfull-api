import { prismaClient } from "../application/database.js";
import {
  getPrintMRValidation,
  searchMedicalRecValidation,
} from "../validation/printMedicalRecord-validation.js";
import { validate } from "../validation/validation.js";

const get = async (medicalRecordId) => {
  medicalRecordId = validate(getPrintMRValidation, medicalRecordId);

  const medicalRec = await prismaClient.printMedicalRecord.findFirst({
    where: {
      id: medicalRecordId,
    },
    select: {
      id: true,
      noRm: true,
      note: true,
      problem: true,
      diagnosis: true,
      doctorName: true,
      doctorEmail: true,
      doctorPhone: true,
      doctorStatus: true,
      doctorSpecialist: true,
      doctorPolyName: true,
      patientId: true,
      createdAt: true,
      patient: true
    },
  });

  if (!medicalRec) {
    throw new ResponseError(404, "Patient is not found");
  }

  return medicalRec;
};

const search = async (request) => {
  request = validate(searchMedicalRecValidation, request);

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

  if (request.noRm) {
    filters.push({
      noRm: {
        contains: request.noRm,
      },
    });
  }

  console.log("filters:", filters);

  const printMedRec = await prismaClient.printMedicalRecord.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
    include: {
      patient: true,
    },
  });

  const totalItems = await prismaClient.printMedicalRecord.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: printMedRec,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

const remove = async (medicalRecordId) => {
  medicalRecordId = validate(getPrintMRValidation, medicalRecordId);

  const totalDataInDatabase = await prismaClient.printMedicalRecord.count({
    where: {
      id: medicalRecordId,
    },
  });

  if (!totalDataInDatabase) {
    throw new ResponseError(404, "Medical record is not found");
  }

  return prismaClient.printMedicalRecord.delete({
    where: {
      id: medicalRecordId,
    },
  });
};

export default {
  search,
  remove,
  get,
};
