const { Contact } = require("../../model/contacts/contact");
const getForStay = async (req, res, next) => {
    const criteria = [
        {
            $match:{
                'stay.need':true,
                
            }
        }
    ]
    if(req.query.phone){
        criteria.push({$match:{phone: req.query.phone}})
    }
    if(req.query.name){
        criteria.push({$match:{name: { $regex: req.query.name, $options: 'i' }}})
    }
    if(req.query.church){
        criteria.push({$match:{church: { $regex: req.query.church, $options: 'i' }}})
    }
    // const result = await Contact.find(criteria).sort( { "createdAt": -1 } );
    const result = await Contact.aggregate([
        ...criteria,
        {
            $group: {
               _id: { $trim: { input: "$church" } },
               users: { $push: "$$ROOT" }
            }
          }
    ]).sort({ _id: 1 })
    
    res.status(200).json({
        status: "succsess",
        code: 200,
        data: { users: result },
    });
};
module.exports = { getForStay };
