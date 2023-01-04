//Importação de módulos
import path from "path";
import express,{Express, NextFunction, Request, Response } from "express";

import * as Recipes from "./recipes";
import * as Menus from "./menus";

import { registerRoutes } from "./api";

//Criação de uma express APP, assim como, de uma middleware que a torne útil
const app : Express = express() ;
const recipesWorker: Recipes.Worker = new Recipes.Worker();
const menusWorker: Menus.Worker = new Menus.Worker();

app.use(express.json());

//Definir o método de segurança CORS
app.use("/", express.static(path.join (__dirname, "../../client/dist")));

app.use(function(inRequest: Request, inResponse: Response, inNext : NextFunction ) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PUT");
    inResponse.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    inNext();
});

registerRoutes(app, recipesWorker, menusWorker)

app.listen(8080, () => console.log("listening"))