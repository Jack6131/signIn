
FOR MORE INFORMATION GO TO
https://docs.amplify.aws/react-native/build-a-backend/auth/set-up-auth/

Getting Started Read Me
Do this first

STEP 1:
npm install -g @aws-amplify/cli

Step 2:
amplify configure

here its oging to ask you for your credentials on your user account make sure you pick the right region
and a user

give urself the AdministatorAccess-amplify as well as AdministratorAccess 


Step 3:
Once your IAM user is set up go to ur user and create an access key
select Command Line Interface

copy both Access Key and Secret Access Key



Step 4: run command 'amplify init'


Step 5: run command 'npm install aws-amplify @aws-amplify/react-native @react-native-community/netinfo @react-native-async-storage/async-storage react-native-get-random-values'


Step 6: run 'amplify add api'
select default values

Deploy the API by running amplify push

Do this second

AUTHENTICATION:

Step 1: run 'amplify add auth'
	for user sign in pick email
	then run 'amplify push'
