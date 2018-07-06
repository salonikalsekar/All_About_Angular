var express = require('express');
var router = express();
var mongoose = require('mongoose');
var Book = require('../models/Book.js');
var nodemailer = require('nodemailer');
/* GET ALL BOOKS */
router.get('/', function (req, res, next) {
  Book.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});


/* SAVE BOOK */
router.post('/', function (req, res, next) {
  Book.create(req.body, function (err, post) {
    if (err) return next(err);
   // res.json(post);
  });

  host = req.get('host');

  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: 'isankumarpolarityte@gmail.com', // generated ethereal user
      pass: 'polarityTEHQ' // generated ethereal password
    }
  });

  // setup email data with unicode symbols


  rand = Math.floor((Math.random() * 100) + 54);

  link = "http://" + req.get('host') + "/verify?saloni_id=" + rand;
  console.log(link);


  output = `
  <h3> This is your new email!</h3>
  <div>  
    ISBN: ${req.body.isbn}
    Title: ${req.body.title}
    Hello,<br> Please Click on the link to verify your email.<br><a href="${link}">Click here to verify</a>
  </div>
 
`;
  let mailOptions = {
    from: 'isankumarpolarityte@gmail.com', // sender address
    to: 'isankumarpolarityte@gmail.com', // list of receivers
    subject: 'Hey! you got an email', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
  };


  transporter.sendMail(mailOptions, function (error, response) {
    if (!error) {
      console.log("Message sent: " + response.message);
    }
  });

});

//a ,b  1st, 2nd .. run this code na 
router.get('/verify', function (req, res) {



  //console.log(req.params.id);
  console.log(req.protocol + ":/" + req.get('host'));
  if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
    console.log("Domain is matched. Information is from Authentic email");
    if (req.query.email == rand) {
      console.log("email is verified");
      // res("<h1>Email "+mailOptions.to+" is been Successfully verified");
    } else {
      console.log("email is not verified");
    }
  }

});
// app.listen(3000, () => console.log('Server started...'));

//     let transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 465,
//       auth: {
//           user: 'isankumarpolarityte@gmail.com',
//           pass: 'polarityTEHQ'
//       }

//   });
//   EmailTemplate = require('email-templates').EmailTemplate,
//   path = require('path'),
//   Promise = require('bluebird');

// isbn= "saloni";
// title= "ishan";

//   let data= {
//     isbn : isbn,
//     title: title
//   }


// function sendEmail (obj) {
//     return transporter.sendMail(obj);
// }

// function loadTemplate (templateName, contexts) {
//     let template = new EmailTemplate(path.join(__dirname, 'templates', templateName));
//     return Promise.all(contexts.map((context) => {
//         return new Promise((resolve, reject) => {
//             template.render(context, (err, result) => {
//                 if (err) reject(err);
//                 else resolve({
//                     email: result,
//                     context,
//                 });
//             });
//         });
//     }));
// }

// loadTemplate('updates-april-2017', users).then((results) => {
//     return Promise.all(results.map((result) => {
//         sendEmail({
//             to: result.context.email,
//             from: 'Me :)',
//             subject: result.email.subject,
//             html: result.email.html,
//             text: result.email.text,
//         });
//     }));
// }).then(() => {
//     console.log('Yay!');
// });
//   let mailOptions = {
//       from: 'isankumarpolarityte@gmail.com', // sender address
//       to: 'isankumarpolarityte@gmail.com', // list of receivers
//       subject: req.body.isbn, // Subject line
//       text: isbn,
//       html: "<h1>${isbn} ${title}</h1>"

//   }

//   transporter.sendMail(mailOptions, function (err, info) {
//     if(err)
//       console.log(err)
//     else
//       console.log(info);
//  });

//   });

/* UPDATE BOOK */

module.exports = router;

