import mongoose from 'mongoose';
const Schema = mongoose.Schema

const enquirySchema = new Schema({
    name:String, 
    mobile:String,
    message:String,
    isRead:Boolean,
    created_at:Date,
    updated_at:Date
    
})
const bankSchema = new Schema({
    name: String,
    bankName: String,
    branch:String,
    account:String,
    ifsc:String
})
const priceSchema = new Schema({
    sell9999:String,
    sell999:String,
    sell9950:String,
})

const marketSchema = new Schema({
    market : Boolean
})

let Enquiry = mongoose.model('Enquiry', enquirySchema);
let Bank = mongoose.model('Bank', bankSchema);
let Price = mongoose.model('Price', priceSchema);
let Market = mongoose.model('Market', marketSchema);

export {Enquiry,Bank,Price,Market} 