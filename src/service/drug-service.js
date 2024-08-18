import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { UpdateDrugValidation, createDrugValidation, getDrugValidation, searchDrugValidation } from "../validation/drug-validation.js"
import { validate } from "../validation/validation.js"

const create = async (user, request) => {
    const drug = validate(createDrugValidation, request);
    drug.username = user.username;

    const totalDataInDatabase = await prismaClient.drug.count({
        where: {
            name: drug.name
        }
    });

    if (totalDataInDatabase === 1) {
        throw new ResponseError(400, "Drug is already exist");
    }

    return prismaClient.drug.create({
        data: drug,
        select: {
            id: true,
            name: true,
            price: true,
            description: true,
            username: true,
        }
    })
}

const get = async (user, drugId) => {
    drugId = validate(getDrugValidation, drugId);

    const totalDataInDatabase = await prismaClient.drug.count({
        where: {
            id: drugId
        }
    });

    if (totalDataInDatabase !== 1) {
        throw new ResponseError(404, "Drug is not found")
    }

    return prismaClient.drug.findFirst({
        where: {
            id: drugId
        },
        select: {
            name: true,
            price: true,
            description: true,
            username: true
        }
    })
}

const update = async (user, request) => {
    const drug = validate(UpdateDrugValidation, request);

    const totalDataInDatabase = await prismaClient.drug.count({
        where: {
            id: drug.id
        }
    });

    if (totalDataInDatabase !== 1) {
        throw new ResponseError(404, "Drug is not found")
    }

    return prismaClient.drug.update({
        where: {
            id: drug.id
        },
        data: {
            id: drug.id,
            name: drug.name,
            price: drug.price,
            description: drug.description,
            username: user.username
        }
    })
}

const search = async (user, request) => {
    request = validate(searchDrugValidation, request);

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

    // if (request.price) {
    //     filters.push({
    //         price: {
    //             contains: request.price
    //         }
    //     })
    // }

    const drugs = await prismaClient.drug.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip,
    });

    const totalItems = await prismaClient.drug.count({
        where: {
            AND: filters
        }
    });

    return {
        data: drugs,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size)
        }
    }
}

const remove = async (user, drugId) => {
    drugId = validate(getDrugValidation, drugId);

    const totalDataInDatabase = await prismaClient.drug.count({
        where: {
            id: drugId
        }
    });

    if (!totalDataInDatabase) {
        throw new ResponseError(404, "Drug is not found");
    }

    return prismaClient.drug.delete({
        where: {
            id: drugId
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