import Vue from 'vue'
import Vuex from 'vuex'
import { Article } from "@/types/article"
import { Comment } from "@/types/comment"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    articles: [
      new Article(3, "佐藤", "佐藤さんの記事", []),
      new Article(2, "山田", "山田さんの記事", [
        new Comment(13, "山崎", "山崎さんのコメント", 2),
      ]),
      new Article(1, "伊藤", "伊藤さんの記事", [
        new Comment(12, "鈴木", "鈴木さんのコメント", 1),
        new Comment(11, "吉田", "吉田さんのコメント", 1),
      ]),
    ],
  },
  actions: {
  },
  mutations: {
    /**
     * 記事を追加する.
     * @param state - ステイト
     * @param payload - ペイロード
     */
    addArticle(state, payload){
      state.articles.unshift(payload.article);
    },
    /**
     * コメントを追加する.
     * @param state - ステイト
     * @param payload - ペイロード
     */
    addComment(state, payload){
      let newComment = new Comment(0, "", "", 0);
      for(const article of state.articles){
        if( article.id === payload.article.articleId){
          newComment = payload.article
          article.commentList.push(newComment);
        }
      }
    },
    /**
     * 記事を削除する.
     * @param state - ステイト
     * @param payload - ペイロード
     */
    deleteArticle(state, payload){
      state.articles.splice(payload.articleIndex, 1);
    }
  },
  modules: {
  },
  getters: {
    /**
     * 記事一覧を取得するgetter.
     * @param state - ステイト
     * @returns 記事一覧を表す配列
     */
    getArticles(state){
      return state.articles;
    }
  }
})
