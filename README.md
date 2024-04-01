# Getting Started
	
	

	STEP 1:
		npm install -g @aws-amplify/cli

	Step 2:
		amplify configure

		here its going to ask you for your credentials on your user account make sure you pick the right region
		and a user give urself the AdministatorAccess-amplify as well as AdministratorAccess 
	
 	Step 3:
		Once your IAM user is set up go to ur user and create an access key select Command Line Interface 
  		copy both Access Key and Secret Access Key

	Step 4: 
 		run command 'amplify init'


	Step 5: 
 		run command 'npm install aws-amplify @aws-amplify/react-native @react-native-community/netinfo @react-native-async-storage/async-storage react-native-get-random-values'

	Step 6: 
 		run 'amplify add api'
   		select default values

	Deploy the API by running 'amplify push'


# AUTHENTICATION

Step 1: run 'amplify add auth'
	for user sign in pick email
	then run 'amplify push'


# Run APP
	npx expo run:android


# Navigation
  LIST OF NPM INSTALLS:
	
 	npm install @react-navigation/bottom-tabs (this is for app navigation to switch pages)
	
 	npm install @react-navigation/native (this is for navigation of pages specifically for react native)
	
	npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context 	
 	
  	npm install @react-native-community/masked-view(dependencies for bottom tabs and navigator)

# Other Dependencies
	npm install @rneui/themed @rneui/base (is used for profile circles known as avatars)