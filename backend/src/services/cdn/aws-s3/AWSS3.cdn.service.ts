import ICDNService from "@/services/cdn/cdn.service"
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { ImageFormat } from "@aapc/types"

export default class AWSS3CDNService implements ICDNService {
    private readonly bucketName: string
    private readonly bucketRegion: string
    private readonly s3: S3Client

    constructor(bucketName: string) {
        this.bucketRegion = "us-east-1"
        this.bucketName = bucketName
        this.s3 = new S3Client({ region: this.bucketRegion })
    }

    async putImage(image: Buffer, id: string, imageFormat: ImageFormat): Promise<string> {
        try {
            const command = new PutObjectCommand({
                Bucket: this.bucketName,
                Key: `${id}.${imageFormat}`,
                ContentType: `image/${imageFormat}`.replace("jpg", "jpeg"),
                Body: image
            })
            await this.s3.send(command)
            return `https://${command.input.Bucket}.s3.${this.bucketRegion}.amazonaws.com/${command.input.Key}`
        } catch (e) {
            throw e
        }
    }

    async deleteImage(key: string): Promise<boolean> {
        try {
            const command = new DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: key
            })
            await this.s3.send(command)
            return true
        } catch (e) {
            throw e
        }
    }
}
