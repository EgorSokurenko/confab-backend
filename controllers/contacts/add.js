const { Contact } = require("../../model/contacts/contact");
const nodemailer = require('nodemailer');
const Path = require('path')
const fs = require('fs')
const getTemplate = template => fs.readFileSync(Path.resolve(__dirname, '../../templates/' + template), 'utf8')
const compileTemplate = function (templateData, variablesData) {
    const Handlebars = require('handlebars')
    return Handlebars.compile(templateData)(variablesData)
  }

const add = async (req, res, next) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json({
    status: "succsess",
    code: 200,
    data: newContact ,
  });
};
module.exports = { add };
