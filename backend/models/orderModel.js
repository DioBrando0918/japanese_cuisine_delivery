import mongoose from "mongoose";
import moment from "moment";

const orderSchema = new mongoose.Schema({
    orderNo:{type:String,required:true},
    paymentType:{type:String},
    userId:{type:String,required:true},
    merchandise:{type:Array,required:true},
    totalPrice:{type:Number,required:true},
    address:{type:String,required:true},
    status:{type:String,default:'Food processing'},
    createTime:{type:String,default: () => moment().format('YYYY-MM-DD HH:mm:ss')},
    paymentTime:{type:String},
    payment:{type:Boolean,default:true}
});

const orderModel = mongoose.models.order || new mongoose.model('order',orderSchema);

export default orderModel;