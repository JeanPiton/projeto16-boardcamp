import joi from "joi"

export const rentalSchema = joi.object({
    customerId:joi.number().integer().min(0).required(),
    gameId:joi.number().integer().min(0).required(),
    daysRented:joi.number().integer().min(1).required()
})

export const paramSchema = joi.object({
    id:joi.number().integer().min(0).required()
})