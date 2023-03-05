const { Contact } = require("../../model/contacts/contact");
const nodemailer = require('nodemailer');
const fs = require('fs')
const Path = require('path')
const getTemplate = template => fs.readFileSync(Path.resolve(__dirname, '../../templates/' + template), 'utf8')
const compileTemplate = function (templateData, variablesData) {
    const Handlebars = require('handlebars')
    return Handlebars.compile(templateData)(variablesData)
  }
const putById = async (req, res, next) => {
  const id = req.params.contactId;


  console.log(req.body)
  if(req.body.accepted === true){
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'profoundconf@gmail.com',
        pass: 'vfvneakvapkavhza'
      }
    });
  
    const fonts = getTemplate('fonts.css')
    const styles = getTemplate('style.css')
    const layout = getTemplate('layout.html')
    const body = getTemplate('email.html')
    const template = compileTemplate(layout, {
      content: body,
      styles,
      fonts
  })
    const html = compileTemplate(template, { user: req.body })
  
    var mailOptions = {
      from: 'profoundconf@gmail.com',
      to: req.body.email,
      subject: 'Profound',
      html: html
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }


  const updateContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updateContact) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({
    status: "succsess",
    code: 200,
    data: { result: updateContact },
  });
};
module.exports = { putById };
