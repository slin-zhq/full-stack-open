import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const rawAccessToken = await AsyncStorage.getItem(
			`${this.namespace}:accessToken`,
		);

		return rawAccessToken ? JSON.parse(rawAccessToken) : {};
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
		await AsyncStorage.setItem(
			`${this.namespace}:accessToken`,
			JSON.stringify(accessToken)
		);
  }

  async removeAccessToken() {
    // Remove the access token from the storage
		await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
  }
}

export default AuthStorage;