import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../lib/prisma'


export default async (req:NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405);
    }
    
    const d = new Date()
    //const {name, description, priority, done, deadline} = req.body
    const todo = await prisma.todo.create({
        data:{
            name: 'Post requests',
            description: 'New todos are coming',
            deadline: d,
        }
    })
    res.status(200).json({message: 'Success'})
}