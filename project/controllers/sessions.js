const User = require('../models').User;

module.exports = {
    new: (req,res) => {
        res.render('sessions/new');
    },
    create: (req,res) => {
        User.login(req.body.email, req.body.password)
            .then(user => {
                if(user){
                    req.session.userId = user.id;
                }
            })
            .catch(err=>{
                console.log(err);
                res.json(err);
            })
    }
}