const cookies = require("cookies");
const userModel = require("../models/userModel");
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "maulikpatel4334@gmail.com",
        pass: "inerlebajixhyjav",
    },
});


const defaultRoute = (req, res) => {

    res.render('register');

}

const homePage = (req,res) => {

    res.render("index")

}

const loginPage = (req, res) => {

    res.render('login');

}

const registerPage = (req, res) => {

    res.render('register');

}

const register = async (req, res) => {

    console.log(req.body);
    try {

        let saltratio = 10;
        const encpass = await bcrypt.hash(req.body.pass, saltratio)

        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            pass: encpass
        })

        await user.save();
        
        const datas = await userModel.find();
        const {email} = req.body
         let isValid = await datas.forEach((data) => {
            if(data.email == email){
                console.log("Email match Successfully");
               return false;

            }
            else{   
                console.log("Email not match");
                return true;
            }
        })
        // let isValid = true;
        // datas.forEach((data) => {
        //     if (data.email === req.body.email) {
        //         console.log("Email match Successfully");
        //         isValid = false;
        //     }
        // });
    

        // console.log(isValid);

        if (isValid) {

            if (req.body.pass === req.body.cpass) {

                // const mail = async () => {
                //     const info = await transporter.sendMail({
                //         from: 'maulikpatel4334@gmail.com', // sender address
                //         to: req.body.email, // list of receivers
                //         subject: "OTP", // Subject line
                //         html: "<b>fghjk</b>",
                //     });
                //     console.log("Message sent: %s", info.messageId);
                // }
                // mail()
                res.redirect("/loginPage")
            }
            else {
                console.log("Password Errer");
                res.redirect("/registerPage")
            }
        }
        else {
            console.log("Email Errer");
            res.redirect("/registerPage")

        }
    }
    catch (err) {
        console.log(err,"Register Errer");
        res.redirect("/registerPage")

    }

}





module.exports = {

    defaultRoute,
    homePage,
    loginPage,
    registerPage,
    register

};