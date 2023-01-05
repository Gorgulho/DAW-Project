//Importação de módulos
import path from "path";
import express,{Express, NextFunction, Request, Response } from "express";

import * as Recipes from "./recipes";
import * as Menus from "./menus";

import { registerRoutes } from "./api";

//Express app initialization
const app : Express = express() ;
//DB constructors initialized
const recipesWorker: Recipes.Worker = new Recipes.Worker();
const menusWorker: Menus.Worker = new Menus.Worker();
/**
 * Adding a piece of middleware to the Express app.
 * It allows the app to parse incoming request bodies that are in the JSON format.
 *
 * This is useful if we want to process data sent to your app in the HTTP request body,
 * such as when you are creating an API that receives data from the client in JSON format.
 * */
app.use(express.json());

//Defining the CORS security method
app.use("/", express.static(path.join (__dirname, "../../client/dist")));
app.use(function(inRequest: Request, inResponse: Response, inNext : NextFunction ) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PUT");
    inResponse.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    inNext();
});

//Calling the function where all the endpoints are, sending the express add to handle te endpoints and the DB constructors to handle the DB requests
registerRoutes(app, recipesWorker, menusWorker)

/**
 * Starting the server and listening for incoming HTTP requests on port 8080.
 * And a callback function that logs the message 'Listening' to the console, informing the user that the server is listening to any request
 * */
app.listen(8080, () => console.log("listening"))