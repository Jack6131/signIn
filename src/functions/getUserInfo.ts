
import { getCurrentUser } from 'aws-amplify/auth';
import { configureLayoutAnimationBatch } from 'react-native-reanimated/lib/typescript/reanimated2/core';




//gets current user session using AWS's getCurrentUserFunction
export default async function currentAuthenticatedUser(){
    try {
      const {signInDetails } = await getCurrentUser();

      return signInDetails.loginId
    } catch (err) {
      console.log(err);
      
      return "wrong"
    }
}