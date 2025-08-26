import { Routes, Route } from "react-router-dom";
import { AllRoutes } from "./map";

const renderAllRoutes = () => {
    const elements: JSX.Element[] = [];

    const applyPrefix = (prefix: string | undefined, path: string) =>
        `${prefix ? `/${prefix}` : ""}/${path}`.replace(/\/+$/, "").replace(/^\/+/, "/");

    for (const group of AllRoutes) {
        const { public: pub = [], private: priv = [], prefix } = group;

        for (const route of pub) {
            const fullPath = route.path === "" ? "/" : applyPrefix(prefix, route.path);
            const Element = route.element;
            elements.push(<Route key={fullPath} path={fullPath} element={<Element />} />);
        }

        for (const route of priv) {
            const fullPath = applyPrefix(prefix, route.path);
            const Element = route.element;
            elements.push(
                <Route
                    key={fullPath}
                    path={fullPath}
                    element={<Element />}
                />
            );
        }
    }

    return elements;
};

export default function AppRoutes() {
    return (
        <Routes>
            {renderAllRoutes()}
        </Routes>
    );
}