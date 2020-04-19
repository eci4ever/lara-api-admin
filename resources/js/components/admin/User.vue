<template>
  <v-data-table :headers="headers" :items="users" :search="search" sort-by="id" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>USER LIST</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Add New User</v-btn>
          </template>
          <v-card>
            <v-form ref="form" @submit.prevent="submit">
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="form.name" label="User name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="form.email" label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="form.password" label="Password"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text type="submit">Save</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <v-dialog v-model="editDialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="User name"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="edit">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <p>No Item to Display</p>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    search: "",
    dialog: false,
    editDialog: false,
    headers: [
      {
        text: "User Name",
        align: "start",
        value: "name"
      },
      { text: "Email", value: "email" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      email: ""
    },
    defaultItem: {
      name: "",
      email: ""
    },
    form: {
      name: "",
      email: "",
      password: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    editDialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      axios.get("user").then(res => (this.users = res.data));
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editDialog = true;
    },

    deleteItem(item) {
      axios
        .delete("user/" + item.id)
        .then(res => {
          const index = this.users.indexOf(item);
          confirm("Are you sure you want to delete this item?") &&
            this.users.splice(index, 1);
        })
        .catch(err => console.log(err));
    },

    close() {
      this.dialog = false;
      this.editDialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    submit() {
      if (this.form.name && this.form.email && this.form.password) {
        axios
          .post("register", this.form)
          .then(res => {
            this.users.push(this.form);
            this.close();
            this.form = {};
          })
          .catch(err => alert("User Already Exist"));
      }
    },

    edit() {
      axios.put("user/" + this.editedItem.id, this.editedItem).then(res => {
        Object.assign(this.users[this.editedIndex], this.editedItem);
        this.close();
      });
    }
  }
};
</script>
