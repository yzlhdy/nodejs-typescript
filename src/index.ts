import './config/env'
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import router from "./routes";


const app = express()

app.use(bodyParser.json())
app.use(router)

createConnection()


app.listen(4000, () => {

    console.log("Express server has started on port 4000. Open http://localhost:4000 to see results");
})
