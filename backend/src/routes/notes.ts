import { Router, Request, Response, NextFunction } from "express";

const router = Router();

export interface Note {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}


const notes: Note[] = [];

const asyncHandler =
  (
    fn: (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => Promise<void> | void,
  ) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);


router.post(
  "/",
  asyncHandler((req, res) => {
    const { title, content = "" } = req.body;

    if (typeof title !== "string" || !title.trim()) {
      res.status(400).json({ error: "Title is required." });
      return;
    }

    if (typeof content !== "string") {
      res.status(400).json({ error: "Content must be a string." });
      return;
    }

    const now = new Date();

    const note: Note = {
      id: crypto.randomUUID(),
      title: title.trim(),
      content,
      isPinned: false,
      isArchived: false,
      createdAt: now,
      updatedAt: now,
    };

    notes.push(note);

    res.status(201).json(note);
  }),
);


router.get(
  "/",
  asyncHandler((req, res) => {
    const archived = req.query.archived === "true";
    const pinned = req.query.pinned;

    const result = notes.filter(
      (note) =>
        note.isArchived === archived &&
        (pinned === undefined || note.isPinned === (pinned === "true")),
    );


    result.sort(
      (a, b) =>
        Number(b.isPinned) - Number(a.isPinned) ||
        b.updatedAt.getTime() - a.updatedAt.getTime(),
    );

    res.json(result);
  }),
);


router.patch(
  "/:id",
  asyncHandler((req, res) => {
    const note = notes.find((n) => n.id === req.params.id);

    if (!note) {
      res.status(404).json({ error: "Note not found." });
      return;
    }

    const { title, content } = req.body;

    if (title !== undefined) {
      if (typeof title !== "string" || !title.trim()) {
        res.status(400).json({ error: "Title must not be empty." });
        return;
      }

      note.title = title.trim();
    }

    if (content !== undefined) {
      if (typeof content !== "string") {
        res.status(400).json({ error: "Content must be a string." });
        return;
      }

      note.content = content;
    }

    note.updatedAt = new Date();

    res.json(note);
  }),
);


router.delete(
  "/:id",
  asyncHandler((req, res) => {
    const index = notes.findIndex((n) => n.id === req.params.id);

    if (index === -1) {
      res.status(404).json({ error: "Note not found." });
      return;
    }

    notes.splice(index, 1);

    res.status(204).send();
  }),
);


router.patch(
  "/:id/pin",
  asyncHandler((req, res) => {
    const note = notes.find((n) => n.id === req.params.id);

    if (!note) {
      res.status(404).json({ error: "Note not found." });
      return;
    }

    note.isPinned = !note.isPinned;
    note.updatedAt = new Date();

    res.json(note);
  }),
);


router.patch(
  "/:id/archive",
  asyncHandler((req, res) => {
    const note = notes.find((n) => n.id === req.params.id);

    if (!note) {
      res.status(404).json({ error: "Note not found." });
      return;
    }

    note.isArchived = !note.isArchived;


    if (note.isArchived) {
      note.isPinned = false;
    }

    note.updatedAt = new Date();

    res.json(note);
  }),
);

export default router;