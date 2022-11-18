const Task = require('../models').Task;
const User = require('../models').User;

module.exports = {
    index: (req,res)=>{
        Task.findAll().then(tasks=>{
            res.render('tasks/index',{tasks:req.user.tasks});
        })
    },
    show: (req,res)=>{
        Task.findByPk(req.params.id,{
            include: [
                {
                    model: User,
                    as: 'user'
                },
                'categories'
            ]
        }).then((task)=>{
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
            description: req.body.description,
            userId:  req.user.id
        }).then(result=>{
            res.json(result);
        }).catch(err=>{
            console.log(err);
            res.json(err);
        });
    },
    update: (req,res)=>{
        let task = Task.findByPk(req.params.id).then(task=>{
            task.description = req.body.description;
            task.save().then(()=>{
                let categoryIds = req.body.categories.split(",");
                
                task.addCategories(categoryIds).then(()=>{
                    res.redirect(`/tasks/${task.id}`);
                })
            })
        })
    },
    new: (req,res)=>{
        res.render('tasks/new');
    }
};

