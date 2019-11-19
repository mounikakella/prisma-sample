import { prisma } from "./generated/prisma-client";

// A `main` function so that we can use async/await
async function main() {
  // Create a new user with a new post
  const newUser = await prisma.createUser({
    name: "Bob",
    email: "cat@prisma.io",
    posts: {
      create: [
        {
          title: "Join us for GraphQL Conf in 2019",
          published: true
        },
        {
          title: "Subscribe to GraphQL Weekly for GraphQL news",
          published: true
        }
      ]
    }
  });
  console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`);
  const postsByUser = await prisma.user({ email: newUser.email }).posts();
  console.log("posts by created user", postsByUser);
  postsByUser.forEach(async postByUser => {
    const userByPosts = await prisma
      .post({
        id: postByUser.id
      })
      .author();
    console.log("User who posted", userByPosts);
  });
  // Read all users from the database and print them to the console
  const allUsers = await prisma.users();
  console.log(allUsers);
  const allPosts = await prisma.posts();
  console.log(allPosts);
  // ===============================CONNECT=============================//
  // const newUser = await prisma.createUser({
  //   name: "Henry",
  //   email: "henry@prisma.io"
  // });
  // console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`);
  // const newPost = await prisma.createPost({
  //   title: "Join us for GraphQL Conf in 2019 new",
  //   published: true,
  //   author: {
  //     connect: {
  //       email: newUser.email
  //     }
  //   }
  // });
  // console.log(`Created new Post: ${newPost.title} (ID: ${newPost.id})`);
  // const postsByUser = await prisma.user({ email: newUser.email }).posts();
  // console.log("posts by created user", postsByUser);
  // ============================UPDATE================================= //
  // const updatedUser = await prisma.updateUser({
  //   data: { name: "Henry glenn 2", email: "henryGlenn2@prisma.io" },
  //   where: { email: "henryGlenn@prisma.io" }
  // });
  // console.log("Updated user:", updatedUser);
  // =============================UPSERT================================= //
  // const upsertedUser = await prisma.upsertUser({
  //   where: {
  //     email: "zeus@example.com"
  //   },
  //   create: {
  //     email: "zeus@example.com",
  //     name: "Zeus"
  //   },
  //   update: {
  //     name: "Zeus 3"
  //   }
  // });
  // console.log("upsertedUser user:", upsertedUser);
  //==============================DELETE==============================//
  // const deletedUser = await prisma.deleteUser({
  //   email: "zeus@example.com"
  // });
  // console.log("upsertedUser user:", deletedUser);
  //================Scalar list mutations============================//
  // const player = await prisma.createPlayer({
  //   scores: { set: [1, 2, 3] },
  //   friends: { set: ["Sarah", "Jane"] },
  //   coinFlips: { set: [false, true] }
  // });
  // console.log("Scalar list mutations player:", player);
  // const updatePlayer = await prisma.updatePlayer({
  //   data: {
  //     scores: {
  //       set: [10, 20, 30]
  //     }
  //   },
  //   where: { id: "ck35oodvi00bs0722w2xu2d5b" }
  // });
  // console.log("Scalar list mutations updatePlayer:", updatePlayer);
}

main().catch(e => console.error(e));
