import { Router } from "express";
import { validateSchema } from "../middleware/validateSchema.js";
import { getCustomers } from "../controllers/customers.controllers.js";

const customerRouter = Router()

customerRouter.get("/customers",getCustomers)

export default customerRouter