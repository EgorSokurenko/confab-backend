const { Contact } = require("../../model/contacts/contact");
const getAdminUsers = async (req, res, next) => {
    let currentContact = []
    if(req.params.contactId){
        await Contact.findOneAndUpdate({_id: req.params.contactId}, {$set:{arrived:true}});
        currentContact = await Contact.find({_id: req.params.contactId});
    }
    const criteria = {
        _id:{$ne:req.params.contactId}
    }
    if(req.query.phone){
        criteria['phone'] = req.query.phone
    }
    if(req.query.name){
        criteria['name'] = { $regex: req.query.name, $options: 'i' }
    }
    const result = await Contact.find(criteria).sort( { "createdAt": -1 } );
    res.status(200).json({
        status: "succsess",
        code: 200,
        data: { users: result, currentUser: currentContact[0] },
    });
};
module.exports = { getAdminUsers };
