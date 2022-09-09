import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma'
import { Todo } from '@prisma/client'


export default async (req:NextApiRequest, res: NextApiResponse<Todo>) => {
    /*
    const { id } = req.query
    const getTodo = await prisma.todo.findUnique({
        where: {
            id: id
        }
    })
    res.status(200).json(getTodo)
    */
}