
import Vue from 'vue'
import axios from "axios";

export default { 
    data(){
        return{
            url: "http://103.60.213.11:9011/",
        }
    },
    methods :{
        userLogin(reqbody) {
            return axios
              .post(this.url +"api/auth/signin", reqbody, {
                headers: {
                    "accept": "*/*",
                  "Content-Type": "application/json", 
                }
              }) 
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },


           userRegister(reqbody) {
            return axios
              .post(this.url +"api/auth/signup", reqbody, {
                headers: {
                    "accept": "*/*",
                  "Content-Type": "application/json",
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },
          addClient(reqbody){
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/admin/client/save-client", reqbody, {
                headers: {
                  "accept": "*/*",
                  "Content-Type": "application/json",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },

          addVendor(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/admin/vendor/save-vendor", reqbody, {
                headers: {
                  "accept": "*/*",
                  "Content-Type": "application/json",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },

          vendorById(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .get(this.url +"api/admin/vendor/"+ reqbody, {
                headers: {
                    "accept": "*/*",
                  "Content-Type": "application/json",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },

          addCategory(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/item-type/save-sub-category", reqbody, {
                headers: {
                    "accept": "*/*",
                  "Content-Type": "application/json",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          }, 

           //deleteCategoryItem
            
            deleteFittingCategory(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .delete(this.url +"api/admin/fitting-category/delete-category", {
                headers: { 
                  "Authorization": "Bearer "+token     
                },
                data:reqbody
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },
           deleteCategoryItem(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .delete(this.url +"api/admin/category/delete-category", {
                headers: { 
                  "Authorization": "Bearer "+token     
                },
                data:reqbody
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },

          //delete Item Make deleteItemMake

          deleteItemMake(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .delete(this.url +"api/admin/itemmake/delete-item-make", {
                headers: { 
                  "Authorization": "Bearer "+token     
                },
                data:reqbody
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },
          addFittingCategory(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/admin/fitting-category/save-category", reqbody, {
                headers: {
                    "accept": "*/*",
                  "Content-Type": "application/json",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },
           // Delete Fitting Category
           
           deleteFittingCategory(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .delete(this.url +"api/admin/fitting-category/delete-category", {
                headers: { 
                  "Authorization": "Bearer "+token     
                },
                data:reqbody
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },
 
          saveAllCatagory(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/admin/category/save-all", reqbody, {
                headers: {
                    "accept": "*/*",
                  "Content-Type": "application/json",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },
          addWedling(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/admin/wedling-rods/save-wedling-rods-config", reqbody, {
                headers: {
                    "accept": "*/*",
                  "Content-Type": "application/json",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },
          //deleteWedling Rod
          deleteWedling(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .delete(this.url +"api/admin/wedling-rods/delete-wedling-rods-config", {
                headers: { 
                  "Authorization": "Bearer "+token     
                },
                data:reqbody
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },

         addItem(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/item-type/save-item-type", reqbody, {
                headers: {
                    "accept": "*/*",
                  "Content-Type": "application/json",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },
           // add consumable type
           addConsumableType(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/consumables-type/save-consumable-type", reqbody, {
                headers: {
                    "accept": "*/*",
                  "Content-Type": "application/json",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },
               // add Tool type
               addToolType(reqbody) {
                var token=localStorage.getItem("token")
                return axios
                  .post(this.url +"api/tool-type/save-tool-type", reqbody, {
                    headers: {
                        "accept": "*/*",
                      "Content-Type": "application/json",
                      "Authorization": "Bearer "+token
                     
                    }
                  })
                  .then(response => {
                    return response;
                  })
                  .catch(err => {
                    return err.response;
                  });
              },

          deleteConsumableType(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .delete(this.url+"api/addon/consumables-type/"+reqbody+"/delete-consumable-type", {
                headers: {
                    "accept": "*/*",
                   "Content-Type": "application/json",
                  "Authorization": "Bearer "+token
                },
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },

          deleteToolType(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .delete(this.url+"api/item-type/"+reqbody+"/delete-item-type", {
                headers: {
                    "accept": "*/*",
                   "Content-Type": "application/json",
                  "Authorization": "Bearer "+token
                },
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },
     
          deleteConsumables(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .delete(this.url+"api/consumables/"+reqbody+"/delete-consumable", {
                headers: {
                    "accept": "*/*",
                   "Content-Type": "application/json",
                  "Authorization": "Bearer "+token
                },
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },
          uploadMakeType(reqbody) {
            var token=localStorage.getItem("token")
            return axios
            .post(this.url +"api/admin/itemmake/import", reqbody, {
              headers: {
                "accept": "application/json",
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer "+token
               
              }
            })
            .then(response => {
              return response;
            })
            .catch(err => {
              return err.response;
            });
          },
          uploadItemType(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/item-type/import", reqbody, {
                headers: {
                  "accept": "application/json",
                  "Content-Type": "multipart/form-data",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                //TODO: How to i fetch, and pass the errorcode ?
                //console.log("error service", err.response);
                return err.response;
              });
          },
           // upload all items
          uploadItems(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/item/import", reqbody, {
                headers: {
                  "accept": "application/json",
                  "Content-Type": "multipart/form-data",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          }, 
           //upload Accessories

           uploadAccessories(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/accessorires/import", reqbody, {
                headers: {
                  "accept": "application/json",
                  "Content-Type": "multipart/form-data",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },
            //upload all installations
            uploadInstallations(reqbody) {
              var token=localStorage.getItem("token")
              return axios
                .post(this.url +"api/item-type/insta-prices/import", reqbody, {
                  headers: {
                    "accept": "application/json",
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer "+token
                   
                  }
                })
                .then(response => {
                  return response;
                })
                .catch(err => {
                  return err.response;
                });
            }, 

          uploadFittingType(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/fitting-type/import", reqbody, {
                headers: {
                  "accept": "application/json",
                  "Content-Type": "multipart/form-data",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },

          uploadCategory(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/admin/category/import", reqbody, {
                headers: {
                  "accept": "application/json",
                  "Content-Type": "multipart/form-data",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },
          uploadFittingCategory(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/admin/fitting-category/import", reqbody, {
                headers: {
                  "accept": "application/json",
                  "Content-Type": "multipart/form-data",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },
          
          uploadConsumableType(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/consumables-type/import", reqbody, {
                headers: {
                  "accept": "application/json",
                  "Content-Type": "multipart/form-data",
                  "Authorization": "Bearer "+token
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },
          
          uploadToolsType(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/tool-type/import", reqbody, {
                headers: {
                  "accept": "application/json",
                  "Content-Type": "multipart/form-data",
                  "Authorization": "Bearer "+token
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {;
                return err.response;
              });
          },

          uploadConsumables(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/consumables/import", reqbody, {
                headers: {
                  "accept": "application/json",
                  "Content-Type": "multipart/form-data",
                  "Authorization": "Bearer "+token
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },

          uploadFitting(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/fitting/import", reqbody, {
                headers: {
                  "accept": "application/json",
                  "Content-Type": "multipart/form-data",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },
          addFittingType(reqbody) {
            var token=localStorage.getItem("token")
            console.log("IN service register",reqbody,token)
            return axios
              .post(this.url +"api/fitting-type/save-fitting-type", reqbody, {
                headers: {
                    "accept": "*/*",
                  "Content-Type": "application/json",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },
           // single fitting Add
          
           postSingleFitting(reqbody) {
            var token=localStorage.getItem("token")
            console.log("IN service register",reqbody,token)
            return axios
              .post(this.url +"api/fitting/save-fitting", reqbody, {
                headers: {
                    "accept": "*/*",
                  "Content-Type": "application/json",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
              console.log("res",response)
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },

          uploadVendorFile(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/admin/vendor/import", reqbody, {
                headers: {
                  "accept": "application/json",
                  "Content-Type": "multipart/form-data",
                  "Authorization": "Bearer "+token
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },

          uploadVendorMappingsFile(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/admin/vendor-mapping/import", reqbody, {
                headers: {
                  "accept": "application/json",
                  "Content-Type": "multipart/form-data",
                  "Authorization": "Bearer "+token
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },

         
          postVendorMapping(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/admin/vendor/mapping", reqbody, {
                headers: {
                    "accept": "*/*",
                  "Content-Type": "application/json",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },

          saveAllWedling(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/admin/wedling-rods/save-all", reqbody, {
                headers: {
                    "accept": "*/*",
                  "Content-Type": "application/json",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },

          saveFittingItem(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/fitting/save-fitting", reqbody, {
                headers: {
                    "accept": "*/*",
                  "Content-Type": "application/json",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },
                   // save User

                   addUser(reqbody) {
                    var token=localStorage.getItem("token")
                    return axios
                      .post(this.url +"api/admin/users/save-user", reqbody, {
                        headers: {
                            "accept": "*/*",
                          "Content-Type": "application/json",
                          "Authorization": "Bearer "+token
                        }
                      })
                      .then(response => {
                        return response;
                      })
                      .catch(err => {
                        return err.response;
                      });
                  },
                    // add installation price
                  addInstallPrice(reqbody) {
                    var token=localStorage.getItem("token",reqbody)
                    return axios
                      .post(this.url +"api/item-type/save-item-type-installation-price", reqbody, {
                        headers: {
                            "accept": "*/*",
                          "Content-Type": "application/json",
                          "Authorization": "Bearer "+token
                        }
                      })
                      .then(response => {
                        return response;
                      })
                      .catch(err => {
                        return err.response;
                      });
                  },

                  // add item 
                  postOneItem(reqbody) {
                    var token=localStorage.getItem("token")
                    return axios
                      .post(this.url +"api/item-type/save-item", reqbody, {
                        headers: {
                            "accept": "*/*",
                          "Content-Type": "application/json",
                          "Authorization": "Bearer "+token
                        }
                      })
                      .then(response => {
                        return response;
                      })
                      .catch(err => {
                        return err.response;
                      });
                  },
                  // delete One Item
                  deleteOneItem(reqbody) {
                    var token=localStorage.getItem("token")
                    return axios
                      .delete(this.url+"api/item/"+reqbody+"/delete-item", {
                        headers: {
                           "accept": "*/*",
                          "Content-Type": "application/json",
                          "Authorization": "Bearer "+token
                        },
                      //  data:reqbody
                      })
                      .then(response => {
                        return response;
                      })
                      .catch(err => {
                        return err.response;
                      });
                  },


                  
                  
               
                
                  addPipe(reqbody) {
                    var token=localStorage.getItem("token")
                    return axios
                      .post(this.url +"api/admin/pipe-techinfo/save-pipe-techinfo", reqbody, {
                        headers: {
                            "accept": "*/*",
                          "Content-Type": "application/json",
                          "Authorization": "Bearer "+token
                        }
                      })
                      .then(response => {
                        return response;
                      })
                      .catch(err => {
                        return err.response;
                      });
                  },
                  // post image docs
                  postspecifications(itemcode,reqbody,filetype) {
                    var token=localStorage.getItem("token")
                    return axios
                      .post(this.url +"api/item/"+itemcode+"/save-item-attachment?file-type="+filetype, reqbody, {
                        headers: {
                          "accept": "application/json",
                          "Content-Type": "multipart/form-data",
                          "Authorization": "Bearer "+token
                        }
                      })
                      .then(response => {
                        return response;
                      })
                      .catch(err => {
                        return err.response;
                      });
                  },
                  addConsumableFittingItem(reqbody) {
                    var token=localStorage.getItem("token")
                    return axios
                      .post(this.url +"api/item-type/save-item-type-consumable-mapping", reqbody, {
                        headers: {
                            "accept": "*/*",
                          "Content-Type": "application/json",
                          "Authorization": "Bearer "+token
                        }
                      })
                      .then(response => {
                        return response;
                      })
                      .catch(err => {
                        return err.response;
                      });
                  },
                  
                  addFittngItem(reqbody) {
                    var token=localStorage.getItem("token")
                    return axios
                      .post(this.url +"api/item-type/save-item-type-fitting-mapping", reqbody, {
                        headers: {
                            "accept": "*/*",
                          "Content-Type": "application/json",
                          "Authorization": "Bearer "+token
                        }
                      })
                      .then(response => {
                        return response;
                      })
                      .catch(err => {
                        return err.response;
                      });
                  },
              
                  addToolMapping(reqbody) {
                    var token=localStorage.getItem("token")
                    return axios
                      .post(this.url +"api/tool-type/save-item-type-accessories-mapping", reqbody, {
                        headers: {
                            "accept": "*/*",
                          "Content-Type": "application/json",
                          "Authorization": "Bearer "+token
                        }
                      })
                      .then(response => {
                        return response;
                      })
                      .catch(err => {
                        return err.response;
                      });
                  },

                 // add tool mappings
                 Uploadaccessorirestypemap(reqbody) {
                  var token=localStorage.getItem("token")
                  return axios
                    .post(this.url +"api/tool-type/accessories-type-map/import", reqbody, {
                      headers: {
                        "accept": "application/json",
                        "Content-Type": "multipart/form-data",
                        "Authorization": "Bearer "+token
                      }
                    })
                    .then(response => {
                      return response;
                    })
                    .catch(err => {
                      return err.response;
                    });
                },

                  postBoq(reqbody){
                    var token=localStorage.getItem("token")
                    return axios
                      .post(this.url +"api/boq/save-boq", reqbody, {
                        headers: {
                            "accept": "*/*",
                          "Content-Type": "application/json",
                          "Authorization": "Bearer "+token
                         
                        }
                      })
                      .then(response => {
                        return response;
                      })
                      .catch(err => {
                        return err.response;
                      });
        
                  },
                  uploadConsumableFittingTypeMap(reqbody){
                    var token=localStorage.getItem("token")
                    return axios
                      .post(this.url +"api/item-type/consumable-type-map/import", reqbody, {
                        headers: {
                          "accept": "application/json",
                          "Content-Type": "multipart/form-data",
                          "Authorization": "Bearer "+token
                        }
                      })
                      .then(response => {
                        return response;
                      })
                      .catch(err => {
                        return err.response;
                      });
                  },
                  uploadFittingTypeMap(reqbody) {
                    var token=localStorage.getItem("token")
                    return axios
                      .post(this.url +"api/item-type/fitting-type-map/import", reqbody, {
                        headers: {
                          "accept": "application/json",
                          "Content-Type": "multipart/form-data",
                          "Authorization": "Bearer "+token
                        }
                      })
                      .then(response => {
                        return response;
                      })
                      .catch(err => {
                        return err.response;
                      });
                  },
                  getAllfittingtypemap() {
                    var token=localStorage.getItem("token")
                    return axios
                      .get(this.url +"api/item-type/fitting-type-map/all", {
                        headers: {
                          "Content-Type": "application/json",
                          "accept": "*/*",
                          "Authorization": "Bearer "+token
                        }
                      })
                      .then(response => {
                        return response.data;
                      });
                  },
                  getConsumablefittingtypemap() {
                    var token=localStorage.getItem("token")
                    return axios
                      .get(this.url +"api/item-type/consumable-type-map/all", {
                        headers: {
                          "Content-Type": "application/json",
                          "accept": "*/*",
                          "Authorization": "Bearer "+token
                        }
                      })
                      .then(response => {
                        return response.data;
                      });
                  },

          // post Config Api calls

          postClassType(reqbody){
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/config/save-class-types",reqbody, {
                headers: {
                     "accept": "*/*",
                  "Content-Type": "application/text",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });

          },
             // delete Class Type

             deleteClassTypeItem(reqbody) {
              var token=localStorage.getItem("token")
              return axios
                .delete(this.url+"api/config/delete-class-types", {
                  headers: {
                    "Authorization": "Bearer "+token
                  },
                  data:reqbody
                  
                })
                .then(response => {
                  return response;
                })
                .catch(err => {
                  return err.response;
                });
            },

            //delete UnitType Item deleteUnitTypeItem
            deleteUnitTypeItem(reqbody) {
              var token=localStorage.getItem("token")
              return axios
                .delete(this.url+"api/config/delete-unit-type", {
                  headers: {
                     // "accept": "*/*",
                    // "Content-Type": "application/json",
                    "Authorization": "Bearer "+token
                  },
                  data:reqbody
                })
                .then(response => {
                  return response;
                })
                .catch(err => {
                  return err.response;
                });
            },

            deleteaccessorires(reqbody) {
              var token=localStorage.getItem("token")
              return axios
                .delete(this.url+"api/accessorires/"+reqbody+"/delete-accessorires", {
                  headers: {
                      "accept": "*/*",
                     "Content-Type": "application/json",
                    "Authorization": "Bearer "+token
                  },
                })
                .then(response => {
                  return response;
                })
                .catch(err => {
                  return err.response;
                });
            },
            deleteAccessoriesType(reqbody) {
              var token=localStorage.getItem("token")
              return axios
                .delete(this.url+"api/addon/accessorires-type/"+reqbody+"/delete-accessorires-type", {
                  headers: {
                      "accept": "*/*",
                     "Content-Type": "application/json",
                    "Authorization": "Bearer "+token
                  },
                })
                .then(response => {
                  return response;
                })
                .catch(err => {
                  return err.response;
                });
            },
              // delete item 
             // delete welding Type  deleteItemType

             deleteItemType(reqbody) {
              var token=localStorage.getItem("token")
              return axios
                .delete(this.url+"api/item-type/"+reqbody+"/delete-item-type", {
                  headers: {
                      "accept": "*/*",
                     "Content-Type": "application/json",
                    "Authorization": "Bearer "+token
                  },   
                })
                .then(response => {
                  return response;
                })
                .catch(err => {
                  return err.response;
                });
            },
                 // delete Item type installations

                 deleteItemTypeInstallations(reqbody) {
                  var token=localStorage.getItem("token")
                  return axios
                    .delete(this.url+"api/item-type/"+reqbody+"/delete-insta-proce", {
                      headers: {
                          "accept": "*/*",
                         "Content-Type": "application/json",
                        "Authorization": "Bearer "+token
                      },   
                    })
                    .then(response => {
                      return response;
                    })
                    .catch(err => {
                      return err.response;
                    });
                },
               // delete fitting Type
               deleteFittingType(reqbody) {
                var token=localStorage.getItem("token")
                return axios
                  .delete(this.url+"api/fitting-type/"+reqbody+"/delete-fitting-type", {
                    headers: {
                        "accept": "*/*",
                       "Content-Type": "application/json",
                      "Authorization": "Bearer "+token
                    },   
                  })
                  .then(response => {
                    return response;
                  })
                  .catch(err => {
                    return err.response;
                  });
              },

              //delete fitting

              deleteSingleFitting(reqbody) {
                var token=localStorage.getItem("token")
                return axios
                  .delete(this.url+"api/fitting/"+reqbody+"/delete-fitting", {
                    headers: {
                        "accept": "*/*",
                       "Content-Type": "application/json",
                      "Authorization": "Bearer "+token
                    },   
                  })
                  .then(response => {
                    return response;
                  })
                  .catch(err => {
                    return err.response;
                  });
              },
             deleteWeldingTypeItem(reqbody) {
              var token=localStorage.getItem("token")
              return axios
                .delete(this.url+"api/config/delete-welding-type", {
                  headers: {
                   
                    "Authorization": "Bearer "+token
                  },
                  data:reqbody
                })
                .then(response => {
                  return response;
                })
                .catch(err => {
                  return err.response;
                });
            },


          postMaterialType(reqbody){
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/config/save-material-type", reqbody, {
                headers: {
                    "accept": "*/*",
                  "Content-Type": "application/text",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {;
                return err.response;
              });

          },
             // delete material Type
             deleteMaterialType(reqbody){
              var token=localStorage.getItem("token")
              return axios
                .delete(this.url +"api/config/delete-material-type",{
                  headers: {
                  //    "accept": "*/*",
                  //  "Content-Type": "application/text",
                    "Authorization": "Bearer "+token
                   
                  },
                  data:reqbody
                })
                .then(response => {
                  return response;
                })
                .catch(err => {
                  return err.response;
                });
  
            },

          postItemMake(reqbody){
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/admin/itemmake/save-item-make", reqbody, {
                headers: {
                    "accept": "*/*",
                  "Content-Type": "application/json",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });

          },


          postUnitType(reqbody){
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/config/save-unit-type", reqbody, {
                headers: {
                    "accept": "*/*",
                  "Content-Type": "application/text",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });

          },


          postWeldingType(reqbody){
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/config/save-welding-type", reqbody, {
                headers: {
                    "accept": "*/*",
                  "Content-Type": "application/text",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {;
                return err.response;
              });

          },

          addItemPrice(reqbody){
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/item/save-item-price", reqbody, {
                headers: {
                    "accept": "*/*",
                  "Content-Type": "application/json",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });

          },


          // post standards
          postStandards(reqbody){
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/config/save-standard",reqbody, {
                headers: {
                     "accept": "*/*",
                  "Content-Type": "application/text",
                  "Authorization": "Bearer "+token
                 
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });

          },

          //delete standard
          deleteStandardItem(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .delete(this.url+"api/config/delete-standards", {
                headers: {
                  "Authorization": "Bearer "+token
                },
                data:reqbody
                
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },





           // All get calls

           uploadaccessoriresType(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .post(this.url +"api/accessorires-type/import", reqbody, {
                headers: {
                  "accept": "application/json",
                  "Content-Type": "multipart/form-data",
                  "Authorization": "Bearer "+token
                }
              })
              .then(response => {
                return response;
              })
              .catch(err => {;
                return err.response;
              });
          },
          //  deleteAccessoriesType(reqbody) {
          //   var token=localStorage.getItem("token")
          //   return axios
          //     .delete(this.url+"api/addon/accessorires-type"+reqbody+"/delete-accessorires-type", {
          //       headers: {
          //           "accept": "*/*",
          //          "Content-Type": "application/json",
          //         "Authorization": "Bearer "+token
          //       },
          //     })
          //     .then(response => {
          //       return response;
          //     })
          //     .catch(err => {
          //       return err.response;
          //     });
          // },

           deleteaccessorirestype(reqbody) {
            var token=localStorage.getItem("token")
            return axios
              .delete(this.url+"api/addon/accessorires-type/"+reqbody+"/delete-consumable-type", {
                headers: {
                    "accept": "*/*",
                   "Content-Type": "application/json",
                  "Authorization": "Bearer "+token
                },  
              })
              .then(response => {
                return response;
              })
              .catch(err => {
                return err.response;
              });
          },

           getAllAccessories() {
            var token=localStorage.getItem("token")
            return axios
              .get(this.url +"api/accessorires-type/all", {
                headers: {
                  "Content-Type": "application/json",
                  "accept": "*/*",
                  "Authorization": "Bearer "+token
                }
              })
              .then(response => {
                return response.data;
              });
          },
    getUser() {
        var token=localStorage.getItem("token")
       
        return axios
          .get(this.url +"api/test/user", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },
      getAllClients(){
        var token=localStorage.getItem("token")
        
        return axios
          .get(this.url +"api/admin/client/get-all-clients", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },
      getAllVendors() {
        var token=localStorage.getItem("token")
        
        return axios
          .get(this.url +"api/admin/vendor/get-all-vendors", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },

      getAllCategories() {
        var token=localStorage.getItem("token")
         
        return axios
          .get(this.url +"api/item-type/get-all-sub-categories", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },

      getAllWedlingRods() {
        var token=localStorage.getItem("token")
        
        return axios
          .get(this.url +"api/admin/wedling-rods/get-all-configuration", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },
          //all fitting categories
      getAllFittingCategory() {
        var token=localStorage.getItem("token") 
        return axios
          .get(this.url +"api/fitting-type/get-all-sub-categories", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },

         // all fitting List

         getAllFittingList() {
          var token=localStorage.getItem("token")
          
          return axios
            .get(this.url +"api/fitting/all", {
              headers: {
                "Content-Type": "application/json",
                "accept": "*/*",
                "Authorization": "Bearer "+token
              }
            })
            .then(response => {
              return response.data;
            });
        },

      getAllItems() {
        var token=localStorage.getItem("token")
      
        return axios
          .get(this.url +"api/item-type/all", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },

      getAllItemsList() {
        var token=localStorage.getItem("token")
      
        return axios
          .get(this.url +"api/item/all", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },
         // All Accssories List
         getAllAccessoriesList() {
        var token=localStorage.getItem("token")
      
        return axios
          .get(this.url +"api/accessorires/all", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },


      getAllConsumablesList() {
        var token=localStorage.getItem("token")
      
        return axios
          .get(this.url +"api/consumables/all", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },
      //All Consumbles List
      getAllConsumable() {
        var token=localStorage.getItem("token")
      
        return axios
          .get(this.url +"api/consumables-type/all", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },
      //getTooltypemappinglist
      getAlltoolmapping(){
        var token=localStorage.getItem("token")
          
            return axios
              .get(this.url +"api/tool-type/accessories-type-map/all", {
                headers: {
                  "Content-Type": "application/json",
                  "accept": "*/*",
                  "Authorization": "Bearer "+token
                }
              })
              .then(response => {
                return response.data;
              });
      },
          // All Tool Types List
          getAllToolsList() {
            var token=localStorage.getItem("token")
          
            return axios
              .get(this.url +"api/tool-type/all", {
                headers: {
                  "Content-Type": "application/json",
                  "accept": "*/*",
                  "Authorization": "Bearer "+token
                }
              })
              .then(response => {
                return response.data;
              });
          },

      getAllInstallationsList() {
        var token=localStorage.getItem("token")
      
        return axios
          .get(this.url +"api/item-type/insta-prices/all", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },

      getAllFittings() {
        var token=localStorage.getItem("token")
        
        return axios
          .get(this.url +"api/fitting/all", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },

      getFittingTypeWithCode(code){
        var token=localStorage.getItem("token")
        return axios
          .get(this.url +"api/fitting-type/"+code, {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },
      getVendorById(code){
        var token=localStorage.getItem("token")
        return axios
          .get(this.url +"api/admin/vendor/"+code, {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },

      getAllFittingsTypes() {
        var token=localStorage.getItem("token")
        
        return axios
          .get(this.url +"api/fitting-type/all", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },
      //getItemBySearch
      getItemBySearch(reqbody) {
        var token=localStorage.getItem("token")
        return axios
          .get(this.url +"api/item-type/"+reqbody, {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },

            // get consumble by code

            getConsumableById(reqbody) {
              var token=localStorage.getItem("token")
              return axios
                .get(this.url +"api/consumables-type/"+reqbody, {
                  headers: {
                    "Content-Type": "application/json",
                    "accept": "*/*",
                    "Authorization": "Bearer "+token
                  }
                })
                .then(response => {
                  return response.data;
                });
            },

            getToolTypeById(reqbody) {
              var token=localStorage.getItem("token")
              return axios
                .get(this.url +"api/item-type/"+reqbody, {
                  headers: {
                    "Content-Type": "application/json",
                    "accept": "*/*",
                    "Authorization": "Bearer "+token
                  }
                })
                .then(response => {
                  return response.data;
                });
            },

            getaccessoriresId(reqbody) { 
              var token=localStorage.getItem("token")
              return axios
                .get(this.url +"api/accessorires-type/"+reqbody, {
                  headers: {
                    "Content-Type": "application/json",
                    "accept": "*/*",
                    "Authorization": "Bearer "+token
                  }
                })
                .then(response => {
                  return response.data;
                });
            },

            getAllBoqsList() {
              var token=localStorage.getItem("token")
              
              return axios
                .get(this.url +"api/boq/all", {
                  headers: {
                    "Content-Type": "application/json",
                    "accept": "*/*",
                    "Authorization": "Bearer "+token
                  }
                })
                .then(response => {
                  return response.data;
                });
            },
            deleteConsumableFittingType(reqbody) {
              var token=localStorage.getItem("token")
              return axios
                .delete(this.url+"api/consumables/"+reqbody+"/delete-consumable",{
                  headers: {
                      "accept": "*/*",
                     "Content-Type": "application/json",
                    "Authorization": "Bearer "+token
                  },
                })
                .then(response => {
                  return response;
                })
                .catch(err => {
                  return err.response;
                });
            },

            deleteTool(reqbody) {
              var token=localStorage.getItem("token")
              return axios
                .delete(this.url+"api/item/"+reqbody+"/delete-item",{
                  headers: {
                      "accept": "*/*",
                     "Content-Type": "application/json",
                    "Authorization": "Bearer "+token
                  },
                })
                .then(response => {
                  return response;
                })
                .catch(err => {
                  return err.response;
                });
            },
            deleteAccessoriesFittingType(reqbody) {
              var token=localStorage.getItem("token")
              return axios
                .delete(this.url+"api/accessorires/"+reqbody+"/delete-accessorires",{
                  headers: {
                      "accept": "*/*",
                     "Content-Type": "application/json",
                    "Authorization": "Bearer "+token
                  },
                })
                .then(response => {
                  return response;
                })
                .catch(err => {
                  return err.response;
                });
            },
            postConsumableFitting(reqbody) {
              var token=localStorage.getItem("token")
              return axios
                .post(this.url +"api/consumables/save-consumable", reqbody, {
                  headers: {
                      "accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+token
                  }
                })
                .then(response => {
                  return response;
                })
                .catch(err => {
                  return err.response;
                });
            },

            postTools(reqbody) {
              var token=localStorage.getItem("token")
              return axios
                .post(this.url +"api/tool-type/save-tool", reqbody, {
                  headers: {
                      "accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+token
                  }
                })
                .then(response => {
                  return response;
                })
                .catch(err => {
                  return err.response;
                });
            },
            uploadTools(reqbody) {
              var token=localStorage.getItem("token")
              return axios
                .post(this.url +"api/tool/import", reqbody, {
                  headers: {
                    "accept": "application/json",
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer "+token
                  }
                })
                .then(response => {
                  return response;
                })
                .catch(err => {
                  return err.response;
                });
            },
            getAllTools() {
              var token=localStorage.getItem("token")
              return axios
                .get(this.url +"api/tool/all", {
                  headers: {
                    "Content-Type": "application/json",
                    "accept": "*/*",
                    "Authorization": "Bearer "+token
                  }
                })
                .then(response => {
                  return response.data;
                });
            },

            addAccessoriresType(reqbody) {
              var token=localStorage.getItem("token")
              return axios
                .post(this.url +"api/accessorires-type/save-accessorires-type", reqbody, {
                  headers: {
                      "accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+token
                  }
                })
                .then(response => {
                  return response;
                })
                .catch(err => {
                  return err.response;
                });
            },

            postAccessorires(reqbody) {
              var token=localStorage.getItem("token")
              return axios
                .post(this.url +"api/accessorires/save-accessorires", reqbody, {
                  headers: {
                      "accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+token
                  }
                })
                .then(response => {
                  return response;
                })
                .catch(err => {
                  return err.response;
                });
            },
         //get all users
         getUsername(reqbody) {
          var token=localStorage.getItem("token")
          return axios
            .get(this.url +"api/admin/users/"+ reqbody, {
              headers: {
                  "accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
              }
            })
            .then(response => {
              return response;
            })
            .catch(err => {
              return err.response;
            });
        },

            //get all users

            getAllUser() {
              var token=localStorage.getItem("token")
              
              return axios
                .get(this.url +"api/admin/users/get-all-users", {
                  headers: {
                    "Content-Type": "application/json",
                    "accept": "*/*",
                    "Authorization": "Bearer "+token
                  }
                })
                .then(response => {
                  return response.data;
                });
            },
              // get all pipes
              getPipe() {
                var token=localStorage.getItem("token")
               
                return axios
                  .get(this.url +"api/admin/pipe-techinfo/get-all-configuration", {
                    headers: {
                      "Content-Type": "application/json",
                      "accept": "*/*",
                      "Authorization": "Bearer "+token
                    }
                  })
                  .then(response => {
                    return response.data;
                  });
              },

              getItemImage(itemcode) {
                var token=localStorage.getItem("token")
                return axios
                  .get(this.url +"api/item/"+itemcode+"/get-item-attachment?file-type=image", {
                    headers: {
                    "Content-Type": "application/json",
                     //'Content-type': 'image/jpeg',
                     //'Content-Type': 'multipart/form-data',
                   //  responseType: 'blob',
                      //"accept": "*/*",
                      "Authorization": "Bearer "+token
                    },responseType:'blob'
                  })
                  .then(response => {                      
                    return response;
                  });
              },
              //get TDS
              getItemDoc(itemcode) {
                var token=localStorage.getItem("token")
                return axios
                  .get(this.url +"api/item/"+itemcode+"/get-item-attachment?file-type=TDS", {
                    headers: {
                  //  "Content-Type": "application/json",
                     //'Content-type': 'image/jpeg',
                     //'Content-Type': 'multipart/form-data',
                   //  responseType: 'blob',
                      //"accept": "*/*",
                      "Authorization": "Bearer "+token
                    }
                  })
                  .then(response => {
                    
                    return response;
                  });
              },
              //get DWG
              getItemDWG(itemcode) {
                var token=localStorage.getItem("token")
                return axios
                  .get(this.url +"api/item/"+itemcode+"/get-item-attachment?file-type=DWG", {
                    headers: {
                  //  "Content-Type": "application/json",
                     //'Content-type': 'image/jpeg',
                     //'Content-Type': 'multipart/form-data',
                   //  responseType: 'blob',
                      //"accept": "*/*",
                      "Authorization": "Bearer "+token
                    }
                  })
                  .then(response => {
                    return response;
                  });
              },
                 // get getItemBrocher
                 getItemBrocher(itemcode) {
                  var token=localStorage.getItem("token")
                  return axios
                    .get(this.url +"api/item/"+itemcode+"/get-item-attachment?file-type=Brocher", {
                      headers: {
                    //  "Content-Type": "application/json",
                       //'Content-type': 'image/jpeg',
                       //'Content-Type': 'multipart/form-data',
                     //  responseType: 'blob',
                        //"accept": "*/*",
                        "Authorization": "Bearer "+token
                      }
                    })
                    .then(response => {
                      return response;
                    });
                },

                getItemCerification(itemcode) {
                  var token=localStorage.getItem("token")
                  return axios
                    .get(this.url +"api/item/"+itemcode+"/get-item-attachment?file-type=cer", {
                      headers: {
                      "Content-Type": "application/json",
                       //'Content-type': 'image/jpeg',
                       //'Content-Type': 'multipart/form-data',
                     //  responseType: 'blob',
                        //"accept": "*/*",
                        "Authorization": "Bearer "+token
                      },responseType:'blob'
                    })
                    .then(response => {                           
                      return response;
                    });
                },
                  //get Zip file
                  getItemZip(itemcode) {
                    var token=localStorage.getItem("token")
                    return axios
                      .get(this.url +"api/item/"+itemcode+"/get-attachments", {
                        headers: {
                        "Content-Type": "application/json",
                         //'Content-type': 'image/jpeg',
                         //'Content-Type': 'multipart/form-data',
                       //  responseType: 'blob',
                          //"accept": "*/*",
                          "Authorization": "Bearer "+token
                        },responseType:'blob'
                      })
                      .then(response => {                      
                        return response;
                      });
                  },

                //delete Item Attachement deleteItemAttachement
                deleteItemAttachement(itemcode,type) {
                  var token=localStorage.getItem("token")
                  return axios
                    .delete(this.url +"api/item/"+itemcode+"/delete-item-attachment?file-type="+type, {
                      headers: {
                    //  "Content-Type": "application/json",
                       //'Content-type': 'image/jpeg',
                       //'Content-Type': 'multipart/form-data',
                     //  responseType: 'blob',
                        //"accept": "*/*",
                        "Authorization": "Bearer "+token
                      }
                    })
                    .then(response => {
                      return response;
                    });
                },
      //get all config calls
          
      getAllItemMakes() {
        var token=localStorage.getItem("token")
        return axios
          .get(this.url +"api/item/all-makes", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },

      getAllClassType() {
        var token=localStorage.getItem("token")
        return axios
          .get(this.url +"api/config/get-class-types", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },

    
      getAllMaterialType() {
        var token=localStorage.getItem("token")
        return axios
          .get(this.url +"api/config/get-material-types", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },

      getAllUnitType() {
        var token=localStorage.getItem("token")
        return axios
          .get(this.url +"api/config/get-unit-types", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },

      getAllWeldingType() { 
        var token=localStorage.getItem("token")
        return axios
          .get(this.url +"api/config/get-welding-types", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },

      getAllRoles() {
        var token=localStorage.getItem("token")
        return axios
          .get(this.url +"api/config/get-roles", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      }, 

      getAllFormula() {
        var token=localStorage.getItem("token")
        return axios
          .get(this.url +"api/config/get-formulas", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },
      getAllInputType() {
        var token=localStorage.getItem("token")
        return axios
          .get(this.url +"api/config/get-input-types", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },
        
        //all Standards
        getAllStandards() {
          var token=localStorage.getItem("token")
          return axios
            .get(this.url +"api/config/get-standards", {
              headers: {
                "Content-Type": "application/json",
                "accept": "*/*",
                "Authorization": "Bearer "+token
              }
            })
            .then(response => {
              return response.data;
            });
        },

   

      getFittingTypeByCategory(category) {
        var token=localStorage.getItem("token")
        return axios
          .get(this.url +"api/fitting-types-by-sub-cat/"+category, {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },

      //getfittingCodeByFittingType

      getfittingCodeByFittingType(fiitingCode) {
        var token=localStorage.getItem("token")
        return axios
          .get(this.url +"api/fitting-by-ftype/"+fiitingCode, {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },
          // get BOQ BY ID
          getBoqById(id){
            var token=localStorage.getItem("token")
        return axios
          .get(this.url +"api/boq/"+id, {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
          },
          // generate Cboq Fittings
          generateCboqFittings(id){
            var token=localStorage.getItem("token")
            return axios
            .get(this.url +"api/boq/"+id+"/generate-cboq-fittings", {
              headers: {
                "Content-Type": "application/json",
                "accept": "*/*",
                "Authorization": "Bearer "+token
              }
            })
            .then(response => {
              return response.data;
            });
          },

          //get Cboq by ID 
          
          getCboqbyId(id){
            var token=localStorage.getItem("token")
            return axios
            .get(this.url +"api/boq/"+id+"/generate-cboq", {
              headers: {
                "Content-Type": "application/json",
                "accept": "*/*",
                "Authorization": "Bearer "+token
              }
            })
            .then(response => {
              return response.data;
            }).catch(err => {
              return err.response;
            });
          },

         // postBoqSection
  
         postBoqSection(reqbody){
          var token=localStorage.getItem("token")
      return axios
        .post(this.url +"api/boq/save-boq-section",reqbody, {
          headers: {
            "Content-Type": "application/json",
            "accept": "*/*",
            "Authorization": "Bearer "+token
          }
        })
        .then(response => {
          return response.data;
        }) .catch(err => {
         
          return err.response;
        });
        
        },

        postBoqSectionItem(reqbody){
          var token=localStorage.getItem("token")
      return axios
        .post(this.url +"api/boq/save-boq",reqbody, {
          headers: {
            "Content-Type": "application/json",
            "accept": "*/*",
            "Authorization": "Bearer "+token
          }
        })
        .then(response => {
          return response.data;
        }) .catch(err => {
          return err.response;
        });
        
        },


        getItemTypeByBoq(reqbody) {
          var token=localStorage.getItem("token")
          return axios
            .get(this.url +"api/item-type/"+reqbody+"/boq", {
              headers: {
                "Content-Type": "application/json",
                "accept": "*/*",
                "Authorization": "Bearer "+token
              }
            })
            .then(response => {
              return response.data;
            });
        },
        saveSectionItem(reqbody) {
          var token=localStorage.getItem("token")
          return axios
            .post(this.url +"api/boq/save-iboq-item", reqbody, {
              headers: {
                  "accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
              }
            })
            .then(response => {
              return response;
            })
            .catch(err => {
              return err.response;
            });
        },
        deleteboqsection(reqbody){
          var token=localStorage.getItem("token")
          return axios
          .delete(this.url+"api/boq/"+reqbody+"/delete-boq-section",{
            headers: {
              "accept": "*/*",
             "Content-Type": "application/json",
            "Authorization": "Bearer "+token
          }, 
          })
          .then(response => {
            return response;
          })
          .catch(err => {
            return err.response;
          });
        },
        deleteBoqSecDescription(reqbody){
          var token=localStorage.getItem("token")
          return axios.delete(this.url+"api/boq/"+reqbody+"/delete-boq-sec-item-descr",{
            headers: {
              "accept": "*/*",
             "Content-Type": "application/json",
            "Authorization": "Bearer "+token
          }, 
          })
          .then(response => {
            return response;
          })
          .catch(err => {
            return err.response;
          });
        },
        deleteboqsectionItem(reqbody){
          var token=localStorage.getItem("token")
          return axios.delete(this.url+"api/boq/"+reqbody+"/delete-iboq-item",{
            headers: {
              "accept": "*/*",
             "Content-Type": "application/json",
            "Authorization": "Bearer "+token
          }, 
          })
          .then(response => {
            return response;
          })
          .catch(err => {
            return err.response;
          });
        },
        deleteBoqid(reqbody){
          var token=localStorage.getItem("token")
          return axios.delete(this.url+"api/boq/"+reqbody+"/delete-boq",{
            headers: {
              "accept": "*/*",
             "Content-Type": "application/json",
            "Authorization": "Bearer "+token
          },
          })
          .then(response => {
            return response;
          })
          .catch(err => {
            return err.response;
          });
        },
        //save fitting makes
        
        //save Item fittings make 
        updateItemfittingmake(reqbody){
          var token=localStorage.getItem("token")
          return axios
            .post(this.url +"api/boq/update-cboq-items", reqbody, {
              headers: {
                  "accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
              }
            })
            .then(response => {
              return response;
            })
            .catch(err => {
              return err.response;
            });
        },
        getItemfittingsmake(reqbody){
          var token=localStorage.getItem("token")
          return axios.get(this.url+"api/item/"+reqbody+"/get-makes",{
            headers: {
              "accept": "*/*",
             "Content-Type": "application/json",
            "Authorization": "Bearer "+token
          },
          })
          .then(response => {
            return response;
          })
          .catch(err => {
            return err.response;
          });
        },

        getupdatefittingsmake(reqbody){
          var token=localStorage.getItem("token")
          return axios.get(this.url+"api/fitting/"+reqbody+"/get-makes",{
            headers: {
              "accept": "*/*",
             "Content-Type": "application/json",
            "Authorization": "Bearer "+token
          },
          })
          .then(response => {
            return response;
          })
          .catch(err => {
            return err.response;
          });
        },
        updatefittingtype(reqbody){
          var token = localStorage.getItem("token")
          return axios.post(this.url +"api/boq/update-cboq-fittings", reqbody, {
            headers: {
              "accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token
          }
          })
          .then(response => {
              return response;
            })
            .catch(err => {
              return err.response;
            });
        },
        saveFittingtype(reqbody){
          var token = localStorage.getItem("token")
          return axios.post(this.url +"api/boq/save-cboq-item-fitting", reqbody, {
            headers: {
              "accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token
          }
          })
          .then(response => {
              return response;
            })
            .catch(err => {
              return err.response;
            });
        },
        getvendormappings(){
          var token = localStorage.getItem("token")
          return axios
            .get(this.url +"api/admin/vendor-mapping/all", {
              headers: {
                "Content-Type": "application/json",
                "accept": "*/*",
                "Authorization": "Bearer "+token
              }
            })
            .then(response => {
              return response.data;
            });
        },
        
        saveItemMake(reqbody){
          var token = localStorage.getItem("token")
          return axios.post(this.url +"api/item/save-make", reqbody, {
            headers: {
              "accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token
          }
          })
          .then(response => {
              return response;
            })
            .catch(err => {
              return err.response;
            });
        },
        // http://103.60.213.11:9011/api/item/all-makes
        getItemMakes(){
          var token = localStorage.getItem("token")
          return axios
            .get(this.url +"api/item/all-makes", {
              headers: {
                "Content-Type": "application/json",
                "accept": "*/*",
                "Authorization": "Bearer "+token
              }
            })
            .then(response => {
              return response.data;
            });
        },
        // api/item/delete-make
        deleteAllItemMake(reqbody) {
          var token=localStorage.getItem("token")
          return axios
            .delete(this.url +"api/item/delete-make", {
              headers: { 
                "Authorization": "Bearer "+token     
              },
              data:reqbody
            })
            .then(response => {
              return response;
            })
            .catch(err => {
              return err.response;
            });
        },
        uploadItemMakes(reqbody) {
          var token=localStorage.getItem("token")
          return axios
          .post(this.url +"api/item/import-makes", reqbody, {
            headers: {
              "accept": "application/json",
              "Content-Type": "multipart/form-data",
              "Authorization": "Bearer "+token
             
            }
          })
          .then(response => {
            return response;
          })
          .catch(err => {
            return err.response;
          });
        },        
        getItemCategory(){
          var token = localStorage.getItem("token")
          return axios
            .get(this.url +"api/item-type/get-all-categories", {
              headers: {
                "Content-Type": "application/json",
                "accept": "*/*",
                "Authorization": "Bearer "+token
              }
            })
            .then(response => {
              return response.data;
            });
        },
        saveItemCategory(reqbody){
          var token = localStorage.getItem("token")
          return axios.post(this.url +"api/item-type/save-category", reqbody, {
            headers: {
              "accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token
          }
          })
          .then(response => {
              return response;
            })
            .catch(err => {
              return err.response;
            });
        },        
        deleteItemCategory(reqbody) {
          var token=localStorage.getItem("token")
          return axios
            .delete(this.url +"api/item-type/delete-category", {
              headers: { 
                "Authorization": "Bearer "+token     
              },
              data:reqbody
            })
            .then(response => {
              return response;
            })
            .catch(err => {
              return err.response;
            });
        },
        
        uploadItemCategories(reqbody) {
          var token=localStorage.getItem("token")
          return axios
          .post(this.url +"api/item-type/import-categories", reqbody, {
            headers: {
              "accept": "application/json",
              "Content-Type": "multipart/form-data",
              "Authorization": "Bearer "+token
             
            }
          })
          .then(response => {
            return response;
          })
          .catch(err => {
            return err.response;
          });
        }, 
        // api/item-type/save-sub-category
        saveItemSubCategory(reqbody){
          var token = localStorage.getItem("token")
          return axios.post(this.url +"api/item-type/save-sub-category", reqbody, {
            headers: {
              "accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token
          }
          })
          .then(response => {
              return response;
            })
            .catch(err => {
              return err.response;
            });
        },
        getItemSubCategory(){
          var token = localStorage.getItem("token")
          return axios
            .get(this.url +"api/item-type/get-all-sub-categories", {
              headers: {
                "Content-Type": "application/json",
                "accept": "*/*",
                "Authorization": "Bearer "+token
              }
            })
            .then(response => {
              return response.data;
            });
        },
        deleteItemSubCategory(reqbody) {
          var token=localStorage.getItem("token")
          return axios
            .delete(this.url +"api/item-type/delete-sub-category", {
              headers: { 
                "Authorization": "Bearer "+token     
              },
              data:reqbody
            })
            .then(response => {
              return response;
            })
            .catch(err => {
              return err.response;
            });
        },
        uploadItemSubCategories(reqbody) {
          var token=localStorage.getItem("token")
          return axios
          .post(this.url +"api/item-type/import-sub-categories", reqbody, {
            headers: {
              "accept": "application/json",
              "Content-Type": "multipart/form-data",
              "Authorization": "Bearer "+token
             
            }
          })
          .then(response => {
            return response;
          })
          .catch(err => {
            return err.response;
          });
        }, 

//////fitting Makes start////////


saveFittingMake(reqbody){
  var token = localStorage.getItem("token")
  return axios.post(this.url +"api/fitting/save-make", reqbody, {
    headers: {
      "accept": "*/*",
    "Content-Type": "application/json",
    "Authorization": "Bearer "+token
  }
  })
  .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
},

getFittingMakes(){
  var token = localStorage.getItem("token")
  return axios
    .get(this.url +"api/fitting/all-makes", {
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "Authorization": "Bearer "+token
      }
    })
    .then(response => {
      return response.data;
    });
},
// delete-make
deleteAllFittingMake(reqbody) {
  var token=localStorage.getItem("token")
  return axios
    .delete(this.url +"api/fitting/delete-make", {
      headers: { 
        "Authorization": "Bearer "+token     
      },
      data:reqbody
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
},
uploadFittingMakes(reqbody) {
  var token=localStorage.getItem("token")
  return axios
  .post(this.url +"api/fitting/import-makes", reqbody, {
    headers: {
      "accept": "application/json",
      "Content-Type": "multipart/form-data",
      "Authorization": "Bearer "+token
     
    }
  })
  .then(response => {
    return response;
  })
  .catch(err => {
    return err.response;
  });
},        
getFittingCategory(){
  var token = localStorage.getItem("token")
  return axios
    .get(this.url +"api/fitting-type/get-all-categories", {
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "Authorization": "Bearer "+token
      }
    })
    .then(response => {
      return response.data;
    });
},
saveFittingCategory(reqbody){
  var token = localStorage.getItem("token")
  return axios.post(this.url +"api/fitting-type/save-category", reqbody, {
    headers: {
      "accept": "*/*",
    "Content-Type": "application/json",
    "Authorization": "Bearer "+token
  }
  })
  .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
},        
deleteFittingCategory(reqbody) {
  var token=localStorage.getItem("token")
  return axios
    .delete(this.url +"api/fitting-type/delete-category", {
      headers: { 
        "Authorization": "Bearer "+token     
      },
      data:reqbody
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
},

uploadFittingCategories(reqbody) {
  var token=localStorage.getItem("token")
  return axios
  .post(this.url +"api/fitting-type/import-categories", reqbody, {
    headers: {
      "accept": "application/json",
      "Content-Type": "multipart/form-data",
      "Authorization": "Bearer "+token
     
    }
  })
  .then(response => {
    return response;
  })
  .catch(err => {
    return err.response;
  });
}, 

saveFittingSubCategory(reqbody){
  var token = localStorage.getItem("token")
  return axios.post(this.url +"api/fitting-type/save-sub-category", reqbody, {
    headers: {
      "accept": "*/*",
    "Content-Type": "application/json",
    "Authorization": "Bearer "+token
  }
  })
  .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
},
getFittingSubCategory(){
  var token = localStorage.getItem("token")
  return axios
    .get(this.url +"api/fitting-type/get-all-sub-categories", {
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "Authorization": "Bearer "+token
      }
    })
    .then(response => {
      return response.data;
    });
},
deleteFittingSubCategory(reqbody) {
  var token=localStorage.getItem("token")
  return axios
    .delete(this.url +"api/fitting-type/delete-sub-category", {
      headers: { 
        "Authorization": "Bearer "+token     
      },
      data:reqbody
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
},
uploadFittingSubCategories(reqbody) {
  var token=localStorage.getItem("token")
  return axios
  .post(this.url +"api/fitting-type/import-sub-categories", reqbody, {
    headers: {
      "accept": "application/json",
      "Content-Type": "multipart/form-data",
      "Authorization": "Bearer "+token
     
    }
  })
  .then(response => {
    return response;
  })
  .catch(err => {
    return err.response;
  });
}, 
/////////////fitting Makes end //////////


//////Tool Make and Category start////////


saveToolMake(reqbody){
  var token = localStorage.getItem("token")
  return axios.post(this.url +"api/tool/save-make", reqbody, {
    headers: {
      "accept": "*/*",
    "Content-Type": "application/json",
    "Authorization": "Bearer "+token
  }
  })
  .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
},
// http://103.60.213.11:9011/api/item/all-makes
getToolMakes(){
  var token = localStorage.getItem("token")
  return axios
    .get(this.url +"api/tool/all-makes", {
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "Authorization": "Bearer "+token
      }
    })
    .then(response => {
      return response.data;
    });
},
// delete-make
deleteAllToolMake(reqbody) {
  var token=localStorage.getItem("token")
  return axios
    .delete(this.url +"api/tool/delete-make", {
      headers: { 
        "Authorization": "Bearer "+token     
      },
      data:reqbody
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
},
uploadToolMakes(reqbody) {
  var token=localStorage.getItem("token")
  return axios
  .post(this.url +"api/tool/import-makes", reqbody, {
    headers: {
      "accept": "application/json",
      "Content-Type": "multipart/form-data",
      "Authorization": "Bearer "+token
     
    }
  })
  .then(response => {
    return response;
  })
  .catch(err => {
    return err.response;
  });
},        
getToolCategory(){
  var token = localStorage.getItem("token")
  return axios
    .get(this.url +"api/tool-type/get-all-categories", {
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "Authorization": "Bearer "+token
      }
    })
    .then(response => {
      return response.data;
    });
},
saveToolCategory(reqbody){
  var token = localStorage.getItem("token")
  return axios.post(this.url +"api/tool-type/save-category", reqbody, {
    headers: {
      "accept": "*/*",
    "Content-Type": "application/json",
    "Authorization": "Bearer "+token
  }
  })
  .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
},        
deleteToolCategory(reqbody) {
  var token=localStorage.getItem("token")
  return axios
    .delete(this.url +"api/tool-type/delete-category", {
      headers: { 
        "Authorization": "Bearer "+token     
      },
      data:reqbody
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
},

uploadToolCategories(reqbody) {
  var token=localStorage.getItem("token")
  return axios
  .post(this.url +"api/tool-type/import-categories", reqbody, {
    headers: {
      "accept": "application/json",
      "Content-Type": "multipart/form-data",
      "Authorization": "Bearer "+token
     
    }
  })
  .then(response => {
    return response;
  })
  .catch(err => {
    return err.response;
  });
}, 

saveToolSubCategory(reqbody){
  var token = localStorage.getItem("token")
  return axios.post(this.url +"api/tool-type/save-sub-category", reqbody, {
    headers: {
      "accept": "*/*",
    "Content-Type": "application/json",
    "Authorization": "Bearer "+token
  }
  })
  .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
},
getToolSubCategory(){
  var token = localStorage.getItem("token")
  return axios
    .get(this.url +"api/tool-type/get-all-sub-categories", {
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "Authorization": "Bearer "+token
      }
    })
    .then(response => {
      return response.data;
    });
},
deleteToolSubCategory(reqbody) {
  var token=localStorage.getItem("token")
  return axios
    .delete(this.url +"api/tool-type/delete-sub-category", {
      headers: { 
        "Authorization": "Bearer "+token     
      },
      data:reqbody
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
},
uploadToolSubCategories(reqbody) {
  var token=localStorage.getItem("token")
  return axios
  .post(this.url +"api/tool-type/import-sub-categories", reqbody, {
    headers: {
      "accept": "application/json",
      "Content-Type": "multipart/form-data",
      "Authorization": "Bearer "+token
     
    }
  })
  .then(response => {
    return response;
  })
  .catch(err => {
    return err.response;
  });
}, 
/////////////Toll Make and Category end //////////

//////Accessories Make and Category start////////


saveAccessoriresMake(reqbody){
  var token = localStorage.getItem("token")
  return axios.post(this.url +"api/accessorires/save-make", reqbody, {
    headers: {
      "accept": "*/*",
    "Content-Type": "application/json",
    "Authorization": "Bearer "+token
  }
  })
  .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
},
// http://103.60.213.11:9011/api/item/all-makes
getAccessoriresMakes(){
  var token = localStorage.getItem("token")
  return axios
    .get(this.url +"api/accessorires/all-makes", {
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "Authorization": "Bearer "+token
      }
    })
    .then(response => {
      return response.data;
    });
},
// delete-make
deleteAllAccessoriresMake(reqbody) {
  var token=localStorage.getItem("token")
  return axios
    .delete(this.url +"api/accessorires/delete-make", {
      headers: { 
        "Authorization": "Bearer "+token     
      },
      data:reqbody
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
},
uploadAccessoriresMakes(reqbody) {
  var token=localStorage.getItem("token")
  return axios
  .post(this.url +"api/accessorires/import-makes", reqbody, {
    headers: {
      "accept": "application/json",
      "Content-Type": "multipart/form-data",
      "Authorization": "Bearer "+token
     
    }
  })
  .then(response => {
    return response;
  })
  .catch(err => {
    return err.response;
  });
},        
getAccessoriresCategory(){
  var token = localStorage.getItem("token")
  return axios
    .get(this.url +"api/accessorires-type/get-all-categories", {
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "Authorization": "Bearer "+token
      }
    })
    .then(response => {
      return response.data;
    });
},
saveAccessoriresCategory(reqbody){
  var token = localStorage.getItem("token")
  return axios.post(this.url +"api/accessorires-type/save-category", reqbody, {
    headers: {
      "accept": "*/*",
    "Content-Type": "application/json",
    "Authorization": "Bearer "+token
  }
  })
  .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
},        
deleteAccessoriresCategory(reqbody) {
  var token=localStorage.getItem("token")
  return axios
    .delete(this.url +"api/accessorires-type/delete-category", {
      headers: { 
        "Authorization": "Bearer "+token     
      },
      data:reqbody
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
},

uploadAccessoriresCategories(reqbody) {
  var token=localStorage.getItem("token")
  return axios
  .post(this.url +"api/accessorires-type/import-categories", reqbody, {
    headers: {
      "accept": "application/json",
      "Content-Type": "multipart/form-data",
      "Authorization": "Bearer "+token
     
    }
  })
  .then(response => {
    return response;
  })
  .catch(err => {
    return err.response;
  });
}, 

saveAccessoriresSubCategory(reqbody){
  var token = localStorage.getItem("token")
  return axios.post(this.url +"api/accessorires-type/save-sub-category", reqbody, {
    headers: {
      "accept": "*/*",
    "Content-Type": "application/json",
    "Authorization": "Bearer "+token
  }
  })
  .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
},
getAccessoriresSubCategory(){
  var token = localStorage.getItem("token")
  return axios
    .get(this.url +"api/accessorires-type/get-all-sub-categories", {
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "Authorization": "Bearer "+token
      }
    })
    .then(response => {
      return response.data;
    });
},
deleteAccessoriresSubCategory(reqbody) {
  var token=localStorage.getItem("token")
  return axios
    .delete(this.url +"api/accessorires-type/delete-sub-category", {
      headers: { 
        "Authorization": "Bearer "+token     
      },
      data:reqbody
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
},
uploadAccessoriresSubCategories(reqbody) {
  var token=localStorage.getItem("token")
  return axios
  .post(this.url +"api/accessorires-type/import-sub-categories", reqbody, {
    headers: {
      "accept": "application/json",
      "Content-Type": "multipart/form-data",
      "Authorization": "Bearer "+token
     
    }
  })
  .then(response => {
    return response;
  })
  .catch(err => {
    return err.response;
  });
}, 
/////////////Accessories Make and Category end //////////

//////Consumable Make and Category start////////


saveConsumableMake(reqbody){
  var token = localStorage.getItem("token")
  return axios.post(this.url +"api/consumables/save-make", reqbody, {
    headers: {
      "accept": "*/*",
    "Content-Type": "application/json",
    "Authorization": "Bearer "+token
  }
  })
  .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
},

getConsumableMakes(){
  var token = localStorage.getItem("token")
  return axios
    .get(this.url +"api/consumables/all-makes", {
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "Authorization": "Bearer "+token
      }
    })
    .then(response => {
      return response.data;
    });
},
// delete-make
deleteAllConsumableMake(reqbody) {
  var token=localStorage.getItem("token")
  return axios
    .delete(this.url +"api/consumables/delete-make", {
      headers: { 
        "Authorization": "Bearer "+token     
      },
      data:reqbody
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
},
uploadConsumableMakes(reqbody) {
  var token=localStorage.getItem("token")
  return axios
  .post(this.url +"api/consumables/import-makes", reqbody, {
    headers: {
      "accept": "application/json",
      "Content-Type": "multipart/form-data",
      "Authorization": "Bearer "+token
     
    }
  })
  .then(response => {
    return response;
  })
  .catch(err => {
    return err.response;
  });
},        
getConsumableCategory(){
  var token = localStorage.getItem("token")
  return axios
    .get(this.url +"api/consumables-type/get-all-categories", {
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "Authorization": "Bearer "+token
      }
    })
    .then(response => {
      return response.data;
    });
},
saveConsumableCategory(reqbody){
  var token = localStorage.getItem("token")
  return axios.post(this.url +"api/consumables-type/save-category", reqbody, {
    headers: {
      "accept": "*/*",
    "Content-Type": "application/json",
    "Authorization": "Bearer "+token
  }
  })
  .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
},        
deleteConsumableCategory(reqbody) {
  var token=localStorage.getItem("token")
  return axios
    .delete(this.url +"api/consumables-type/delete-category", {
      headers: { 
        "Authorization": "Bearer "+token     
      },
      data:reqbody
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
},

uploadConsumableCategories(reqbody) {
  var token=localStorage.getItem("token")
  return axios
  .post(this.url +"api/consumables-type/import-categories", reqbody, {
    headers: {
      "accept": "application/json",
      "Content-Type": "multipart/form-data",
      "Authorization": "Bearer "+token
     
    }
  })
  .then(response => {
    return response;
  })
  .catch(err => {
    return err.response;
  });
}, 
// api/item-type/save-sub-category
saveConsumableSubCategory(reqbody){
  var token = localStorage.getItem("token")
  return axios.post(this.url +"api/consumables-type/save-sub-category", reqbody, {
    headers: {
      "accept": "*/*",
    "Content-Type": "application/json",
    "Authorization": "Bearer "+token
  }
  })
  .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
},
getConsumableSubCategory(){
  var token = localStorage.getItem("token")
  return axios
    .get(this.url +"api/consumables-type/get-all-sub-categories", {
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "Authorization": "Bearer "+token
      }
    })
    .then(response => {
      return response.data;
    });
},
deleteConsumableSubCategory(reqbody) {
  var token=localStorage.getItem("token")
  return axios
    .delete(this.url +"api/consumables-type/delete-sub-category", {
      headers: { 
        "Authorization": "Bearer "+token     
      },
      data:reqbody
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
},
uploadConsumableSubCategories(reqbody) {
  var token=localStorage.getItem("token")
  return axios
  .post(this.url +"api/consumables-type/import-sub-categories", reqbody, {
    headers: {
      "accept": "application/json",
      "Content-Type": "multipart/form-data",
      "Authorization": "Bearer "+token
     
    }
  })
  .then(response => {
    return response;
  })
  .catch(err => {
    return err.response;
  });
}, 
/////////////Consumable Make and Category end //////////
getAllSubTool() {
  var token=localStorage.getItem("token")
   
  return axios
    .get(this.url +"api/tool-type/get-all-sub-categories", {
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "Authorization": "Bearer "+token
      }
    })
    .then(response => {
      return response.data;
    });
},
getAllSubConsumable() {
  var token=localStorage.getItem("token")
   
  return axios
    .get(this.url +"api/consumables-type/get-all-sub-categories", {
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "Authorization": "Bearer "+token
      }
    })
    .then(response => {
      return response.data;
    });
},
getAllSubAccsory() {
  var token=localStorage.getItem("token")
   
  return axios
    .get(this.url +"api/accessorires-type/get-all-sub-categories", {
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "Authorization": "Bearer "+token
      }
    })
    .then(response => {
      return response.data;
    });
},
      saveBoqSectionDesc(reqbody){
        var token=localStorage.getItem("token")
        return axios
        .post(this.url +"api/boq/save-boq-sec-item-desr", reqbody, {
          headers: {
            "accept": "*/*",
          "Content-Type": "application/json",
          "Authorization": "Bearer "+token
        }
        })
        .then(response => {
          return response;
        })
        .catch(err => {
          return err.response;
        });
      },

      getMakesbySubcategory(reqbody,idx){
        var token=localStorage.getItem("token")
        return axios
        .get(this.url +"api/admin/makes-by-sub-cat/"+reqbody+"/"+idx, {
          headers: {
            "accept": "*/*",
          "Content-Type": "application/json",
          "Authorization": "Bearer "+token
        }
        })
        .then(response => {
          return response;
        })
        .catch(err => {
          return err.response;
        });
      },
      getMakeVendormappings(reqbody){
        var token=localStorage.getItem("token")
   
        return axios
          .get(this.url +"api/boq/"+reqbody+"/get-make-vendor-mappings", {        
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },
      saveMakeVendormappings(id,reqbody){
        var token=localStorage.getItem("token")
   
        return axios
          .post(this.url +"api/boq/"+id+"/save-make-vendor-mappings",reqbody, {        
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response;
          })
          .catch(err => {
            return err.response;
          });
          ;
      },
      generateEnquiries(reqbody){
        var token=localStorage.getItem("token")
   
        return axios
          .get(this.url +"api/boq/"+reqbody+"/generate-enquires", {        
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },
      getEnquirybyid(reqbody){ 
      var token=localStorage.getItem("token")
   
      return axios
        .get(this.url +"api/boq/enquiry/"+reqbody, {        
          headers: {
            "Content-Type": "application/json",
            "accept": "*/*",
            "Authorization": "Bearer "+token
          }
        })
        .then(response => {
          return response.data;
        });
      },
      saveEnquirybyId(id,reqbody){
        var token=localStorage.getItem("token")
   
        return axios
          .post(this.url +"api/boq/enquiry/"+id+"/save-vendor-enquiry",reqbody, {        
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response;
          })
          .catch(err => {
            return err.response;
          });
          ;
      },
      getVendorCodes(reqbody){
        var token=localStorage.getItem("token")
   
      return axios
        .get(this.url +"api/admin/vendor-mapping-by-make/"+reqbody, {        
          headers: {
            "Content-Type": "application/json",
            "accept": "*/*",
            "Authorization": "Bearer "+token
          }
        })
        .then(response => {
          return response.data;
        });
      },

      sendresendenquiry(reqbody){
        var token=localStorage.getItem("token")
   
        return axios
          .get(this.url +"api/boq/"+reqbody+"/resend-enquiry", {        
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
      },
      
      upadteDashboardMargin(id,reqbody){
        var token=localStorage.getItem("token")
        return axios
          .post(this.url+"api/boq/"+id+"/update-dashboard",reqbody, {        
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response;
          })
          .catch(err => {
            return err.response;
          });
          ;
      },

      updateItemmakeVendor(id,reqbody){
        var token=localStorage.getItem("token")
   
        return axios
          .post(this.url +"api/boq/"+id+"/update-item-make-vendors",reqbody, {        
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response;
          })
          .catch(err => {
            return err.response;
          });
      },
      updateFittingmakeVendor(id,reqbody){
        var token=localStorage.getItem("token")
   
        return axios
          .post(this.url +"api/boq/"+id+"/update-fitting-make-vendors",reqbody, {        
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response;
          })
          .catch(err => {
            return err.response;
          });
      },
      generateEboq(id,reqbody){
        var token=localStorage.getItem("token")
   
        return axios
          .post(this.url +"api/boq/"+id+"/generate-eboq",reqbody, {        
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response;
          })
          .catch(err => {
            return err.response;
          });
      },
      generateQuote(id,reqbody){
        var token=localStorage.getItem("token")
   
        return axios
          .post(this.url +"api/boq/"+id+"/generate-quote",reqbody, {        
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response;
          })
          .catch(err => {
            return err.response;
          });
      },
      getQuotes(reqbody){
        var token=localStorage.getItem("token")
        return axios
        .get(this.url +"api/boq/"+reqbody+"/quotes", {        
          headers: {
            "Content-Type": "application/json",
            "accept": "*/*",
            "Authorization": "Bearer "+token
          }
        })
        .then(response => {
          return response.data;
        });
      },
      regenerateQuote(id,reqbody){
        var token=localStorage.getItem("token")
   
        return axios
          .post(this.url +"api/boq/"+id+"/re-generate-eboq",reqbody, {        
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
              "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response;
          })
          .catch(err => {
            return err.response;
          });
      },
      getQuoteExcel(reqbody){
        var token=localStorage.getItem("token")
        return axios
        .get(this.url +"api/boq/"+reqbody+"/get-execl-file", {        
          headers: {
            "Content-Type": "application/octet-stream",
            "accept": "*/*",
            "Authorization": "Bearer "+token
          },
          responseType: 'blob'
        })
        .then(response => {
          return response.data;
        });
      },
      getQuotePDF(reqbody){
        var token=localStorage.getItem("token")
        return axios
        .get(this.url +"api/boq/"+reqbody+"/get-pdf-file", {        
          headers: {
            "Content-Type": "application/octet-stream",
            "accept": "*/*",
            "Authorization": "Bearer "+token
          },
          responseType: 'blob'
        })
        .then(response => {
          return response.data;
        });
      },
    },
    
}