import * as dotenv from "dotenv"

//first load env vars (not in production)
if(process.env.NODE_ENV !== "production") {
  dotenv.config()
}

//load the express app
import "./express"

//load the mongoose connection
import "./mongoose"