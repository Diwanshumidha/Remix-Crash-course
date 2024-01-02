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
    <div>
      <Link to={"/notes"}>Go to Demo</Link>
      <Outlet />
    </div>
  );
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
