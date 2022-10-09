const express= require('express');
const router = express.Router();
const Task = require('../models/task.model');

router.get('/', async(req, res) => {
    const tasksFound = await Task.find();
    res.json(tasksFound);

    console.log({
        amor1:"Amada Mia",
        amor2:"Trompas",
        amor3:"Chuililis"
    })
});

router.get('/:id', async(req, res) =>{
    const taskFound = await Task.findById(req.params.id);
    res.json(taskFound);
});

router.post('/', async (req, res) => {
    const {title, description} = req.body;
    const newTask = new Task({title, description});
    await newTask.save();
    res.json({status : 'Tarea Creada'});
});

router.put('/:id', async (req, res)=> {
    const {title, description} = req.body;
    const task = {title, description};
    const foundTask = await Task.findByIdAndUpdate(req.params.id, task);
    res.json({status:'Tarea actuailzada'});

});

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({status: 'Tarea eliminada'});
});

module.exports = router;
