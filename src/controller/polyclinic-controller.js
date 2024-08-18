import { policyFor } from "../policy/index.js";
import polyclinicService from "../service/polyclinic-service.js";

const create = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("create", "Polyclinic")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const user = req.user;
        const request = req.body;

        console.log("request body:", request);

        const result = await polyclinicService.create(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const get = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("read", "Polyclinic")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const user = req.user;
        const polyId = req.params.polyId;

        const result = await polyclinicService.get(user, polyId);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("update", "Polyclinic")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const user = req.user;
        const polyId = req.params.polyId;
        const request = req.body;
        request.id = polyId;

        const result = await polyclinicService.update(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const getAll = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("view", "Polyclinic")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const result = await polyclinicService.getAll();
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const remove = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("delete", "Polyclinic")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const polyId = req.params.polyId;
        console.log("Poly Id:", polyId);
        await polyclinicService.remove(polyId);
        res.status(200).json({
            data: `polyclinic id ${polyId} is already deleted!`
        })
    } catch (e) {
        next(e)
    }
}

export default {
    create,
    get,
    update,
    getAll,
    remove
}