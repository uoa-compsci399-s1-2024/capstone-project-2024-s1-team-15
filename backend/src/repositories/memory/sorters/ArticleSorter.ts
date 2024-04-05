import { Article } from "@aapc/types";
import Sorter from "./Sorter";


export type ArticleSortFields = "publishedAt" | "editedAt"

export default class ArticleSorter implements Sorter<Article, ArticleSortFields> {
    field: ArticleSortFields
    descending: boolean

    constructor(field: ArticleSortFields = "publishedAt", descending: boolean = false) {
        this.field = field
        this.descending = descending
    }

    sort(r: Article[]): Article[] {
        return r
        // TODO: implement this
    }
}
