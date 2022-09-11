import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma'


export default async (req:NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405);
    }
    
    const { name, description, priority, deadline } = req.body
    const todo = await prisma.todo.create({
        data:{
            name: name,
            description: description,
            priority: priority,
            deadline: deadline
        }
    })
    res.status(200).json({message: 'Success'})
}