<template>
  <div class="posts-card">
    <div v-for="(post, index) in posts" :key="index" :id="index" class="posts-card__content">
      <router-link :to="`posts/${post._id}`">
        <!-- <p>{{post.postAuthorName}}</p>
        <p>{{post.postTitle}}</p>
        <p>{{post.postContent}}</p>
        <p>{{post._id}}</p>-->
       
        <post-list v-bind:title="post.postTitle">a</post-list>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "appPostList",
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    axios.get("http://localhost:3001/api/blog/posts").then(res => {
      this.posts = res.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.posts-card {
  border-radius: 4px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 12px;
}
.posts-card__content {
  padding-right: 10px;
  text-align: left;
}
</style>