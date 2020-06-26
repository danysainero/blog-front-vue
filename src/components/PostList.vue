<template>
  <div v-if="posts.length > 0">
    <div class="flex-grid">
      <div class="card" v-for="(post, index) in posts" :key="index" :id="index">
        <div class="card-container">
          <div class="card__body">
            <router-link :to="`posts/${post._id}`">
              <p class="card__info">Autor: {{ post.postAuthorName }}</p>
              <div class="card__img">
                <img class="card__img__detail" src="../assets/pic-2.png" alt="dummy image" />
              </div>
              <p class="card__title">{{ post.postTitle }}</p>
              <p class="card__text">{{ post.postContent }}</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>No posts</div>
</template>

<script>

import { mapGetters, mapActions } from "vuex";

export default {
  name: "appPostList",
  computed: {
    ...mapGetters(["posts"])
  },
  methods: {
    ...mapActions(["GET_ALL_POSTS"])
  },
  beforeMount() {
    this.GET_ALL_POSTS();
  }
};
</script>

<style lang="scss" scoped>
li a,
a {
  text-decoration: none;
}
.flex-grid {
  @media (min-width: 600px) and (max-width: 1000px) {
    column-count: 2;
    column-gap: 30px;
    column-width: 48%;
  }
  @media (max-width: 600px) {
    column-count: 1;
    column-gap: 1px;
    column-width: 98%;
    padding: 10px;
    width: calc(100vw - 20px);
  }

  column-count: 3;
  column-gap: 30px;
  column-width: 25%;
  width: calc(100vw - 60px);
  padding: 50px 20px;
}

.card-container {
  border: 0.5px solid rgba(99, 99, 99, 0.404);
  border-radius: 4px;
  box-shadow: 4px 4px 10px 0px #60606070;
  cursor: pointer;
  margin: 10px;
  padding: 20px;

  &:hover {
    box-shadow: 4px 4px 10px 2px #00000070;
  }
}

.card {
  @media (max-width: 1000px) {
    margin-bottom: 15px;
  }

  display: flex;
  flex-direction: column;
  height: fit-content;
  -webkit-column-break-inside: avoid; /* Chrome, Safari, Opera */
  page-break-inside: avoid; /* Firefox */

  &__info {
    color: rgb(130, 129, 129);
    font-size: 0.8rem;
    text-align: right;
  }

  &__img {
    display: flex;
    justify-content: center;
    &__detail {
      width: 60%;
      margin-top: 20px;
    }
  }

  &__title,
  &__text {
    color: rgb(72, 72, 72);
    font-family: roboto;
    font-size: 1.3rem;
    margin: 10px 0;
    text-align: center;
  }

  &__title {
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
    color: rgb(28, 28, 28);
  }
  &__text {
    font-size: 1rem;
    margin: 20px 0;
    text-align: justify;
  }
}
</style>