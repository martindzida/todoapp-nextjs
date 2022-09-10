import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma'
import { Todo } from '@prisma/client'
import { useRouter } from "next/router";


export default async (req:NextApiRequest, res: NextApiResponse<Todo | null>) => {
    //FIXME: somehow get id from url
    const router = useRouter() 
    const { id } = router.query

    if (typeof id !== "string") {
        return
    }

    const getTodo = await prisma.todo.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    res.status(200).json(getTodo)
    
}