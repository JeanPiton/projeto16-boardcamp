import { Router } from "express";
import { validateParamSchema, validateSchema } from "../middleware/validateSchema.js";
import { closeRental, deleteRental, getRentals, postRentals } from "../controllers/rentals.controllers.js";
import { paramSchema, rentalSchema } from "../schemas/rentals.schemas.js";

const rentalRouter = Router()

rentalRouter.get("/rentals",getRentals)
rentalRouter.post("/rentals",validateSchema(rentalSchema),postRentals)
rentalRouter.post("/rentals/:id/return",validateParamSchema(paramSchema),closeRental)
rentalRouter.delete("/rentals/:id",validateParamSchema(paramSchema),deleteRental)

export default rentalRouter