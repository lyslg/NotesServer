import { InputType, Field } from "type-graphql";
import { Post } from "../../schemas/post";

@InputType()
export class PostInput implements Partial<Post>{

    @Field({ nullable: true })
    id: string;

    @Field()
    title: string;

    @Field()
    comment: string;

    @Field({ nullable: true })
    completed?: boolean

}

