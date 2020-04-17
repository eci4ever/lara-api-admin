<template>
  <v-app class="grey lighten-4">
    <nav>
      <v-navigation-drawer app v-model="drawer" absolute>
        <v-list dense nav class="py-5 mt-10">
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

        <v-btn icon router to="/login">
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon router to="/logout">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
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
export default {
  name: "App",
  components: {},
  data() {
    return {
      drawer: true,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", route: "/" },
        { title: "User", icon: "mdi-account", route: "/users" },
        { title: "Role", icon: "mdi-image", route: "/roles" },
        { title: "Permission", icon: "mdi-cloud-upload", route: "/permissions" }
      ]
    };
  }
};
</script>