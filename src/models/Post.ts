// // import { sequelize } from "../utils/db";
// import { DataTypes } from "sequelize";
// import {Comment} from "./Comment";
//
// export const Post = sequelize.define('Post', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//
//   body: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   },
//
//   userId: {
//     field: 'user_id',
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
// })
//
// Post.hasMany(Comment, {
//   as: 'comments',
//   onDelete: 'cascade'
// })
//
// Post.addScope('comments_ids', {
//   include: [{
//     model: Comment,
//     as: 'comments',
//     attributes: ['id'],
//
//   }]
// })
//
// // Comment.belongsTo(Post, {
// //   foreignKey: 'post_id',
// //   constraints: true,
// //   as: 'comment_id'
// // });