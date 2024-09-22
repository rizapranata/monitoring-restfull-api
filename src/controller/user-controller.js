import { policyFor } from "../policy/index.js";
import userService from "../service/user-service.js"

const register = async (req, res, next) => {
    // let policy = policyFor(req.user);
    // if (!policy.can("create", "User")) {
    //     return res.json({
    //         error: 1,
    //         message: `You're not allowed to perform this action`,
    //     })
    // };

    try {
        const result = await userService.register(req.body);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const create = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("create", "User")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const request = req.body;
        const result = await userService.register(request);
        res.status(200).json({
            message: "Success create user",
            data: result
        })
    } catch (e) {
        res.json({
            error: 1,
            message: e.message
        })
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            message: "login successful",
            data: result
        })
    } catch (e) {
        res.json({
            error: 1,
            message: "login failed",
        })
        next(e)
    }
}

const get = async (req, res, next) => {
    try {
        const username = req.user.username;
        const userParams = req.params.username;
        const result = await userService.get(userParams);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("update", "User")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const request = req.body;
        const username = req.params.username;
        const result = await userService.update(username, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const logout = async (req, res, next) => {
    try {
        await userService.logout(req.user.username);
        res.status(200).json({
            data: "Ok"
        })
    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("delete", "User")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    };

    try {
        const user = req.params.username;
        await userService.remove(user);
        res.status(200).json({
            data: `${user.username} is already deleted!`
        })
    } catch (e) {
        res.json({
            error: 1,
            message: `terjadi kesalahan`,
        })
        next(e)
    }
}

const search = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("read", "User")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    };

    try {
        const user = req.user;
        const request = {
            name: req.query.name,
            email: req.query.email,
            phone: req.query.phone,
            role: req.query.role,
            page: req.query.page,
            size: req.query.size
        };

        const result = await userService.search(user, request);
        res.status(200).json({
            data: result.data,
            paging: result.paging
        });
    } catch (e) {
        next(e)
    }
}

export default {
    register,
    login,
    get,
    update,
    logout,
    create,
    remove,
    search
}