// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverUrl: 'https://localhost:5001/',
  authServerUrl : 'https://login.microsoftonline.com/938bfbb2-e290-417d-914c-36aa7b12d7b8/',
  client_id: '459ea826-103a-400f-9a52-9afa79836dff',
  consent_uri: 'api://c78b4f9b-487a-4ba2-bbc8-15f9710acd50/access_as_user'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
