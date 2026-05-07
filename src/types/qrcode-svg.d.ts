declare module "qrcode-svg" {
  interface QRCodeOptions {
    content: string;
    width?: number;
    height?: number;
    color?: string;
    background?: string;
    ecl?: "L" | "M" | "Q" | "H";
    padding?: number;
    join?: boolean;
    container?: "svg" | "g" | "none";
    pretty?: boolean;
    xmlDeclaration?: boolean;
  }
  class QRCode {
    constructor(options: QRCodeOptions | string);
    svg(opts?: { container?: "svg" | "g" | "none" }): string;
  }
  export default QRCode;
}
