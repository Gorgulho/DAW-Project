import { Express, Request, Response } from "express";

import * as Recipes from "./recipes";
import { IRecipe } from "./recipes";
import * as Menus from "./menus";
import { IMenu } from "./menus";

/**
 * All the end points registered in this server are:
 *  http://localhost:8080/recipes
 *      METHOD: GET
 *  http://localhost:8080/recipes/:id
 *      METHOD: GET
 *  http://localhost:8080/recipes
 *      METHOD: POST
 *  http://localhost:8080/recipes/:id
 *      METHOD: DELETE
 *  http://localhost:8080/recipes/:id
 *      METHOD: PUT
 *  http://localhost:8080/menus
 *      METHOD: GET
 *  http://localhost:8080/menus/:id
 *      METHOD: GET
 *  http://localhost:8080/menus
 *      METHOD: POST
 *  http://localhost:8080/menus/:id
 *      METHOD: DELETE
 * */

export function registerRoutes(app: Express, recipesWorker: Recipes.Worker, menusWorker: Menus.Worker) {

    //Recipe end points

    /**
     * Handles the /recipes end point, returning in the response all recipes in the database.
     * In case there are no recipes in the DB, returns a message informing the user.
     * */
    app.get("/recipes", async (inRequest: Request, inResponse: Response) => {
        try {
            const recipes: IRecipe[] = await recipesWorker.listRecipes();
            if (recipes.length == 0) inResponse.send({ message: "No recipes in the Data Base" })
            else inResponse.json(recipes); // serialize object into JSON
        } catch (inError) {
            inResponse.send(inError);
        }
    });

    /**
     * Handles the /recipes/:id end point, returning in the response the recipe that matches the id given in the database.
     * In case there is no match in the DB, returns a message informing the user.
     * */
    app.get("/recipes/:id", async (inRequest: Request, inResponse: Response) => {
        try {
            const recipes: IRecipe[] = await recipesWorker.listRecipe(inRequest.params.id);
            if (recipes.length == 0) inResponse.send({ message: "No recipes in the Data Base corresponding to that ID" })
            else inResponse.json(recipes); // serialize object into JSON
        } catch (inError) {
            inResponse.send(inError);
        }
    });

    /**
     * Handles the /recipes end point, will receive data in the request body and create a new recipe entry in the database.
     * Returns the entry added for the user´s acknowledgement
     * */
    app.post("/recipes", async (inRequest: Request, inResponse: Response) => {
        try {
            console.log(inRequest.body)
            const recipe: IRecipe = await recipesWorker.addRecipe(inRequest.body);
            inResponse.json(recipe); // for client acknowledgment and future use (includes ID)
        } catch (inError) {
            inResponse.send(inError);
        }
    });

    /**
     * Handles the /recipes/:id end point, deleting the DB entry with that id, return in the response a message informing the user that the entry was deleted.
     * */
    app.delete("/recipes/:id", async (inRequest: Request, inResponse: Response) => {
        try {
            await recipesWorker.deleteRecipe(inRequest.params.id);
            await menusWorker.deleteMenuByRecipeID(inRequest.params.id)
            inResponse.send({ message: "Deleted" });
        } catch (inError) {
            inResponse.send(inError);
        }
    });

    /**
     * Handles the /recipes end point,updating the DB entry with that id, returning in the response a message informing the user that the recipe was updated.
     * In case there are no recipes in the DB, returns a message informing the user.
     * */
    app.put("/recipes/:id", async (inRequest: Request, inResponse: Response) => {
        try {
            await recipesWorker.updateRecipe(inRequest.params.id, inRequest.body);
            inResponse.send({ message: "Updated" });
        } catch (inError) {
            inResponse.send(inError);
        }
    });

    //Menu end points

    /**
     * Handles the /menus end point, returning in the response all menus in the database ordered by date.
     * In case there are no menus in the DB, returns a message informing the user.
     * */
    app.get("/menus", async (inRequest: Request, inResponse: Response) => {
        try {
            const menus: IMenu[] = await menusWorker.listMenus();

            menus.sort(function (a, b) {
                let dateA = new Date(a.date);
                let dateB = new Date(b.date);

                if (dateA < dateB) {
                    return -1;
                }
                if (dateA > dateB) {
                    return 1;
                }
                return 0
            }) //order by date field

            if (menus.length == 0) inResponse.send({ message: "No menus in the Data Base" })
            else inResponse.json(menus); // serialize object into JSON
        } catch (inError) {
            inResponse.send(inError);
        }
    })

    /**
     * Handles the /menus/:id end point, returning in the response the menu that matches the id given in the database.
     * In case there is no match in the DB, returns a message informing the user.
     * */
    app.get("/menus/:id", async (inRequest: Request, inResponse: Response) => {
        try {
            const menu: IMenu[] = await menusWorker.listMenu(inRequest.params.id);
            if (menu.length == 0) inResponse.send({ message: "No recipes in the Data Base corresponding to that ID" })
            else inResponse.json(menu); // serialize object into JSON
        } catch (inError) {
            inResponse.send(inError);
        }
    });

    /**
     * Handles the /menus end point, will receive data in the request body and create a new menu entry in the database.
     * Returns the entry add for the user´s acknowledgement
     * */
    app.post("/menus", async (inRequest: Request, inResponse: Response) => {
        try {
            console.log(inRequest.body)
            const Menu: IMenu = await menusWorker.addMenu(inRequest.body);
            inResponse.json(Menu); // for client acknowledgment and future use (includesID)
        } catch (inError) {
            inResponse.send(inError);
        }
    });

    /**
     * Handles the /menus/:id end point, deleting the DB entry with that id, return in the response a message informing the user that the entry was deleted.
     * */
    app.delete("/menus/:id", async (inRequest: Request, inResponse: Response) => {
        try {
            await menusWorker.deleteMenuByID(inRequest.params.id);
            inResponse.send({ message: "deleted" });
        } catch (inError) {
            inResponse.send(inError)
        }
    })
}