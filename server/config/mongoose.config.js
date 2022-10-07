const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/petshelterdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => {
    console.log('Successfully connected to PetShelterDB')
}).catch((err) => {
    console.log(err)
})