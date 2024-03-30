
import { getCurrentUser } from 'aws-amplify/auth';




//gets current user session using AWS's getCurrentUserFunction
export default async function currentAuthenticatedUser() {
    try {
      const {signInDetails } = await getCurrentUser();
      console.log(`The username: ${signInDetails.loginId}`);
      return signInDetails
    } catch (err) {
      console.log(err);
      return err
    }
  }