<template>
    <div>
        <Navbar/>
      <v-card>
        <v-toolbar
          color="#ffffff"
    
          flat
          
        
        >
          <!-- <template v-slot:extension> -->
            <v-tabs
              v-model="tab"
              align-with-title
              style="margin-bottom:7px;box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;"
            >
              <v-tabs-slider color="blue"></v-tabs-slider>
    
              <v-tab
              style="font-weight:bold"
                v-for="item in items"
                :key="item"
              >
                {{ item }}
              </v-tab>
            </v-tabs>
          <!-- </template> -->
        </v-toolbar>
    
        <v-tabs-items v-model="tab">
          <v-tab-item>
          <VendorRegistration/>
          </v-tab-item>
    
          <v-tab-item>
            <AddVendor/>
          </v-tab-item>
    
          <v-tab-item>
            <VendorInfo/>
          </v-tab-item>
    
          
      
       
      
       
        </v-tabs-items>
      </v-card>
    </div>
    </template>
    <script>
    // import Home from '../views/Home.vue'
    import Navbar from '@/components/Navbar'
    import VendorRegistration from "../components/VendorRegistration"
    import AddVendor from "../components/AddVendor"
    import VendorInfo from "../components/VendorInfo"
   
   
    
    
    export default {
         name: "AllMappings",
         components:{   
            Navbar, 
            VendorRegistration,
            AddVendor,
            VendorInfo,
      
         
       
      },
      data () {
          return {
            tab: null,
            items: ['VEMDOR REGISTRATION', 'ALL VENDORS','VENDOR INFO'],
            // items1: ["CATEGORY", "SUB CATEGORY",],
            // text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          }
        },
      }
    </script>
    