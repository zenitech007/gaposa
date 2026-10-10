import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "gaposa-cms";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "gateway-ict-polytechnic",
  title: "Gateway ICT Polytechnic Saapade Studio",
  basePath: "/admin",
  projectId,
  dataset,
  plugins: [structureTool()],
  releases: {
    enabled: false,
  },
  schema: {
    types: schemaTypes,
  },
});
