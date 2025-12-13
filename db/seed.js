import db from "#db/client";
import { createProduct } from "./products.js";
import { createUser } from "./users.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const products = [
    {
      title: "Omega Seamaster",
      description: "The watch used by James Bond.",
      price: 6000.0,
    },
    {
      title: "Omega Speedmaster",
      description: "First watch on the Moon.",
      price: 5000.0,
    },
    {
      title: "Rolex Submariner",
      description: "Setting the standard for excellence in dive watches.",
      price: 11000.0,
    },
    {
      title: "Rolex GMT-2 Master",
      description: "The watch worn by Magnum PI.",
      price: 18000.0,
    },
    {
      title: "IWC Top Gun",
      description: "Watch exclusively worn by Top Gun pilots.",
      price: 14000.0,
    },
    {
      title: "Hamilton Field Watch",
      description: "Iconic for quality, precision, and value.",
      price: 600.0,
    },
    {
      title: "Seiko 5 Sport",
      description: "Elite value, quality dive watch.",
      price: 500.0,
    },
    {
      title: "IWC Spitfire",
      description: "Inspired by the WWII fighter plane.",
      price: 4000.0,
    },
    {
      title: "Rolex Milgauss",
      description: "First choice among scientists.",
      price: 9000.0,
    },
    {
      title: "Omega Railmaster",
      description: "For conductors who arrive in style.",
      price: 4000.0,
    },
    {
      title: "Breitling Superocean",
      description: "Exceptional dive watch.",
      price: 8000.0,
    },
  ];

  for (const product of products) {
    await createProduct(product);
  }

  const users = [
    {
      username: "JamesBond",
      password: "007",
    },
    {
      username: "morgan",
      password: "123",
    },
    {
      username: "Matt",
      password: "123",
    },
  ];

  for (const user of users) {
    await createUser(user);
  }
}
