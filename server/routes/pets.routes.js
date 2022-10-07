const PetController = require('../controllers/pets.controllers')
const { addPet, getAllPets, getOnePet, updatePet, deletePet } = PetController


module.exports = (app) => {
    app.get('/api/allPets', getAllPets)
    app.get('/api/petPage/:id', getOnePet)
    app.post('/api/addPet', addPet)
    app.put('/api/update/:id', updatePet)
    app.delete('/api/delete/:id', deletePet)
}