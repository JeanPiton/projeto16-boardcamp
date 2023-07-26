import { Router } from "express";
import { validateSchema } from "../middleware/validateSchema.js";
import { getGames, postGames } from "../controllers/games.controllers.js";
import { schemaGame } from "../schemas/games.schemas.js";

const gamesRouter = Router()

gamesRouter.get("/games", getGames)
gamesRouter.post("/games",validateSchema(schemaGame),postGames)

export default gamesRouter