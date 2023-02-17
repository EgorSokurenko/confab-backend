const { Contact } = require("../../model/contacts/contact");
const nodemailer = require('nodemailer');
const add = async (req, res, next) => {
  const newContact = await Contact.create(req.body);
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'sokurenko337@gmail.com',
  //     pass: 'tlmcehcnppkmssrp'
  //   }
  // });
  // var mailOptions = {
  //   from: 'sokurenko337@gmail.com',
  //   to: '2002mark.a@gmail.com',
  //   subject: 'Я в 3 метрах от тебя и хочу ЄТОГО.',
  //   html: "<b>Hello world?</b> <span style='color:red; font-size:25px;'>Mark lox</span>",
  // };
  // transporter.sendMail(mailOptions, function(error, info){
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });
  res.status(201).json({
    status: "succsess",
    code: 200,
    data: newContact ,
  });
};
module.exports = { add };
