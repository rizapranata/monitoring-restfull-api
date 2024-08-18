import Joi from "joi";

const createPolyclinicValidation = Joi.object({
    name: Joi.string().max(100).required(),
    floor: Joi.string().max(20).required(),
});

const getPolyclinicValidation = Joi.number().positive().required();

const updatePolyValidation = Joi.object({
    id: Joi.number().positive().required(),
    name: Joi.string().max(100).required(),
    floor: Joi.string().max(20).required()
});

const searchPolyValidation = Joi.object({
    id: Joi.number().positive().required(),
    name: Joi.string().max(100).required(),
    floor: Joi.string().max(20).required(),
    username: Joi.string().max(20).required(),
})


export {
    createPolyclinicValidation,
    getPolyclinicValidation,
    updatePolyValidation,
    searchPolyValidation
}