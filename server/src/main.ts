//Importação de módulos
import path from "path";
import express,{Express, NextFunction, Request, Response } from "express";

import * as Recipes from "./recipes";
import {IRecipe} from "./recipes";

//Criação de uma express APP, assim como, de uma middleware que a torne útil
const app : Express = express() ;
app.use(express.json());

//Definir o método de segurança CORS
app.use("/", express.static(path.join (__dirname, "../../client/dist")));

app.use(function(inRequest: Request, inResponse: Response, inNext : NextFunction ) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    inNext();
});

//Registro do path e do method para o endpoint que é utilizado para obter a lista de receitas.
app.get("/recipes", async (inRequest: Request ,inResponse: Response ) => {
    try {
        const recipesWorker: Recipes.Worker = new Recipes.Worker();
        const recipes: IRecipe[] = await recipesWorker.listRecipes();
        inResponse.json(recipes); // serialize object into JSON
        //TODO: code to access all recipes
    } catch (inError) {
        inResponse.send ({message: "No recipes in the Data Base"}) ;
    }
});

//Registro do path e do method para o endpoint que é utilizado para adicionar uma receita à lista de receitas.
app.post("/contacts", async (inRequest: Request ,inResponse: Response ) => {
    try {
        const recipesWorker: Recipes.Worker = new Recipes.Worker();
        const recipe: IRecipe = await recipesWorker.addRecipe(inRequest.body);
        inResponse.json(recipe); // for client acknowledgment and future use ( includesID)
        //TODO: code to add recipes
    } catch (inError) {
        inResponse.send("error") ;
    }
});

//Registro do path e do method para o endpoint que é utilizado para eliminar uma receita em especifico.
app.delete("/contacts/:id", async (inRequest: Request, inResponse: Response) => {
    try {
        const recipesWorker: Recipes.Worker = new Recipes.Worker();
        await recipesWorker.deleteRecipe(inRequest.params.id);
        inResponse.send("ok");
        //TODO: code to delete one recipe by ID
    } catch ( inError ) {
        inResponse.send("error") ;
    }
});

app.listen(8080);