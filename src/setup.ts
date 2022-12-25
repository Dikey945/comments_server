import {User} from "./models/User";
import {Post} from "./models/Post";
import {Comment} from "./models/Comment";
import {Like} from "./models/Like";
import {sequelize} from "./utils/db";

(async () => {
  try {
    await User.sync({force: true});
    const kyle = await User.create( {
      name: 'Kyle',
      email: 'kylestrong@gmail.com'
    })
    const sveta = await User.create( {
      name: 'Sveta',
      email: 'svetabeauty@gmail.com'
    })

    await Post.sync({force: true})
    const post1 = await Post.create({
      title: 'Post 1',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ' +
        'placerat urna vel ante volutpat, ut elementum mi placerat. Phasellus ' +
        'varius nisi a nisl interdum, at ultrices ex tincidunt. ' +
        'Duis nec nunc vel urna ullamcorper eleifend ac id dolor. Phasellus ' +
        'vitae tortor ac metus laoreet rutrum. Aenean condimentum consequat ' +
        'elit, ut placerat massa mattis vitae. Vivamus dictum faucibus massa, ' +
        'eget euismod turpis pretium a. Aliquam rutrum rhoncus mi, eu tincidunt ' +
        'mauris placerat nec. Nunc sagittis libero sed facilisis suscipit. ' +
        'Curabitur nisi lacus, ullamcorper eu maximus quis, malesuada sit amet ' +
        'nisi. Proin dignissim, lacus vitae mattis fermentum, dui dolor ' +
        'feugiat turpis, ut euismod libero purus eget dui.',
      userId: kyle.dataValues.id,
    })
    const post2 = await Post.create({
      title: 'Post 2',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ' +
        'placerat urna vel ante volutpat, ut elementum mi placerat. Phasellus ' +
        'varius nisi a nisl interdum, at ultrices ex tincidunt. ' +
        'Duis nec nunc vel urna ullamcorper eleifend ac id dolor. Phasellus ' +
        'vitae tortor ac metus laoreet rutrum. Aenean condimentum consequat ' +
        'elit, ut placerat massa mattis vitae. Vivamus dictum faucibus massa, ' +
        'eget euismod turpis pretium a. Aliquam rutrum rhoncus mi, eu tincidunt ' +
        'mauris placerat nec. Nunc sagittis libero sed facilisis suscipit. ' +
        'Curabitur nisi lacus, ullamcorper eu maximus quis, malesuada sit amet ' +
        'nisi. Proin dignissim, lacus vitae mattis fermentum, dui dolor ' +
        'feugiat turpis, ut euismod libero purus eget dui.',
      userId: sveta.dataValues.id,
    })

    await Comment.sync({force: true})
    const comment1 = await Comment.create({
      message: "I am a root comment",
      userId: kyle.dataValues.id,
      postId: post1.dataValues.id,
    })

    const comment2 = await Comment.create({
      parentId: comment1.dataValues.id,
      message: "I am a nested comment",
      userId: sveta.dataValues.id,
      postId: post1.dataValues.id,
    })

    const comment3 = await Comment.create({
      message: "I am another root comment",
      userId: sveta.dataValues.id,
      postId: post1.dataValues.id,
    })

    await Like.sync({force: true})

    const like1 = await Like.create({
      userId: kyle.dataValues.id,
      commentId: comment1.dataValues.id,
    })


    await sequelize.close();
    console.log('synced!')
  } catch (err) {
    console.log(err);
  }
})();