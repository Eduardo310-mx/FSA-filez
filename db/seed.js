import db from "./client.js";
import { createFile } from "../db/queries/files.js";
import { createFolder } from "../db/queries/folders.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  await db.query(`DELETE FROM files`);
  await db.query(`DELETE FROM folders`);
  
  const folders = [];

  // First loop: create folders
  for (let i = 1; i <= 3; i++) {
    const folderName = `Folder ${i}`;
    const folder = await createFolder(folderName);
    folders.push(folder);
  }

  // Second loop: create files for each folder
  for (const folder of folders) {
    for (let j = 1; j <= 5; j++) {
      const fileName = `File ${j}`;
      const fileSize = 100 * j;
      await createFile(fileName, fileSize, folder.id);
    }
  }
}

