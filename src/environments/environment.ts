// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

 
import {DEV_Product_Server,
        DEV_User_Auth_Server } from './environment.const';

const  AccountServerUrl: string = DEV_User_Auth_Server; 
const  ProductServerUrl: string = DEV_Product_Server;

 
export const environment = {
  firebase: {
    apiKey: "AIzaSyDOav8iCZTbfZhpL4CG7kww0Hi4HmYy4yI",
    authDomain: "enima-91660.firebaseapp.com",
    projectId: "enima-91660",
    storageBucket: "enima-91660.appspot.com",
    messagingSenderId: "532431008041",
    appId: "1:532431008041:web:95316403a2a09a97f10738"
  },
  production: false,
  api: {
    BaseUrlAccounts: AccountServerUrl,
    BaseUrlProducts: ProductServerUrl,
  },
 
  TableProduct:"Products",
  TableCategorie:"Categories",
  TableBrand:"Brands",
  StorageImageDirName:"Images/Products"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
