"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const recipe_1 = require("../schemas/recipe");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const user_1 = require("../schemas/user");
const typeorm_1 = require("typeorm");
const rate_1 = require("../schemas/rate");
const recipe_input_1 = require("./types/recipe.input");
const rate_input_1 = require("./types/rate.input");
let RecipeResolver = class RecipeResolver {
    constructor(userRepository, recipeRepository, ratingsRepository) {
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
        this.ratingsRepository = ratingsRepository;
    }
    recipe(recipeId) {
        return this.recipeRepository.findOne(recipeId);
    }
    recipes() {
        return this.recipeRepository.find();
    }
    addRecipe(RecipeInput, { user }) {
        return __awaiter(this, void 0, void 0, function* () {
            const recipe = this.recipeRepository.create(Object.assign({}, RecipeInput, { author: user }));
            return yield this.recipeRepository.save(recipe);
        });
    }
    rate(rateInput, { user }) {
        return __awaiter(this, void 0, void 0, function* () {
            const recipe = yield this.recipeRepository.findOne(rateInput.recipeId, { relations: ["ratings"] });
            if (!recipe) {
                throw new Error("Invalid recipe ID");
            }
            const newRate = this.ratingsRepository.create({
                recipe,
                value: rateInput.value,
                user,
            });
            (yield recipe.ratings).push(newRate);
            yield this.recipeRepository.save(recipe);
            return recipe;
        });
    }
    ratings(recipe) {
        return this.ratingsRepository.find({
            cache: 1000,
            where: { recipeId: recipe.id }
        });
    }
};
__decorate([
    type_graphql_1.Query(returns => recipe_1.Recipe, { nullable: true }),
    __param(0, type_graphql_1.Arg("recipeId", type => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RecipeResolver.prototype, "recipe", null);
__decorate([
    type_graphql_1.Query(returns => [recipe_1.Recipe]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "recipes", null);
__decorate([
    type_graphql_1.Mutation(returns => recipe_1.Recipe),
    __param(0, type_graphql_1.Arg("recipe")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipe_input_1.RecipeInput, Object]),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "addRecipe", null);
__decorate([
    type_graphql_1.Mutation(returns => recipe_1.Recipe),
    __param(0, type_graphql_1.Arg("rate")), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rate_input_1.RateInput, Object]),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "rate", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipe_1.Recipe]),
    __metadata("design:returntype", void 0)
], RecipeResolver.prototype, "ratings", null);
RecipeResolver = __decorate([
    type_graphql_1.Resolver(of => recipe_1.Recipe),
    __param(0, typeorm_typedi_extensions_1.InjectRepository(user_1.User)),
    __param(1, typeorm_typedi_extensions_1.InjectRepository(recipe_1.Recipe)),
    __param(2, typeorm_typedi_extensions_1.InjectRepository(rate_1.Rate)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], RecipeResolver);
exports.RecipeResolver = RecipeResolver;
