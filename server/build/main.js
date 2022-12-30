"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importação de módulos
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const Recipes = __importStar(require("./recipes"));
//Criação de uma express APP, assim como, de uma middleware que a torne útil
const app = (0, express_1.default)();
app.use(express_1.default.json());
//Definir o método de segurança CORS
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
app.use(function (inRequest, inResponse, inNext) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    inNext();
});
//Registro do path e do method para o endpoint que é utilizado para obter a lista de receitas.
app.get("/recipes", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipesWorker = new Recipes.Worker();
        const recipes = yield recipesWorker.listRecipes();
        inResponse.json(recipes); // serialize object into JSON
        //TODO: code to access all recipes
    }
    catch (inError) {
        inResponse.send({ message: "No recipes in the Data Base" });
    }
}));
//Registro do path e do method para o endpoint que é utilizado para obter uma receita pelo ID.
app.get("/recipes/:id", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipesWorker = new Recipes.Worker();
        const recipes = yield recipesWorker.listRecipe(inRequest.params.id);
        inResponse.json(recipes); // serialize object into JSON
        //TODO: code to access all recipes
    }
    catch (inError) {
        inResponse.send({ message: "No recipes in the Data Base" });
    }
}));
//Registro do path e do method para o endpoint que é utilizado para adicionar uma receita à lista de receitas.
app.post("/recipes", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(inRequest.body);
        const recipesWorker = new Recipes.Worker();
        const recipe = yield recipesWorker.addRecipe(inRequest.body);
        inResponse.json(recipe); // for client acknowledgment and future use ( includesID)
        //TODO: code to add recipes
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
//Registro do path e do method para o endpoint que é utilizado para eliminar uma receita em especifico.
app.delete("/recipes/:id", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipesWorker = new Recipes.Worker();
        yield recipesWorker.deleteRecipe(inRequest.params.id);
        inResponse.send("ok");
        //TODO: code to delete one recipe by ID
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
app.listen(8080);
