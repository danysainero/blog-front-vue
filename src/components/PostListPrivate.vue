<template>
  <div class="table-container">
    <DataTable
      :value="posts"
      selectionMode="single"
      :selection.sync="selectedPost"
      @row-select="onRowSelect"
      data-key="_id"
    >
      <template #header>
        <Button label="Add Post" icon="pi pi-plus" @click="dialogNewPost" />
      </template>
      <Column field="_id" header="Id" :sortable="true"></Column>
      <Column field="postAuthorName" header="Author" :sortable="true"></Column>
      <Column field="postTitle" header="Title" :sortable="true"></Column>
      <Column field="postContent" header="Post" :sortable="true"></Column>
    </DataTable>

    <Dialog
      :visible.sync="dialogVisible"
      :style="{width: '400px'}"
      header="Post Actions"
      :modal="true"
    >
      <div class="p-cardialog-content">
        <div class="p-grid p-fluid" v-if="post">
          <div class="p-col-4">
            <label for="postAuthorName">Author</label>
          </div>
          <div class="p-col-8">
            <InputText
              id="postAuthorName"
              v-model="post.postAuthorName"
              :disabled="true"
              autocomplete="off"
            />
          </div>

          <div class="p-col-4">
            <label for="postTitle">Title</label>
          </div>
          <div class="p-col-8">
            <InputText id="postTitle" v-model="post.postTitle" autocomplete="off" />
          </div>

          <div class="p-col-4">
            <label for="postContent">Post</label>
          </div>
          <div class="p-col-8">
            <Textarea v-model="post.postContent" :autoResize="true" rows="5" cols="30" />
          </div>
          <div class="p-col-8" :style="{margin: '40px'}">
            <Button
              label="Details"
              @click="navigateToPostDetail(post._id)"
              icon="pi pi-eye"
              class="p-button-secondary"
            />
          </div>
        </div>
      </div>

      <template #footer>
        <div class="modal-btn-container">
          <Button
            label="Delete"
            @click="deletePost(post._id)"
            icon="pi pi-times"
            class="p-button-danger"
          />
          <Button
            label="Save"
            icon="pi pi-check"
            @click="updatePost(post)"
            class="p-button-success"
          />
        </div>
      </template>
    </Dialog>

    <Dialog
      :visible.sync="dialogNewPostVisible"
      :style="{width: '400px'}"
      header="Create Post"
      :modal="true"
    >
      <div class="p-cardialog-content">
        <div class="p-grid p-fluid">
          <div class="p-col-4">
            <label for="postTitle">Title</label>
          </div>
          <div class="p-col-8">
            <InputText id="postTitle" v-model="newPost.postTitle" autocomplete="off" />
          </div>

          <div class="p-col-4">
            <label for="postContent">Post</label>
          </div>
          <div class="p-col-8">
            <Textarea v-model="newPost.postContent" :autoResize="true" rows="5" cols="30" />
          </div>
        </div>
      </div>
      <template #footer>
        <div class="modal-btn-container">
          <Button label="Cancel" @click="dialogNewPost() " icon="pi pi-times" class="p-button-warning" />
          <Button
            label="Save"
            @click="createPost(newPost)"
            icon="pi pi-check"
            class="p-button-success"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>


<script>
import "primevue/resources/themes/saga-teal/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";

export default {
  name: "AppPostListPrivate",
  data() {
    return {
      selectedPost: null,
      post: null,
      dialogVisible: false,
      dialogNewPostVisible: false,
      posts: [],
      newPost: {}
    };
  },
  components: {
    Button,
    InputText,
    Dialog,
    DataTable,
    Column,
    Textarea
  },
  mounted() {
    axios.get("http://localhost:3001/api/blog/posts").then(res => {
      this.posts = res.data;
    });
  },
  methods: {
    dialogNewPost() {
      this.dialogNewPostVisible = !this.dialogNewPostVisible;
    },
    onRowSelect(event) {
      this.post = { ...event.data };
      this.dialogVisible = true;
    },
    createPost(post) {
      axios.post(`http://localhost:3001/api/blog/posts/`, post);
      this.dialogNewPostVisible = false;
    },
    deletePost(postId) {
      axios.delete(`http://localhost:3001/api/blog/posts/${postId}`);
      this.dialogVisible = false;
    },
    updatePost(post) {
      axios.put(`http://localhost:3001/api/blog/posts/${post._id}`, post);
      this.dialogVisible = false;
    },
    navigateToPostDetail(postId) {
      this.$router.push({ path: `/backoffice/${postId}` });
    }
  }
};
</script>

<style lang="scss" scoped>

.table-container {
  margin: 20px;
}

.modal-btn-container {
  display: flex;
  justify-content: center;
}

div.p-grid div input,
textarea {
  margin: 10px 0;
}
</style>