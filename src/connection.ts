import { ConnectionOptions } from 'typeorm';
import { Recipe } from './schemas/recipe';
import { User } from './schemas/user';
import { Rate } from './schemas/rate';
import { Post } from './schemas/post';

export const connection: ConnectionOptions = {
    type: "postgres",
    database: "postgres",
    username: "iyongseok",
    password: "dydtjr2",
    port: 5432,
    host: "localhost",
    entities: [Recipe, User, Rate, Post],
    synchronize: true,
    logger: "advanced-console",
    logging: "all",
    dropSchema: true,
    cache: true,
}