import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FaSlackHash } from "react-icons/fa";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { MdAltRoute } from "react-icons/md";

import Sidebar from "./Sidebar";
import DirectTodoListDemo from "./DirectTodoListDemo";
import HashbangRoutingTodoListDemo from "./HashbangRoutingTodoListDemo";
import FullRoutingTodoListDemo from "./FullRoutingTodoListDemo";
import "./index.css";
import "./markdown.css";

const linkItems = [
  { name: "Direct", path: "/", icon: BsFillLightningChargeFill },
  { name: "Hashbang", path: "/hashbang", icon: FaSlackHash },
  { name: "Full Routing", path: "/full", icon: MdAltRoute },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <DirectTodoListDemo />,
  },
  {
    path: "/hashbang",
    element: <HashbangRoutingTodoListDemo />,
  },
  {
    path: "/full",
    element: <FullRoutingTodoListDemo />,
  },
  {
    path: "/full/:viewMode",
    element: <FullRoutingTodoListDemo />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <Sidebar title="Oxymora" linkItems={linkItems}>
        <RouterProvider router={router} />
      </Sidebar>
    </ChakraProvider>
  </React.StrictMode>
);
