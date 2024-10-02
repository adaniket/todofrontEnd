import { Suspense, useState } from "react";
import "./App.css";
import { RouterProvider, useLocation } from "react-router-dom";
import routes from "./routes/routes";
import BarLoader from "./components/Loader/BarLoader";

function App() {
  return (
    <Suspense
      fallback={
        <div className="h-[80vh] flex items-center justify-center">
          <BarLoader />
        </div>
      }
    >
      <RouterProvider router={routes} />
    </Suspense>
  );
}

export default App;
