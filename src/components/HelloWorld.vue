<template>
  <v-main>
      <v-row>
        <v-col cols="8" class="hero">
          <v-col cols="12" sm="12" md="8" xs="12" > 
         <h1 class="quote"> Keep Calm<br/> Because I Am A Fire Protection Engineer</h1>         
        </v-col>
        </v-col>
        <v-col cols="4" style="background-image: linear-gradient(to bottom,#a14d58, #31889a, #b0a100);">
           <div class="section-container mt-10 " style="margin-top:10%;" >
              
           <v-window v-model="step" >
                <v-window-item :value="1" >
            <h2>LOGIN</h2>
          <div class="pa-5">
            <v-form @submit.prevent="verify" ref="form" type="POST" v-model="valid">
              
              <v-text-field
                class="my-input"
                label="User Name"
                type="text"
                :rules=nameRules
                v-model="login.username"
                placeholder="User Name"
                solo
            
              >
              </v-text-field>
             
              

              <v-text-field
                label="Password"
                
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                 @click:append="show1 = !show1"
                v-model="login.password"
                :type="show1 ? 'text' : 'password'"
               
                solo
              >
              </v-text-field>

              <div class="text-center mt-3">
                <v-btn
                  style="background-color:#FFFFFF;text-transform: capitalize;font-size:18px;font-weight:600;"
                  class="signin-btn red--text pa-4"
                  type="submit"
                >
                  Login
                </v-btn>
 
                
              </div>
            </v-form>
          </div>
                </v-window-item>

                
                <v-window-item :value="2">
                  <div class="logo">
       <!-- <img src="../assets/trident2.png" height="80" class="mt-4"  alt="dizitiveit.com" /> -->
                    </div>
                    <h3>FORGOT PASSWORD</h3>
                    <div class="pa-5">
            <v-form  ref="form" type="POST" v-model="valid">
              <v-text-field
                class="my-input"
                label="User Name"
                type="text"
                :rules=nameRules
               
                placeholder="User Name"
                solo
                rounded
              >
              </v-text-field>
             
              

              <v-text-field
                label="Password"
                v-model="user.password"
                :rules="passwordRules"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
                placeholder="password"
                rounded
                solo
                :type="show1 ? 'text' : 'password'"
                required
              >
              </v-text-field>
               <v-text-field
                label="Confirm Password"
                v-model="confirmPassword"
                placeholder="confirmPassword"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                rounded
                solo
                :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                @click:append="show2 = !show2"
                :type="show2 ? 'text' : 'password'"
                required
              >
              </v-text-field>

              <div class="text-center mt-3">
                <v-btn
                  style="background-color:#C62828;text-transform: capitalize;"
                  class="signin-btn white--text pa-4"
                  type="submit"
                  rounded
                >
                  submit
                </v-btn>
                <div class="pa-1" > 
                   <a href="#" @click="step++">Click here to LogIn</a>
                  </div>

                
              </div>
            </v-form>
          </div>
       </v-window-item></v-window></div>
        </v-col>
      </v-row>
  </v-main>

</template>

<script>
import servicescall from "../Services";
export default {
  mixins: [servicescall],
  name: "HelloWorld",

  computed: {
    passwordConfirmationRule() {
      return () =>
        this.user.password === this.confirmPassword || "Password must match";
    },
  },

  data: () => ({
   login :{
  "password": "",
  "username": ""
  }, 
    allroles:[],
    snackbar:false,
    text:'',
    valid:false,
    result:[],
    datashow:"true",
    show1:false,
    show2:false,
    step: 1,
    confirmPassword:'',
    user: {
      email: "",
      fullName: "",
      mobile: "",
      password: "",
      username: "",
    },
    dialog: true,
    tab: 0,
    tabs: [
      { name: "Login", icon: "mdi-account" },
      { name: "Register", icon: "mdi-account-outline" },
    ],    
    loginEmailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    emailRules: [
      (v) => !!v || " Email Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],

    fullNameRules: [
      (v) => !!v || " Full Name is required",
      (v) => (v && v.length <= 50) || "Name must be less than 50 characters",
    ],
    phoneRules: [
      (v) => !!v || "Mobile is required",
       (v) => /^[0-9]+$/.test(v) || "only number are accepted",
      (v) =>
        (v && v.length <= 10 && v.length >= 10) ||
        "Mobile must be  10 characters",
    ],

    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 6) || "Password must be  6 characters",
    ],
    confirmPasswordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 6) || "Password must be  6 characters",
    ],
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 8) || "Min 8 characters",
    },
  }),

  methods: {
    validate() {
      if (this.$refs.loginForm.validate()) {
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
        verify(){
             this.$refs.form.validate()
             if(this.valid==true){
              this.checkUser();
             }
        },
       checkUser(){        
          var reqJSON = this.login;
      this.userLogin(reqJSON).then((response) => { 
                if(response.status==200){  
                localStorage.setItem("token",response.data.token)
            
                  // this.allroles = response.data.roles;
                  // console.log('check the token data 0',this.allroles);
                  // for(let i=0;i<response.data.roles.length;i++){
                  //   this.allroles.push(response.data.roles[i]);
                  // }
                  // console.log('check the roles name',this.allroles);
                 this.text="User Logged Sucessfully";
                       this.snackbar=true;
                       this.getUserData()
                       this.$router.push({ name: "Home",});
                  }
         else{
          
            this.text=response.data.error +" User";
            this.snackbar=true;
         }
      });
       },
       

    callLogin() {
      this.$refs.form.validate()
             if(this.valid==true){      
      var reqJSON = this.user;
      this.userRegister(reqJSON).then((response) => {
         if(response.status==200){
         localStorage.setItem("user",response.data.userName)
           this.text=response.data.message;
           this.snackbar=true
           location.reload();	
        }
        else if(response.status==500){
            this.text=response.data.error;
            this.snackbar=true
          }
          else{
            this.text=response.data.message;
            this.snackbar=true
          }
      });}
     
  },


    getUserData(){
        this.getUser().then((response) => {        
        }
        )}
  },
};
</script>
<style scoped>
.hero {
    background: url("../assets/Banner.jpg") ;
    background-size:cover;
     background-repeat: no-repeat; 
    height: 800px;
  }
.quote{
  color: #313940;
  text-transform: uppercase;
  font-family: 'Patua One', cursive;
  /* font-family: 'Bakbak One', cursive; */
  font-size: 50px;
  font-weight: 400;
  letter-spacing: 1px;
  margin-top:150px;
  /* text-shadow: 1px 3px 3px #333; */
}
.section-container {
  padding: 0px;
  margin: 0px;
  /* background: #fff; */
  border-radius: 10px;
  margin: auto auto;
  /* background-image: linear-gradient(to bottom right,#ff5f6d, #ffc371); */
  /* box-shadow: 0 0 1px 1px rgba($color: #000000, $alpha: 0.1); */
  /* box-shadow: 0 0 1px 5px rgba(248, 247, 248, 0.3); */
  box-sizing: border-box;
}
.section-container .logo{

  background:#C62828;
   border-radius: 10px 10px 0 0;
   padding: 5px 0;
}
.section-container h2 {
  text-align: left;
  padding-bottom: 5px;
  font-weight: 600;
  color: #FFFFFF;
  margin-top: 30%;
  margin-left: 20px;
}
.signin-btn {
  width: 100%;
  /* background-color: #c00000; */
  color: #c00000;
}

.my-input.v-input .v-input__slot {
  border-radius: 100px;
}
</style>
