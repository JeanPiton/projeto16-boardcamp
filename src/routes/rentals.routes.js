import { Router } from "express";
import { validateParamSchema, validateSchema } from "../middleware/validateSchema.js";
import { getRentals } from "../controllers/rentals.controllers.js";

const rentalRouter = Router()

rentalRouter.get("/rentals",getRentals)

export default rentalRouter