<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="users"
      sort-by="id"
      dense
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>User</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Add User</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                    </v-col>
                    <template v-if="formTitle === 'New User'">
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.password"
                          label="Password"
                          type="password"
                        ></v-text-field>
                      </v-col>
                    </template>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-autocomplete
                        v-model="editedItem.roles"
                        :items="roleList"
                        item-text="title"
                        item-value="id"
                        dense
                        chips
                        deletable-chips
                        small-chips
                        hide-selected
                        multiple
                        return-object
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.roles="{ item }">
        <span v-for="list in item.roles" :key="list.id">
          <v-chip small color="success">{{ list.title }}</v-chip>
        </span>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  data: () => ({
    selected: [],
    dialog: false,
    headers: [
      {
        text: "User Name",
        align: "start",
        value: "name"
      },
      { text: "Roles", value: "roles" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      email: "",
      roles: []
    },
    defaultItem: {
      name: "",
      email: "",
      roles: []
    }
  }),

  created() {
    this.initialize();
  },

  computed: {
    ...mapGetters({
      users: "user/users",
      user: "auth/user",
      roleList: "role/roles"
    }),

    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    ...mapActions({
      addUser: "user/addUser",
      editUser: "user/editUser",
      removeUser: "user/removeUser"
    }),

    initialize() {
      this.$store.dispatch("user/getAllUsers");
      this.$store.dispatch("role/getAllRoles");
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.removeUser(item);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        this.editUser(this.editedItem).then(() => {
          if (this.editedItem.id === this.user.id) {
            this.$store.commit("auth/SET_USER", this.editedItem);
          }
        });
      } else {
        this.addUser(this.editedItem);
      }
      this.close();
      this.initialize();
    }
  }
};
</script>
