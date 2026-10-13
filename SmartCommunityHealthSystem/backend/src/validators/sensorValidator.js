const Joi = require("joi");

const sensorSchema = Joi.object({
  deviceId: Joi.string().required(),

  location: Joi.string().required(),

  ph: Joi.number()
    .min(0)
    .max(14)
    .required(),

  temperature: Joi.number()
    .min(-20)
    .max(100)
    .required(),

  turbidity: Joi.number()
    .min(0)
    .required(),

  battery: Joi.number()
    .min(0)
    .max(100)
    .optional(),

  firmwareVersion: Joi.string().optional(),

  source: Joi.string()
    .valid("Simulator", "ESP32")
    .default("Simulator"),
});

module.exports = sensorSchema;