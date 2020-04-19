<template>
  <v-form ref="form" @submit.prevent="submit" lazy-validation>
    <v-card width="400" class="mt-10 mx-auto" color="grey lighten-5">
      <v-card-title>
        <span class="subheading grey--text text--darken-2">Log In</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Email Address"
          prepend-icon="mdi-account-circle"
          :rules="emailRules"
          v-model="form.email"
          required
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="form.password"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          required
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info" type="submit" class="right">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "login",
  data() {
    return {
      emailRules: [v => !!v || "Email is required"],
      passwordRules: [v => !!v || "Password is required"],
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
      this.$refs.form.validate();
      if (this.form.email && this.form.password) {
        this.signIn(this.form).then(() => {
          this.$router
            .replace({
              path: "/dashboard"
            })
            .catch(() => {
              console.log("login error"), false;
            });
        });
      }
    }
  }
};
</script>