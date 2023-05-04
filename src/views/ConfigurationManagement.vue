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
              style="margin-bottom:7px;box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;font-weight: bold;"
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
          <ClassType/>
          </v-tab-item>
    
          <v-tab-item>
            <MaterialType/>
          </v-tab-item>
    
          <v-tab-item>
            <UnitType/>
          </v-tab-item>
    
          <v-tab-item>
            <WeldingType/>
          </v-tab-item>
    
          <v-tab-item>
            <InputType/>
          </v-tab-item>            

          <v-tab-item>
            <WeldingRods/>
          </v-tab-item> 

          <v-tab-item>
            <Standards/>
          </v-tab-item> 

          
          <v-tab-item>
            <Formula/>
          </v-tab-item> 
       
        </v-tabs-items>
      </v-card>
    </div>
    </template>
    <script>
    // import Home from '../views/Home.vue'
    import Navbar from '@/components/Navbar'
    import ClassType from '../components/Configuration/ClassType'
    import MaterialType from '../components/Configuration/MaterialType'
    import UnitType from '../components/Configuration/UnitType'
    import WeldingType from '../components/Configuration/WeldingType'
    import InputType from '../components/Configuration/InputType'
    import WeldingRods from '../components/Configuration/WeldingRods'
    import Standards from '../components/Configuration/Standards'
    import Formula from '../components/Configuration/Formula'
    
    
    export default {
         name: "ItemManagement",
         components:{   
            Navbar, 
            ClassType,
            MaterialType,
            UnitType,
            WeldingType,
            InputType,
            WeldingRods,
            Standards,
            Formula
       
      },
      data () {
          return {
            tab: null,
            items: ['CLASS TYPE', 'MATERIAL TYPE','UNIT TYPE','WELDING TYPE','INPUT TYPE',"WELDING RODS","STANDARDS","FORMULA"],
            // items1: ["CATEGORY", "SUB CATEGORY",],
            // text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          }
        },
      }
    </script>
    