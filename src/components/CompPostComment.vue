<template>
  <div>
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
      <div class="post-comment-button">
        <button type="button" v-on:click="preClick">コメント投稿</button>
      </div>
      <div class="error-message" v-show="canShow">{{ getErrorMessage }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Emit, Prop, Component, Vue } from "vue-property-decorator";
@Component
export default class CompPostComment extends Vue {
  //コメント者の名前
  @Prop()
  private commentName!: string;
  //コメントの内容
  @Prop()
  private commentContent!: string;
  //記事ID
  @Prop()
  private articleId!: number;
  //エラーメッセージ表示させるかどうか
  private canShow = false;

  /**
   * 親コンポーネントに引数を渡すためのカスタムイベント.
   * @params articleId - 記事ID
   * @params name - コメント者の名前
   * @params content - コメントの内容
   */
  @Emit()
  onClick(articleId: number, name: string, content: string): void {
    console.log(articleId, name, content);
  }

  /**
   * コメント投稿ボタンをクリックした時に、onClickメソッドを呼ぶためのメソッド.
   */
  preClick(): void {
    this.canShow = false;
    this.validateName(this.commentName);
    this.validateEmptyContent(this.commentContent);
    if (this.canShow) {
      return;
    }
    this.onClick(this.articleId, this.commentName, this.commentContent);
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
.error-message {
  color: red;
}
</style>
