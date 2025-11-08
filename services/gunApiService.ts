
import { Gun } from '../types';

const DB_KEY = 'gun_registry_db';

// Helper to get data from localStorage
const getDb = (): Record<string, Gun> => {
  try {
    const dbString = localStorage.getItem(DB_KEY);
    return dbString ? JSON.parse(dbString) : {};
  } catch (error) {
    console.error("Failed to parse DB from localStorage", error);
    return {};
  }
};

// Helper to save data to localStorage
const saveDb = (db: Record<string, Gun>) => {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (error) {
    console.error("Failed to save DB to localStorage", error);
  }
};

export const gunApiService = {
  registerGun: (gunData: Omit<Gun, 'registrationDate'>): Promise<Gun> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const db = getDb();
        if (db[gunData.serialNumber]) {
          reject(new Error('A gun with this serial number is already registered.'));
          return;
        }
        
        const newGun: Gun = {
          ...gunData,
          registrationDate: new Date().toISOString(),
        };
        
        db[newGun.serialNumber] = newGun;
        saveDb(db);
        
        resolve(newGun);
      }, 1000); // Simulate network delay
    });
  },

  findGunBySerial: (serialNumber: string): Promise<Gun | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const db = getDb();
        const gun = db[serialNumber] || null;
        resolve(gun);
      }, 1000); // Simulate network delay
    });
  },
};
