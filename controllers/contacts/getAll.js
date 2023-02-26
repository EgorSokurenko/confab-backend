const { Contact } = require("../../model/contacts/contact");
const getAll = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  console.log(req.query)
  const skip = (page - 1) * limit;
  const result = await Contact.find({}, "", {
    skip,
    limit: 25,
  }).sort({createdAt:-1});
  res.status(200).json({
    status: "succsess",
    code: 200,
    data: { result: result },
  });
};
module.exports = { getAll };
