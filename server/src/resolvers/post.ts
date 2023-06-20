import { Arg, Mutation, Query, Resolver } from "type-graphql";
import "reflect-metadata";
import Post from "../models/Post";

@Resolver()
class PostResolver {
    @Mutation(() => Post)
    async createPost(@Arg("title") title: string): Promise<Post> {
        return await Post.create({
            title: title
        })
    }

    @Query(() => Post, { nullable: true })
    async getPostById(@Arg("id") id: number): Promise<Post | null> {
        return await Post.findOne({
            where: {
                id: id
            }
        })
    }

    @Query(() => [Post])
    async getAllPosts(): Promise<Post[]> {
        return await Post.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
    }

    @Mutation(() => Post, { nullable: true })
    async updatePost(
        @Arg("id") id: number,
        @Arg("title", { nullable: true }) title: string
    ) {
        await Post.update({ title: title }, {
            where: {
                id: id
            }
        })
        return await Post.findOne({
            where: {
                id: id
            }
        });
    }

    @Mutation(() => Boolean)
    async removePost(
        @Arg("id") id: number
    ) {
        await Post.destroy({
            where: {
                id: id
            }
        })
        return true;
    }
}

export default PostResolver