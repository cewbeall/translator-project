import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
    // index("routes/home.tsx"),  // TODO: Can add more pages here
    route("translate", "routes/main.tsx")
] satisfies RouteConfig;
