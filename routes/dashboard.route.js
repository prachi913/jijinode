const express = require("express");
const { DashModel } = require("../models/dashboard.model");
const dashRouter = express.Router();

dashRouter.post("/employees",async(req,res)=>{
    const payload=req.body;
    try{
       await DashModel.insertMany(payload);
       res.send(payload);
    }catch(err){
       res.send({"msg":err.message});
    }
})

dashRouter.patch("/update/:id",async(req,res)=>{
    const{id}=req.params;
    try{
       await DashModel.findByIdAndUpdate({_id:id},req.body);
       res.send("Data is updated");
    }catch(err){
        res.send({"msg":err.message});
    }
})

dashRouter.delete("/delete/:id",async(req,res)=>{
    const{id}=req.params;
    try{
       await DashModel.findByIdAndDelete({_id:id});
       res.send("Data is deleted");
    }catch(err){
        res.send({"msg":err.message});
    }
})

  dashRouter.get("/:id",async(req,res)=>{
    const {id}=req.params;
    try{
       const data=await DashModel.findById(id);
       res.send(data);
    }catch(err){
        res.send({"msg":err.message});
    }
})

  dashRouter.get("/",async(req,res)=>{
        const {department,page,limit,sort,first_name}=req.query;
         console.log(department,page,limit,sort);
         let query={};
         let search = {};
        try{
            if(department){
                query.department=department
            }
    
            let skip;
            if(page){
                skip=(page-1)*limit;
            }else{
                skip=0;
            }
            let sorting;
            if(sort=="asc"){
              sorting={salary:1};
            }
    
            if(sort=="desc"){
                sorting={salary:-1}
            }
            if (first_name) {
                search.first_name = first_name;
            }
            if (first_name) {
                search.first_name = { $regex: first_name, $options: "i" };
            }
           const data=await DashModel.find(query).find(search).sort(sorting).skip(skip).limit(limit);
           res.send(data);
        }catch(err){
            res.send({"msg":err.message});
        }
    })

module.exports = { dashRouter }