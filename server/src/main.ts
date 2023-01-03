//Importação de módulos
import path from "path";
import express,{Express, NextFunction, Request, Response } from "express";

import * as Recipes from "./recipes";
import {IRecipe} from "./recipes";
import * as Menus from "./menus";
import {IMenu} from "./menus";

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
        if (recipes.length == 0) inResponse.send({message: "No recipes in the Data Base"})
        else inResponse.json(recipes); // serialize object into JSON
    } catch (inError) {
        inResponse.send (inError) ;
    }
});

//Registro do path e do method para o endpoint que é utilizado para obter uma receita pelo ID.
app.get("/recipes/:id", async (inRequest: Request ,inResponse: Response ) => {
    try {
        const recipesWorker: Recipes.Worker = new Recipes.Worker();
        const recipes: IRecipe[] = await recipesWorker.listRecipe(inRequest.params.id);
        if (recipes.length == 0) inResponse.send({message: "No recipes in the Data Base corresponding to that ID"})
        else inResponse.json(recipes); // serialize object into JSON
    } catch (inError) {
        inResponse.send (inError) ;
    }
});

//Registro do path e do method para o endpoint que é utilizado para adicionar uma receita à lista de receitas.
app.post("/recipes", async (inRequest: Request ,inResponse: Response ) => {
    try {
        console.log(inRequest.body)
        const recipesWorker: Recipes.Worker = new Recipes.Worker();
        const recipe: IRecipe = await recipesWorker.addRecipe(inRequest.body);
        inResponse.json(recipe); // for client acknowledgment and future use (includes ID)
    } catch (inError) {
        inResponse.send(inError) ;
    }
});

//Registro do path e do method para o endpoint que é utilizado para eliminar uma receita em especifico.
app.delete("/recipes/:id", async (inRequest: Request, inResponse: Response) => {
    try {
        const recipesWorker: Recipes.Worker = new Recipes.Worker();
        await recipesWorker.deleteRecipe(inRequest.params.id);
        inResponse.send("ok");
        //TODO: Add code to delete all the menus with this recipe (deleteByRecipeID)
    } catch ( inError ) {
        inResponse.send(inError) ;
    }
});

//Menu end points

app.get("/menus", async(inRequest: Request, inResponse: Response) => {
    try {
        const menusWorker: Menus.Worker = new Menus.Worker();
        const menus: IMenu[] = await menusWorker.listMenus();

        menus.sort(function(a, b) {
            let dateA = new Date(a.date);
            let dateB = new Date(b.date);

            if (dateA < dateB ) {
                return -1;
            }
            if (dateA > dateB ) {
                return 1;
            }
            return 0
        }) //order by date field

        if (menus.length == 0) inResponse.send({message: "No recipes in the Data Base"})
        else inResponse.json(menus); // serialize object into JSON
    } catch (inError) {
        inResponse.send (inError) ;
    }
})

app.post("/menus", async (inRequest: Request ,inResponse: Response ) => {
    try {
        console.log(inRequest.body)
        const menusWorker: Menus.Worker = new Menus.Worker();
        const Menu: IMenu = await menusWorker.addMenu(inRequest.body);
        inResponse.json(Menu); // for client acknowledgment and future use (includesID)
    } catch (inError) {
        inResponse.send(inError) ;
    }
});

app.delete("/menus/:id", async (inRequest: Request, inResponse: Response) => {
    try {
        const menusWorker: Menus.Worker = new Menus.Worker();
        await menusWorker.deleteMenuByID(inRequest.params.id);
        inResponse.send("ok");
    } catch (inError) {
        inResponse.send(inError)
    }
})






app.listen(8080, () => console.log("listening"))