import express from "express";
const app = express();
export default app;

import filesRouter from "#api/files";
import folderRouter from "#api/folders"

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/files", filesRouter);
app.use("/folders", folderRouter);

// Handles PostgreSQL errors
app.use((err, req, res, next) => {

    // Foreign key violation
    if (err.code === "23503") {
        return res.status(400).send(err.detail);
    }
    //TODO
    if (err.code === "22P02" || err.code === "22007" || err.code === "22008") {
        return res.status(400).send(err);
    }
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(400).send("Sorry! Something went wrong.");
});
