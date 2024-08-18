import Joi from "joi";

const createDrugValidation = Joi.object({
    name: Joi.string().max(100).required(),
    price: Joi.number().positive().required(),
    description: Joi.string().max(255).optional(),
});

const getDrugValidation = Joi.number().positive().required();

const UpdateDrugValidation = Joi.object({
    id: Joi.number().positive().required(),
    name: Joi.string().max(100).required(),
    price: Joi.number().positive().required(),
    description: Joi.string().max(255).optional(),
});

const searchDrugValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    name: Joi.string().max(100).optional(),
    // price: Joi.number().positive().optional(),
});

export {
    createDrugValidation,
    getDrugValidation,
    UpdateDrugValidation,
    searchDrugValidation
}