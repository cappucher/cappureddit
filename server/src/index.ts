import { connectToDB, sequelize } from "./sequelize.config";
import { RESET_TABLES } from "./constants";
// import { Post } from "./models/Post";
import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import HelloResolver from "./resolvers/hello";
import PostResolver from "./resolvers/post";

const main = async (): Promise<void> => {
    await sequelize.sync({ force: RESET_TABLES });
    await connectToDB();
    const app: Express = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver]
        })
    })

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("server listening on http://localhost:4000");
    })
}


main();