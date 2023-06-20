import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize.config';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class User extends Model {
    @Field()
    id: number

    @Field()
    username: string

    password: string

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}

User.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'User'
});

export default User
