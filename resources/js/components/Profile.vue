<template>
  <v-card class="mx-auto" max-width="700" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">USER PROFILE</div>
        <v-list-item-title class="headline mb-1">{{ user.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        <v-list-item-content>
          <span v-for="role in user.roles" :key="role.id">
            Your Role {{ role.title }}
            <span
              v-for="permission in role.permissions"
              :key="permission.id"
            >{{ permission.title }}</span>
          </span>
        </v-list-item-content>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn text>Button</v-btn>
      <v-btn text>Button</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "profile",

  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user"
    })
  }
};
</script>

<style>
</style>