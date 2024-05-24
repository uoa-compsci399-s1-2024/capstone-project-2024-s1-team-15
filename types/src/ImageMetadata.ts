import User, { IUser } from "./User";
export enum ImageFormat {
    jpg="jpg", png="png"
}

export interface IImageMetadata {
    id: string
    height: number
    width: number
    size: number
    format: ImageFormat
    createdBy: IUser
    createdAt: string
    src: string
    alt: string | null
    origin: string | null
}

export default class ImageMetadata implements IImageMetadata {
    /**
     * The default constructor with no arguments.
     */
    constructor()

    /**
     * Overloaded constructor for instantiating an ImageMetadata object with a generic object.
     * @param obj - A partial object representing IImageMetadata
     */
    constructor(obj: Partial<IImageMetadata>)

    constructor(obj?: Partial<IImageMetadata>) {
        this.id = obj?.id ?? ""
        this.height = obj?.height ?? 0
        this.width = obj?.width ?? 0
        this.size = obj?.size ?? 0
        this.format = obj?.format ?? ImageFormat.jpg
        this.createdBy = new User(obj?.createdBy ?? {})
        this.createdAt = (obj?.createdAt ? new Date(obj.createdAt) : new Date()).toISOString()
        this.src = obj?.src ?? ""
        this.alt = obj?.alt ?? null
        this.origin = obj?.origin ?? null
    }

    id: string
    height: number
    width: number
    size: number
    format: ImageFormat
    createdBy: IUser
    createdAt: string
    src: string
    alt: string | null
    origin: string | null
}
