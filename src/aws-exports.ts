const awsconfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_USERPOOL_ID, // Your Cognito User Pool ID from CDK
      userPoolClientId: import.meta.env.VITE_USERPOOL_CLIENT_ID, // Your Cognito User Pool Client ID from CDK
      identityPoolId: import.meta.env.VITE_IDENTITYPOOL_ID, // Your Cognito Identity Pool ID from CDK
      allowGuestAccess: false, // Set to true to allow unauthenticated users

      // signUpVerificationMethod: "code", // 'code' or 'link'

      // loginWith: {
      //   oauth: {
      //     domain: "your_cognito_domain", // Replace with your Cognito Hosted UI domain
      //     scopes: [
      //       "phone",
      //       "email",
      //       "profile",
      //       "openid",
      //       "aws.cognito.signin.user.admin",
      //     ],
      //     redirectSignIn: ["http://localhost:3000/"],
      //     redirectSignOut: ["http://localhost:3000/"],
      //     responseType: "code", // 'code' for refresh tokens, 'token' for implicit auth
      //   },
      // },
    },
  },
};

export default awsconfig;
