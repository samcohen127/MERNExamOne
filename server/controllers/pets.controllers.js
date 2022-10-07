const Pet = require('../models/pets.model')


module.exports = {
    getAllPets: (req, res) => {
        Pet.find()
            .then((result) => {
                res.json(result)
            }).catch((err) => {
                res.status(400).json(err)
            })
    },
    getOnePet: (req, res) => {
        Pet.findById(req.params.id)
            .then((result) => {
                res.json(result)
            }).catch((err) => {
                res.status(400).json(err)
            })
    },
    addPet: (req, res) => {
        Pet.create(req.body)
            .then((result) => {
                res.json(result)
            }).catch((err) => {
                res.status(400).json(err)
            })
    },
    updatePet: (req, res) => {
        Pet.updateOne({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then((result) => {
                res.json(result)
            }).catch((err) => {
                res.status(400).json(err)
            })
    },

    deletePet: (req, res) => {
        Pet.remove({ _id: req.params.id })
            .then((result) => {
                res.json(result)
            }).catch((err) => {
                res.status(400).json(err)
            })
    }
}