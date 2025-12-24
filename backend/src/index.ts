import express, { Request, Response } from 'express';
import { serve } from 'inngest/express'
import { ENV } from './lib/env';
import { connectDB } from './lib/db';
import path from 'path';
import { inngest, functions } from './lib/inngest';
import chatRoute from './routes/chat.route'
import sessionRoute from './routes/session.route'
import { clerkMiddleware } from '@clerk/express';

const app = express()

const ROOT_DIR = process.cwd()

app.use(express.json())
app.use(clerkMiddleware())

app.use('/api/inngest', serve({ client: inngest, functions }))
app.use('/api/chat', chatRoute)
app.use('/api/sessions', sessionRoute)

app.get('/health', (req: Request, res: Response) => {
    res.send("hello")
})


if(ENV.NODE_ENV === "production"){
    const filePath = path.join(ROOT_DIR, 'public/dist')
    app.use(express.static(filePath))

    app.get("/{*any}", (req: Request, res: Response) => {
        res.sendFile(path.join(filePath, "index.html"))
    })
}else{
    app.get("/{*any}", (req: Request, res: Response) => {
        res.send('Running in development mode')
    })
}

const startServer = async () => {
    try {
        await connectDB()
        app.listen(ENV.PORT , () => console.log(`Server is listenning on PORT: ${ENV.PORT}`))
    } catch (error) {
        const err = error as Error
        console.log(`Error starting the server : ${err.message}`)
    }
}

startServer()