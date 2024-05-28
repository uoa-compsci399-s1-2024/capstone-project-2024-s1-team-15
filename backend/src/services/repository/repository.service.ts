import {
    ArrayResult,
    ArrayResultOptions,
    ArticleSortFields, ImageMetadataSortFields,
    Nullable,
    SortOptions,
    UserSortFields
} from "@/util/types/types"
import { Article, ImageMetadata, PollenData, User } from "@aapc/types"

export default interface IRepository {
    // Article CRUD Methods
    getNews(
        title?: string,
        publisher?: string,
        options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>
    ): Promise<ArrayResult<Article>>
    getResearch(
        title?: string,
        publisher?: string,
        options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>
    ): Promise<ArrayResult<Article>>
    getNewsById(id: string): Promise<Nullable<Article>>
    getResearchById(id: string): Promise<Nullable<Article>>
    createNews(a: Article): Promise<Article>
    createResearch(a: Article): Promise<Article>
    editNews(id: string, a: Article): Promise<Article>
    editResearch(id: string, a: Article): Promise<Article>
    deleteNews(id: string): Promise<void>
    deleteResearch(id: string): Promise<void>

    // User CRUD Methods
    getAllUsers(options?: ArrayResultOptions<SortOptions<User, UserSortFields>>): Promise<ArrayResult<User>>
    getUserByUsername(username: string): Promise<Nullable<User>>
    searchUserByUsername(
        username: string,
        options?: ArrayResultOptions<SortOptions<User, UserSortFields>>
    ): Promise<ArrayResult<User>>
    createUser(u: User): Promise<User>
    editUser(username: string, u: User): Promise<User>
    deleteUser(username: string): Promise<void>

    // Pollen Data CRUD Methods
    createPollenDataset(pollenData: PollenData[]): Promise<any>
    getPollenDataset(): Promise<PollenData[]>
    deletePollenDataset(): Promise<any>

    // Image Metadata CRUD Methods
    getImageMetadata(
        username?: Nullable<string>,
        options?: ArrayResultOptions<SortOptions<ImageMetadata, ImageMetadataSortFields>>
    ): Promise<ArrayResult<ImageMetadata>>
    getImageMetadataById(id: string): Promise<Nullable<ImageMetadata>>
    createImageMetadata(im: ImageMetadata): Promise<ImageMetadata>
    editImageMetadata(id: string, im: ImageMetadata): Promise<ImageMetadata>
    deleteImageMetadata(id: string): Promise<void>
}
