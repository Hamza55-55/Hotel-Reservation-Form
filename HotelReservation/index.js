
const app = require('express')();
const bparser = require('body-parser');
const mongoose = require('mongoose');
const hotelReserverModel=require('./models/hotelReservaionModel.js');
const path = require('path');

const PORT= 9090;
const apiKey='mongodb://0.0.0.0:27017/hello_web';
mongoose.connect(apiKey, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("Successfully Connected to mongodb");
  })
  .catch((error) => {
    console.log("Error:", error);
  });
var urlencodedParser = bparser.urlencoded({ extended: true });

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
});

app.set('view engine', 'ejs');

const emptyFilter={};

app.get('/hotelReservationForm',async(req,res)=>{
  res.sendFile(path.join(__dirname, './hotelreservation.html'));
});
app.get('/hotelbooking.css',async(req,res)=>{
  res.sendFile(path.join(__dirname, './hotelbooking.css'));
});

// app.get('/getHotelbookinginfo', urlencodedParser,async(req, res) => {
//   let email=req.query.email;
//    try{
//     const hbookingdata=await hotelReserverModel.findOne({ 'email': email});
//     if (!hbookingdata) {
//       res.send("No booking data found for email."); 
//     }
//     let hotelbooking="";
//     res.send(hotelbooking);
//     console.log("Success:)");
//   } catch(error){
//     console.log("Oops! an error occured",error);
//   }
// });

app.get('/hotelBooking',async(req,res)=>{
  try {
    let result=await hotelReserverModel.find(emptyFilter).exec();
    console.log("Result found="+result.length);
    let hotelsList =new Array(result.length);
    for(let i=0; i < result.length; i++){
      hotelbooked=result[i];
      hotelsList.push(hotelbooked);
    }
    res.render('hotelBooking',{
      listBookedHotels: hotelsList
    });
  } catch (error) {
    console.log("Can't reserve hotel!",error);
  }
});

app.post('/hotelbooking',urlencodedParser,(req,res)=>{
  let {name,email,roomtype,guestno,arrivaldate,arrivaltime,departure,flightno,sprequirement}=req.body;
    try{
      let hoteldata=new hotelReserverModel({
        name,
        email,
        roomtype,
        guestno,
        arrivaldate,
        arrivaltime,
        departure,
        flightno,
        sprequirement
      });
  
      hoteldata.save();
        console.log("Congrats you have reserved the room!");
    } catch(err){
        console.log("error occured oops!",err);
    }
      res.send("Hotel Booked!");
})


