import { db } from "../database/database.connection.js";

export async function getCustomers(req,res){
    try {
        const list = await db.query('SELECT * FROM customers')
        res.status(200).send(list.rows)
    } catch (err) {
        res.status(501).send(err.message)
    }
}