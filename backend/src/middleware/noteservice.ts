export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  isArchived: boolean;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface NoteFilters {
  search?: string;
  tags?: string[];
  archived?: boolean;
}

export function filterNotes(notes: Note[], filters: NoteFilters): Note[] {
  const { search, tags, archived = false } = filters;
  const query = search?.trim().toLowerCase();

  return notes
    .filter((note) => note.isArchived === archived)
    .filter(
      (note) =>
        !query ||
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query),
    )
    .filter(
      (note) =>
        !tags?.length ||
        tags.every((tag) =>
          note.tags.some(
            (noteTag) => noteTag.toLowerCase() === tag.toLowerCase(),
          ),
        ),
    )
    .sort(
      (a, b) =>
        Number(b.isPinned) - Number(a.isPinned) ||
        b.updatedAt.getTime() - a.updatedAt.getTime(),
    );
}