import { Arg, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";
import * as dotenv from "dotenv"
import bcrypt from "bcrypt"
import User from "../models/User";

dotenv.config({ path: '.env.local' });

@InputType()
class UsernameAndPassword {
    @Field()
    username: string

    @Field()
    password: string
}

@ObjectType()
class LoginResponse {
    @Field(() => [LoginError], { nullable: true })
    errors?: LoginError[]

    @Field(() => User, { nullable: true })
    user?: User
}

@ObjectType()
class LoginError {
    @Field()
    error: string

    @Field()
    message: string
}

@Resolver()
class UserResolver {
    @Mutation(() => LoginResponse)
    async register(
        @Arg("input") input: UsernameAndPassword
    ) {
        const usernameLengthDescriber = input.username.length >= 20 ? "long" : "short"
        const passwordLengthDescriber = input.username.length >= 50 ? "long" : "short"
        if (input.username.length < 3 || input.username.length >= 20) {
            return {
                errors: [{
                    error: "username",
                    message: `username too ${usernameLengthDescriber}; must be longer than 2 characters and shorter than 20 characters`
                }]
            }
        }
        else if (input.username.length < 3 || input.username.length >= 50){
            return {
                errors: [{
                    error: "password",
                    message: `username too ${passwordLengthDescriber}; must be longer than 2 characters and shorter than 50 characters`
                }]
            }
        }
        try {
            return {
                user: await User.create({
                    username: input.username,
                    password: await bcrypt.hash(input.password, parseInt(process.env.SALT_ROUNDS!))
                })
            }
        } catch {
            return {
                errors: [{
                    error: "username",
                    message: "username already taken"
                }]
            }
        }
        
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg("input") input: UsernameAndPassword
    ) {
        const user = await User.findOne({
            where: {
                username: input.username
            }
        })
        console.log("finished step1")
        if (!user) {
            return {
                errors: [{
                    error: "username",
                    message: "username doesn't exist"
                }]
            }
        }
        const valid = await bcrypt.compare(input.password, user.password);
        if (!valid) {
            return {
                errors: [{
                    error: "password",
                    message: "password is invalid"
                }]
            }
        }
        console.log(user.username)
        return {
            user: user
        };
    }
}

export default UserResolver