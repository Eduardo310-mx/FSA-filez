import express from "express";
const router = express.Router();
export default router;

import { createFile } from "../db/queries/files.js";
import { getFolders, getFolderByIdIncludingFiles } from "../db/queries/folders.js";

router.route("/").get(async (req, res) => {
    try {
        const folders = await getFolders();
        res.status(200).send(folders);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.route("/:id").get(async (req, res) => {
    const { id } = req.params;
    const folder = await getFolderByIdIncludingFiles(id);
    if (!folder) {
        return res.status(400).send("Folder doesn't exist");
    }
    res.status(200).send(folder);
    
});

router.route("/:id/files").post(async (req, res) => {
    const { id } = req.params;
    const folder = await getFolderByIdIncludingFiles(id);
    if (!folder) {
        return res.status(404).send("Folder not found.");
    }
    const { name, size } = req.body;
    if (!name || !size) {
        return res.status(400).send("Request body is required");
    }
    const responseFile = await createFile(name, size, folder.id);
    res.status(201).send(responseFile);
});