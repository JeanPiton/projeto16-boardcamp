import joi from "joi"

export const schemaGame = joi.object({
    name:joi.string().required(),
    image:joi.string(),
    stockTotal:joi.number().integer().min(1).required(),
    pricePerDay:joi.number().integer().min(1).required()
})