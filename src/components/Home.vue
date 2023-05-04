<template>
    <div>   
        <Navbar/>
      <v-container style="margin-left:6px;">    
        <v-layout style="gap: 4px;">
          <v-flex sm6 xs12 md6 lg4>
              <v-list-item three-line outlined >
                <v-list-item-content>
                  <fieldset class=" mb-1 auto">
                <legend id="lgnd1">ITEM MANAGEMENT</legend>
                <v-list-item-subtitle class="para">The marketing copy that explains what a product is and why it's worth purchasing.</v-list-item-subtitle><br><br><br>
                <v-btn small color="green white--text" @click="ItemManagement" class="bttn">ITEM</v-btn>
              </fieldset>
                </v-list-item-content>
              </v-list-item>
          </v-flex>
          <v-flex sm6 xs12 md6 lg4>
              <v-list-item three-line  outlined >
                <v-list-item-content>
                  <fieldset class=" mb-1 auto2">
                    <legend id="lgnd2">FITTING MANAGEMENT</legend>
                    <v-list-item-subtitle class="para">The marking, filing, sawing, scraping, drilling, tapping, grinding, etc.,using hand tools or power operated portable tools.</v-list-item-subtitle> <br><br>
                    <v-btn small  color="blue white--text" @click="FittingManagement" class="bttn">FITTING</v-btn>
                  </fieldset>
                </v-list-item-content>
              </v-list-item>
          </v-flex>
          <v-flex sm6 xs12 md6 lg4>
              <v-list-item three-line outlined >
                <v-list-item-content>
                  <fieldset class=" mb-1 auto3">
                    <legend id="lgnd3">TOOL MANAGEMENT</legend>
                     <v-list-item-subtitle class="para">Tool management is needed in metalworking so that the information regarding the tools on hand can be uniformly organized and integrated.</v-list-item-subtitle><br>
                     <v-btn small  color="red white--text" @click="TollManagement" class="bttn">TOOL</v-btn>
                  </fieldset>                               
                </v-list-item-content>
              </v-list-item>
          </v-flex>
        </v-layout>
        <v-layout style="gap: 4px; margin-top: 20px">
          <v-flex sm6 xs12 md6 lg4>
              <v-list-item three-line outlined>
                <v-list-item-content>
                  <fieldset class=" mb-1 auto4">
                    <legend  id="lgnd4"> BOQ</legend>
                    <v-list-item-subtitle class="para">A document created by a quantity surveyor or cost consultant that contains information on the quantity of materials, labour, and their costs in a construction project.</v-list-item-subtitle>
                    <v-btn small   @click="Boq" style=" background-color: #354a5f;color:white;" class="bttn">BOQ</v-btn>
                  </fieldset>
                </v-list-item-content>
              </v-list-item>
          </v-flex>
          <v-flex sm6 xs12 md6 lg4>
              <v-list-item three-line  outlined>
                <v-list-item-content>
                  <fieldset class=" mb-1 auto5">
                    <legend  id="lgnd5">CONFIGURATIONS</legend>
                    <v-list-item-subtitle class="para">The specific hardware and software details in terms of devices attached, capacity or capability, and exactly what the system is made up of.</v-list-item-subtitle><br>
                    <v-btn small  @click="Configurations" style=" background-color: #718752;color:white;" class="bttn">CONFIG</v-btn>
                  </fieldset>
                </v-list-item-content>
              </v-list-item>
          </v-flex>
           <v-flex sm6 xs12 md6 lg4>
              <v-list-item three-line  outlined >
                <v-list-item-content>
                  <fieldset class=" mb-1 auto6">
                    <legend  id="lgnd6">PIPES</legend>
                     <v-list-item-subtitle class="para">A pipe is a tubular section or hollow cylinder, usually but not necessarily of circular cross-section.</v-list-item-subtitle><br><br>
                       <v-btn small   style=" background-color: #8969b6;color:white;" @click="Pipe" class="bttn">PIPE</v-btn>
                  </fieldset>
                </v-list-item-content>
              </v-list-item>
          </v-flex>
        </v-layout>
        <v-layout style="gap: 10px; margin-top: 20px">
          <v-flex sm6 xs12 md6 lg4>
              <v-list-item three-line outlined >
                <v-list-item-content>
                  <fieldset class=" mb-1 auto7">
                    <legend  id="lgnd7">VENDOR</legend>
                      <v-list-item-subtitle class="para">An individual or company that sells goods or services to someone else in the economic production chain.</v-list-item-subtitle><br><br>
                      <v-btn small  @click="Vendor" style=" background-color: #834651;color:white;" class="bttn">VENDOR</v-btn>
                  </fieldset>
                </v-list-item-content>
              </v-list-item>
          </v-flex>
          <v-flex sm6 xs12 md6 lg4>
              <v-list-item three-line outlined >
                <v-list-item-content>
                  <fieldset class=" mb-1 auto8">
                    <legend  id="lgnd8">CLIENT</legend>
                       <v-list-item-subtitle class="para">A person who uses the professional advice or services of another.</v-list-item-subtitle><br><br><br>
                        <v-btn small  @click="Client" style=" background-color: #a8951f;color:white;" class="bttn">CLIENT</v-btn>
                  </fieldset>
                </v-list-item-content>
              </v-list-item>
          </v-flex>
           <v-flex sm6 xs12 md6 lg4>
              <v-list-item three-line  outlined >
                <v-list-item-content>
                  <fieldset class=" mb-1 auto9">
                    <legend  id="lgnd9">USER</legend>
                     <v-list-item-subtitle class="para">A person or thing that uses something such as a place, facility, product, or machine.</v-list-item-subtitle><br><br>
                     <v-btn small   style=" background-color: #31a689;color:white;"  @click="User" class="bttn">USER</v-btn>
                  </fieldset>
                </v-list-item-content>
              </v-list-item>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </template>
  <script>
   import Navbar from '@/components/Navbar'
  export default {
      name: 'Home',
      components:{   
        Navbar,
      },
      methods:{
          ItemManagement(){
          this.$router.push({
            name: "ItemManagement",
            });
         },
         FittingManagement(){
          this.$router.push({
            name: "FittingManagement",
            });
         },
         TollManagement(){
          this.$router.push({
            name: "ToolManagement",
            });
         },
         Boq(){
          this.$router.push({
            name: "BoqManagement",
            });
         },
         Configurations(){
          this.$router.push({
            name: "ConfigurationManagement",
            });
         },
         Pipe(){
          this.$router.push({
            name: "Pipe",
            });
         },
         Vendor(){
          this.$router.push({
            name: "VendorManagement",
            });
         },
         Client(){
          this.$router.push({
            name: "AddClient",
            });
         },
         User(){
          this.$router.push({
            name: "User",
            });
         },
      }
  };
  </script>
  <style scoped>
  .auto{
    margin-top: -14px;
      height: 200px;
      max-width:344px;
      /* cursor: pointer; */
      border-radius: 4px;
      margin-left: 3px;
      border: none;
      background-color: #ffffff;
     box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
      /* box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2); */
      /* border: 2px solid red; */
  }
  .auto2{
    margin-top: -14px;
      height: 200px;
      max-width:344px;
      /* cursor: pointer; */
       border-radius: 4px;
      margin-left: 3px;
      border: none;
      background-color: #ffffff;
     box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
      /* box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2); */
      /* border: 2px solid red; */
  }
  .auto3{
    margin-top: -14px;
      height: 200px;
      max-width:344px;
      /* cursor: pointer; */
       border-radius: 4px;
      margin-left: 3px;
      border: none;
      background-color: #ffffff;
     box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
      /* box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2); */
      /* border: 2px solid red; */
  }
  .auto4{
    margin-top: -14px;
      height: 200px;
      max-width:344px;
       border-radius: 4px;
      /* cursor: pointer; */
      margin-left: 3px;
      border: none;
      background-color: #ffffff;
      box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
      /* box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2); */
      /* border: 2px solid red; */
  }
  .auto5{
    margin-top: -14px;
      height: 200px;
      max-width:344px;
      border-radius: 4px;
      /* cursor: pointer; */
      margin-left: 3px;
      border: none;
      background-color: #ffffff;
      box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
      /* box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2); */
      /* border: 2px solid red; */
  }
  .auto6{
    margin-top: -14px;
      height: 200px;
      max-width:344px;
       border-radius: 4px;
      /* cursor: pointer; */
      margin-left: 3px;
      border: none;
      background-color: #ffffff;
     box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
      /* box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2); */
      /* border: 2px solid red; */
  }
  .auto7{
    margin-top: -14px;
      height: 200px;
      max-width:344px;
       border-radius: 4px;
      /* cursor: pointer; */
      margin-left: 3px;
      border: none;
      background-color: #ffffff;
     box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
      /* box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2); */
      /* border: 2px solid red; */
  }
  .auto8{
    margin-top: -14px;
      height: 200px;
      max-width:344px;
       border-radius: 4px;
      /* cursor: pointer; */
      margin-left: 3px;
      border: none;
      background-color: #ffffff;
     box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
      /* box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2); */
      /* border: 2px solid red; */
  }
  .auto9{
    margin-top: -14px;
      height: 200px;
      max-width:344px;
       border-radius: 4px;
      /* cursor: pointer; */
      margin-left: 3px;
      border: none;
      background-color: #ffffff;
     box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
      /* box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2); */
      /* border: 2px solid red; */
  }
  #lgnd1{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    color: #4caf50!important;
    font-size: 20px;  
  }
  #lgnd2{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    color: #2196f3!important;
    font-size: 20px;
  }
  #lgnd3{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    color: #f44336!important;
    font-size: 20px;
  }
  #lgnd5{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    color: #718752;
    font-size: 20px;
  }
  #lgnd4{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    color: #354a5f;
    font-size: 20px;
  }
  #lgnd6{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    color: #8969b6;
    font-size: 20px;
  }
  #lgnd7{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    color: #834651;
    font-size: 20px;
  }
  #lgnd8{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    color: #a8951f;
    font-size: 20px;
  }
  #lgnd9{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    color: #31a689;
    font-size: 20px;
  }
  .v-list--three-line .v-list-item .v-list-item__subtitle, .v-list-item--three-line .v-list-item__subtitle {
      white-space: normal;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      display: block !important;
  }
  /* .auto :hover{
      height: 200px;
      max-width:344px;
      cursor: pointer;
      background-color: #D32F2F;
      color: whitesmoke;
  } */
  .para{
      color: rgb(0, 0, 0) !important;
      font-size: 18px;
      padding: 5px;
      margin-top: 10px;
      font-family: Arial, Helvetica, sans-serif;
  }
  /* .para :hover{
      color:white !important;
      font-size: 18px;
      background-color: #D32F2F;
  } */
  .head{
      color: #D32F2F;
      font-size: 14px;
      font-weight: bold;
  }
  .bttn{
    margin-top: 10px;
    justify-content: center;
    align-items: center;
    width: 100px;
    border-radius: 2px;
   
  }
  /* .head :hover{
      color: #fff;
  } */
  </style>