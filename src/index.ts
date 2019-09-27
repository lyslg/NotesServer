import "reflect-metadata";

import { ApolloServer } from "apollo-server";
import { Container } from "typedi";
import * as TypeORM from "typeorm";
import * as TypeGraphQL from 'type-graphql'
import { seedDatabase } from "./helpers";
import { connection } from "./connection";
import { RecipeResolver } from "./resolvers/recipe.resolver";
import { RateResolver } from "./resolvers/rate.resolver";
import { PostResolver } from "./resolvers/post-resolver";

export interface Context {
  // user: User;
}

// register 3rd party IOC container
TypeORM.useContainer(Container);

async function bootstrap() {
  try {

    await TypeORM.createConnection(connection);

    // seed database with some data
    const { defaultUser } = await seedDatabase();

    // build TypeGraphQL executable schema
    const schema = await TypeGraphQL.buildSchema({
      resolvers: [RecipeResolver, RateResolver, PostResolver],
      container: Container,
      emitSchemaFile: {
        path: 'emit.graphql'
      }
    });

    // create mocked context
    const context: Context = { user: defaultUser };

    // Create GraphQL server
    // const server = new ApolloServer({ schema, context });

    // Without context
    const server = new ApolloServer({ schema, context });
    // Start the server
    const { url } = await server.listen(4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
