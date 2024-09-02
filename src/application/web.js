import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";
import cors from "cors";

export const web = express();
web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use(
  cors({
    origin: "http://localhost:3000", // Sesuaikan dengan origin React.js Anda
  })
);

web.use('/public/upload', express.static('public/upload'));
web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);
