import express from "express"
import cors from "cors"
import { authMiddleware } from "../middleware/auth-middleware.js"
import userController from "../controller/user-controller.js";
import patientController from "../controller/patient-controller.js";
import polyclinicController from "../controller/polyclinic-controller.js";
import drugController from "../controller/drug-controller.js";
import medicalRecordController from "../controller/medicalRecord-controller.js";
import printMedicalRecordController from "../controller/printMedicalRecord-controller.js";
import progressController from "../controller/progress-controller.js";
import projectController from "../controller/project-controller.js";
import multer from "multer";
import os from "os";
import paymentController from "../controller/payment-controller.js";

const userRouter = new express.Router()
userRouter.use(authMiddleware)

// User API
userRouter.get('/api/users/current/:username', userController.get);
userRouter.patch('/api/users/:username', userController.update);
userRouter.post('/api/users/logout', userController.logout);
userRouter.post('/api/users/create', userController.create);
userRouter.delete('/api/users/delete/:username', userController.remove);
userRouter.get('/api/users', userController.search);

// Patient API
userRouter.post('/api/patients/create', patientController.create);
userRouter.put('/api/patients/:patientId', patientController.update);
userRouter.get('/api/patients/:patientId', patientController.get);
userRouter.delete('/api/patients/:patientId', patientController.remove);
userRouter.get('/api/patients', patientController.search);

// Polyclinic API
userRouter.post('/api/polyclinics/create', polyclinicController.create);
userRouter.get('/api/polyclinics/:polyId', polyclinicController.get);
userRouter.put('/api/polyclinics/:polyId', polyclinicController.update);
userRouter.get('/api/polyclinics', polyclinicController.getAll);
userRouter.delete('/api/polyclinics/:polyId', polyclinicController.remove);

//Drug API
userRouter.post('/api/drugs/create', drugController.create);
userRouter.put('/api/drugs/:drugId', drugController.update);
userRouter.get('/api/drugs/:drugId', drugController.get);
userRouter.get('/api/drugs', drugController.search)
userRouter.delete('/api/drugs/:drugId', drugController.remove);

// MedicalRecord API
userRouter.post('/api/medical-records', medicalRecordController.create);
userRouter.get('/api/medical-records', medicalRecordController.search);
userRouter.delete('/api/medical-records/:medicalRecordId', medicalRecordController.remove);
userRouter.put('/api/medical-records/:medicalRecordId', medicalRecordController.update);
userRouter.get('/api/medical-records/:medicalRecordId', medicalRecordController.get);

//MedicalRecord Print API
userRouter.get('/api/print-medical-records/:medicalRecordId', printMedicalRecordController.get);
userRouter.get('/api/print-medical-records', printMedicalRecordController.search);
userRouter.delete('/api/print-medical-records/:medicalRecordId', printMedicalRecordController.remove);

// Progress API
userRouter.post('/api/progress', multer({ dest: os.tmpdir() }).array('images', 12), progressController.create);
userRouter.post('/api/progress/add-image', multer({ dest: os.tmpdir() }).single('images', 12), progressController.addImage);
userRouter.get('/api/progress', progressController.search);
userRouter.get('/api/progresses', progressController.getAllProgress);
userRouter.get('/api/progress/:progressId', progressController.get);
userRouter.put('/api/progress/:progressId', progressController.update);
userRouter.delete('/api/progress/:progressId', progressController.remove);
userRouter.delete('/api/progress/image/:imageId', progressController.removeImage);

// Project API
userRouter.get('/api/projects', projectController.search);
userRouter.post('/api/project', projectController.create);
userRouter.get('/api/projects/all', projectController.getAllProject);
userRouter.get('/api/project/:projectId', projectController.get);
userRouter.put('/api/project/:projectId', projectController.update);
userRouter.delete('/api/project/:projectId', projectController.remove);

// Payment API
userRouter.post('/api/payment', paymentController.create);
userRouter.put('/api/payment/:paymentId', paymentController.update);
userRouter.get('/api/payment/:paymentId', paymentController.get);
userRouter.get('/api/payment', paymentController.getAll);

export {
    userRouter
}