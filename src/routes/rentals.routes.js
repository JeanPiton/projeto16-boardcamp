import { Router } from "express";
import { validateParamSchema, validateSchema } from "../middleware/validateSchema.js";
import { getRentals, postRentals } from "../controllers/rentals.controllers.js";
import { rentalSchema } from "../schemas/rentals.schemas.js";

const rentalRouter = Router()

rentalRouter.get("/rentals",getRentals)
rentalRouter.post("/rentals",validateSchema(rentalSchema),postRentals)

export default rentalRouter