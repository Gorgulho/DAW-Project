import * as path from "path";
const Datastore = require("nedb");


//IContact é uma interface que descreve um contacto e que é necessária para adicionar, listar e eleiminar operações de contactos.
//Quando se adiciona um contacto, caso não seja identificado um id, o NeDB irá associar um id automaticamente.
export interface IRecipe {
    _id?: number,
    name: string,
    steps: string,
    description: string,
    ingredients: string
}


export class Worker {
    private db: Nedb;
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "contacts.db"),
            autoload: true
        });
    }

    //NeDB é sincrono, logo necessitamos de criar uma promise de forma a que a aplicação continue a correr
    //normalmente enquanto o pedido é executado, caso contrário, a aplicação iria bloquear até o pedido ser concluido
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
}