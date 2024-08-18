import { policyFor } from "../policy/index.js";
import drugService from "../service/drug-service.js";

const create = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("create", "Drug")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const user = req.user;
        const request = req.body;

        const result = await drugService.create(user, request);
        res.status(200).json({
            status: "success",
            message: "create drug successful",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const get = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("read", "Drug")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const user = req.user;
        const drugId = req.params.drugId;

        const result = await drugService.get(user, drugId);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("update", "Drug")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const user = req.user;
        const drugId = req.params.drugId;
        const request = req.body;
        request.id = drugId;

        const result = await drugService.update(user, request);
        res.status(200).json({
            status: "success",
            message: "update drug successful",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const search = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("view", "Drug")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const user = req.user;
        const request = {
            name: req.query.name,
            // price: req.query.price
        };

        const result = await drugService.search(user, request);
        res.status(200).json({
            data: result.data,
            paging: result.paging
        })
    } catch (e) {
        next(e)
    }
}

const remove = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("delete", "Drug")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const user = req.user;
        const drugId = req.params.drugId;

        await drugService.remove(user, drugId);
        res.status(200).json({
            status: "success",
            message: "delete drug successful",
            data: `success delete drug with id ${drugId}`
        })
    } catch (e) {
        next(e)
    }
}

export default {
    create,
    update,
    get,
    search,
    remove
}