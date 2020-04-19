<template>
  <v-form ref="form" @submit.prevent="submit" lazy-validation>
    <v-card width="400" class="mt-5 mx-auto" color="grey lighten-5">
      <v-card-title>
        <span class="subheading grey--text text--darken-2">Register</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="form.name"
          :rules="nameRules"
          prepend-icon="mdi-account-circle"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.email"
          :rules="emailRules"
          prepend-icon="mdi-email"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.password"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          label="Password"
          required
        ></v-text-field>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="info" type="submit" class="right">Submit</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-form>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "register",

  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      },
      showPassword: false,
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 50) || "Name must be less than 50 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 5) || "Password must have 5+ character"
      ]
    };
  },
  methods: {
    ...mapActions({
      signIn: "auth/register"
    }),
    submit() {
      this.$refs.form.validate();
      if (this.form.name && this.form.email && this.form.password) {
        this.signIn(this.form).then(() => {
          this.$router.replace({
            path: "/dashboard"
          });
        });
      }
    }
  }
};
</script>

<style>
</style>