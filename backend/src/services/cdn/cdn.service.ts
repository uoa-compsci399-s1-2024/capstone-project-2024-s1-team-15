import { ImageFormat } from "@aapc/types";

export default interface ICDNService {
    putImage(image: Buffer, id: string, imageFormat: ImageFormat): Promise<string>
    deleteImage(key: string): Promise<boolean>
}
