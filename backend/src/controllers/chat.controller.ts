import { chatClient } from "../lib/stream";


export async function getStreamToken(req: any, res: any) {
    try {
        const token = chatClient.createToken(req.user.clerkId)

        res.status(200).json({
            token,
            userId: req.user.clerkId,
            username: req.user.name,
            userImage: req.user.image   
        })
    } catch (error) {
        const err = error as Error;
        console.error("Error in getStreamToken controller: ", err.message)
        res.status(500).json({ msg: "Internal Server Error" })
    }
}