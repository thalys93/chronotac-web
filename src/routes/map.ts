import HomePage from "@/subdomains/app/pages/Home/HomePage";
import HistoryPage from "@/subdomains/app/pages/History/HistoryPage";
import NotFoundPage from "@/subdomains/app/pages/NotFound/NotFoundPage";
import { ReactElement } from "react";

type RouteItem = {
    path: string;
    element: () => ReactElement;
};

type RoutesGroup = {
    public?: RouteItem[];
    private?: RouteItem[];
    prefix?: string;
};

export const AppRoutes: RoutesGroup = {
    prefix: "",
    public: [
        { path: "", element: HomePage },
        { path: "history", element: HistoryPage },
        { path: "*", element: NotFoundPage },
    ]
};

export const AllRoutes: RoutesGroup[] = [AppRoutes];