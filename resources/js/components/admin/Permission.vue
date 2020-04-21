<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="permissions"
      sort-by="id"
      :sort-desc="true"
      show-select
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Permission</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-btn color="error" dark small @click.prevent="massDestroy">Delete All</v-btn>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Add Permission</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-checkbox v-model="slc" class="mx-1" label="Access" value="access"></v-checkbox>
                    <v-checkbox v-model="slc" class="mx-1" label="Create" value="create"></v-checkbox>
                    <v-checkbox v-model="slc" class="mx-1" label="Edit" value="edit"></v-checkbox>
                    <v-checkbox v-model="slc" class="mx-1" label="Show" value="show"></v-checkbox>
                    <v-checkbox v-model="slc" class="mx-1" label="Delete" value="delete"></v-checkbox>
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
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      slc: [],
      selected: [],
      dialog: false,
      headers: [
        {
          text: "Title",
          align: "start",
          sortable: false,
          value: "title"
        },
        { text: "Permission", value: "id", sortable: false },
        { text: "Actions", value: "actions", sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        title: ""
      },
      defaultItem: {
        title: ""
      }
    };
  },

  created() {
    this.initialize();
  },

  computed: {
    ...mapGetters({
      permissions: "permission/permissions"
    }),

    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    ...mapActions({
      editPermission: "permission/editPermission",
      addPermission: "permission/addPermission",
      removePermission: "permission/removePermission"
    }),

    initialize() {
      this.$store.dispatch("permission/getAllPermissions");
    },

    editItem(item) {
      this.editedIndex = this.permissions.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.removePermission(item);
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
        this.editPermission(this.editedItem);
      } else {
        const newList = this.slc.map(item => {
          return {
            title: this.editedItem.title + "_" + item
          };
        });
        this.addPermission(newList);
        this.initialize();
      }
      this.close();
    },

    massDestroy(item) {
      const selectedItem = this.selected.map(item => {
        return item.id;
      });

      const delArray = { ids: selectedItem };
      confirm("Are you sure you want to delete this item?") &&
        axios.delete("permission/destroy", {
          data: delArray
        });
      this.initialize();
    }
  }
};
</script>
