// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
  apiKey: "AIzaSyDxes0zBq2k6nz1tmQtMnSPe9PimXOH694",
  authDomain: "bibnow-testing.firebaseapp.com",
  databaseURL: "https://bibnow-testing.firebaseio.com",
  projectId: "bibnow-testing",
  storageBucket: "bibnow-testing.appspot.com",
  messagingSenderId: "101574135416",
  appId: "1:101574135416:web:9c8073ed4f34e45ac9e78d",
  measurementId: "G-4PB9C5HP69"}
};

export const adminEnvironment = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url
}

export const actionCodeSettings = {
  url: 'https://localhost:4200/dashboard',
  handleCodeInApp: true
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
