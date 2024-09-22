import Joi from "joi";

const createPaymentValidation = Joi.object({
    isSettle: Joi.boolean().default(false).required(),
    projectId: Joi.number().positive().required(),
});

const getPaymentValidation = Joi.number().positive().required();

const updatePaymentValidation = Joi.object({
    id: Joi.number().positive().required(),
    isSettle: Joi.boolean().required(),
});

export {
    createPaymentValidation,
    getPaymentValidation,
    updatePaymentValidation,
}