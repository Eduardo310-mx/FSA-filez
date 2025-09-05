import db from "#db/client";

export async function createFolder(name) {
const sql = `
INSERT INTO folders
    (name)
VALUES
    ($1)
RETURNING *
`;
const { rows } = await db.query(sql, [name]);
return rows;
}

export async function getFolders() {
const sql = `
SELECT * FROM folders
`;
const { rows } = await db.query(sql);
return rows;
}

export async function getFolderByIdIncludingFiles(id) {
const sql = `
SELECT *,
(
    SELECT json_agg(files)
    FROM files
    WHERE folders.id = files.folder_id
) as files
    FROM folders
    WHERE folders.id = $1
`;
const {rows} = await db.query(sql, [id]);
return rows[0];
}