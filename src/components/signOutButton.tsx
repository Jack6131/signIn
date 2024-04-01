import {Button} from 'react-native'
import {Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
export default function SignOutButton() {
    const { signOut } = useAuthenticator();
    return <Button title="Sign Out" onPress={signOut} />;
  }