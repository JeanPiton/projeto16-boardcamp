import { Router } from "express";
import { validateParamSchema, validateSchema } from "../middleware/validateSchema.js";
import { closeRental, getRentals, postRentals } from "../controllers/rentals.controllers.js";
import { paramSchema, rentalSchema } from "../schemas/rentals.schemas.js";

const rentalRouter = Router()

rentalRouter.get("/rentals",getRentals)
rentalRouter.post("/rentals",validateSchema(rentalSchema),postRentals)
rentalRouter.post("/:id/rentals",validateParamSchema(paramSchema),closeRental)

export default rentalRouter