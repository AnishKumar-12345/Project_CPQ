<template>
    <div >
         <v-data-table 
           :headers="headers"
           fixed-header
         
           :items="this.result"
           sort-by="vendorName"
           class="elevation-1"
           :search=search
           dense
         >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>
               <v-text-field
                rounded
                solo
              v-model="search"
              label="Search "
              class=" mt-6"
            ></v-text-field>
            </v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog persistent
              v-model="dialog"
              max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                  <v-icon class="pa-2  mt-0"
          medium
          color="red"
          @click="editAllWelding"
        >
          mdi-pencil
        </v-icon>
             <v-icon
          large
          color="red "
          v-bind="attrs"
                  v-on="on"
        >
          mdi-plus
        </v-icon>         
              </template>
              <v-card >
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                     <v-form  @submit.prevent="saveVendor" ref="form" v-model="valid" lazy-validation >
                <v-card-text>
                  <v-container>
                       
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedWelding.diameter"
                          label="Diameter"
                          type="number"
                          :rules="numberRules"
                          hint="Mandatory Field"
                          :disabled=isEdited
                          dense
                         outlined
                        >
                        <template #label>
        Diameter<strong  class="red--text">* </strong>
      </template>
                        
                        </v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedWelding.weldingRods"
                          label="Welding Rods"
                          type="number"
                         :rules="numberRules"
                          dense
                         outlined
                        ></v-text-field>
                      </v-col>
                     
                      
                       
                     
                    </v-row>
                     
                  </v-container>
                </v-card-text>
    
                <v-card-actions class="mr-3">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn class="mr-3"
                    color="blue darken-1"
                    text
                    :disabled="!valid"
                     type="submit"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
    
                 </v-form>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="600px" persistent >
              <v-card>
                <v-card-title class="white" style="font-size:20px">Are you sure you want to delete Welding Rod ?</v-card-title>
                <v-card-actions class="mr-3">
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                  <v-btn color="blue darken-1" text class="mr-3" @click="deleteWeldinRod">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2 blue--text"
            @click="editVendor(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon class="pa-3 red--text"
            small  
            @click="deleteCard(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        
      </v-data-table>
    
    <div v-if="this.dialog1==true">
         <v-dialog
          v-model="dialog1"
          persistent
          max-width="600px"
        >
         
           <v-card >
            <v-card-title>
              <span class="text-h5">Edit Welding List</span>
            </v-card-title>
            <v-card-text>
                 <v-container>
                <v-row v-for=" (item,index) in this.result" :key="index">
                   
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      label="Diameter"
                      placeholder="Diameter"
                      v-model="item.diameter"
                      required
                      dense
                         outlined
                     hint="Mandatory Field"
                     disabled
                     
                    >
                    <template #label>
        Diameter<strong  class="red--text">* </strong>
      </template>
                    
                    </v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      label="Welding Rods"
                      v-model="item.weldingRods"
                      dense
                         outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                 </v-container>
            </v-card-text>
    
            <v-card-actions class="mr-3">
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="dialog1 = false"
              >
                cancel
              </v-btn>
              <v-btn  class="mr-3"
                color="green darken-1"
                text
                @click="saveAll"
              >
                save
              </v-btn>
            </v-card-actions>
           </v-card>
    
         </v-dialog>
    
    </div>
    
    
    
    
      <v-snackbar :color="activeColor"
          v-model="snackbar" timeout="2000"
         
        >
          {{ text }}
    
          <template v-slot:action="{ attrs }">
            <v-btn
              color="white"
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
    </div>
        
    </template>
    
    <script>
    import servicescall from "@/Services";
    export default {
        name:'WedlingRods',
         mixins: [servicescall],
        data(){
            return {
              isEdited:false,
              activeColor:'',
                snackbar:false,
                text:'',
                delWelding:'',
                 search:'',
                 valid:false,
                 result:[]
    ,             dialog: false,
                 dialogDelete: false,
                 dialog1:false,
          headers: [
            
            {text: 'Diameter ', value: 'diameter',},
            { text: 'Welding Rods', value: 'weldingRods',},
            { text: 'Actions', value: 'actions', sortable: false, },
          ],
         
          editedIndex: -1,
              
              editedWelding:{
                   "diameter": '', 
                   "weldingRods": '',  
                },
         
            defaultWelding: {
             "diameter": '', 
            "weldingRods": '',
    },
              // validations
              emailRules: [
                   (v) =>
                           /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                            "E-mail must be valid",
                         ],
             numberRules: [
                       (v) => !!v || "filed is required",
                       (v) => /^[0-9]+$/.test(v) || "only number are accepted",
                       //(v) => (v && v.length <= 1 ) || "Diamete must be  10 number",
                       ],
    
    
            nameRules: [
            (v) => !!v || "field is required",
            (v) => v.length <= 30 || "Name allows below 30 characters only",
            // v => /[^a-z ]*$/gmi || 'Name must be characters',
            // (v) => /^[A-Za-z]+$/.test(v) || "Name must be characters",
          ],
    
            }
        },
    
        computed: {
          formTitle () {
            return this.editedIndex === -1 ? 'Add Welding Rod' : 'Edit Welding Rod'
          },
        },
    
        
        mounted(){
    
           if(localStorage.getItem("token")==null){
               this.$router.push({ name: "HelloWorld",});
            }
            this.getWedlingRods();
        },
    
        methods: {
          // delete welding rod
          deleteWeldinRod(){
               var reqJSON= this.delWelding
               this.deleteWedling(reqJSON).then((response) => {
             if(response.status==200){
              
              this.text=response.data.message;
              this.activeColor='green'
              this.snackbar=true;
             this.dialogDelete=false;
               this.getWedlingRods();
    
             } else{
                  this.text=response.data.message;
                  this.activeColor='red'
              this.snackbar=true;
            this.dialogDelete=false;
             }
          }).then(()=>{
          })
          },
          // cancel
          cancel(){
             this.dialogDelete=false;
          },
               // delete welding Card
              deleteCard(item){
                  this.delWelding=item
                 this.dialogDelete=true;
                 // this.getWedlingRods();
               },
    
               //edit all records
               editAllWelding(){
                   this.dialog1=true;
    
    
               },
               // save all updated records
               saveAll(){
                   var reqJSON=this.result
             this.saveAllWedling(reqJSON).then(response => {
             if(response.status==200){
              this.text=response.data.message;
              this.activeColor='green'
              this.snackbar=true;
    
              this.dialog1=false
             } else{
                  this.text=response.data.message;
                  this.activeColor='red'
              this.snackbar=true;
              this.dialog1=false
             }
          }).then(()=>{
            setInterval(this.close(), 3000);
          })
    
               },
                 // add the vendor
            saveVendor(){
                  if(this.$refs.form.validate()){
                  
                     this.PostVendor();
                  }
    
           // this.close()
            },
    
            editVendor (item) {
              this.isEdited=true;
            this.editedIndex = this.result.indexOf(item)
            this.editedWelding = Object.assign({}, item)
            this.dialog = true
          },
               // close the dialog box
             close () {
            this.dialog = false
            this.$nextTick(() => {
              this.editedWelding = Object.assign({}, this.defaultWelding)
              this.editedIndex = -1
            })
            this.isEdited=false;
          },
    
          // post API calls
    
    
          PostVendor() {
          var reqJSON = this.editedWelding;
          this.addWedling(reqJSON).then(response => {
             if(response.status==200){
              this.text=response.data.message;
              this.activeColor='green'
              this.snackbar=true;
              this.isEdited=false;
             } else{
                  this.text=response.data.message;
                  this.activeColor='red'
              this.snackbar=true;
             }
          }).then(()=>{
              
            setTimeout(this.getWedlingRods,this.close(), 5000);
          })
        },
                  //GET API Calls
               getWedlingRods(){
                    this.getAllWedlingRods().then((response) => {
               this.result=response
    
            
            }
            )},
               },
    
            
    
        }
        
    
    </script>
    
    <style scoped>
    .v-data-table {
      line-height: 2.8;
      padding: 20px;
    }
    </style>