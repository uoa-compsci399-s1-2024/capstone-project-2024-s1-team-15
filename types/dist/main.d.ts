/**
 * An interface representing a user.
 */
interface IUser {
    username: string;
    email: string;
    displayName: string;
    verified: boolean;
    registeredAt: string;
}
/**
 * A class representing a user.
 */
declare class User implements IUser {
    /**
     * The default constructor with no arguments.
     */
    constructor();
    /**
     * Overloaded constructor for instantiating a User with a generic object.
     * @param obj - A partial object representing IUser
     */
    constructor(obj: Partial<IUser>);
    username: string;
    email: string;
    displayName: string;
    verified: boolean;
    registeredAt: string;
}

/**
 * An enum representing the two types of articles published to the website.
 */
declare enum ArticleType {
    news = 0,
    research = 1
}
/**
 * An interface representing an article.
 */
interface IArticle {
    id: number;
    title: string;
    subtitle: string;
    content: string;
    publisher: IUser;
    articleType: ArticleType;
    publishedAt: string;
    lastEditedAt: string;
    media: string[];
}
/**
 * A class representing an article.
 */
declare class Article implements IArticle {
    /**
     * The default constructor with no arguments.
     */
    constructor();
    /**
     * Overloaded constructor for instantiating an Article with a generic object.
     * @param obj - A partial object representing IArticle
     */
    constructor(obj: Partial<IArticle>);
    id: number;
    title: string;
    articleType: ArticleType;
    content: string;
    publisher: IUser;
    subtitle: string;
    publishedAt: string;
    lastEditedAt: string;
    media: string[];
}

export { Article, ArticleType, type IArticle, type IUser, User };
