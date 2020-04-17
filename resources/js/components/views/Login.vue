<template>
  <v-form @submit.prevent="submit">
    <v-card width="400" class="mt-10 mx-auto" color="grey lighten-5">
      <v-card-title>
        <span class="subheading grey--text text--darken-2">Log In</span>
      </v-card-title>
      <v-card-text>
        <v-text-field label="Email Address" prepend-icon="mdi-account-circle" v-model="form.email"></v-text-field>
        <v-text-field
          label="Password"
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info" type="submit" class="right">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "signin",
  data() {
    return {
      showPassword: false,
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions({
      signIn: "auth/signIn"
    }),
    submit() {
      this.signIn(this.form);
    }
  }
};
</script>