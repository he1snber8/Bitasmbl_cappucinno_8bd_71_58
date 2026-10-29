import { Request, Response, NextFunction } from "express";

export function validateNoteCreation(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { title, content, tags } = req.body;

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }

  if (content !== undefined && typeof content !== "string") {
    return res.status(400).json({ error: "Invalid content" });
  }

  if (
    tags !== undefined &&
    (!Array.isArray(tags) ||
      !tags.every(
        (tag: unknown) => typeof tag === "string" && tag.trim().length > 0,
      ))
  ) {
    return res.status(400).json({ error: "Invalid tags" });
  }

  next();
}