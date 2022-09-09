import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma'
import { Category } from '@prisma/client'


export default async (req:NextApiRequest, res: NextApiResponse<Category>) => {
    /*
    const { id } = req.query
    const getCategory = await prisma.category.findUnique({
        where: {
            id: id
        }
    })
    res.status(200).json(getCategory)
    */
}