const { Contact } = require("../../model/contacts/contact");
const Counter = require("../../model/contacts/counter");


const add = async (req, res, next) => {
  if(req.body.stay.free && req.body.stay.need){
    const counter = await Counter.findOne({name:'contacts'})
    if(counter?.count >= 90){
      res.status(201).json({
        status: "succsess",
        code: 200,
        error: {message: 'No longer free'}
      })
      return
    }
  }
  const newContact = await Contact.create(req.body);
  res.status(201).json({
    status: "succsess",
    code: 200,
    data: newContact ,
  });
};
module.exports = { add };
