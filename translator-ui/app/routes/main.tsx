import type { Route } from "./+types/main";
import { Translate } from "../translate/translate";

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Translate/>
}