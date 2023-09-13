const mongoose=require('mongoose');
const { Schema } = mongoose;
const hotelReserverSchema= new Schema({
    name:String,
    email:String,
    roomtype:String,
    guestno:Number,
    arrivaldate:Date,
    arrivaltime:String,
    departure:Date,
    flightno:String,
    sprequirement:String

});
module.exports=mongoose.model('hotel_booking',hotelReserverSchema);