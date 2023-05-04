<template>
<div>
       <v-card class="mt-1 mr-4">
           <v-card-title class=" white--text" style="height:60px;background:#313940;">
              <h4 class="white--text"> Add Client Details</h4>
               </v-card-title>
           <v-card-text class="mt-3">
               <v-form @submit.prevent="verify()"
                    ref="form"
                    v-model="valid"
                    lazy-validation 
                    style="background-color:rgba(225,246,240,255); padding:20px; border:1px solid rgba(27,212,160,255); border-radius:5px;" 
                    >
               <v-row>
                  <v-col sm="10" md="6" lg="6">
                     <v-text-field
                        label="Project Name"
                        placeholder="Project Name"
                        v-model="boqModel.projectName"
                        outlined
                        dense
                        :rules='nameRules'
                    
                      > 
                      <template #label>
                      Project Name<strong class="red--text">* </strong>
                    </template>      
                      </v-text-field>
                      <v-text-field
                        label="Contact Person Name"
                        placeholder="Contact Person Name"
                        v-model="boqModel.contactPersonName"
                        outlined
                        required
                        :rules="nameRules"
                        hint="Mandatory Field"
                    
                        dense
                      >  
                      <template #label>
                      ContactPersonName<strong class="red--text">* </strong>
                    </template>   
                      </v-text-field>

                      <v-text-field
                        label="Contact Person Email"
                        placeholder="Contact Person Email"
                        v-model="boqModel.contactPersonEmail"
                        :rules='emailRules'
                        hint="Mandatory Field"
                        outlined
                        required
                        dense
                      >    
                      <template #label>
                      Contact Person Email<strong class="red--text">* </strong>
                    </template> 
                      </v-text-field>
                      <v-text-field
                        label="No Of Blocks"
                        placeholder="No Of Blocks"
                        v-model="boqModel.noOfBlocks"
                        outlined
                        dense
                        type="number"   
                        step="any"
                        min="0"
                        @keyup="addBlocks(boqModel.noOfBlocks)"
                      >     
                      </v-text-field>

                      

                      <v-text-field
                        label="No Of Sections"
                        placeholder="No Of Sections"
                        v-model="boqModel.noOfSections"
                        outlined
                        dense
                        :rules="numberRules"
                        type="number"     
                        step="any"
                        min="0"
                      >     
                      </v-text-field>                   
                      <v-autocomplete
                        label="Type Of Work"
                        placeholder="Type Of Work"
                        v-model="boqModel.typeOfWork"
                        outlined
                       :items="typeofWorks"
                        required
                        dense
                      >

                      </v-autocomplete>                                      
                        <v-row v-for="(block,index ) in boqModel.blockNames" :key="index">
                          <v-col 
                            cols="8"                            
                          >
                            <v-text-field
                            
                              label="Block Name"
                              v-model="block.blockName"
                              outlined
                              dense                           
                              :counter="20"
                              hint="Mandatory Field"
                              required
                            >
                            <template #label>
                      Block Name<strong class="red--text">* </strong>
                            </template>
                            </v-text-field>                            
                          </v-col>                   
                            <v-col cols="4"  >
                          </v-col> 
                          </v-row>
                  </v-col>
                       <v-col sm="10" md="6" lg="6">
                      <v-autocomplete
                        label="Client Code"
                        placeholder="Client Code"
                        v-model="boqModel.clientCode"
                        outlined
                       :items="allClientCodes"
                        required
                        dense
                        @change="getClientDetails(boqModel.clientCode)"
                       
                      >   
                      <template #label>
                      Client Code<strong class="red--text">* </strong>
                    </template>    
                      </v-autocomplete>
                   <v-text-field
                        label="Client Name"
                        placeholder="Client Name"
                        v-model="boqModel.clientName"
                        outlined
                        :rules='nameRules'
                                            
                        required
                        dense
                      >   
                      <template #label>
                      Client Name<strong class="red--text">* </strong>
                    </template>    
                   </v-text-field>
                      <v-text-field
                        label="Contact Person Number"
                        placeholder="Contact Person Number"
                        v-model="boqModel.contactPersonPhone"
                        :rules='phoneRules'
                        min="0"
                        outlined
                        dense
                        type="number"
                     
                      >
                      <template #label>
                      Contact Person Number<strong class="red--text">* </strong>
                    </template>     
                      </v-text-field>
                       <v-text-field
                        label="No Of Floors"
                        placeholder="No Of Floors"
                        v-model="boqModel.noOfFloors"
                        outlined
                        dense
                        type="number"   
                        step="any"
                        min="0"
                      >     
                      </v-text-field>

                       <v-text-field
                        label="Pump Rooms"
                        placeholder="Pump Rooms"
                        v-model="boqModel.noOfPumpRooms"
                        outlined
                        dense
                        type="number"   
                        step="any"
                        min="0"
                      >     
                      </v-text-field>
                      <v-textarea
                      label="Project Address"
                      placeholder="Project Address"
                       v-model="boqModel.projectAddress"
                       outlined
                       dense
                         no-resize
                      ></v-textarea>
                     
                       </v-col>
                       <v-col>
                         <v-btn  type="submit" class="red white--text" > Save</v-btn>
                       </v-col>
                          
                 
               </v-row>
               </v-form>
           </v-card-text>
       </v-card>
        <v-snackbar :color="activeColor" v-model="snackbar" >
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
import servicescall from '@/Services'
export default {
  mixins: [servicescall],
    data(){
        return {
          typeofWorks:['Supply Only','Supply & Installation', 'Installation Only','Fittings Only','Fittings & Installation'],
          allclientdetailscheck:"",
          allClientCodes:[],
          section:'',
          activeColor:'',
          text: "",
          valid:false,
          snackbar: false,
          allClientDetails:[],
          boqModel:{
            "clientCode":'',
            "projectName":'',
            // "clientCode":'',
            "blockNames":[
              {blockName:""}
            ],
            "clientName":'',
            "noOfBlocks":'',
            "noOfFloors":'',
            "noOfSections":'',
            "noOfPumpRooms":'',
            "typeOfWork":'',
            "projectAddress":'',
            "contactPersonName":'',
            "contactPersonEmail":'',
            "contactPersonPhone":'',    
          },
          emailRules: [
            v => !!v || "E-mail is required",
            v => /.+@.+/.test(v) || "E-mail must be valid"
          ],
          nameRules: [
            (v) => !!v || "Name is required",
            (v) => v.length <= 100 || "Name allows below 100 characters only",
            // (v) => /^[A-Za-z\s]+$/.test(v) || "Name must be characters",
            ],
          // nameRules1: [
          //   (v) => !!v || "Field is required",
          //   (v) => v.length <= 20 || "Name allows below 20 characters only",
          //   ],
            // blockRule:[
            //   (v) => !!v || "Block is required",
            //   v => /.+-.+/.test(v) || "Block must be valid"
            // ],
            nameRules1: [
                (v) => !!v || "Name is required",
                (v) => v.length <= 20 || "Name allows below 20 characters only",
                // v => /[^a-z ]*$/gmi || 'Name must be characters',
                (v) => /^[A-Za-z\s]+$/.test(v) || "Name must be characters",
            ],
          numberRules: [
            (v) => !!v || "Field is required",
            (v) => /^[0-9]+(\.([0-9]{1,8})?)?$/.test(v) || "only number with decimal are accepted",
          ],
           phoneRules: [
            (v) => !!v || "Number is required",
            (v) => /^[0-9]+$/.test(v) || "only number are accepted",
            (v) =>
              (v && v.length <= 10 && v.length >= 10) ||
              "Mobile must be  10 number",
          ],
        }
    },
    mounted(){
      this.getAllClientdetails();
      this.getClients();
      
    },
    methods:{

        addBlocks(count){
            this.boqModel.blockNames=[
              {blockName:""}
            ]
            for(var i=0;i<count-1;i++){
               this.boqModel.blockNames.push({'blockName':
          ''})
            }
         
        },
      supply(){
        if(this.boqModel.supplyOnly == true){
          this.boqModel.supplyAndInstallation = false;
           this.boqModel.installationOnly = false;
        }else{
             this.boqModel.supplyAndInstallation = true;
           this.boqModel.installationOnly = true;
        }
      },
      Install(){
         if(this.boqModel.supplyAndInstallation == true){
          this.boqModel.supplyOnly = false;
           this.boqModel.installationOnly = false;
        }else{
             this.boqModel.supplyOnly = true;
           this.boqModel.installationOnly = true;
        }
      },
        only(){
         if(this.boqModel.installationOnly == true){
          this.boqModel.supplyOnly = false;
           this.boqModel.supplyAndInstallation = false;
        }else{
             this.boqModel.supplyOnly = true;
           this.boqModel.supplyAndInstallation = true;
        }
      },
            getClientDetails(code){
              for(var i=0;i<this.allClientDetails.length;i++){
                if(code==this.allClientDetails[i].clientCode){
                  this.boqModel.clientName=this.allClientDetails[i].clientName;
                  this.boqModel.contactPersonName=this.allClientDetails[i].contactPersonName;
                  this.boqModel.contactPersonEmail =this.allClientDetails[i].contactPersonEmail;
                  this.boqModel.contactPersonPhone =this.allClientDetails[i].contactPersonPhone;
                }
              }

            },
            getClients(){
                this.getAllClients().then((response) => {
           this.allClientDetails=response       
        }
        )},
      refresh(){
        this.boqModel.supplyOnly = '';
      },
      verify() {
      if (this.$refs.form.validate()) {        
        this.goBoqConfig();        
        this.snackbar = true;
        this.activeColor='green'
        this.text = "Your Project Saved Successfully";
      } else {
        this.text = "";
        this.snackbar = true;
        this.activeColor='red'
        this.text = "Please fill all Mandatory Field ";
      }
    },
        goBoqConfig(){
            var saveProject = {};           
              var blockNames=[];
              for(var i=0;i<this.boqModel.blockNames.length;i++){
                blockNames.push(this.boqModel.blockNames[i].blockName)
              }
              saveProject.blockNames = blockNames;
              saveProject.projectName = this.boqModel.projectName;
              saveProject.clientCode = this.boqModel.clientCode;
              saveProject.clientName = this.boqModel.clientName;
              saveProject.noOfBlocks = this.boqModel.noOfBlocks;
              saveProject.noOfFloors = this.boqModel.noOfFloors;
              saveProject.noOfSections = this.boqModel.noOfSections;
              saveProject.noOfPumpRooms = this.boqModel.noOfPumpRooms;
              saveProject.typeOfWork = this.boqModel.typeOfWork;
              // saveProject.supplyOnly = this.boqModel.supplyOnly;
              // saveProject.supplyAndInstallation = this.boqModel.supplyAndInstallation;
              // saveProject.installationOnly = this.boqModel.installationOnly;
              saveProject.projectAddress = this.boqModel.projectAddress;
              saveProject.contactPersonName = this.boqModel.contactPersonName;
              saveProject.contactPersonEmail = this.boqModel.contactPersonEmail;
              saveProject.contactPersonPhone = this.boqModel.contactPersonPhone;
              var reqJSON = saveProject;
              this.postBoq(reqJSON).then((response) => {
                    if(response.status == 200){
                    this.text = response.data.message;
                    this.activeColor='green'
                    this.snackbar = true;
                    this.boqModel={}
                    this.$router.push({name:'BoqAllList', params: {id: '[clientCode]'}}); 
                  }else{
                    this.text = response.data.message;
                    this.activeColor = "red";
                    this.snackbar = true;
                  }
              })
        },
        addItemBoqInfo(inx,index){
            for (var i=0;i < inx.length;i++){
              this.boqModel.blockNames.push({
            "blockName":'',       
          });
        }
       
    },
    deleteItemBoqInfo(idx){
      this.boqModel.blockNames.splice(idx, 1)
    },
    getAllClientdetails(){
      this.getAllClients().then((response) => { 
        this.allClientCodes = response.map(a => a.clientCode);        
      })
    }
    }
    
}
</script>

<style>
.rad{
  margin-left: -40px;
  margin-top: 20px;
}
</style>