import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize.config';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class Post extends Model {
    @Field()
    id: number

    @Field()
    title: string

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}

Post.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Post'
});

export default Post
