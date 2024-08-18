import medicalRecordService from "../service/medicalRecord-service.js";
import { policyFor } from "../policy/index.js";

const create = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("create", "MedicalRecord")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const user = req.user;
        const request = req.body;

        const result = await medicalRecordService.create(user, request);
        res.status(200).json({
            status: "success",
            message: "create medical record successful",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("update", "MedicalRecord")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const user = req.user;
        const request = req.body;
        const medicalRecordId = req.params.medicalRecordId;
        request.id = medicalRecordId;

        const result = await medicalRecordService.update(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const get = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("read", "MedicalRecord")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const user = req.user;
        const medicalRecordId = req.params.medicalRecordId;

        const result = await medicalRecordService.get(user, medicalRecordId);
        res.status(200).json({
            status: "success",
            message: "get medical record successful",
            data: result
        })
    } catch (e) {
        res.json({
            error: 1,
            message: e.message,
            fields: e.errors,
        });

        next(e)
    }
}

const search = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("view", "MedicalRecord")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const user = req.user;
        const request = {
            name: req.query.name,
            noRm: req.query.noRm,
            page: req.query.page,
            size: req.query.size
        };
        console.log("request MR 1:", request);

        const result = await medicalRecordService.search(user, request);
        res.status(200).json({
            status: "success",
            message: "get all medical records successful",
            data: result.data,
            paging: result.paging,
        })
    } catch (e) {
        next(e)
    }
}

const remove = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("delete", "MedicalRecord")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const user = req.user;
        const medicalRecordId = req.params.medicalRecordId;
        await medicalRecordService.remove(user, medicalRecordId);
        res.status(200).json({
            status: "success",
            message: "delete medical record successful",
            data: `medical record with id ${medicalRecordId} is already deleted!`
        })
    } catch (e) {
        res.json({
            error: 1,
            message: e.message
        })
        next(e)
    }
}

export default {
    create,
    search,
    remove,
    update,
    get
}