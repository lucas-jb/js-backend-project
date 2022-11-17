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
    edit: (req,res)=>{
        Task.findByPk(req.params.id).then((task)=>{
            res.render('tasks/edit',{task:task})
        });
    },
    destroy: (req,res)=>{
        Task.destroy({
            where: {
                id: req.params.id
            }
        }).then((contadorElementosEliminados)=>{
            res.redirect('/tasks');
        });
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
    update: (req,res)=>{
        Task.update({description: req.body.description},{
            where: {
                id: req.params.id
            }
        }).then((response)=>{
            res.redirect(req.params.id);
        })
    },
    new: (req,res)=>{
        res.render('tasks/new');
    }
};

