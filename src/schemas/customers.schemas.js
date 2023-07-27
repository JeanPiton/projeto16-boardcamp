import joi from "joi"

export const idSchema = joi.object({
    id:joi.number().integer().min(0).required()
})

export const customerSchema = joi.object({
    name:joi.string().required(),
    phone:joi.string().regex(/^\d+$/).min(10).max(11).required(),
    cpf:joi.string().regex(/^\d+$/).length(11).required(),
    birthday:joi.date().iso().required()
})