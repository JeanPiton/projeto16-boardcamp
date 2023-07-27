import { db } from "../database/database.connection.js";

export async function getRentals(req,res){
    try {
        const {rows} = await db.query(`SELECT rentals.*,customers.name AS "customerName",games.name AS "gameName" 
        FROM rentals JOIN customers ON rentals."customerId"=customers.id 
        JOIN games ON rentals."gameId"=games.id`)
        const list = rows.map(e=>{
            let {customerName,gameName, ...rest} = e
            return {...rest,customer:{id:e.customerId,name:customerName},game:{id:e.gameId,name:gameName}}})
        res.status(200).send(list)
    } catch (err) {
        res.status(501).send(err.message)
    }
}