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
    
    const { name, description } = req.body
    //TODO: done might be updated as well

    const delTodo = await prisma.category.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name: name,
            description: description,
        }
    })
    res.status(200).json({message: 'Success'})
}