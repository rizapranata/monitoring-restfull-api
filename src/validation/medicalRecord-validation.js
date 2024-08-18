import Joi from "joi";

const createMRValidation = Joi.object({
    noRm: Joi.string().max(20).required(),
    problem: Joi.string().max(100).required(),
    diagnosis: Joi.string().max(200).required(),
    note: Joi.string().max(255).optional(),
});

const updateMRValidation = Joi.object({
    id: Joi.number().positive().required(),
    noRm: Joi.string().max(20).required(),
    problem: Joi.string().max(100).required(),
    diagnosis: Joi.string().max(200).required(),
    note: Joi.string().max(255).optional(),
    username: Joi.string().max(100).optional()
});

const searchMRValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    name: Joi.string().max(100).optional(),
    noRm: Joi.string().max(30).optional(),
});

const getMRValidation = Joi.number().positive().required();

export {
    createMRValidation,
    searchMRValidation,
    getMRValidation,
    updateMRValidation
}