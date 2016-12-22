'use strict';

const Joi = require('joi');

exports.contact = Joi.object().keys({
  id: Joi.number().integer(),
  firstName: Joi.string().trim().max(100).allow(''),
  lastName: Joi.string().trim().max(100).allow(''),
  company: Joi.string().trim().max(100).allow(''),
  birthday: Joi.string().trim().isoDate().allow(''),
  note: Joi.string().trim().max(2000).allow(''),
  phoneNumbers: Joi.array().items(Joi.object().keys({
    type: Joi.string().trim().max(25),
    number: Joi.string().trim().max(25)
  })),
  emailAddresses: Joi.array().items(Joi.object().keys({
    type: Joi.string().trim().max(25),
    address: Joi.string().trim().max(250).email()
  })),
  addresses: Joi.array().items(Joi.object().keys({
    type: Joi.string().trim().max(25),
    number: Joi.string().trim().max(100),
    street: Joi.string().trim().max(100),
    postalCode: Joi.string().trim().max(25),
    city: Joi.string().trim().max(100),
    state: Joi.string().trim().max(100).allow(''),
    country: Joi.string().trim().max(100)
  })),
  socialProfiles: Joi.array().items(Joi.object().keys({
    type: Joi.string().trim().max(25),
    username: Joi.string().trim().max(100)
  }))
}).unknown(true);
