<template>
  <div>
    <post-list
      v-bind:titulo="post.postTitle"
      v-bind:author="post.postAuthorName"
      v-bind:post="post.postContent"
    >
     <div slot="card-img" class="img-container">
    <img
      class="card__body__img__detail"
      src="../assets/pic-2.png"
      alt="dummy image"
    />
  </div>
    </post-list>
    <p class="comments__count" v-if="post.comments.length > 0">{{post.comments.length}} Comentarios</p>
    <div class="card__footer" v-for="(comment, index) in post.comments" :key="index" :id="index">
      <post-comments
        v-bind:author="comment.commentAuthorName"
        v-bind:creacion="comment.createdAt"
        v-bind:texto="comment.commentContent"
      />
    </div>
    <div class="empty" v-if="post.comments.length <= 0">
      <p class="card-comment__text">No hay comentarios</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AppPostDetail",
  data() {
    return {
      post: {}
    };
  },
  mounted() {
    axios
      .get(`http://localhost:3001/api/blog/posts/${this.$route.params.id}`)
      .then(res => {
        this.post = res.data;
      });
  }
};
</script>

<style lang="scss" scoped>
.img-container{
  display: flex;
  justify-content: center;
}
.card__body__img__detail {
  
  @media (max-width: 1000px) {
    max-height: 45vh;
    margin: 0 auto;
  }
  max-height: 65vh;
}

.empty {
  color: whitesmoke;
  margin: 20px;
  padding: 20px;

  & .card-comment__text {
    background: #232222;
    border-radius: 4px;
    margin: 10px 0;
    padding:25px;
    text-align: center;
  }
}


.card__footer {
  color: whitesmoke;
  margin-bottom: 20px;
  padding: 0 25px;
}

.comments__count{
  color: black;
  padding: 0 50px;

}


</style>