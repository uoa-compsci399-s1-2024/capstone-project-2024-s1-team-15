import { Article, ArticleType, IArticle, IUser, User } from "@aapc/types";
import { getRandomID } from "../functions";

export interface InputValidationError<T> {
  field: keyof T;
  message: string;
}

export interface IArticleIn
  extends Omit<
    IArticle,
    "id" | "lastEditedAt" | "publishedAt" | "publisher" | "articleType"
  > {}

export interface IUserIn extends Omit<IUser, "verified" | "registeredAt"> {}

class Validator<T> {
  errors: InputValidationError<T>[] = [];

  checkMissing(obj: any, k: keyof T): any {
    if (obj[k] === undefined) {
      this.errors.push({
        field: k,
        message: `Required attribute ${String(k)} not present in request body.`,
      });
      return null;
    } else {
      return obj[k];
    }
  }
}

export class ArticleIn extends Validator<IArticleIn> implements IArticleIn {
  title: string;
  subtitle: string;
  content: string;
  media: string[];

  constructor(obj: any) {
    super();
    this.title = this.checkMissing(obj, "title");
    this.subtitle = this.checkMissing(obj, "subtitle");
    this.content = this.checkMissing(obj, "content");
    this.media = this.checkMissing(obj, "media");
    if (this.errors.length > 0) {
      throw new TypeError(JSON.stringify(this.errors));
    }
  }

  toArticle(
    articleType: ArticleType,
    publisher: User,
    articleID?: string,
  ): Article {
    return new Article({
      id: articleID ?? getRandomID(), // TODO: implement id checks
      title: this.title,
      subtitle: this.subtitle,
      content: this.content,
      media: this.media,
      articleType: articleType,
      publisher: publisher,
      publishedAt: new Date().toISOString(),
      lastEditedAt: new Date().toISOString(),
    });
  }
}

export class UserIn extends Validator<IUserIn> implements IUserIn {
  username: string;
  email: string;
  displayName: string;

  constructor(obj: any) {
    super();
    this.username = this.checkMissing(obj, "username");
    this.email = this.checkMissing(obj, "email");
    this.displayName = this.checkMissing(obj, "displayName");
    if (this.errors.length > 0) {
      throw new TypeError(JSON.stringify(this.errors));
    }
  }

  toUser(): User {
    return new User({
      username: this.username,
      email: this.email,
      displayName: this.displayName,
      verified: false,
      registeredAt: new Date().toISOString(),
    });
  }
}
