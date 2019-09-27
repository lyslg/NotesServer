"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const recipe_1 = require("./schemas/recipe");
const rate_1 = require("./schemas/rate");
const user_1 = require("./schemas/user");
const post_1 = require("./schemas/post");
// import { Mall } from "./schemas/appsync/mall";
// import { Supplier } from "./schemas/appsync/supplier";
// import { Product } from "./schemas/appsync/product";
// import { TaxType } from "./schemas/appsync/taxType.enum";
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const recipeRepository = typeorm_1.getRepository(recipe_1.Recipe);
        const ratingsRepository = typeorm_1.getRepository(rate_1.Rate);
        const userRepository = typeorm_1.getRepository(user_1.User);
        const postRepository = typeorm_1.getRepository(post_1.Post);
        // const mallRepository = getRepository(Mall);
        // const supplierRepository = getRepository(Supplier);
        // const productRepository = getRepository(Product);
        const defaultUser = userRepository.create({
            email: "test@github.com",
            nickname: "19majkel94",
            password: "s3cr3tp4ssw0rd",
        });
        yield userRepository.save(defaultUser);
        const posts = postRepository.create([
            {
                title: "title1",
                comment: "comment1",
            },
            {
                title: "title2",
                comment: "comment2",
            },
        ]);
        yield postRepository.save(posts);
        const [recipe1, recipe2] = recipeRepository.create([
            {
                title: "Recipe 1",
                description: "Desc 1",
                author: defaultUser,
            },
            {
                title: "Recipe 2",
                author: defaultUser,
            },
        ]);
        yield recipeRepository.save([recipe1, recipe2]);
        const ratings = ratingsRepository.create([
            { value: 2, user: defaultUser, recipe: recipe1 },
            { value: 4, user: defaultUser, recipe: recipe1 },
            { value: 5, user: defaultUser, recipe: recipe1 },
            { value: 3, user: defaultUser, recipe: recipe1 },
            { value: 4, user: defaultUser, recipe: recipe1 },
            { value: 2, user: defaultUser, recipe: recipe2 },
            { value: 4, user: defaultUser, recipe: recipe2 },
        ]);
        yield ratingsRepository.save(ratings);
        // const defaultMall = mallRepository.create({
        //   mallName: "Our First Mall",
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // })
        // await mallRepository.save(defaultMall);
        // const defaultSupplier = supplierRepository.create({
        // })
        // const products = productRepository.create({
        //   mall: defaultMall,
        //   // supplier: defaultSupplier,
        //   price:{
        //     openMarketPrice: 1000,
        //     purchasePrice: 1000,
        //     memberPrice: 1000
        //   },
        //   taxType: TaxType.TAXABLE,
        //   createdAt: new Date(),
        //   updateAt: new Date()
        // })
        return {
            defaultUser,
        };
    });
}
exports.seedDatabase = seedDatabase;
function RelationColumn(options) {
    return typeorm_1.Column(Object.assign({ nullable: true }, options));
}
exports.RelationColumn = RelationColumn;
