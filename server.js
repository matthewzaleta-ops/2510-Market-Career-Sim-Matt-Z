import app from "#app";
import db from "#db/client";

const init = async () => {
  const PORT = process.env.PORT ?? 3000;

  await db.connect();
  console.log("connected to database");

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
};

init();
