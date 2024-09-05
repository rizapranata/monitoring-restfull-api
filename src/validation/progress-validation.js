import Joi from "joi";

const createProgressValidation = Joi.object({
    // id: Joi.string().max(225).required(),
    title: Joi.string().max(225).required(),
    desc: Joi.string().optional(),
    usernameClient: Joi.string().max(100).required(),
    // images: Joi.object().required()
});

const getProgressValidation = Joi.number().positive().required();

const updateProgressValidation = Joi.object({
    id: Joi.number().positive().required(),
    title: Joi.string().max(225).required(),
    desc: Joi.string().optional(),
    // images: Joi.array()
});

const searchProgressValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    title: Joi.string().max(100).optional(),
    // price: Joi.number().positive().optional(),
});

export {
    createProgressValidation,
    getProgressValidation,
    updateProgressValidation,
    searchProgressValidation
}