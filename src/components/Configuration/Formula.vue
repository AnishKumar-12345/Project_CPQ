<template>
  <div>
    <!-- <v-container color="green"> -->
    <v-data-table
      dense
      fixed-header
      :headers="header"
      :items="result"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-text-field
              rounded
              solo
              v-model="search"
              label="Search "
              dense
              class="mt-6"
            ></v-text-field>
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
    </v-data-table>
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
  name: "Roles",
  mixins: [servicescall],
  data() {
    return {
      result: [],
      snackbar: false,
      text: "",
      valid: "",
      item: "",
      search: "",
      header: [
        { text: "S. NO", value: "sno" },
        { text: "Formula", value: "materialType" },
        //{ text: 'Actions', value: 'actions', sortable: false,},
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
    this.getFormulas();
  },

  methods: {
    getFormulas() {
      this.getAllFormula().then((response) => {
        for (var i = 0; i < response.length; i++) {
          this.result.push({ sno: i + 1, materialType: response[i] });
        }
        //  this.result=response
      });
    },

    saveRole() {
      this.$refs.form.validate();
      if (this.valid == true) {
        this.postClassType(this.item).then((response) => {
          if (response.status == 200) {
            this.getClassTypes();
            this.text = "response.data.message";
            this.snackbar = true;
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
    
    <style scoped>
.v-data-table {
  line-height: 2.8;
  max-width: 100%;
}
</style>