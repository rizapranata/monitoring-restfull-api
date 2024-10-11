import express from "express";
import userController from "../controller/user-controller.js";
import progressController from "../controller/progress-controller.js";
import projectController from "../controller/project-controller.js";
import paymentController from "../controller/payment-controller.js";

const publicRouter = new express.Router();

// Super user API
publicRouter.post('/api/users', userController.register);
publicRouter.post('/api/users/login', userController.login);
publicRouter.get('/api/progresses', progressController.getAllProgress);
publicRouter.get('/api/projects/all', projectController.getAllProject);
publicRouter.get('/api/payment', paymentController.getAll);

export {
    publicRouter
}