import Joi from "joi";

const createProjectValidation = Joi.object({
    name: Joi.string().max(225).required(),
    desc: Joi.string().optional(),
    usernameClient: Joi.string().max(100).required(),
});

const getProjectValidation = Joi.number().positive().required();

const updateProjectValidation = Joi.object({
    id: Joi.number().positive().required(),
    name: Joi.string().max(225).required(),
    desc: Joi.string().optional(),
    // usernameClient: Joi.string().max(100).required(),
});

const searchProjectValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    name: Joi.string().max(100).optional(),
    usernameClient: Joi.string().max(100).optional(),
});

export {
    createProjectValidation,
    getProjectValidation,
    updateProjectValidation,
    searchProjectValidation
}