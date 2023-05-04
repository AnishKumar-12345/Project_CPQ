<template>
    <div>
      <v-row style="margin-left:230px;">
        <v-col cols="7" >
          <v-card class="mx-auto" max-width="800" elevation="6" >
            <v-card-title
              style="background-color: #1e5e8a; color: white"
              ><span style="margin-left: 30px; padding: 15px"
                >Vendor Listing</span
              ></v-card-title
            >
            <v-card-text
              class="text--primary"
              style="font-size: 13px; margin: 20px"
            >
              <span style="margin-left: 20px;font-size:20px;text-align:center;"
                >Fill in the Vendor Mail and press send
                .Vendor will receive a notification shortly.</span
              >
              <v-row>
                <v-col cols="10" style="margin: 20px">
                  <v-text-field
                    label="Vendor Email"
                    placeholder="Vendor Email"
                    :rules="emailRules"
                    hint="Mandatory Field"
                    outlined
                    required
                    dense
                  >
                    <template #label>
                      Vendor Email<strong class="red--text">* </strong>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="10" style="margin: 20px; margin-top: -35px">
                  <v-textarea
                    filled
                    label="Enter an Message"
                    rows="5"
                    row-height="30"
                    prepend-inner-icon="mdi-comment"
                    outlined
                    clearable
                    clear-icon="mdi-close-circle"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn depressed color="cyan" style="margin-left: 75%"
                >Send <v-icon>mdi-share</v-icon></v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </template>
      <script>
  export default {
    name: "VendorRegistration",
    data: () => ({}),
  };
  </script>
  <style>
  .inputpic {
    position: absolute;
    margin-left: 8px;
  }
  .avt:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }