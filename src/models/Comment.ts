// import { sequelize } from "../utils/db";
// import { DataTypes } from "sequelize";
// import { User } from "./User";
// import { Post } from "./Post";
//
// export const Comment = sequelize.define('Comment', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//
//   message: {
//     type: DataTypes.TEXT,
//   },
//
//   userId: {
//     field: 'user_id',
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//
//   postId: {
//     field: 'post_id',
//     type: DataTypes.INTEGER,
//   },
//
//   parentId: {
//     field: 'parent_id',
//     type: DataTypes.INTEGER,
//   },
//
//   child: {
//     field: 'children',
//     type: DataTypes.INTEGER,
//   }
// },
// {
//     tableName: 'Comments'
// });
//
// Comment.belongsTo(User, {
//   foreignKey: 'user_id',
//   constraints: false,
// });
//
