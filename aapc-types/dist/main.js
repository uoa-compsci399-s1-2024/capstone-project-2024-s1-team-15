"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  Article: () => Article,
  ArticleType: () => ArticleType,
  User: () => User
});
module.exports = __toCommonJS(main_exports);

// src/User.ts
var User = class {
  constructor(obj) {
    var _a, _b, _c, _d;
    this.username = (_a = obj == null ? void 0 : obj.username) != null ? _a : "";
    this.email = (_b = obj == null ? void 0 : obj.email) != null ? _b : "";
    this.displayName = (_c = obj == null ? void 0 : obj.displayName) != null ? _c : "";
    this.verified = (_d = obj == null ? void 0 : obj.verified) != null ? _d : false;
    this.registeredAt = ((obj == null ? void 0 : obj.registeredAt) ? new Date(obj.registeredAt) : /* @__PURE__ */ new Date()).toISOString();
  }
};

// src/Article.ts
var ArticleType = /* @__PURE__ */ ((ArticleType2) => {
  ArticleType2[ArticleType2["news"] = 0] = "news";
  ArticleType2[ArticleType2["research"] = 1] = "research";
  return ArticleType2;
})(ArticleType || {});
var Article = class {
  constructor(obj) {
    var _a, _b, _c, _d, _e, _f, _g;
    this.id = (_a = obj == null ? void 0 : obj.id) != null ? _a : 0;
    this.title = (_b = obj == null ? void 0 : obj.title) != null ? _b : "Default Title";
    this.articleType = (_c = obj == null ? void 0 : obj.articleType) != null ? _c : 0 /* news */;
    this.subtitle = (_d = obj == null ? void 0 : obj.subtitle) != null ? _d : "";
    this.content = (_e = obj == null ? void 0 : obj.content) != null ? _e : "Lorem Ipsum";
    this.publisher = new User((_f = obj == null ? void 0 : obj.publisher) != null ? _f : {});
    this.publishedAt = ((obj == null ? void 0 : obj.publishedAt) ? new Date(obj.publishedAt) : /* @__PURE__ */ new Date()).toISOString();
    this.lastEditedAt = ((obj == null ? void 0 : obj.lastEditedAt) ? new Date(obj.lastEditedAt) : /* @__PURE__ */ new Date()).toISOString();
    this.media = (_g = obj == null ? void 0 : obj.media) != null ? _g : [];
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Article,
  ArticleType,
  User
});
//# sourceMappingURL=main.js.map