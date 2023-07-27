import { Router } from "express";
import { validateParamSchema, validateSchema } from "../middleware/validateSchema.js";
import { getById, getCustomers, postCustomer } from "../controllers/customers.controllers.js";
import { customerSchema, idSchema } from "../schemas/customers.schemas.js";

const customerRouter = Router()

customerRouter.get("/customers",getCustomers)
customerRouter.get("/customers/:id",validateParamSchema(idSchema),getById)
customerRouter.post("/customers",validateSchema(customerSchema),postCustomer)

export default customerRouter