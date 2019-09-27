import { DeleteResult, UpdateResult } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class DResult extends DeleteResult {

    @Field()
    affected?: number;

}

@ObjectType()
export class UResult extends UpdateResult {
    @Field()
    affected?: number;
}