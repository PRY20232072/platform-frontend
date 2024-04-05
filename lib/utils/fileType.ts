import { fileTypeFromBuffer, FileTypeResult } from "file-type";

export default async function getfileTypeFromBuffer(
  buffer: ArrayBuffer
): Promise<FileTypeResult | undefined> {
  return await fileTypeFromBuffer(buffer);
}
