const Task = require('../models').Task;

module.exports = {
    index: (req,res)=>{
        Task.findAll().then(tasks=>{
            res.render('tasks/index',{tasks:tasks});
        })
    },
    show: (req,res)=>{
        Task.findByPk(req.params.id).then((task)=>{
            res.render('tasks/show',{task:task});
        })
    },
    create: (req, res) => {
        Task.create({
            description: req.body.description
        }).then(result=>{
            res.json(result);
        }).catch(err=>{
            console.log(err);
            res.json(err);
        });
    },
    new: (req,res)=>{
        res.render('tasks/new');
    }
};

