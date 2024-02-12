import express from 'express'
import { deleteA, registerAnimal, searchAnimal, updateA } from './animal.controller.js'

const api = express.Router()

api.post('/registerAnimal', registerAnimal)
api.put('/updateA/:id', updateA)
api.delete('/deleteA/:id', deleteA)
api.post('/searchAnimal', searchAnimal)

export default api