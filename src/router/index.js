import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import ItemManagement from '../views/ItemManagement.vue'
import ItemCategory from "../components/ItemCategory"
import AddNewItem from "../components/AddNewItem"
import ItemMakes from "../components/ItemMakes"
import ItemType from "../components/ItemType"
import AllItems from "../components/AllItems"
import AllItemInstallation from "../components/AllItemInstallation"
import HelloWorld from "../components/HelloWorld"
import FittingManagement from '../views/FittingManagement.vue'
import FittingCategory from "../components/FittingCategory"
import AllFittingsMake from "../components/AllFittingsMake"
import FittingType from "../components/FittingType"
import AllFittings from "../components/AllFittings"
import FittingSearch from "../components/FittingSearch"
import ToolManagement from "../views/ToolManagement"
import ToolCategory from "../components/ToolCategory"
import AllToolsMake from "../components/AllToolsMake"
import AllToolsType from "../components/AllToolsType"
import ToolAll from "../components/ToolAll"
import ToolSearch from "../components/ToolSearch"
import ConsumableManagement from "../views/ConsumableManagement"
import ConsumableCategory from "../components/ConsumableCategory"
import AllConsumableMakes from "../components/AllConsumableMakes"
import ConsumableType from "../components/ConsumableType"
import AllConsumable from "../components/AllConsumable"
import ConsumableSearch from "../components/ConsumableSearch"
import AccessoriesManagement from "../views/AccessoriesManagement"
import AccessoriesCategory from "../components/AccessoriesCategory"
import AccessoriesMakes from "../components/AccessoriesMakes"
import AccessoriesType from "../components/AccessoriesType"
import AllAccessories from "../components/AllAccessories"
import AccessoriesSearch from "../components/AccessoriesSearch"
import AllMappings from "../views/AllMappings"
import ItemFittingMapping from "../components/ItemFittingMapping"
import ItemConsumableFittingMapping from "../components/ItemConsumableFittingMapping"
import ToolTypeMapping from "../components/ToolTypeMapping"
import AllVendorMapping from "../components/AllVendorMapping"
import VendorManagement from "../views/VendorManagement"
import VendorRegistration from "../components/VendorRegistration"
import VendorInfo from "../components/VendorInfo"
import AddVendor from "../components/AddVendor"
import BoqManagement from "../views/BoqManagement"
import AllBoqs from "../components/AllBoqs"
import BoqAddProject from "../components/BoqAddProject"
import BoqCreation from "../components/BoqCreation"
import ConfigurationManagement from "../views/ConfigurationManagement"
import ClassType from '../components/Configuration/ClassType'
import MaterialType from '../components/Configuration/MaterialType'
import UnitType from '../components/Configuration/UnitType'
import WeldingType from '../components/Configuration/WeldingType'
import InputType from '../components/Configuration/InputType'
import WeldingRods from '../components/Configuration/WeldingRods'
import Standards from '../components/Configuration/Standards'
import Formula from '../components/Configuration/Formula'
import Pipe from '../components/SavePipe'
import User from '../components/SaveUser'
import AddClient from '../components/AddClient'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/ItemManagement',
    name: 'ItemManagement',
    component: ItemManagement
  },
  {
    path: '/ItemCategory',
    name: 'ItemCategory',
    component: ItemCategory
  },
  {
    path: '/AddNewItem',
    name: 'AddNewItem',
    component: AddNewItem
  },
  {
    path: '/ItemMakes',
    name: 'ItemMakes',
    component: ItemMakes
  },
  {
    path: '/ItemType',
    name: 'ItemType',
    component: ItemType
  },
  {
    path: '/AllItems',
    name: 'AllItems',
    component: AllItems
  },
  {
    path: '/AllItemInstallation',
    name: 'AllItemInstallation',
    component: AllItemInstallation
  },
  {
    path: '/FittingManagement',
    name: 'FittingManagement',
    component: FittingManagement
  },
  {
    path: '/FittingCategory',
    name: 'FittingCategory',
    component: FittingCategory
  },
  {
    path: '/AllFittingsMake',
    name: 'AllFittingsMake',
    component: AllFittingsMake
  },
  {
    path: '/FittingType',
    name: 'FittingType',
    component: FittingType
  },
  {
    path: '/AllFittings',
    name: 'AllFittings',
    component: AllFittings
  },
  {
    path: '/FittingSearch',
    name: 'FittingSearch',
    component: FittingSearch
  },
  {
    path: '/ToolManagement',
    name: 'ToolManagement',
    component: ToolManagement
  },
  {
    path: '/ToolCategory',
    name: 'ToolCategory',
    component: ToolCategory
  },
  {
    path: '/AllToolsMake',
    name: 'AllToolsMake',
    component: AllToolsMake
  },
  {
    path: '/AllToolsType',
    name: 'AllToolsType',
    component: AllToolsType
  },
  {
    path: '/ToolAll',
    name: 'ToolAll',
    component: ToolAll
  },
  {
    path: '/ToolSearch',
    name: 'ToolSearch',
    component: ToolSearch
  },
  {
    path: '/ConsumableManagement',
    name: 'ConsumableManagement',
    component: ConsumableManagement
  },
  {
    path: '/ConsumableCategory',
    name: 'ConsumableCategory',
    component: ConsumableCategory
  },
  {
    path: '/AllConsumableMakes',
    name: 'AllConsumableMakes',
    component: AllConsumableMakes
  },
  {
    path: '/ConsumableType',
    name: 'ConsumableType',
    component: ConsumableType
  },
  {
    path: '/AllConsumable',
    name: 'AllConsumable',
    component: AllConsumable
  },
  {
    path: '/ConsumableSearch',
    name: 'ConsumableSearch',
    component: ConsumableSearch
  },
  {
    path: '/AccessoriesManagement',
    name: 'AccessoriesManagement',
    component: AccessoriesManagement
  },
  {
    path: '/AccessoriesCategory',
    name: 'AccessoriesCategory',
    component: AccessoriesCategory
  },
  {
    path: '/AccessoriesMakes',
    name: 'AccessoriesMakes',
    component: AccessoriesMakes
  },
  {
    path: '/AccessoriesType',
    name: 'AccessoriesType',
    component: AccessoriesType
  },
  {
    path: '/AllAccessories',
    name: 'AllAccessories',
    component: AllAccessories
  },
  {
    path: '/AccessoriesSearch',
    name: 'AccessoriesSearch',
    component: AccessoriesSearch
  },
  {
    path: '/AllMappings',
    name: 'AllMappings',
    component: AllMappings
  },
  {
    path: '/ItemFittingMapping',
    name: 'ItemFittingMapping',
    component: ItemFittingMapping
  },
  {
    path: '/ItemConsumableFittingMapping',
    name: 'ItemConsumableFittingMapping',
    component: ItemConsumableFittingMapping
  },
  {
    path: '/ToolTypeMapping',
    name: 'ToolTypeMapping',
    component: ToolTypeMapping
  },
  {
    path: '/AllVendorMapping',
    name: 'AllVendorMapping',
    component: AllVendorMapping
  },
  {
    path: '/VendorManagement',
    name: 'VendorManagement',
    component: VendorManagement
  },
  {
    path: '/VendorRegistration',
    name: 'VendorRegistration',
    component: VendorRegistration
  },
  {
    path: '/AddVendor',
    name: 'AddVendor',
    component: AddVendor
  },
  {
    path: '/VendorInfo',
    name: 'VendorInfo',
    component: VendorInfo
  },
  {
    path: '/BoqManagement',
    name: 'BoqManagement',
    component: BoqManagement
  },
  {
    path: '/BoqAddProject',
    name: 'BoqAddProject',
    component: BoqAddProject
  },
  {
    path: '/AllBoqs',
    name: 'AllBoqs',
    component: AllBoqs
  },
  {
    path: '/BoqCreation',
    name: 'BoqCreation',
    component: BoqCreation
  },
  {
    path: '/ConfigurationManagement',
    name: 'ConfigurationManagement',
    component: ConfigurationManagement
  },
  {
    path: '/ClassType',
    name: 'ClassType',
    component: ClassType
  },
  {
    path: '/MaterialType',
    name: 'MaterialType',
    component: MaterialType
  },
  {
    path: '/UnitType',
    name: 'UnitType',
    component: UnitType
  },
  {
    path: '/WeldingType',
    name: 'WeldingType',
    component: WeldingType
  },
  {
    path: '/InputType',
    name: 'InputType',
    component: InputType
  },
  {
    path: '/WeldingRods',
    name: 'WeldingRods',
    component: WeldingRods
  },
  {
    path: '/Standards',
    name: 'Standards',
    component: Standards
  },
  {
    path: '/Formula',
    name: 'Formula',
    component: Formula
  },
  {
    path: '/pipe',
    name: 'Pipe',
    component: Pipe
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/AddClient',
    name: 'AddClient',
    component: AddClient
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
