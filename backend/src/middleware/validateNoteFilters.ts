import { Request, Response, NextFunction } from "express";

export function validateNoteFilters(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { search, tags } = req.query;

  if (search !== undefined && typeof search !== "string") {
    return res.status(400).json({ error: "Invalid search" });
  }

  if (tags !== undefined && typeof tags !== "string" && !Array.isArray(tags)) {
    return res.status(400).json({ error: "Invalid tags" });
  }

  next();
}