import express from 'express';
import path from 'path';
import { ENV } from './lib/env';

const app = express()

const ROOT_DIR = process.cwd()

app.get('/health', (req, res) => {
    res.send("hello")
})


if(ENV.NODE_ENV === "production"){
    const filePath = path.join(ROOT_DIR, 'public/dist')
    app.use(express.static(filePath))

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(filePath, "index.html"))
    })
}else{
    app.get("/{*any}", (req, res) => {
        res.send('Development mode')
    })
}

app.listen(ENV.PORT , () => console.log(`Server is listenning on PORT: ${ENV.PORT}`))