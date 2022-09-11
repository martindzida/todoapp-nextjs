import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma'


export default async (req:NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405);
    }
    
    const { name, description } = req.body
    const todo = await prisma.category.create({
        data:{
            name: name,
            description: description,
        }
    })
    res.status(200).json({message: 'Success'})
}