'use strict'

import { response } from 'express'
import Animal from './animal.model.js'

// Guardar / Registrar un animal
export const registerAnimal = async(req, res)=>{
    try{
        let data = req.body
        let animal = new Animal(data)
        await animal.save()
        return res.send({message: `Registered successfully, can be logged with ${animal.nameAnimal}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering animal', err: err})
    }
}

// Actualizar un animal
export const updateA = async(req, res)=>{ //Datos generales (No password)
    try{
        let { id } = req.params
        let data = req.body
        let update = {data, id}
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        let updatedAnimal = await Animal.findOneAndUpdate(
            {_id: id}, //ObjectsId <- hexadecimales (Hora sys, Version Mongo, Llave privada...)
            data, //Los datos que se van a actualizar
            {new: true} //Objeto de la BD ya actualizado
        )
        if(!updatedAnimal) return res.status(401).send({message: 'Animal not found and not updated'})
        //Respondo al usuario
        return res.send({message: 'Updated animal!', updatedAnimal})
    }catch(err){
        console.error(err)
        if(err.keyValue.nameAnimal) return res.status(400).send({message: `Name for this animal ${err.keyValue.nameAnimal} is alredy taken`})
        return res.status(500).send({message: 'Error updating animal'})
    }
}

// Eliminar un animal
export const deleteA = async(req, res)=>{
    try{
        let { id } = req.params
        let deletedAnimal = await Animal.findOneAndDelete({_id: id}) 
        if(!deletedAnimal) return res.status(404).send({message: 'Animal not found and not deleted'})
        //Responder
        return res.send({message: `Animal with name ${deletedAnimal.nameAnimal} deleted successfully`}) //status 200
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting animal'})
    }
}

// Buscar un animal por su nombre
export const searchAnimal = async(req, res)=>{
    try{
        let { nameAnimal} = req.body
        let animal = await Animal.findOne({nameAnimal}) //buscar un solo registro
        if(animal){
            let animalSave = {
                nameAnimal: animal.nameAnimal,
                typeAnimal: animal.typeAnimal,
                ageAnimal: animal.ageAnimal,
                paws: animal.paws
            }
            //Respondo al usuario
            return res.send({message: `Welcome ${animalSave.nameAnimal}`, animalSave})
        }
        return res.status(404).send({message: 'Invalid credentials',})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to login a Animal'})
    }
}

