import { createBrowserRouter } from "react-router";
import Root from "../Root";
import { MainLayout } from "../layouts/MainLayout";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                path: "/",
                Component: MainLayout,

            },
        ]
    }
])