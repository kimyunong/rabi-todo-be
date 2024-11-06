const Task = require('../model/Task');
const taskController = {};

taskController.createTask = async(req,res)=>{

    try{
        
        const {task,isComplete} = req.body;
        const newTask = new Task({task,isComplete});
        await newTask.save();

        res.status(200).json({status:"success",data:newTask});

        }catch(error){

        res.status(400),json({status:"fail",error:error});

    }
};

taskController.getTask = async(req,res)=>{

    try{

        const taskList = await Task.find({}).select("-__v");
        res.status(200).json({status:'success',data:taskList});

    }catch(error){

        res.status(400),json({status:'fail',error:error});

    }

};

taskController.updateTask = async(req,res)=>{

    try{

        const taskId = req.params.id;

        if(!taskId){
            throw new Error("App can not find the task");
        }

        const {task,isComplete} = req.body;

        const updateTask = await Task.findByIdAndUpdate(
            {_id:taskId},
            {task,isComplete}
        );

        await updateTask.save();

        res.status(200).json({status:"success",data:updateTask});

    }catch(error){

        res.status(400).json({status:"fail",error:error});

    }

}

taskController.deleteTask = async(req,res)=>{

    try{

        const taskId = req.params.id;

        const deleteTask = await Task.findByIdAndDelete({_id:taskId});
        res.status(200).json({status:"success",data:deleteTask});

    }catch(error){

        res.status(400).json({status:"fail",error:error});

    }

}


module.exports = taskController;