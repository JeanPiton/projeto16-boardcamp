import { Router } from "express";
import { validateSchema } from "../middleware/validateSchema.js";
import { getGames } from "../controllers/games.controllers.js";

const gamesRouter = Router()

gamesRouter.get("/games", getGames)

export default gamesRouter