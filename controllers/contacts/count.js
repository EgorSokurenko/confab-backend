const Counter = require("../../model/contacts/counter");
const nodemailer = require('nodemailer');
const Path = require('path')
const fs = require('fs')

const count = async (req, res, next) => {
  const data = await Counter.find({name:'contacts'});
  let count = 1
  if(data[0]?.count){
    count = data[0].count
  }
  res.status(201).json({
    status: "succsess",
    code: 200,
    data: count ,
  });
};
module.exports = { count };
