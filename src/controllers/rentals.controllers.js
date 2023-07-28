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
        [customerId,gameId,daysRented,game.rows[0].pricePerDay*daysRented])
        res.sendStatus(201)
    } catch (err) {
        res.status(501).send(err.message)
    }
}

export async function closeRental(req,res){
    const {id} = req.params

    try {
        const rentals = await db.query(`SELECT * FROM rentals WHERE id=$1`,[id])
        if(rentals.rows.length==0) return res.sendStatus(404)
        if(rentals.rows[0].returnDate != null) return res.sendStatus(400)
        await db.query(`UPDATE rentals 
        SET "returnDate"=CURRENT_DATE,
        "delayFee"=(((CURRENT_DATE - $1)-$5)*DIV($2,$3))
        WHERE id=$4`,
        [rentals.rows[0].rentDate,rentals.rows[0].originalPrice,rentals.rows[0].daysRented,id,rentals.rows[0].daysRented])
        res.sendStatus(200)
    } catch (err) {
        res.status(501).send(err.message)
    }
}

export async function deleteRental(req,res){
    const {id} = req.params

    try {
        const rent = await db.query(`SELECT * FROM rentals WHERE id=$1`,[id])
        if(rent.rows.length==0) return res.sendStatus(404)
        if(rent.rows[0].returnDate == null) return res.sendStatus(400)
        await db.query(`DELETE FROM rentals WHERE id=$1`,[id])
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}