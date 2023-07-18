import { readFileSync } from "fs";
import { join } from "path";

export const readFileCustom = (path) =>
  JSON.parse(readFileSync(join(process.cwd(), "src", "model", path)));