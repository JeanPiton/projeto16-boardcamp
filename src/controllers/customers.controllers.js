import { db } from "../database/database.connection.js";

export async function getCustomers(req,res){
    try {
        const list = await db.query('SELECT * FROM customers')
        res.status(200).send(list.rows)
    } catch (err) {
        res.status(501).send(err.message)
    }
}

export async function getById(req,res){
    const {id} = req.params
    
    try {
        const customer = await db.query('SELECT * FROM customers WHERE id=$1',[id])
        if(customer.rows.length==0) res.sendStatus(404)
        res.status(200).send(customer.rows[0])
    } catch (err) {
        res.status(501).send(err.message)
    }
}