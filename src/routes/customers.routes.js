import { Router } from "express";
import { validateParamSchema, validateSchema } from "../middleware/validateSchema.js";
import { getById, getCustomers } from "../controllers/customers.controllers.js";
import { idSchema } from "../schemas/customers.schemas.js";

const customerRouter = Router()

customerRouter.get("/customers",getCustomers)
customerRouter.get("/customers/:id",validateParamSchema(idSchema),getById)

export default customerRouter