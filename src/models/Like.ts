import { sequelize } from "../utils/db";
import { User } from "./User";
import { Comment } from "./Comment";
import { DataTypes } from "sequelize";

export const Like = sequelize.define('Like', {
  userId: {
    field: 'user_id',
    type: DataTypes.INTEGER,
    unique: true
  },
  commentId: {
    field: 'comment_id',
    type: DataTypes.INTEGER,
    unique: true
  }
},
  {
    indexes: [
      {
        fields: ['user_id', 'comment_id'],
        unique: true }
    ]
})

Like.belongsTo(User, {
  foreignKey: 'user_id',
  constraints: false,
});

Like.belongsTo(Comment, {
  foreignKey: 'comment_id',
  constraints: false,
});
