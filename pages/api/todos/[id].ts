import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma'
import { Todo } from '@prisma/client'


export default async (req:NextApiRequest, res: NextApiResponse<Todo | null>) => {
    const { id } = req.query

    if (typeof id !== "string") {
        return res.status(404)
    }

    const getTodo = await prisma.todo.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    res.status(200).json(getTodo)
    
}