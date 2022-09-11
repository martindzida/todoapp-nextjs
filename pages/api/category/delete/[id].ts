import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../lib/prisma'


export default async (req:NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'DELETE') {
        return res.status(405);
    }

    const { id } = req.query
    
    if (typeof id !== "string") {
        return res.status(404)
    }
    

    const delTodo = await prisma.category.delete({
        where: {
            id: parseInt(id)
        }
    })
    res.status(200).json({message: 'Success'})
}