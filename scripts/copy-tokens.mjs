import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dirname, "..");
const src = path.join(root, "src", "tokens", "tokens.css");
const destDir = path.join(root, "dist");

await mkdir(destDir, { recursive: true });
await copyFile(src, path.join(destDir, "tokens.css"));
