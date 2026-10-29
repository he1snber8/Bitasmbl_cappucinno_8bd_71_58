import { Request, Response, NextFunction } from "express";

export function validateNoteFilters(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { search, tags, archived } = req.query;

  if (search !== undefined && typeof search !== "string") {
    return res.status(400).json({ error: "Invalid search" });
  }

  if (search !== undefined && search.trim().length === 0) {
    return res.status(400).json({ error: "Search cannot be empty" });
  }

  if (tags !== undefined && typeof tags !== "string" && !Array.isArray(tags)) {
    return res.status(400).json({ error: "Invalid tags" });
  }

  if (Array.isArray(tags) && !tags.every((tag) => typeof tag === "string")) {
    return res.status(400).json({ error: "Invalid tags" });
  }

  if (typeof tags === "string" && tags.split(",").some((tag) => !tag.trim())) {
    return res.status(400).json({ error: "Invalid tags format" });
  }

  if (archived !== undefined && archived !== "true" && archived !== "false") {
    return res.status(400).json({ error: "Invalid archived value" });
  }

  next();
}