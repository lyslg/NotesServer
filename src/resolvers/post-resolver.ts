import { Post } from '../schemas/post'
import { Resolver, Query, Int, Arg, Mutation } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { PostInput } from './types/post.input';
import { DResult, UResult } from './types/post.output'

@Resolver()
export class PostResolver {
    constructor(
        @InjectRepository(Post) private readonly postRepository: Repository<Post>
    ) { }

    @Query(returns => [Post])
    posts(): Promise<Post[]> {
        return this.postRepository.find()
    }

    @Query(returns => Post, { nullable: true })
    post(@Arg("postId", type => Int) postId: number) {
        return this.postRepository.findOne(postId);
    }

    @Mutation(returns => Post)
    async addPost(
        @Arg("post") postInput: PostInput,
    ): Promise<Post> {
        const post = this.postRepository.create({
            ...postInput
        })

        return await this.postRepository.save(post)
    }

    @Mutation(returns => DResult)
    async deletePost(
        @Arg("postId", type => Int) postId: number
    ): Promise<DeleteResult> {
        return await this.postRepository.delete(postId)
    }

    @Mutation(returns => UResult, { nullable: true })
    async updatePost(
        @Arg("post") post: PostInput
    ): Promise<UpdateResult> {
        return this.postRepository.update(post.id, post)
    }

}
