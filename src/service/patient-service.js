import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createPatientValidation, getPatientValidation, searchPatientValidation, updatePatientValidation } from "../validation/patient-validation.js"
import { validate } from "../validation/validation.js"

const create = async (user, request) => {
    const patient = validate(createPatientValidation, request);
    patient.username = user.username;

    const countPatient = await prismaClient.patient.count({
        where: {
            noRm: patient.noRm
        }
    });

    if (countPatient === 1) {
        throw new ResponseError(400, "No Rekam medis already exist");
    }

    console.log("create patient:", patient);

    return prismaClient.patient.create({
        data: patient,
        select: {
            id: true,
            name: true,
            gender: true,
            age: true,
            noRm: true,
            birth: true,
            email: true,
            phone: true,
            address: true,
            poly: true,
            username: true
        }
    })
}

const update = async (user, request) => {
    const patient = validate(updatePatientValidation, request);

    const totalDataInDatabase = await prismaClient.patient.count({
        where: {
            // username: user.username,
            id: patient.id
        }
    });

    if (totalDataInDatabase !== 1) {
        throw new ResponseError(404, "Patient is not found")
    }

    return prismaClient.patient.update({
        where: {
            id: patient.id
        },
        data: {
            noRm: patient.noRm,
            name: patient.name,
            gender: patient.gender,
            age: patient.age,
            birth: patient.birth,
            email: patient.email,
            phone: patient.phone,
            address: patient.address,
            poly: patient.poly,
            username: user.username
        },
        select: {
            id: true,
            name: true,
            gender: true,
            age: true,
            noRm: true,
            birth: true,
            email: true,
            phone: true,
            address: true,
            poly: true,
            username: true
        }
    })
}

const get = async (user, patientId) => {
    patientId = validate(getPatientValidation, patientId);

    const patient = await prismaClient.patient.findFirst({
        where: {
            // username: user.username,
            id: patientId
        },
        select: {
            id: true,
            name: true,
            gender: true,
            age: true,
            noRm: true,
            birth: true,
            email: true,
            phone: true,
            poly: true,
            address: true
        }
    });

    if (!patient) {
        throw new ResponseError(404, "Patient is not found"); 
    }

    return patient;
}

const search = async (user, request) => {
    request = validate(searchPatientValidation, request);

     // 1 ((page - 1) * size) = 0
    // 2 ((page - 1) * size) = 10
    const skip = (request.page - 1) * request.size;
    
    const filters = [];

    // filters.push({
    //     username: user.username
    // })

    if (request.name) {
        filters.push({
            name: {
                contains: request.name
            }
        })
    }

    if (request.noRm) {
        filters.push({
            noRm: {
                contains: request.noRm
            }
        })
    }

    if (request.email) {
        filters.push({
            email: {
                contains: request.email
            }
        });
    }
    if (request.phone) {
        filters.push({
            phone: {
                contains: request.phone
            }
        });
    }
    if (request.role) {
        filters.push({
            role: {
                contains: request.role
            }
        });
    }

    console.log("filters:", filters);

    const patient = await prismaClient.patient.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip
    });

    const totalItems = await prismaClient.patient.count({
        where: {
            AND: filters
        }
    });

    return {
        data: patient,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size)
        }
    }
}

const remove = async (user, patientId) => {
    patientId = validate(getPatientValidation, patientId);

    const totalDataInDatabase = await prismaClient.patient.count({
        where: {
            // username: user.username,
            id: patientId
        }
    });

    if (!totalDataInDatabase) {
        throw new ResponseError(404, "Patient is not found");
    }

    return prismaClient.patient.delete({
        where: {
            id: patientId
        }
    })

}

export default {
    create,
    update,
    get,
    search,
    remove
}