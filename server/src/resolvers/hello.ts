import { Query, Resolver } from "type-graphql";
import "reflect-metadata";

@Resolver()
class HelloResolver {
    @Query(() => String)
    hello() {
        return "hello";
    }
}

export default HelloResolver