import { requireAuth } from '@clerk/express'
import { Request, Response, NextFunction } from 'express';
import User from '../models/User'


export const protectRoute = [
    requireAuth(),
    async (req: Request, res: Response, next: NextFunction) =>{
        try {
           const clerkId = req.auth.userId;

           if(!clerkId) return res.status(401).json({ error: 'Unauthorized - Invalid token' })

           const user = await User.findOne({ clerkId })
           
           if(!user) return res.status(404).json({ msg: "User not found" })

           req.user = user;
           
           next()
        } catch (error) {
            const err = error as Error;
            console.error("Error in protectRoute middleware: ", err.message)
            res.status(500).json({ msg: "Internal Server error" })
        }
    }
]