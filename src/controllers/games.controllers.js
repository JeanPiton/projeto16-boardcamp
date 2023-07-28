import { db } from "../database/database.connection.js"

export async function getGames(req,res){
    const name = req.query.name || ""
    const limit = req.query.limit || null
    const offset = req.query.offset || '0'

    try {
        const games = await db.query(`SELECT * FROM games WHERE name ILIKE $1 LIMIT $2 OFFSET $3`,[name+'%',limit,offset])
        res.status(200).send(games.rows)
    } catch (err) {
        res.status(501).send(err.message)
    }
}

export async function postGames(req,res){
    const {name,image,stockTotal,pricePerDay} = req.body

    try {
        const used = await db.query("SELECT * FROM games WHERE name = $1 LIMIT 1;",[name])
        if(used.rows.length>0) return res.sendStatus(409)
        await db.query('INSERT INTO games (name,image,"stockTotal","pricePerDay") VALUES($1,$2,$3,$4);',[name,image,stockTotal,pricePerDay])
        res.sendStatus(201)
    } catch (err) {
        res.status(501).send(err.message)
    }
}