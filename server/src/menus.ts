import * as path from "path";
import Nedb from "nedb";
const Datastore = require("nedb");

/**
 * IMenu interface that describes the Menu, its necessary to Add, List and delete menus to the DB.
 * When a Menu is added to the DB, if there is no id detected, the NeDB add one automatically
 * */
export interface IMenu {
    _id?: number,
    date: string,
    meal: string,
    recipeName: string,
    recipeID: string
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
            filename: path.join(__dirname, "menus.db"),
            autoload: true
        });
    }

    public listMenus(): Promise<IMenu[]> {
        return new Promise((inResolve, inReject) => {
            this.db.find({},
                (inError: Error | null, inDocs: IMenu[]) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve(inDocs);
                    }
                }
            );
        });

    }

    public listMenu(inID: string): Promise<IMenu[]> {
        return new Promise((inResolve, inReject) => {
            this.db.find({_id: inID},
                (inError: Error | null, inDocs: IMenu[]) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve(inDocs);
                    }
                }
            );
        });
    }

    public addMenu(inMenu: IMenu): Promise<IMenu> {
        return new Promise((inResolve, inReject) => {
            this.db.insert(inMenu,
                (inError: Error | null, inNewDoc: IMenu) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve(inNewDoc);
                    }
                }
            );
        });
    }

    public deleteMenuByID(inID: string): Promise<void> {
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

    public deleteMenuByRecipeID(inID: string): Promise<void> {
        return new Promise((inResolve, inReject) => {
            this.db.remove({ recipeID: inID }, {multi:true},
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