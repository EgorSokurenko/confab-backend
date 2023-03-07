const { Contact } = require("../../model/contacts/contact");
const Counter = require("../../model/contacts/counter");
const nodemailer = require('nodemailer');
const Path = require('path')
const fs = require('fs')

const add = async (req, res, next) => {
  // if(req.body.stay.free && req.body.stay.need){
  //   let counter = await Counter.findOneAndUpdate({name:'contacts'}, {$inc: {count: 1}}, {new:true})
  //   if(!counter){
  //     counter = await Counter.create({name:'contacts',count:1})
  //   }

  //   req.body.stay.count = counter.count
  // }
  const newContact = await Contact.create(req.body);
  res.status(201).json({
    status: "succsess",
    code: 200,
    data: newContact ,
  });
};
module.exports = { add };
