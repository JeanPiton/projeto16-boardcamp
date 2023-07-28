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

export async function postRentals(req,res){
    const {customerId,gameId,daysRented} = req.body

    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id=$1`,[customerId])
        const game = await db.query(`SELECT * FROM games WHERE id=$1`,[gameId])
        const rents = await db.query(`SELECT * FROM rentals WHERE "gameId"=$1`,[gameId])
        if(customer.rows.length==0||game.rows.length==0||rents.rows.length>=game.rows[0].stockTotal) return res.sendStatus(400)

        await db.query(`INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","originalPrice")
        VALUES ($1,$2,CURRENT_DATE,$3,$4)`,
        [customerId,gameId,daysRented,game.rows[0].stockTotal*daysRented])
        res.sendStatus(201)
    } catch (err) {
        res.status(501).send(err.message)
    }
}