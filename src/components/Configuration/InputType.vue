<template>
  <div>
    <!-- <v-container color="green"> -->
    <v-card elevation="0" style="margin: 0px auto">
      <v-data-table :headers="header" :items="result"> </v-data-table>
    </v-card>
    <!-- </v-container> -->
    <v-snackbar color="green" v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
    
    <script>
import servicescall from "@/Services";
export default {
  name: "InputType",
  mixins: [servicescall],
  data() {
    return {
      result: [],
      snackbar: false,
      text: "",
      valid: "",
      item: "",
      header: [
        { text: "S.No", value: "sno" },
        { text: "Input Type", value: "inputType" },
        //  { text: 'Actions', value: 'actions', sortable: false,},
      ],
      nameRules: [
        (v) => !!v || "Field is required",
        (v) => v.length <= 30 || "Name allows below 30 characters only",
        // v => /[^a-z ]*$/gmi || 'Name must be characters',
        // (v) => /^[A-Za-z]+$/.test(v) || "Name must be characters",
      ],
    };
  },
  mounted() {
    this.getInputType();
  },

  methods: {
    getInputType() {
      this.getAllInputType().then((response) => {
        for (var i = 0; i < response.length; i++) {
          this.result.push({ sno: i + 1, inputType: response[i] });
        }
      });
    },

    saveClassType() {
      this.$refs.form.validate();
      if (this.valid == true) {
        this.postClassType(this.item).then((response) => {
          if (response.status == 200) {
            this.getClassTypes();
            this.text = "response.data.message";
            this.snackbar = true;
            this.$refs.form.reset();
          } else {
            this.text = "response.data.message";
            this.snackbar = true;
          }
        });
      }
    },
  },
};
</script>
    
    <style>
</style>