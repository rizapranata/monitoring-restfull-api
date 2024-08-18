import Joi from "joi";

const createPrintMRValidation = Joi.object({
    noRm: Joi.string().max(20).required(),
    problem: Joi.string().max(100).required(),
    diagnosis: Joi.string().max(200).required(),
    note: Joi.string().max(255).optional(),
    doctorName: Joi.string().max(100).required(),
    doctorEmail: Joi.string().max(100).optional(),
    doctorPhone: Joi.string().max(100).required(),
    doctorStatus: Joi.boolean().default(false),
    doctorSpecialist: Joi.string().max(100).required(),
    doctorPolyName: Joi.string().max(100).required(),
    patientId: Joi.number().positive().required(),
});

const getPrintMRValidation = Joi.number().positive().required();

const searchMedicalRecValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    name: Joi.string().max(100).optional(),
    noRm: Joi.string().max(20).optional(),
})

export {
    createPrintMRValidation,
    searchMedicalRecValidation,
    getPrintMRValidation
}