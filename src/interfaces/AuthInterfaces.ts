/**
 * Interfaces for account management and authentication
 */

import { JWT } from 'aws-amplify/auth';

export interface AccountData {
	id: string;
	idToken: JWT;
	accessToken: JWT;
	email: string;
	name: string;
}
