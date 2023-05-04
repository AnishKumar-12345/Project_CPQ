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
          <ConsumableCategory/>
          </v-tab-item>
    
          <v-tab-item>
            <AllConsumableMakes/>
          </v-tab-item>
    
          <v-tab-item>
            <ConsumableType/>
          </v-tab-item>
    
          <v-tab-item>
            <AllConsumable/>
          </v-tab-item>
    
          <v-tab-item>
            <ConsumableSearch/>
          </v-tab-item>    
       
        </v-tabs-items>
      </v-card>
    </div>
    </template>
    <script>
    // import Home from '../views/Home.vue'
    import Navbar from '@/components/Navbar'
    import ConsumableCategory from "../components/ConsumableCategory"
    import AllConsumableMakes from "../components/AllConsumableMakes"
    import ConsumableType from "../components/ConsumableType"
    import AllConsumable from "../components/AllConsumable"
    import ConsumableSearch from "../components/ConsumableSearch"
    
    
    export default {
         name: "ItemManagement",
         components:{   
            Navbar, 
            ConsumableCategory,
            AllConsumableMakes,
            ConsumableType,
            AllConsumable,
            ConsumableSearch,
       
      },
      data () {
          return {
            tab: null,
            items: ['CONSUMABLE CATEGORY', 'CONSUMABLE MAKES','CONSUMABLE TYPE','CONSUMABLE','CONSUMABLE SEARCH'],
            // items1: ["CATEGORY", "SUB CATEGORY",],
            // text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          }
        },
      }
    </script>
    