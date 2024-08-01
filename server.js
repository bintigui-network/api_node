import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const app = express()
app.use(express.json())
app.use(cors())

app.post('/usuarios', async (req, res) => {
    await prisma.user.create({
        data: {
           email: req.body.email,
           name: req.body.name,
           age: req.body.age
        }
    })
    res.status(201).json(req.body)
})
app.get('/usuarios', async (req, res) => {
    let users = []
    if(req.query) {
       users = await prisma.user.findMany({
            where: {
                name: req.query.name
            }
       })
    } else {
        users = await prisma.user.findMany()
    }
    res.status(200).json(users)
})
app.put('/usuarios/:id', async (req, res) => {
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
})
app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: "Usuario deletado !" })
})
app.listen(3000)

// Criar a nossa API de usuarios !

/*
  1=> Tipo de Rota / Método HTTP
  2=> Endereço

 */