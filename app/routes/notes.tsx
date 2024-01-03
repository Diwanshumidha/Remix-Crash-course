import NewNote, { links as NewNoteLinks } from "@/components/NewNote";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { LinksFunction } from "@remix-run/react/dist/routeModules";
import React from "react";
import { z } from "zod";
import { v5 as uuid } from "uuid";
import { AddLinksSchema, LinksSchema, Note } from "@/utils/Schemas";
import { useLoaderData } from "@remix-run/react";
import NoteList from "@/components/NoteList";

export const loader: LoaderFunction = async () => {
  try {
    const response = await fetch("http://localhost:5173/notes");

    if (!response.ok) {
      return {
        status: response.status,
        error: response.statusText,
      };
    }

    const data = await response.json();
    const safeData = LinksSchema.safeParse(data);

    if (!safeData.success) {
      console.error(safeData.error.errors); // Log the array of validation errors
      return {
        status: 400, // You might want to return a more specific status code for validation errors
        error: "Invalid data",
      };
    }

    console.log(safeData.data);

    return {
      status: 200, // You can adjust the status code accordingly
      data: safeData.data,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500, // Internal Server Error
      error: "Something went wrong",
    };
  }
};

type LoaderReturn =
  | {
      status: 500;
      error: string;
    }
  | {
      status: 200;
      data: Array<Note>;
    };

const Notes = () => {
  const data: LoaderReturn = useLoaderData();
  console.log("Data : ", data);
  if (data.status !== 200) {
    return <div>Error: {data.error}</div>;
  }

  return (
    <div>
      <NewNote />
      <NoteList notes={data.data} />
    </div>
  );
};

export default Notes;

export const links: LinksFunction = () => [...NewNoteLinks];

// export const action: ActionFunction = async ({ request, context, params }) => {
//   const formData = await request.clone().formData();
//   const _action = formData.get("_action");

//   if (_action === "Add_Note") {
//     AddLinks(formData);
//   }

//   return 0;
// };

export const action: ActionFunction = async ({ request }) => {
  try {
    const data = await request.clone().formData();
    const entries = Object.fromEntries(data);
    const formData = AddLinksSchema.safeParse(entries);

    if (!formData.success) {
      console.log(formData.error.format());
      return formData.error.flatten();
    }

    console.log(formData.data);

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: uuid(
          "Random String Secured",
          "b662a8b9-3355-4abf-92c1-d58ffb5294e9"
        ),
        ...formData.data,
      }),
    };

    const response = await fetch("http://localhost:5173/notes", requestOptions);
    const responseData = await response.json();
    console.log(responseData);
    return {
      data: responseData,
    };
  } catch (error) {
    console.error(error);
    return {
      error,
    };
  }
};
