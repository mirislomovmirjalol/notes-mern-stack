import express from "express"
import * as NotesController from "../../../contrellers/NotesController";

const router = express.Router();

router.get("/", NotesController.getNotes);
router.post("/", NotesController.createNote);
router.get("/:id", NotesController.getNote);

export default router;
