var express = require('express');
var router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser")

router.use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });



/* Request handled */
router.post('/api/sendotp',function(req,response){
    console.log("=========================");
    console.log("send otp post");
    console.log('req : ',req.body);
    let generatedOTP = req.body.otp.trim();
    let mobileNo = req.body.mobileNo.trim();
    console.log("generatedOTP : ",generatedOTP,"  , mobileNo: ",mobileNo);

    
    let sendOtpUrl = "https://control.msg91.com/api/sendotp.php?template=SAM&otp="+generatedOTP+"&otp_length=4&otp_expiry=3&sender=NORTHBBSR&message=Your OTP is "+generatedOTP+"&mobile=+91"+mobileNo+"&authkey=285000A8HDy92z5d296a68";
    
    let request1 = axios.post(sendOtpUrl).then(res => {
        console.log("res.data.type ", res.data.type);
        if (res.data.type == "success") {
            console.log("res : ", res.data);
            response.status(200).json("success");
            generatedOTP="";
            mobileNo="";
        } else
            if (res.data.type == "error") {
                console.log("err");
                response.status(500).json("Error");
            }
    }).catch(err => {
        console.log("error : ", err);
    });

});


router.post('/api/verifyotp',function(req,response){
    console.log("=========================");
    console.log("VerifyOTP req: ",req.body);
    let mobileNo = req.body.mobileNumber;
    let enteredOtp = req.body.enteredOtp;
    console.log("mobileNo : ",mobileNo," , enteredOtp : ",enteredOtp);

    
    let verifyOtpUrl = "https://control.msg91.com/api/verifyRequestOTP.php?authkey=285000A8HDy92z5d296a68&mobile=+91"+mobileNo+"&otp="+enteredOtp;
    
    let request2 = axios.post(verifyOtpUrl).then(res => {
        console.log("res.data.type ", res.data.type);
        if (res.data.type == "success") {
            console.log("res : ", res.data);
            response.status(200).json("success");
            mobileNo="";
            enteredOtp="";

        } else
            if (res.data.type == "error") {
                console.log("err");
                response.status(500).json("Error");
            }
    }).catch(err => {
        console.log("error : ", err);
    });

});

router.post("/api/sendtext",function(req,response){
    console.log("=========================");
    console.log("SendText req :",req.body);
    let complain = "have a complain about my fan";
    let sendTextUrl = "https://api.msg91.com/api/sendhttp.php?mobiles=+919960854833&authkey=285000A8HDy92z5d296a68&route=1&sender=eskolars&message="+complain+"&country=91";
    let sendTextRes = axios.get(sendTextUrl).then(res=>{
        console.log("res.data.type :  ",res.status);
        if(res.status == 200){
            console.log("send text res : ",res.status);
            response.status(200).json("success");
        }else {
            console.log("err");
            response.status(500).json("Error");    
        }
    }).catch(err => {
        console.log("error : ", err);
    });

})




module.exports = router;
