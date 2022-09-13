import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../lib/prisma'
import { Todo } from '@prisma/client'


export default async (req:NextApiRequest, res: NextApiResponse<Todo[]>) => {
    if (req.method !== 'GET') {
        return res.status(405);
    }
    const todos = await prisma.todo.findMany({
        include: { categories: true }
    })
    res.status(200).json(todos)
}