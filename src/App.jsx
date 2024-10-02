import { Suspense, useState } from "react";
import "./App.css";
import { RouterProvider, useLocation } from "react-router-dom";
import routes from "./routes/routes";


function App() {
  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <RouterProvider router={routes} />
    </Suspense>
  );
}

export default App;
