import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req,res)=>{
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })

    try {
        await food.save();
        res.status(200).json({
            msg:"新增成功"
        })
    }catch (error){
        res.status(500).json({
            msg:`${error}`
        })
    }
}

const listFood = async(req,res)=>{
    try {
        const foods = await foodModel.find({});
        res.status(200).json({
            msg:"查詢成功",
            foods
        })
    }catch (error){
        console.log(error);
        res.status(500).json({
            msg:`${error}`
        })
    }
}

const removeFood = async (req,res)=>{
    try{
        const food = await foodModel.findById(req.body._id);
        fs.unlink(`uploads/${food.image}`,()=>{});
        await foodModel.findByIdAndDelete(req.body._id);
        res.status(200).json({
            msg:"移除成功"
        });
    }catch (error){
        res.status(500).json({
            msg:`${error}`
        });
    }
}

const testCoor = async(req,res)=>{
    try{
        console.log(req.body);
        res.status(200).json({
            msg:"已收到"
        });
    }catch (error){
        res.status(500).json({
            msg:`${error}`
        });
    }
}

export {
    addFood,
    listFood,
    removeFood,
    testCoor
}