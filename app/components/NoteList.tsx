import { Note } from "@/utils/Schemas";

const NoteList = ({ notes }: { notes: Note[] }) => {
  return (
    <div>
      {notes?.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NoteList;

const NoteItem = ({ note }: { note: Note }) => {
  return (
    <>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <hr />
    </>
  );
};
