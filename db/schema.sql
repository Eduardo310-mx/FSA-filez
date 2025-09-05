DROP TABLE IF EXISTS folders CASCADE;
DROP TABLE IF EXISTS files;

CREATE TABLE folders (
    id serial PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE files (
    id serial PRIMARY KEY,
    name TEXT NOT NULL,
    size INTEGER NOT NULL,
    folder_id INTEGER NOT NULL REFERENCES folders(id) ON DELETE CASCADE,
    UNIQUE( name, folder_id )
);