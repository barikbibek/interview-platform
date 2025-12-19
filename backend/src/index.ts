import express, { Request, Response } from 'express';
import path from 'path';
import { serve } from 'inngest/express'
import { ENV } from './lib/env';
import { connectDB } from './lib/db';
import { inngest, functions } from './lib/inngest';

const app = express()

const ROOT_DIR = process.cwd()

app.use(express.json())

app.use('/api/inngest', serve({ client: inngest, functions }))

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
``
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