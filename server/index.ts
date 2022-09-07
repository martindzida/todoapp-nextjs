import express from 'express'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
const app = express()


app.get('/todos', async (req, res) => {
  const prisma = new PrismaClient()
  const todos = await prisma.todo.findMany()
  res.json(todos)
})

const server = app.listen(3333)