import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../lib/prisma'
import { Category } from '@prisma/client'


export default async (req:NextApiRequest, res: NextApiResponse<Category[]>) => {
    if (req.method !== 'GET') {
        return res.status(405);
    }
    const categories = await prisma.category.findMany()
    res.status(200).json(categories)
}