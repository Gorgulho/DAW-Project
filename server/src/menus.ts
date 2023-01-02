import * as path from "path";
const Datastore = require("nedb");


//IContact é uma interface que descreve um contacto e que é necessária para adicionar, listar e eleiminar operações de contactos.
//Quando se adiciona um contacto, caso não seja identificado um id, o NeDB irá associar um id automaticamente.
export interface IMenu {
    _id?: number,
    date: string,
    meal: string,
    recipeName: string,
    recipeID: string
}


export class Worker {
    private db: Nedb;
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "menus.db"),
            autoload: true
        });
    }

    //NeDB é sincrono, logo necessitamos de criar uma promise de forma a que a aplicação continue a correr
    //normalmente enquanto o pedido é executado, caso contrário, a aplicação iria bloquear até o pedido ser concluido
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
            this.db.remove({ recipeID: inID }, {},
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