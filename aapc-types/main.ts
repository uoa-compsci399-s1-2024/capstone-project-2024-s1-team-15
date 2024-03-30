import Article, { ArticleType } from "./src/Article";
import User from "./src/User";

let u = new User({ displayName: "Hunter", username: "huzz", verified: false })
let uJSON = JSON.stringify(u)
let uRebuilt = new User(JSON.parse(uJSON))

let a = new Article({ title: "A cool title", publisher: uRebuilt, articleType: ArticleType.research })
let aJSON = JSON.stringify(a)
let aRebuilt = new Article(JSON.parse(aJSON))

console.log(a)
console.log(aRebuilt)
console.log(JSON.stringify(a) === JSON.stringify(aRebuilt))
