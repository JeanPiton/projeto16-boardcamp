import joi from "joi"

export const idSchema = joi.object({
    id:joi.number().integer().min(0).required()
})