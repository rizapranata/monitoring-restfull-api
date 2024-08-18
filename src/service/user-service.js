import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getUserValidation, loginUserValidation, registerUserValidation, searchUserValidation, updateUserValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    if (countUser === 1) {
        throw new ResponseError(400, "Username already exist")
    }

    user.password = await bcrypt.hash(user.password, 10)

    return prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true,
            email: true,
            phone: true,
            status: true,
            role: true
        }
    });
}

const create = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    if (countUser === 1) {
        throw new ResponseError(400, "Username already exist")
    }

    user.password = await bcrypt.hash(user.password, 10)

    return prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true,
            email: true,
            phone: true,
            status: true,
            role: true
        }
    });
}

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true
        }
    });

    if (!user) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const token = uuid().toString();
    return prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            username: user.username
        },
        select: {
            token: true,
            username: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            status: true,
            password: true
        }
    })
}

const get = async (username) => {
    username = validate(getUserValidation, username);
    
    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            name: true,
            email: true,
            phone: true,
            status: true,
            role: true
        }
    });

    if (!user) {
        throw new ResponseError(404, "user is not found");
    }

    return user;
}

const update = async (username, request) => {
    const user = validate(updateUserValidation, request);

    const totalUserInDatabase = await prismaClient.user.count({
        where: {
            username: username
        }
    })

    if (totalUserInDatabase !== 1) {
        throw new ResponseError(404, "User is not found");
    }

    const data = {};
    if (user.name) {
        data.name = user.name
    }
    if (user.email) {
        data.email = user.email
    }
    if (user.phone) {
        data.phone = user.phone
    }
    if (user.status) {
        data.status = user.status
    }else{
        data.status = user.status
    }
    if (user.role) {
        data.role = user.role
    }
    if (user.password) {
        data.password = await bcrypt.hash(user.password, 10);
    }

    return prismaClient.user.update({
        where: {
            username: username
        },
        data: data,
        select: {
            username: true,
            name: true,
            email: true,
            phone: true,
            status: true,
            role: true
        }
    })
}

const logout = async (username) => {
    username = validate(getUserValidation, username);
    const user = await prismaClient.user.findUnique({
        where : {
            username: username
        }
    });

    if (!user) {
        throw new ResponseError(404, "user is not found");
    }

    return prismaClient.user.update({
        where: {
            username: username
        },
        data: {
            token: null
        },
        select: {
            username: true
        }
    })
}

const remove = async (username) => {
    username = validate(getUserValidation, username);

    const totalUserInDatabase = await prismaClient.user.count({
        where: {
            username: username
        }
    });

    if (totalUserInDatabase !== 1) {
        throw new ResponseError(404, "Username is not found");
    }

    return prismaClient.user.delete({
        where: {
            username: username
        }
    })
}

const search = async (user, request) => {
    request = validate(searchUserValidation, request);

    // 1 ((page - 1) * size) = 0
    // 2 ((page - 1) * size) = 10
    const skip = (request.page - 1) * request.size;
    
    const filters = [];

    if (request.username) {
        filters.push({
            username: {
                contains: request.username
            }
        })
    }

    if (request.name) {
        filters.push({
            name: {
                contains: request.name
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

    const username = await prismaClient.user.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip
    });

    const totalItems = await prismaClient.user.count({
        where: {
            AND: filters
        }
    });

    return {
        data: username,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size)
        }
    }
}

export default {
    register,
    login,
    get,
    update,
    logout,
    create,
    remove,
    search
}