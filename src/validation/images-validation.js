import Joi from "joi";

const createImageValidation = Joi.object({
    imageUrl: Joi.string().max(225).required(),
    progressId: Joi.number().required()
});

const getImageValidation = Joi.number().positive().required();

const updateProgressValidation = Joi.object({
    id: Joi.number().positive().required(),
    title: Joi.string().max(225).required(),
    desc: Joi.string().optional(),
    images: Joi.array()
});

const searchDrugValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    name: Joi.string().max(100).optional(),
    // price: Joi.number().positive().optional(),
});

export {
    createImageValidation,
    getImageValidation,
    updateProgressValidation,
    searchDrugValidation
}