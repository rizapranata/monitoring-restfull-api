import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createPolyclinicValidation, getPolyclinicValidation, updatePolyValidation } from "../validation/poly-validation.js";
import { validate } from "../validation/validation.js"

const create = async (user, request) => {
    const poly = validate(createPolyclinicValidation, request);
    poly.username = user.username;

    const totalDataInDatabase = await prismaClient.polyclinic.count({
        where: {
            name: poly.name
        }
    })

    if (totalDataInDatabase === 1) {
        throw new ResponseError(404, "Polyclinic already exist");
    }

    return prismaClient.polyclinic.create({
        data: poly,
        select: {
            id: true,
            name: true,
            floor: true,
            username: true
        }
    })
}

const get = async (user, polyId) => {
    polyId = validate(getPolyclinicValidation, polyId);

    const poly = await prismaClient.polyclinic.findFirst({
        where: {
            // username: user.username,
            id: polyId
        },
        select: {
            id: true,
            name: true,
            floor: true,
            username: true
        }
    });

    if (!poly) {
        throw new ResponseError(404, "Polyclinic not found");
    }

    return poly;
}

const update = async (user, request) => {
    const poly = validate(updatePolyValidation, request);

    const totalDataInDatabase = await prismaClient.polyclinic.count({
        where: {
            // username: user.username,
            id: poly.id
        }
    });

    if (totalDataInDatabase !== 1) {
        throw new ResponseError(404, "Polyclinic is not found");
    }

    return prismaClient.polyclinic.update({
        where: {
            id: poly.id
        },
        data: {
            id: poly.id,
            name: poly.name,
            floor: poly.floor,
            username: user.username
        },
        select: {
            id: true,
            name: true,
            floor: true,
            username: true
        }
    })
}

const getAll = async () => {
    const totalDataInDatabase = await prismaClient.polyclinic.count();

    if (totalDataInDatabase < 1) {
        throw new ResponseError(404, "Polyclinic is empty");
    }

    return prismaClient.polyclinic.findMany({
        select: {
            id: true,
            name: true,
            floor: true,
            username: true
        }
    })
}

const remove = async (polyId) => {
    const polyclinicId = validate(getPolyclinicValidation, polyId);

    const totalDataInDatabase = await prismaClient.polyclinic.count({
        where: {
            id: polyclinicId
        }
    });

    if (totalDataInDatabase !== 1) {
        throw new ResponseError(404, "Polyclinic is not found");
    }

    return prismaClient.polyclinic.delete({
        where: {
            id: polyclinicId
        }
    })
}

export default {
    create,
    get,
    update,
    getAll,
    remove
}