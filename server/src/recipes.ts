import * as path from "path";
import Nedb from "nedb";
const Datastore = require("nedb");


/**
 * IRecipe interface that describes the Recipe, it's necessary to Add, List, update and delete recipes to the DB.
 * When a Recipe is added to the DB, if there is no id detected, the NeDB will add one automatically
 * */
export interface IRecipe {
    _id?: number,
    name: string,
    instructions: string,
    description: string,
    ingredients: string
}

/**
 * Worker class that contains all functions needed to perform all the required DB actions.
 * NeDB is synchronous, that's why all functions are creating promises,so that the application continues to run while
 * the request is executed, otherwise the application would block until the request is completed
 * */
export class Worker {
    private db: Nedb;
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "recipes.db"),
            autoload: true
        });
    }

    //Get all entry's in the DB, returns a promise with an array with all Recipes
    public listRecipes(): Promise<IRecipe[]> {
        return new Promise((inResolve, inReject) => {
            this.db.find({},
                (inError: Error | null, inDocs: IRecipe[]) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve(inDocs);
                    }
                }
            );
        });
    }

    //Search in the DB for an entry with a specific id, returns a promise with the result of the query
    public listRecipe(inID: string): Promise<IRecipe[]> {
        return new Promise((inResolve, inReject) => {
            this.db.find({_id: inID},
                (inError: Error | null, inDocs: IRecipe[]) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve(inDocs);
                    }
                }
            );
        });
    }

    //Adds a new recipe entry with the data in inRecipe, returns a promise with the entry added
    public addRecipe(inRecipe: IRecipe): Promise<IRecipe> {
        return new Promise((inResolve, inReject) => {
            this.db.insert(inRecipe,
                (inError: Error | null, inNewDoc: IRecipe) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve(inNewDoc);
                    }
                }
            );
        });
    }

    //Deletes a recipe by its id, returns a void promise
    public deleteRecipe(inID: string): Promise<void> {
        return new Promise((inResolve, inReject) => {
            this.db.remove({ _id: inID }, {},
                (inError: Error | null, inNumRemoved: number) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve();
                    }
                }
            );
        });
    }

    //Updates all fields of the recipe with the given id in inID with the data in fields
    public updateRecipe(inID: string, fields: IRecipe): Promise<void> {
        return new Promise((inResolve, inReject) => {
            this.db.update({ _id: inID }, {name:fields.name, description:fields.description, ingredients:fields.ingredients, instructions:fields.instructions},{},
                (inError: Error | null, inNumRemoved: number) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve();
                    }
                }
            );
        });
    }
}