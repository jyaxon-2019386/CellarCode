import mongoose, { mongo } from "mongoose";

const userShema = mongoose.Schema({
    nameAnimal: {
        type: String,
        required: true
    },
    typeAnimal: {
        type: String,
        required: true
    },
    ageAnimal: {
        type: String,
        required: true
    },
    paws: {
        type: String
    },
    keeper: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }

})

export default mongoose.model('animal', userShema)