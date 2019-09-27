import { getRepository, Column, ColumnOptions } from "typeorm";

import { Recipe } from "./schemas/recipe";
import { Rate } from "./schemas/rate";
import { User } from "./schemas/user";

import { } from 'schema-ts';
import { Post } from "./schemas/post";
// import { Mall } from "./schemas/appsync/mall";
// import { Supplier } from "./schemas/appsync/supplier";
// import { Product } from "./schemas/appsync/product";
// import { TaxType } from "./schemas/appsync/taxType.enum";

export async function seedDatabase() {
  const recipeRepository = getRepository(Recipe);
  const ratingsRepository = getRepository(Rate);
  const userRepository = getRepository(User);
  const postRepository = getRepository(Post);
  // const mallRepository = getRepository(Mall);
  // const supplierRepository = getRepository(Supplier);
  // const productRepository = getRepository(Product);

  const defaultUser = userRepository.create({
    email: "test@github.com",
    nickname: "19majkel94",
    password: "s3cr3tp4ssw0rd",
  });
  await userRepository.save(defaultUser);

  const posts = postRepository.create([
    {
      title: "title1",
      comment: "comment1",
    },
    {
      title: "title2",
      comment: "comment2",
    },
  ])
  await postRepository.save(posts)

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

  await recipeRepository.save([recipe1, recipe2]);

  const ratings = ratingsRepository.create([
    { value: 2, user: defaultUser, recipe: recipe1 },
    { value: 4, user: defaultUser, recipe: recipe1 },
    { value: 5, user: defaultUser, recipe: recipe1 },
    { value: 3, user: defaultUser, recipe: recipe1 },
    { value: 4, user: defaultUser, recipe: recipe1 },

    { value: 2, user: defaultUser, recipe: recipe2 },
    { value: 4, user: defaultUser, recipe: recipe2 },
  ]);
  await ratingsRepository.save(ratings);
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
}

export function RelationColumn(options?: ColumnOptions) {
  return Column({ nullable: true, ...options });
}

export type Lazy<T extends object> = Promise<T> | T;