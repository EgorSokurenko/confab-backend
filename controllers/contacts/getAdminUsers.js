const { Contact } = require("../../model/contacts/contact");
const nodemailer = require('nodemailer');
const fs = require('fs')
const Path = require('path')
const getTemplate = template => fs.readFileSync(Path.resolve(__dirname, '../../templates/' + template), 'utf8')
const compileTemplate = function (templateData, variablesData) {
    const Handlebars = require('handlebars')
    return Handlebars.compile(templateData)(variablesData)
  }
const getAdminUsers = async (req, res, next) => {
    let currentContact = []
    if(req.params.contactId){
        await Contact.findOneAndUpdate({_id: req.params.contactId}, {$set:{arrived:true}});
        currentContact = await Contact.find({_id: req.params.contactId}).lean();
        currentContact = currentContact[0]
        if(currentContact?.stay?.need){
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
              const body = getTemplate('address.html')
              const template = compileTemplate(layout, {
                content: body,
                styles,
                fonts
            })
              const html = compileTemplate(template, { user: currentContact })
            
              var mailOptions = {
                from: 'profoundconf@gmail.com',
                to: currentContact.email,
                subject: 'Profound Address',
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
    }
    let criteria = {
        _id:{$ne:req.params.contactId}
    }
    if(req.query.phone){
        criteria['phone'] = req.query.phone
    }
    if(req.query.name){
        criteria['name'] = { $regex: req.query.name, $options: 'i' }
    }
    if(req.query.eatingDays && req.query.eatingDays !== 'Голодний'){
      let eatArray = req.query.eatingDays.split(',')
      criteria = {
        ...criteria,
        $and:[{eatingDays:{ $size:  eatArray.length}}, {eatingDays:{ $in:  eatArray}}]
      }
    }else if(req.query.eatingDays === 'Голодний'){
      criteria['eatingDays'] = { $size:  0}
    }
    const result = await Contact.find(criteria).sort( { "createdAt": -1 } );
    res.status(200).json({
        status: "succsess",
        code: 200,
        data: { users: result, currentUser: currentContact },
    });
};
module.exports = { getAdminUsers };
