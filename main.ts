// The Funniest Toaster Error — one line a kitchen toaster shows its owner.
// Writes the entry to /output/entry.txt (or MAKEFUN_OUTPUT_DIR when set).
import { isAbsolute, join } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "ERROR: Bagel jammed. Please remove it and reflect on your choices.";

if (LINE.length < 1 || LINE.length > 120 || LINE.trim().length === 0) {
  throw new Error(`entry line must be 1-120 chars, got ${LINE.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
const dest = outDir
  ? isAbsolute(outDir)
    ? join(outDir, "entry.txt")
    : join(process.cwd(), outDir, "entry.txt")
  : join(process.cwd(), "out", "entry.txt");

mkdirSync(dest.slice(0, dest.lastIndexOf("/")), { recursive: true });
writeFileSync(dest, LINE + "\n", "utf8");
