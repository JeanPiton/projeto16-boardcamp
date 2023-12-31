import { db } from "../database/database.connection.js";

export async function getCustomers(req,res){
    const cpf = req.query.cpf || ""
    const limit = req.query.limit || null
    const offset = req.query.offset || '0'
    const order = ["id","name","phone","cpf","birthday"].includes(req.query.order)?req.query.order:"id"
    const desc = req.query.desc=='true'?"DESC":"ASC"

    try {
        const list = await db.query(`SELECT *,TO_CHAR(birthday,'YYYY-MM-DD') AS birthday FROM customers WHERE cpf ILIKE $1
        ORDER BY customers."${order}" ${desc} LIMIT $2 OFFSET $3`,[cpf+'%',limit,offset])
        res.status(200).send(list.rows)
    } catch (err) {
        res.status(501).send(err.message)
    }
}

export async function getById(req,res){
    const {id} = req.params
    
    try {
        const customer = await db.query(`SELECT *,TO_CHAR(birthday,'YYYY-MM-DD') AS birthday FROM customers WHERE id=$1`,[id])
        if(customer.rows.length==0) return res.sendStatus(404)
        res.status(200).send(customer.rows[0])
    } catch (err) {
        res.status(501).send(err.message)
    }
}

export async function postCustomer(req,res){
    const {name,phone,cpf,birthday} = req.body
    
    try {
        const exists = await db.query('SELECT * FROM customers WHERE cpf=$1',[cpf])
        if(exists.rows.length!=0) return res.sendStatus(409)
        await db.query('INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4)',[name,phone,cpf,birthday])
        res.sendStatus(201)
    } catch (err) {
        if(err.routine == 'DateTimeParseError') return res.sendStatus(400)
        res.status(501).send(err.message)
    }
}

export async function putCustomer(req,res){
    const {id} = req.params
    const {name,phone,cpf,birthday} = req.body
    
    try {
        const exists = await db.query('SELECT * FROM customers WHERE cpf=$1 AND id!=$2',[cpf,id])
        if(exists.rows.length!=0) return res.sendStatus(409)
        await db.query('UPDATE customers SET name=$1,phone=$2,cpf=$3,birthday=$4 WHERE id=$5',[name,phone,cpf,birthday,id])
        res.sendStatus(200)
    } catch (err) {
        if(err.routine == 'DateTimeParseError') return res.sendStatus(400)
        res.status(501).send(err.message)
    }
}