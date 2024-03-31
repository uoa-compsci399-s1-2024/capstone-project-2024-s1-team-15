import Article, { ArticleType } from "./src/Article";
import User from "./src/User";
import Paginator from "./src/Paginator";

// class Test {
//     a: string
//
//     constructor() {
//         this.a = "foo"
//     }
// }

let u = new User({ displayName: "Hunter", username: "huzz", verified: false })
let uJSON = JSON.stringify(u)
let uRebuilt = new User(JSON.parse(uJSON))

let a = new Article({ title: "A cool title", publisher: uRebuilt, articleType: ArticleType.research })
let aJSON = JSON.stringify(a)
let aRebuilt = new Article(JSON.parse(aJSON))

let p = new Paginator(Article, {resultsPerPage: 5})
let pJSON = JSON.stringify(p)
let pRebuilt = new Paginator(Article, JSON.parse(pJSON))

console.log(JSON.stringify(a) === JSON.stringify(aRebuilt))
console.log(JSON.stringify(p) === JSON.stringify(pRebuilt))
