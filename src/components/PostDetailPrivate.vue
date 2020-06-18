
<template>
  <div class="table-container">
    <DataTable
      :value="post.comments"
      selectionMode="single"
      :selection.sync="selectedComment"
      @row-select="onRowSelect"
      data-key="_id"
    >
      <template #header>
        <Button label="Add Comment" icon="pi pi-plus" @click="dialogNewComment" />
        <h1>{{post.postTitle}}</h1>
        <p>{{post.postContent}}</p>
      </template>
      <Column field="_id" header="Id" :sortable="true"></Column>
      <Column field="commentAuthorName" header="Author" :sortable="true"></Column>
      <Column field="commentContent" header="Comentario" :sortable="true"></Column>
    </DataTable>

    <Dialog
      :visible.sync="dialogNewCommentVisible"
      :style="{width: '400px'}"
      header="Create Comment"
      :modal="true"
    >
      <div class="p-cardialog-content">
        <div class="p-grid p-fluid">
          <div class="p-col-4">
            <label for="commentContent">New Comment</label>
          </div>
          <div class="p-col-8">
            <Textarea v-model="newComment.commentContent" :autoResize="true" rows="5" cols="30" />
          </div>
        </div>
      </div>
      <template #footer>
        <div class="modal-btn-container">
          <Button
            label="Cancel"
            @click="dialogNewCommentVisible = !dialogNewCommentVisible"
            icon="pi pi-times"
            class="p-button-warning"
          />
          <Button
            label="Save"
            @click="createComment(post._id, newComment)"
            icon="pi pi-check"
            class="p-button-success"
          />
        </div>
      </template>
    </Dialog>

    <Dialog
      :visible.sync="dialogVisible"
      :style="{width: '400px'}"
      header="Comment Actions"
      :modal="true"
    >
      <div class="p-cardialog-content">
        <div class="p-grid p-fluid" v-if="comment">
          <div class="p-col-4">
            <label for="commentAuthorName">Author</label>
          </div>
          <div class="p-col-8">
            <InputText
              id="commentAuthorName"
              v-model="comment.commentAuthorName"
              :disabled="true"
              autocomplete="off"
            />
          </div>

          <div class="p-col-4">
            <label for="commentContent">Comentario</label>
          </div>
          <div class="p-col-8">
            <Textarea v-model="comment.commentContent" :autoResize="true" rows="5" cols="30" />
          </div>
        </div>
      </div>

      <template #footer>
        <div class="modal-btn-container">
          <Button
            label="Delete"
            @click="deleteComment(comment._id)"
            icon="pi pi-times"
            class="p-button-danger"
          />
          <Button
            label="Save"
            icon="pi pi-check"
            @click="updateComment(comment)"
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
  name: "AppPostDetailPrivate",
  data() {
    return {
      post: {},
      selectedComment: null,
      dialogVisible: false,
      dialogNewCommentVisible: false,
      comment: null,
      newComment: {}
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
    axios
      .get(`http://localhost:3001/api/blog/posts/${this.$route.params.id}`)
      .then(res => {
        this.post = res.data;
      });
  },
  methods: {
    dialogNewComment() {
      this.dialogNewCommentVisible = true;
    },
    onRowSelect(event) {
      this.comment = { ...event.data };
      this.dialogVisible = true;
    },
    createComment(postId, comment) {
      axios.post(`http://localhost:3001/api/blog/comments/${postId}`, comment);
      this.dialogNewCommentVisible = false;
    },
    deleteComment(commentId) {
      axios.delete(`http://localhost:3001/api/blog/comments/${commentId}`);
      this.dialogVisible = false;
    },
    updateComment(comment) {
      axios.put(
        `http://localhost:3001/api/blog/comments/${comment._id}`,
        comment
      );
      this.dialogVisible = false;
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