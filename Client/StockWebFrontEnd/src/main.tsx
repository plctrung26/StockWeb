import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App'
import InsertDataPage from './InsertDataPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  }, {
    path: "/insert",
    element: <InsertDataPage />,

  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
