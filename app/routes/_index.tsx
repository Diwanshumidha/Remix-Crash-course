import type { MetaFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import { LinksFunction } from "@remix-run/react/dist/routeModules";
import styles from "@/styles/home.css";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main id="content">
      <h1>Hey There its A Note Taking App</h1>
      <p>Its an Amazing Remix App vit basic functionalities</p>
      <p id="cta">
        <Link to={"/notes"}>Try now</Link>
      </p>
    </main>
  );
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
