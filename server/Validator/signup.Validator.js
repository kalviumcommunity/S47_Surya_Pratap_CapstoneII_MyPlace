import Joi from "joi";
const validation = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false })

const userValidation = Joi.object({
    userName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required()
})

export const ValidateUser = validation(userValidation)