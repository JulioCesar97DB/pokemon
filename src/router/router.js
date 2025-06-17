import { createBrowserRouter } from "react-router";
import Root from "../Root";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "../pages/HomePage";
import { TeamsPage } from "../pages/TeamsPage";
import { TeamsLayout } from "../layouts/TeamsLayout";
import { CombatPage } from "../pages/CombatPage";


export const router = createBrowserRouter([
    {
        Component: Root,
        children: [
            {
                path: "/",
                Component: MainLayout,
                children: [
                    {
                        index: true,
                        Component: HomePage
                    },
                    {
                        path: "teams",
                        Component: TeamsLayout,
                        children: [
                            {
                                index: true,
                                Component: TeamsPage
                            }
                        ]
                    },
                    {
                        path: "combat",
                        Component: CombatPage
                    }
                ]
            },
        ]
    }
])