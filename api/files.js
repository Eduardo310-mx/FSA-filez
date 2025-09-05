import express from "express";
const router = express.Router();
export default router;

import { getFilesIncludingFolder } from "#db/queries/files";

router.route("/").get(async (req, res) => {
    const files = await getFilesIncludingFolder();
    return res.send(files);
});