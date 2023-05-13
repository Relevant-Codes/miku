import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import ErrorPage from "./error-page";
import EditOffer,
{
  action as editAction,
} from "./routes/edit";

import Offer, {
  loader as offerLoader,
} from "./routes/offer";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "offers/:offerId",
        element: <Offer />,
        loader: offerLoader,
      },
      {
        path: "offers/:offerId/edit",
        element: <EditOffer />,
        loader: offerLoader,
        action:editAction,
      },
    ], 
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);