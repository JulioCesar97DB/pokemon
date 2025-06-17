import { createBrowserRouter } from "react-router";
import Root from "../Root";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "../pages/HomePage";
import { TeamsPage } from "../pages/Teams/TeamsPage";
import { TeamsLayout } from "../layouts/TeamsLayout";
import { CombatPage } from "../pages/CombatPage";
import { DraftsPage } from "../pages/Teams/DraftsPage";
import { NewTeam } from "../pages/Teams/NewTeam";


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
                            },
                            {
                                path: "drafts",
                                Component: DraftsPage
                            },
                            {
                                path: "new",
                                Component: NewTeam
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