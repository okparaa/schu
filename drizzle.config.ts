import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/app/api/server/db/tables/index.ts",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://muxok:intell@localhost:5432/bschus",
  },
});
