<template>
  <v-app class="grey lighten-4">
    <nav>
      <v-navigation-drawer app v-model="drawer" absolute>
        <v-list dense nav class="py-5 mt-8">
          <v-list-item two-line class="px-0">
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/men/81.jpg" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Lara Admin</v-list-item-title>
              <v-list-item-subtitle>User management</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item v-for="item in items" :key="item.title" router :to="item.route">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app dense flat>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Lara User Admin</v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-if="authenticated">
          <v-toolbar-items>
            <v-btn text to="/profile">{{ user.name }}</v-btn>
          </v-toolbar-items>

          <v-btn icon href="#" @click.prevent="logOut">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>

        <template v-else>
          <v-btn text to="/register">
            Register
            <v-icon>mdi-account</v-icon>
          </v-btn>
          <v-btn text to="/login">
            Login
            <v-icon>mdi-login</v-icon>
          </v-btn>
        </template>
      </v-app-bar>
    </nav>
    <v-content class="mx-4 mb-4">
      <v-container fluid>
        <!--  -->
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app>
      <!--  -->
    </v-footer>
  </v-app>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {},
  data() {
    return {
      drawer: true,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", route: "/dashboard" },
        { title: "User", icon: "mdi-account", route: "/users" },
        { title: "Role", icon: "mdi-image", route: "/roles" },
        { title: "Permission", icon: "mdi-cloud-upload", route: "/permissions" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user"
    })
  },
  methods: {
    ...mapActions({
      signOutAction: "auth/signOut"
    }),

    logOut() {
      this.signOutAction().then(() => {
        this.$router.replace({
          path: "/"
        });
      });
    }
  }
};
</script>