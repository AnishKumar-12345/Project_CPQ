<template>
    <div>
        <Navbar/>
         <v-data-table  
           :headers="headers"
           :items="this.result"
            sort-by="id"           
           class="elevation-1"
           :search=search
         >
    
         <template v-slot:item="row" >
           <tr >
               <td style="text-align:left"> 
               {{row.item.clientCode}}
                </td>
     
               <td style="text-align:left">
                 {{row.item.clientName }}
                 </td>
                 <td style="text-align:left"> {{ row.item.clientType }}</td>
                 <td style="text-align:left"> {{ row.item.contactPersonEmail }}</td>
                 <td style="text-align:left"> {{ row.item.contactPersonPhone }}</td>
                 <td style="text-align:left"> {{ row.item.contactPersonName }}</td>
                 <td style="text-align:left"> {{ row.item.gstNo }}</td>
                 <td style="text-align:left"> {{ row.item.address }}</td>
                  <!-- <td style="text-align:left" > <v-icon medium class="blue--text" @click="editClient(row.item)">mdi-pencil</v-icon></td> --> 
           </tr>
         </template>
         
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
                <v-btn
                  color="red"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"  
                >
                  Add
                </v-btn>
              </template>
              <v-card style="background-color:rgba(225,246,240,255); padding:20px; border:1px solid rgba(27,212,160,255); border-radius:5px;">
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                 <v-form @submit.prevent="saveAllClient()" ref="form" v-model="valid" lazy-validation   > 
                <v-card-text>
                  <v-container
                    <v-row>
                        <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="saveClient.clientCode"
                          label="Client Code"
                          :rules="nameRules"
                          dense
                         outlined
                          hint="Mandatory Field"
                          :disabled=isEdited
                        >
                        <template #label>
        Client Code<strong  class="red--text">* </strong>
      </template>
                        </v-text-field>
                      </v-col>
                         <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="saveClient.clientName"
                          label="Client Name"
                          :rules="nameRules"
                          dense
                          outlined
                          hint="Mandatory Field"
                          :disabled=isEdited
                        >
                        <template #label>
        Client Name<strong  class="red--text">* </strong>
      </template>
                        </v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="saveClient.contactPersonName"
                          label="Contact Person Name"
                          :rules="nameRules"
                          dense
                         outlined
                          hint="Mandatory Field"
                          :disabled=isEdited
                        >
                        <template #label>
        Contact Person Name<strong  class="red--text">* </strong>
      </template>
                        </v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="saveClient.contactPersonEmail"
                          label="Contact Person Email"
                          :rules="emailRules"
                          dense
                         outlined
                         hint="Mandatory Field"
                        >
                         <template #label>
        Contact Person Email<strong  class="red--text">* </strong>
      </template>
                        </v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field  
                          v-model="saveClient.contactPersonPhone"
                          label="Contact Person Phone"
                           :rules="phoneRules"
                         hint="Mandatory Field"
                         dense
                         outlined
                        >
                       <template #label>
        Contact Person Phone<strong  class="red--text">* </strong>
      </template> 
                        </v-text-field>
                      </v-col>
    
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="saveClient.clientType"
                          label="Client Type"
                          :rules="addressRules"
                          hint="Mandatory Field"
                          dense
                         outlined
                        >
                         <template #label>
        Client Type<strong  class="red--text">* </strong>
      </template>
                        </v-text-field>
                      </v-col>
                       <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                      <!-- :rules="gstRules"
                          hint="Mandatory Field" -->
                        <v-text-field
                          v-model="saveClient.gstNo"
                          label="GST No"
                     
                          dense
                         outlined
                        >
                         <template #label>
        GST No<strong  class="red--text">* </strong>
      </template>
                        </v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="saveClient.address"
                          label="Address"
                          :rules="addressRules"
                          hint="Mandatory Field"
                          dense
                         outlined
                        >
                         <template #label>
        Address<strong  class="red--text">* </strong>
      </template> 
                        </v-text-field>
                      </v-col>
                     
                    </v-row>
                      <!-- </v-form> -->
                  </v-container>
                </v-card-text>
    
                <v-card-actions class="mr-3 " >
                  <v-spacer></v-spacer>
                  <v-btn
                    color="red white--text"
                                style="width:80px;"
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn class="mr-3" 
                   color="green white--text"
                                style="width:80px;"
                    type="submit"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
                 </v-form>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete  Vendor?</v-card-title>
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
          <v-icon
            small
            class="mr-2"
            @click="editClient(item)"
          >
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
      <v-snackbar :color="activeColor"
          v-model="snackbar"
         
        >
          {{ text }}
    
          <template v-slot:action="{ attrs }">
            <v-btn
             
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
    import servicescall from "../Services";
    import downloadexcel from "vue-json-excel"
    import Navbar from '@/components/Navbar'
    export default {
        name:'AddVendor',
    
         mixins: [servicescall],
         components:{
          downloadexcel,
          Navbar
         },
        data(){
            return {
             filename:'All-vendors-info',
             Jsonfields:{
              'Name':'vendorName',
              'address':'address',
              'email':'email',
              'mobile':'mobile',
              'vendor_type':'vendorType',
              'gst_no':'gstNo'
             },
              isProgress:false,
              activeUpload:false,
              isUploadCard:false,
               activeColor:'',
              file:'',
              isEdited:false,
                snackbar:false,
                text:'',
                 search:'',
                 valid:false,
                 result:[]
    ,             dialog: false,
                 dialogDelete: false,
          headers: [
            { text: 'Client ID', value: 'clientCode',sortable: true,  width: '15%' },
            {text: 'Client Name', value: 'clientName',  },
           {text: 'Client Type', value: 'clientType',  },
            {text: 'Contact Person Email', value: 'contactPersonEmail',  },
              {text: 'Contact Person Phone', value: 'contactPersonPhone',  },
                {text: 'Contact Person Name', value: 'contactPersonName',  },
                  {text: 'GST No', value: 'gstNo',  },
                    {text: 'Address', value: 'address',  },
            //  { text: 'Actions', value: 'actions', sortable: false,  width: '10%' },
          ],
         
          editedIndex: -1,
         
              saveClient:{
                   "address": "",
                   "clientCode": "",
                    "clientName": "",
                    "clientType": "",
                    "contactPersonEmail": "",
                    "contactPersonName": "",
                    "contactPersonPhone": "",
                    "gstNo": ""               
               },
              emailRules: [
                 (v) => !!v || " Email  is required",
                   (v) =>
                           /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                            "E-mail must be valid",
                         ],
             phoneRules: [
                       (v) => !!v || " Mobile  is required",
                       (v) => /^[0-9]+$/.test(v) || "only number are accepted",
                       (v) => (v && v.length <= 10 && v.length >= 10) || "Mobile must be  10 number",
                       ],
    
    
            nameRules: [
            (v) => !!v || " Name  is required",
           // (v) => v.length <= 30 || "Name allows below 30 characters only",
            // v => /[^a-z ]*$/gmi || 'Name must be characters',
            // (v) => /^[A-Za-z]+$/.test(v) || "Name must be characters",
          ],
    
          gstRules: [ 
            (v) => !!v || "GST is required",
            // (v) => /^([A-Za-z]|[0-9])+$/.test(v) || "only numbers and characters are accepted",
            (v) =>(v && v.length <= 15) && v.length >= 15 || "Must be  15 combination of Letters and Numbers",
          ],
    
           addressRules: [
            (v) => !!v || "Address is required",
            // (v) => v.length <= 30 || "Name allows below 30 characters only",
            // v => /[^a-z ]*$/gmi || 'Name must be characters',
            // (v) => /^[A-Za-z]+$/.test(v) || "Name must be characters",
          ],
    
            }
        },
    
        computed: {
          formTitle () {
            return this.editedIndex === -1 ? 'Add Client' : 'Edit Client'
          },
        },
    
        
        mounted(){
           if(localStorage.getItem("token")==null){
               this.$router.push({ name: "HelloWorld",});
            }
            this.getClients();
           
        },
    
        methods: {
                activeUploadCard(){
                      this.activeUpload=true;
                    },
                 // add the vendor
            saveAllClient(){
                  this.$refs.form.validate()
                  if(this.$refs.form.validate()){
                     this.saveClients()
                        this.$refs.form.reset();
                     }
            },
    
            editClient (item) { 
              this.isEdited=true;
               var checkClient=item.clientCode
               this.addClient(checkClient).then(response => {
            if(response.status==200){
              this.saveClient.clientCode =response.data.clientCode;
              this.saveClient.address =response.data.address;
             this.saveClient.contactPersonPhone = response.data.contactPersonPhone;
              this.saveClient.contactPersonEmail = response.data.contactPersonEmail;
              this.saveClient.contactPersonName = esponse.data.contactPersonName;
              this.saveClient.clientName = response.data.clientName;
              this.saveClient.gstNo=item.gstNo;
              this.saveClient.clientType=item.clientType;
              this.editedIndex = this.result.indexOf(item)
              this.dialog = true
            } else{
              this.text=response.data.message;
            }
          })             
          },
          close (){
            this.saveClient = {};
             this.dialog = false;
          },
    
          // post API calls
    
    
          saveClients() {    
          var saveallC = {}
          saveallC.clientCode = this.saveClient.clientCode;
          saveallC.address = this.saveClient.address;
          saveallC.contactPersonPhone = this.saveClient.contactPersonPhone;
          saveallC.clientName = this.saveClient.clientName;
          saveallC.contactPersonEmail = this.saveClient.contactPersonEmail;
          saveallC.clientType = this.saveClient.clientType;
          saveallC.gstNo = this.saveClient.gstNo;
          saveallC.contactPersonName = this.saveClient.contactPersonName;
          var reqJSON = saveallC;
          this.addClient(reqJSON).then(response => {
            if(response.status==200){
              this.activeColor='green'
              this.text=response.data.message;
              this.isEdited=false;
              this.snackbar=true;
            } else{
               this.activeColor='red'
              this.text=response.data.message;
              this.snackbar=true;
    
            }
          }).then(()=>{
            this.close(),
            setInterval(this.getClients(), 3000);
          })
        },      
                  //GET API Calls
               getClients(){
                    this.getAllClients().then((response) => {
               this.result=response   
            }
            )},
               },
    
            
    
        }
        
    
    </script>
    
    <style scoped>
    .v-data-table {
        line-height: 2.8;
        max-width: 100%;
    }
    </style>