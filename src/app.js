import express, { json } from "express"
import cors from "cors"

const server = express()

server.use(cors())
server.use(json())

const port = process.env.PORT || 5000
server.listen(port,()=>{console.log(`Server running at http://localhost:${port}`)})