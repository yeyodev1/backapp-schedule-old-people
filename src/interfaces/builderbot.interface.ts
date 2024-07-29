export interface Ctx {
  key: {
    remoteJid: string;
    fromMe: boolean;
    id: string;
  };
  messageTimestamp: number;
  pushName: string;
  broadcast: boolean;
  message: UploadImageData;
  body: string;
  name: string;
  from: string;
  host: string;
  urlTempFile: string;
}

export interface UploadImageData {
  imageMessage: {
    url: string;
    mimetype: string;
    fileSha256: string;
    fileLength: string;
    height: number;
    width: number;
    mediaKey: Uint8Array;
    fileEncSha256: string;
    directPath: string;
    filename?: string;
    mediaKeyTimestamp: string;
    jpegThumbnail: string;
    firstScanSidecar: string;
    firstScanLength: number;
    scansSidecar: string;
    scanLengths: string[];
    midQualityFileSha256: string;
  };
  messageContextInfo: {
    deviceListMetadata: Record<string, unknown>;
    deviceListMetadataVersion: number;
  };
};