import Joi from "joi";
const validation = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const listingValidation = Joi.object({
  name: Joi.string().max(10).required(),
  description: Joi.string().required(),
  address: Joi.string().max(4).required(),
  regularPrice: Joi.number().required(),
  discountPrice: Joi.number(),
  bathrooms: Joi.number().required(),
  bedrooms: Joi.number().required(),
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
