import express from 'express';
import { ENV } from './lib/env';

const app = express()

app.get('/', (req, res) => {
    res.send("hello")
})

app.listen(ENV.PORT , () => console.log(`Server is listenning on PORT: ${ENV.PORT}`))