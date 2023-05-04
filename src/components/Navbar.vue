<template>
    <nav>
        <v-app-bar app style="background: linear-gradient(90deg, rgba(41,133,206,1) 44%, rgba(77,74,143,1) 100%);" elevate-on-scroll>
            <v-toolbar-title class="text-uppercase">
                <h3 style="font-family:sans-serif; text-transform: uppercase; line-height:50px;color:white;">TRIDENT FIRE PROTECTION ENGINEERS</h3>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-menu offset-y> 
                <template v-slot:activator="{on}"> 
                    <v-btn text v-on="on">
                        <v-icon left>expand_more</v-icon>
                        <span>Menu</span>
                    </v-btn>
                </template>
                <v-list flat>
                    <v-list-item v-for="link in links" :key="link.text" router :to="link.route" active-class="border">
                        <v-list-item-title>{{link.text}}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu> -->
            <!-- <v-btn text @click="logOut">
                <span>Exit</span>
                <v-icon right> exit_to_app </v-icon>
            </v-btn> -->
            <v-btn icon v-if="!$vuetify.theme.dark" @click="toggleTheme()">
        <v-icon class="mr-1" color="blue-grey darken-4">mdi-lightbulb</v-icon>
      </v-btn>
      <v-btn icon v-if="$vuetify.theme.dark" @click="toggleTheme()">
        <v-icon color="yellow darken-3">mdi-lightbulb-outline</v-icon>
      </v-btn>
            <v-avatar
                color="primary"
                size="48"
                ><v-img src="../assets/avatar.png"></v-img></v-avatar> &nbsp;&nbsp;
            <v-icon color="#FFF" large @click="logOut">mdi-logout</v-icon>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" dark app class="#283043"
        :mini-variant.sync="mini"     
         permanent
        >
        <!-- expand-on-hover -->
        <!-- <v-layout column align-center>
            <v-flex class="mt-2">
                <v-img src="./../assets/logo-white.png"></v-img>
                <p class="white--text subheading mt-1 text-center"></p>
            </v-flex>
        </v-layout> -->
        <!-- mini-variant-width="80px" -->
            <!-- <v-layout column align-center>
               
                    <v-img src="/trident.png" height="40px" width="100px" class="mt-1"></v-img>
                 
            
            </v-layout> -->
            <!-- <v-btn
          icon
          @click.stop="mini = !mini"
        > -->
        <v-app-bar-nav-icon @click.stop="mini = !mini"></v-app-bar-nav-icon>
        <!-- </v-btn> -->
            <v-list flat>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route" active-class="border"                 
                :class="{
                    'title-item': !$vuetify.theme.dark,
                    'title-item-dark': $vuetify.theme.dark,
                }"
                >         
                    <v-list-item-action>
                        <v-icon >{{link.icon}}
                        </v-icon>
                    </v-list-item-action>
                    <v-list-item-content >
                        <v-list-item-title >{{link.text}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>
<script>
import Popup from '@/components/Popup'
export default {
    data: () => ({
        drawer: true,
        links: [
            {icon: 'home', text: 'Home', route:'/Home'},
            {icon: 'mdi-cart', text: 'Item Management', route:'/ItemManagement'},
            {icon:'mdi-pipe-disconnected',text: 'Fitting Management',route:'/FittingManagement'},
            {icon:'mdi-screwdriver',text: 'Tool Management',route:'/ToolManagement'},
            {icon:'mdi-access-point-network',text:'Consumable Management',route:'/ConsumableManagement'},
            {icon:'mdi-weight',text:'Accessories Management',route:'/AccessoriesManagement'},
            {icon:'mdi-map-marker-multiple',text:'All Mappings',route:'/AllMappings'},
            {icon:'mdi-desktop-classic',text:'Boq Management',route:'/BoqManagement'},
            {icon:'mdi-human-greeting',text:'VendorManagement',route:'/VendorManagement'},
            {icon:'mdi-wrench',text:'Configurations',route:'/ConfigurationManagement'},
            {icon:'mdi-pipe',text:'pipes',route:'/pipe'},
            {icon:'mdi-human-child',text:'Clients',route:'/AddClient'},
            {icon:'mdi-account',text:'USER',route:'/user'},
            
            // {icon: 'person', text: 'Team', route:'/Team'}
        ],
        mini: true,
    }),
    components: {
        Popup,
    },
    mounted() {
     this.user=localStorage.getItem('user')
   },
   methods:{
     logOut(){
       localStorage.removeItem("token");
      this.$router.push({
                name: "HelloWorld",
               
              });
     },
     toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
   },

}
</script>
