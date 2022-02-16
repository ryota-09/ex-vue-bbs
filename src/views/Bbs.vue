<template>
  <div>
    
  </div>
</template>

<script lang="ts">
import { Article } from "@/types/article";
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
  created(): void{
    this.currentArticleList = this.$store.getters.getArticles;
    this.addArticle();
  }
  /**
   * 記事を追加する
   */
  addArticle(): void{
    let newId = 0;
    if (!this.$store.getters.getArticles){
      newId = 0;
    } else {
      newId = this.$store.getters.getArticles[0].id++;
    }
    this.$store.commit("addArticle", {
      article: new Article(newId, this.articleName, this.articleContent, [])
    })

    this.articleName = "";
    this.articleContent = "";
  }
}
</script>

<style scoped>

</style>
