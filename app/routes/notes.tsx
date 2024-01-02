import NewNote, { links as NewNoteLinks } from "@/components/NewNote";
import { LinksFunction } from "@remix-run/react/dist/routeModules";
import React from "react";

const Notes = () => {
  return (
    <div>
      <NewNote />
    </div>
  );
};

export default Notes;

export const links: LinksFunction = () => [...NewNoteLinks];
