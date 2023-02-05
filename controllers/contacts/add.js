const { Contact } = require("../../model/contacts/contact");
const nodemailer = require('nodemailer');
const add = async (req, res, next) => {
  const newContact = await Contact.create(req.body);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sokurenko337@gmail.com',
      pass: 'tlmcehcnppkmssrp'
    }
  });
  var mailOptions = {
    from: 'sokurenko337@gmail.com',
    to: newContact.email,
    subject: 'Я в 3 метрах от тебя и хочу ЄТОГО.',
    text: 'Привіт! Маєш гарну зачіску'
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.status(201).json({
    status: "succsess",
    code: 200,
    data: { result: newContact },
  });
};
module.exports = { add };
