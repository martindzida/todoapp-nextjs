import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../lib/prisma'
import { Todo } from '@prisma/client'


export default async (req:NextApiRequest, res: NextApiResponse<Todo[]>) => {
    //check the req.method === 'GET'
    const todos = await prisma.todo.findMany()
    res.status(200).json(todos)
}