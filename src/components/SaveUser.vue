<template>
   <div>
    <Navbar/>
      <v-data-table
        :headers="headers"
        :items="this.result"
        sort-by="id"
        class="elevation-1"
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
                class="mt-6"
              ></v-text-field>
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog persistent v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="red" dark class="mb-2" v-bind="attrs" v-on="on">
                  Add
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                <v-form
                  @submit.prevent="SaveUser"
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedVendor.fullName"
                            label="Name"
                            :rules="nameRules"
                            dense
                       outlined
                          
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedVendor.email"
                            label="Email"
                            :rules="emailRules"
                            dense
                       outlined
                           
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedVendor.mobile"
                            label="Mobile"
                            :rules="phoneRules"
                            dense
                       outlined
                          
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedVendor.username"
                            label="User Name"
                            :rules="nameRules"
                            hint="Mandatory Field"
                            dense
                       outlined
                            :disabled="isuser"
                          >
                           <template #label>
      User Name<strong  class="red--text">* </strong>
    </template>
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedVendor.password"
                            label="Password"
                           :rules="passwordRules"
                           dense
                       outlined
                             :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                             :type="show1 ? 'text' : 'password'"
                              @click:append="show1 = !show1"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field
                  label="Confirm Password"
                  v-model="confirmPassword"
                  placeholder="confirmPassword"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  dense
                       outlined
                  :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                  @click:append="show2 = !show2"
                  :type="show2 ? 'text' : 'password'"
                  required
                >
                </v-text-field>
  
                        </v-col>
                        
                         <!-- <v-col cols="12" sm="6" md="6" v-if="isEdited==true">
                          <v-select
                            v-model="rolesData"
                            label="Role"
                            dense
                       outlined
                            :items="roles"
                           multiple
                          ></v-select>
                        </v-col> -->
                         <v-col cols="12">
                          <v-autocomplete
                            v-model="editedVendor.roles"
                            label="Role"
                            dense
                             outlined
                            :items="Roles"
                           multiple
                          ></v-autocomplete>
                         </v-col>
                      </v-row>
                      <!-- </v-form> -->
                    </v-container>
                  </v-card-text>
  
                  <v-card-actions class="mr-3">
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn class="mr-3" color="blue darken-1" text type="submit">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text>Cancel</v-btn>
                  <v-btn color="blue darken-1" text>OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editVendor(item)">
            mdi-pencil
          </v-icon>
          <!-- <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon> -->
        </template>
      </v-data-table>
      <v-snackbar color="green" v-model="snackbar">
        {{ text }}
  
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
        </template>
      </v-snackbar>
    </div>
  </template>
  
  <script>
  import servicescall from "../Services";
  import Navbar from '@/components/Navbar'
  // import downloadexcel from 'vue-json-excel'
  export default {
    name: "SaveUser",
    mixins: [servicescall],
    components:{
        Navbar
    },
    data() {
      return {
        // filename:'Userdata',
        // Jsonfields:{
        //   'Name':'name',
        //   'User Name':'username',
        //   'Mobile':'mobile',
        //   'Email':'email'
        // },
        isEdited:false,
        rolesData:'',
        password:'',
        confirmPassword:'',
        show1:false,
      show2:false,
        snackbar: false,
        text: "",
        search: "",
        valid: false,
        result: [],
        dialog: false,
        dialogDelete: false,
        tab: null,
         items: [
          "Users",
          "Add User",
          "Reset password",
        
        ],
        headers: [
          { text: "Name", value: "name", sortable: true, },
          { text: "User Name", value: "username", },
          { text: "Mobile", value: "mobile", },
          { text: "Email", value: "email", },
  
          { text: "Actions", value: "actions", sortable: false, },
        ],
          roles:[
            {text:'Admin', value:'ROLE_ADMIN'},
            {text:'Moderator', value:'ROLE_MODERATOR'},
            {text:'User', value:'ROLE_USER'}
          ],
  
        editedIndex: -1,
  
        editedVendor: {
         
          email: "",
          mobile: "",
          fullName: "",
          password: "",
           roles: [],
          username: "",
        },
        isuser:false,
  
        defaultVendor: {
          email: "",
          mobile: "",
          fullName: "",
          password: "",
           role: [],
          username: "",  
        },
        Roles:[],
        // validations
        emailRules: [
          (v) => !!v || " Email  is required",
          (v) =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "E-mail must be valid",
        ],
        phoneRules: [
          (v) => !!v || " Mobile  is required",
          (v) => /^[0-9]+$/.test(v) || "only number are accepted",
          (v) =>
            (v && v.length <= 10 && v.length >= 10) ||
            "Mobile must be  10 number",
        ],
        passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 6) || "Password must be  6 characters",
      ],
        confirmPasswordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 6) || "Password must be  6 characters",
      ],
  
        nameRules: [
          (v) => !!v || " Name  is required",
          (v) => v.length <= 30 || "Name allows below 30 characters only",
          // v => /[^a-z ]*$/gmi || 'Name must be characters',
          // (v) => /^[A-Za-z]+$/.test(v) || "Name must be characters",
        ],
  
        roleRules: [
          (v) => !!v || " Roles  required",
          (v) => v.length <= 30 || "Name allows below 30 characters only",
          // v => /[^a-z ]*$/gmi || 'Name must be characters',
          // (v) => /^[A-Za-z]+$/.test(v) || "Name must be characters",
        ],
  
        addressRules: [
          (v) => !!v || "Address is required",
          // (v) => v.length <= 30 || "Name allows below 30 characters only",
          // v => /[^a-z ]*$/gmi || 'Name must be characters',
          // (v) => /^[A-Za-z]+$/.test(v) || "Name must be characters",
        ],
      };
    },
  
    computed: {
  
      passwordConfirmationRule() {
        return () =>
          this.editedVendor.password === this.confirmPassword || "Password must match";
      },
      formTitle() {
        return this.editedIndex === -1 ? "Add User" : "Edit user";
      },
    },
  
    mounted() {
      if (localStorage.getItem("token") == null) {
        this.$router.push({ name: "HelloWorld" });
      }
      this.getUser();
      this.GetRoles();
    },
  
    methods: {
      GetRoles(){
        this.getAllRoles().then((response)=>{
          // this.Roles = response;
          // console.log('check the roles',this.Roles);
          for(let i=0;i<response.length;i++){
            this.Roles.push(response[i]);          
          }
          console.log('check the roles',this.Roles);
        })
      },
      SaveUser() { 
        this.$refs.form.validate();
       
        if (this.$refs.form.validate()) {
  
            if(this.isEdited==false){
              var saveUser={}
              saveUser.fullName=this.editedVendor.fullName;
              saveUser.email=this.editedVendor.email;
              saveUser.password=this.editedVendor.password;
              saveUser.mobile=this.editedVendor.mobile;
              saveUser.username=this.editedVendor.username;
              saveUser.roles=this.editedVendor.roles;
         this.PostUser(saveUser);
          }
           else{
             this.editedVendor.role=this.rolesData
  
           }
        }
  
        // this.close()
      },
  
      editVendor(item) {
        console.log('check the users',item);
        var id = item.username;
        this.isuser=true;
        this.getUsername(id).then((response) => {
          if (response.status == 200) {
           
            this.editedVendor.email = response.data.email;
            this.editedVendor.mobile = response.data.mobile;
            this.editedVendor.fullName = response.data.name;
             this.editedVendor.username = response.data.username;
  
            this.editedIndex = this.result.indexOf(item);
            this.dialog = true;
          } else {
            this.text = response.data.message;
          }
        });
      },
      // close the dialog box
      close() {
        this.dialog = false;
        this.$nextTick(() => {
          this.editedVendor = Object.assign({}, this.defaultVendor);
          this.editedIndex = -1;
        });
        this.isuser=false; 
      },
  
      // post API calls
  
      PostUser(saveUser) {
       ;
        var reqJSON =saveUser;
  
        // this.userRegister(reqJSON) 
        this.addUser(reqJSON) 
          .then((response) => {
            if (response.status == 200) {
              this.text = response.data.message;
              this.snackbar = true;
              this.confirmPassword='';
              this.rolesData='';
              this.isuser=false;
  
              //location.reload();
            } else {
              this.text = response.data.message;
              this.snackbar = true;
            }
          })
          .then(() => {
            this.close(), setInterval(this.getUser(), 3000);
          });
      },
  
      getVendorId(id) {
        var reqJSON = id;
        this.getUsername(reqJSON)
          .then((response) => {
            if (response.status == 200) {
              this.dialog = true;
            } else {
              this.text = response.data.message;
            }
          })
          .then(() => {
            setInterval(this.close(), 3000);
          });
      },
  
      //GET API Calls
      getUser() {
        this.getAllUser().then((response) => {
          this.result = response;
        });
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