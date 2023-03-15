const { Contact } = require("../../model/contacts/contact");
const Counter = require("../../model/contacts/counter");
const deleteById = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await Contact.findOne({_id: id});
  if(contact?.stay?.free){
    await Counter.findOneAndUpdate({name:'contacts'}, {$inc: {count: -1}}, {new:true})
  }
  const deleteContact = await Contact.deleteOne({_id: id});
  if (deleteContact === null) {
    res.status(404).json({ message: `Not found contact with ID:${id}` });
  }
  res.status(200).json({ message: "contact deleted" });
};
module.exports = { deleteById };
