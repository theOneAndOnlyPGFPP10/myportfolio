import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
 
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);
 
export async function GET() {
  const dir = path.join(process.cwd(), 'public', 'images', 'narration');
 
  if (!fs.existsSync(dir)) {
    return NextResponse.json({ images: [] });
  }
 
  const images = fs
    .readdirSync(dir)
    .filter((file) => IMAGE_EXTS.has(path.extname(file).toLowerCase()))
    .sort();
 
  return NextResponse.json({ images });
}