import { connectToDB, sequelize } from "./sequelize.config";
import { RESET_TABLES } from "./constants";
import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import PostResolver from "./resolvers/post";
import UserResolver from "./resolvers/user";
import session from "express-session"
import * as dotenv from "dotenv"
import { Context } from "./types";
import { createClient } from "redis";
import RedisStore from "connect-redis";
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';

dotenv.config({ path: ".env.local" })

const main = async (): Promise<void> => {
    await sequelize.sync({ force: RESET_TABLES });
    await connectToDB();
    const app: Express = express();

    const client = createClient({
        url: process.env.REDIS_URL
    });
    
    client.on("error", function (err) {
        throw err;
    });
    
    
    await client.connect()
    
    // Initialize store.
    const redisStore = new RedisStore({
        client: client,
        prefix: "myapp:",
    })

    app.use(
        session({
            name: "current_id",
            store: redisStore,
            resave: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 14, // two weeks
                httpOnly: true,
                sameSite: "lax"
            },
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET!,
        })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver, UserResolver]
        }),
        context: ({ req, res }): Context => ({ req, res }),
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground()
        ]
    })


    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("server listening on http://localhost:4000/graphql");
    })
}


main();