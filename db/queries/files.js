import db from "../client.js";

export async function createFile(name, size, folder_id) {
const sql = `
INSERT INTO files
    (name, size, folder_id)
VALUES
    ($1, $2, $3)
RETURNING *
`;
const { rows } = await db.query(sql, [name, size, folder_id]);
return rows[0];
}

export async function getFilesIncludingFolder() {
const sql = `
SELECT files.*, folders.name AS folder_name
FROM files
JOIN folders ON files.folder_id = folders.id
`;
const { rows } = await db.query(sql);
return rows;
}