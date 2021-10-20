const { restart } = require('nodemon');
var Userdb = require('../model/model.js');


//create and save new user
exports.create = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({ message: "Content cant be empty!" });
        return;
    }
    //New User
    const user = new Userdb({
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            status: req.body.status
        })
        //Save user in database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/')
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occured! " });
        });
}


//retrieve and return all users/single user
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id

        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "User not found..!" })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Some error occured!.." })
            })

    } else {
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Some error occured!.." })
            })
    }

}

//Update a new identified user by user id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400)
            .send({ message: "Feilds cant be empty!" })
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModif: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Can not Update user with ${id} User not found` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update user info!!" })
        })
}

//Delete User
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(400).send({ message: `Cannot Delete with id ${id}.Wrong id!!` })
            } else {
                res.send({
                    message: "user was deleted successfully!!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Couldnt delete User!!!"
            });
        });
}