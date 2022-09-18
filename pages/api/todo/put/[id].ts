import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../lib/prisma'


export default async (req:NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'PUT') {
        return res.status(405);
    }

    const { id } = req.query
    
    if (typeof id !== "string") {
        return res.status(404)
    }
    
    const { name, description, priority, deadline } = req.body

    const delTodo = await prisma.todo.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name: name,
            description: description,
            priority: priority,
            deadline: deadline
        }
    })
    res.status(200).json({message: 'Success'})
}