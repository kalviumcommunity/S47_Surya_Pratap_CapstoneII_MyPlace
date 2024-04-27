import Joi from "joi";
const validation = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const listingValidation = Joi.object({
  name: Joi.string().min(5).required(),
  description: Joi.string().required(),
  address: Joi.string().max(225).required(),
  regularPrice: Joi.number().min(20).required(),
  discountPrice: Joi.number().min(10),
  bathrooms: Joi.number().min(1).required(),
  bedrooms: Joi.number().min(1).required(),
  furnished: Joi.boolean().required(),
  ACrooms: Joi.boolean().required(),
  parking: Joi.boolean().required(),
  wifiAvailable: Joi.boolean().required(),
  messFacility: Joi.boolean(),
  type: Joi.string().required(),
  offer: Joi.string().required(),
  userRef: Joi.string().required(),
});

export const ListingValidate = validation(listingValidation);
