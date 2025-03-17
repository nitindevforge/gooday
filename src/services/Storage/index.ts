import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  async setItem(key: string, value: any) {
    await AsyncStorage.setItem(key, value);
  }
  async getItem(key: string) {
    return await AsyncStorage.getItem(key);
  }
  async removeItem(key: string) {
    await AsyncStorage.removeItem(key);
  }

  async clearAll(ignore: string[] = []) {
    const keys = await AsyncStorage.getAllKeys()

    const keysToDelete = keys.filter(key => !ignore.includes(key))

    await Promise.all(keysToDelete.map(this.removeItem))
  }
}

export const storageService = new StorageService();
