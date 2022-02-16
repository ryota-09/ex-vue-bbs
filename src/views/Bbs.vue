<template>
  <div class="bbs">
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
        <hr />
      </div>
    </div>
    <!--///////////////////////////////// ここからタイムライン関係/////////////////// -->
    <div class="article-list"></div>
    <div
      class="article"
      v-for="(article, i) of currentArticleList"
      v-bind:key="article.id"
    >
      <div class="article-name">投稿者名: {{ article.name }}</div>
      <div class="article-content">
        <span>投稿内容: </span>
        <pre>{{ article.content }}</pre>
      </div>
      <div class="delete-button">
        <button type="button" v-on:click="deleteArticle(i)">記事削除</button>
      </div>
      <div class="article-commentlist">
        <div v-for="comment of article.commentList" v-bind:key="comment.id">
          <span>コメント者: {{ comment.name }}</span>
          <div>コメント内容:</div>
          <div>
            <pre>{{ comment.content }}</pre>
          </div>
        </div>
      </div>
      <div class="post-comment">
        <div class="comment-name">
          <label for="comment-name-field">名前: </label>
          <div>
            <input type="text" id="comment-name-field" v-model="commentName" />
          </div>
        </div>
        <div class="comment-content">
          <label for="comment-content-field">コメント: </label>
          <div>
            <textarea
              id="comment-content-field"
              cols="30"
              rows="5"
              v-model="commentContent"
            ></textarea>
          </div>
        </div>
        <button type="button" v-on:click="addComment(article.id)">
          コメント投稿
        </button>
        <hr />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Article } from "@/types/article";
import { Comment } from "@/types/comment";
import { Component, Vue } from "vue-property-decorator";
@Component
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
    let newId = 0;
    if (this.$store.getters.getArticles) {
      newId = this.$store.getters.getArticles[0].id + 1;
    }
    this.$store.commit("addArticle", {
      article: new Article(newId, this.articleName, this.articleContent, []),
    });

    this.articleName = "";
    this.articleContent = "";
  }

  /**
   * コメントを追加する.
   * @param articleId - 記事のid
   */
  addComment(articleId: number): void {
    this.$store.commit("addComment", {
      article: new Comment(
        -1,
        this.commentName,
        this.commentContent,
        articleId
      ),
    });
    this.commentName = "";
    this.commentContent = "";
  }
  /**
   * 記事を削除する.
   * @params articleIndex - 現在のcurrentArticleList配列のインデックス番号
   */
  deleteArticle(articleIndex: number): void {
    console.log(articleIndex);
    this.$store.commit("deleteArticle", {
      articleIndex: articleIndex,
    });
  }
}
</script>

<style scoped>
.bbs {
  text-align: left;
}
.post-name {
  margin: 5px 0;
}
</style>
