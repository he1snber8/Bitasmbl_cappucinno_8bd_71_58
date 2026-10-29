import { Request, Response, NextFunction } from "express";

export function validateNoteFilters(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { search, tags, archived } = req.query;

  if (search !== undefined && (typeof search !== "string" || !search.trim())) {
    return res.status(400).json({ error: "Invalid search" });
  }

  if (tags !== undefined) {
    const values = Array.isArray(tags) ? tags : [tags];

    if (
      !values.every(
        (tag) =>
          typeof tag === "string" &&
          tag.split(",").every((value) => value.trim().length > 0),
      )
    ) {
      return res.status(400).json({ error: "Invalid tags" });
    }
  }

  if (archived !== undefined && archived !== "true" && archived !== "false") {
    return res.status(400).json({ error: "Invalid archived value" });
  }

  next();
}