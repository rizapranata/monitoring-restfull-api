import Joi from "joi";

const getTransactionValidation = Joi.number().positive().required();

export {
    getTransactionValidation
}
