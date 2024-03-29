import { Form } from "@remix-run/react";
import styles from "./NewNote.css";
import { Links } from "@/utils/types";

function NewNote() {
  return (
    <Form method="post" id="note-form">
      <input type="hidden" name="_action" value="Add_Note" />
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required />
      </p>
      <div className="form-actions">
        <button>Add Note</button>
      </div>
    </Form>
  );
}

export default NewNote;

export const links: Links = [{ rel: "stylesheet", href: styles }];
