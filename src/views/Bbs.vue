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
  /**
   * 記事一覧を表示する.
   * @remarks Vuexストア内の記事一覧をcurrentArticleListに格納する
   */
  created(): void{
    this.currentArticleList = this.$store.getters.getArticles;
  }

}
</script>

<style scoped>

</style>
