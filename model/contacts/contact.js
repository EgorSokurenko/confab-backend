const { Schema, model } = require("mongoose");
const Joi = require("joi");
const Counter = require('./counter')
const contactSchema = Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  city:{
    type: String,
    required: true,
  },
  church:{
    type: String,
    required: true,
  },
  inst:{
    type: String,
  },
  stay:{
    need: Boolean,
    free: Boolean,
    days: [String],
    count: Number,
    where:{
      name: String,
      phone: String,
      address: String,
      color: String
    }
  },
  presenceDays:[String],
  eatingDays:[String],
  arrived: Boolean,
  accepted: Boolean,
  amount: Number,
  notShowMe: Boolean,
  createdAt:{type:Date, default: Date.now}
});
const validateSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .required(),
  phone: Joi.string().required(),
  dob: Joi.string().required(),
  city: Joi.string().required(),
  church: Joi.string().required(),
  inst: Joi.string().optional().allow(''),
  presenceDays: Joi.array(),
  eatingDays: Joi.array(),
  arrived: Joi.boolean().optional().allow(null),
  accepted: Joi.boolean().optional().allow(null),
  amount: Joi.string().required(),
  stay: Joi.object({
    need: Joi.boolean().required(),
    free: Joi.boolean().required(),
    days: Joi.array(),
    count: Joi.number().required(),
    where:Joi.object({
      name: Joi.string().optional().allow(''),
      phone: Joi.string().optional().allow(''),
      address: Joi.string().optional().allow(''),
      color: Joi.string().optional().allow(''),
    })
  }),
  notShowMe: Joi.boolean().optional(),
});


contactSchema.pre('save', async function () {
  var doc = this
  if(doc.stay.free){
    let counter = await Counter.findOneAndUpdate({name:'contacts'}, {$inc: {count: 1}}, {new:true})
    if(!counter){
      counter = await Counter.create({name:'contacts', count:1})
    }

    doc.stay.count = counter.count
  }
  
});



const Contact = model("contact", contactSchema);
module.exports = { Contact, validateSchema };
