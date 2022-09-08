import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../lib/prisma'


export default async (req:NextApiRequest, res: NextApiResponse) => {
    const todos = await prisma.todo.findMany()
    res.status(200).json(todos)
}