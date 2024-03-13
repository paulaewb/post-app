// seedingScript.js

const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedDatabase() {
  // Get data from API Users
  const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
  const users = usersResponse.data;

  // Get data from API post
  const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
  const posts = postsResponse.data;

  // seeding users
  for (const user of users) {
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
      },
    });
  }

  // seeding post
  for (const post of posts) {
    await prisma.post.create({
      data: {
        title: post.title,
        content: post.body,
        userId: post.userId,
      },
    });
  }
}

seedDatabase()
  .then(() => {
    console.log('Database seeded successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  });
