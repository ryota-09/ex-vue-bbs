<template>
  <div class="bbs">
    <h1 class="title">掲示板アプリ</h1>
    <div class="postarea">
      <div class="post-name">
        <label for="post-name">投稿者名: </label>
        <input type="text" id="post-name" v-model="articleName" />
      </div>
      <div class="post-content">
        <label for="post-content">投稿内容: </label>
        <textarea
          id="post-content"
          cols="30"
          rows="10"
          v-model="articleContent"
        ></textarea>
        <div class="post-button">
          <button type="button" v-on:click="addArticle">記事投稿</button>
        </div>
        <div class="error-message" v-show="canShow">{{ getErrorMessage }}</div>
      </div>
    </div>
    <hr />
    <!--///////////////////////////////// ここからタイムライン関係/////////////////// -->
    <div class="article-list">
      <div
        class="article"
        v-for="(article, index) of currentArticleList"
        v-bind:key="article.id"
      >
        <div class="article-conteiner">
          <div class="article-name">投稿者名: {{ article.name }}</div>
          <div class="article-content">
            <span>投稿内容: </span>
            <pre class="article-content-area">{{ article.content }}</pre>
          </div>
          <div class="delete-button">
            <button type="button" v-on:click="deleteArticle(index)">
              記事削除
            </button>
          </div>
        </div>
        <div class="article-commentlist">
          <div
            class="article-comment"
            v-for="comment of article.commentList"
            v-bind:key="comment.id"
          >
            <span>コメント者: {{ comment.name }}</span>
            <div>コメント内容:</div>
            <div>
              <pre class="comment-content-area">{{ comment.content }}</pre>
            </div>
          </div>
        </div>
        <!-- /////////////////////コメント投稿部分//////////////////////// -->
        <CompPostComment
          v-bind:comment-name="commentName"
          v-bind:comment-content="commentContent"
          v-bind:article-id="article.id"
          v-on:on-click="addComment"
        ></CompPostComment>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Article } from "@/types/article";
import { Comment } from "@/types/comment";
import { Component, Vue } from "vue-property-decorator";
import CompPostComment from "@/components/CompPostComment.vue";
@Component({
  components: {
    CompPostComment,
  },
})
export default class Bbs extends Vue {
  //現在の記事一覧
  private currentArticleList = new Array<Article>();
  //投稿者名
  private articleName = "";
  //投稿内容
  private articleContent = "";
  //コメント者名
  private commentName = "";
  //コメント内容
  private commentContent = "";
  //エラーメッセージ表示させるかどうか
  private canShow = false;

  /**
   * 記事一覧を表示する.
   * @remarks Vuexストア内の記事一覧をcurrentArticleListに格納する
   */
  created(): void {
    this.currentArticleList = this.$store.getters.getArticles;
  }
  /**
   * 記事を追加する.
   */
  addArticle(): void {
    this.canShow = false;
    this.validateName(this.articleName);
    this.validateEmptyContent(this.articleContent);
    if (this.canShow) {
      return;
    }

    let newId = 0;
    if (this.$store.getters.getArticles) {
      newId = this.$store.getters.getArticles[0].id + 1;
    }
    this.$store.commit("addArticle", {
      article: new Article(newId, this.articleName, this.articleContent, []),
    });

    this.canShow = false;
    this.articleName = "";
    this.articleContent = "";
  }

  /**
   * コメントを追加する.
   * @param articleId - 記事のid
   */
  addComment(
    articleId: number,
    commentName: string,
    commentContent: string
  ): void {
    this.$store.commit("addComment", {
      comment: new Comment(-1, commentName, commentContent, articleId),
    });
    this.canShow = false;
    this.commentName = "";
    this.commentContent = "";
  }
  /**
   * 記事を削除する.
   * @params articleIndex - 現在のcurrentArticleList配列のインデックス番号
   */
  deleteArticle(articleIndex: number): void {
    this.$store.commit("deleteArticle", {
      articleIndex: articleIndex,
    });
  }
  /**
   * 名前の入力フォームの検証を行うメソッド.
   * @params formStr - フォームに入力されたテキスト
   */
  validateName(formStr: string): void {
    if (formStr === "") {
      this.$store.commit("changeErrorMessage", {
        errorMessage: "名前を入力してください。",
      });
      this.canShow = true;
      return;
    } else if (formStr.length > 50) {
      this.canShow = true;
      this.$store.commit("changeErrorMessage", {
        errorMessage: "名前は50字以内で入力してください。",
      });
      return;
    }
  }
  /**
   * 投稿内容とコメント欄の検証を行うメソッド.
   * @params formStr - フォームに入力されたテキスト
   */
  validateEmptyContent(formStr: string): void {
    if (formStr === "") {
      this.canShow = true;
      this.$store.commit("changeErrorMessage", {
        errorMessage: "内容を入力してください。",
      });
      return;
    }
  }
  /**
   * エラーメッセージを取得するgetter.
   */
  get getErrorMessage(): string {
    return this.$store.getters.getErrorMessage;
  }
}
</script>

<style scoped>
.bbs {
  padding: 20px 150px;
  margin: 0 auto;
  text-align: left;
  font-size: 15px;
}
.title {
  text-align: center;
  border-top: 2px solid rgb(143, 199, 143);
  border-bottom: 2px solid rgb(143, 199, 143);
  font-weight: 900;
  font-size: 40px;
}
.postarea {
  margin: 10px 0;
  padding: 0 20%;
  background-color: lightyellow;
}
.post-button {
  text-align: right;
  margin: 5px 5px;
  padding: 10px 0;
}
.post-name {
  padding: 10px 0;
  margin: 5px 0;
}
.article {
  margin: 10px 0;
  padding: 10px 20%;
  background-color: beige;
}
.article-conteiner {
  padding: 5px;
  background-color: blanchedalmond;
}
.article-content-area {
  text-align: center;
  padding: 50px 0;
}
.delete-button {
  text-align: right;
  padding: 0;
  margin: 10px;
}
.article-comment {
  padding: 5px;
  margin: 20px;
  background-color: lightyellow;
}
.error-message {
  color: red;
}
</style>
