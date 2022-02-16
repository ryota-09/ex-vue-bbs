<template>
  <div>
    <div class="post-comment">
          <div class="comment-name">
            <label for="comment-name-field">名前: </label>
            <div>
              <input
                type="text"
                id="comment-name-field"
                v-model="commentName"
              />
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
          <div class="post-comment-button">
            <button type="button" v-on:click="preClick">
              コメント投稿
            </button>
          </div>
        </div>
  </div>
</template>

<script lang="ts">
import { Emit, Prop, Component, Vue } from "vue-property-decorator";
@Component
export default class CompPostComment extends Vue {
  @Prop()
  private commentName!:string;
  @Prop()
  private commentContent!:string;
  @Prop()
  private articleId!:number;

  @Emit()
  onClick(articleId:number, name: string, content: string): void{
    console.log(articleId, name, content);
  }

  preClick(): void{
    this.onClick(this.articleId, this.commentName, this.commentContent);
  }
}
</script>

<style scoped>
.comment-content-area {
  text-align: center;
}
.post-comment {
  margin: 20px;
}
.post-comment-button {
  padding: 0 39px;
  text-align: right;
}
</style>
