export interface User {
  uid: string;
  email: string;
}

export const auth = {
  currentUser: null as User | null,
};

export const db = {};

export const collection = (db: any, path: string) => {
  return { path };
};

export const doc = (db: any, path: string, id?: string) => {
  if (!id) {
    // If it's doc(collectionRef, id)
    if (typeof path === 'object' && (path as any).path) {
      return { path: (path as any).path, id: arguments[2] || Math.random().toString(36).substring(7) };
    }
  }
  return { path, id: id || Math.random().toString(36).substring(7) };
};

import { categories } from './data/products';
import { blogPosts } from './data/blogPosts';
import { faqs } from './data/faqs';

const seedData: any = {
  products: categories,
  blogPosts: blogPosts,
  faqs: faqs,
  admins: [{ id: '1', email: 'sonnt.credit@gmail.com' }]
};

export const getDocs = async (collectionRef: any) => {
  let dataStr = localStorage.getItem(`db_${collectionRef.path}`);
  if (!dataStr && seedData[collectionRef.path]) {
    dataStr = JSON.stringify(seedData[collectionRef.path]);
    localStorage.setItem(`db_${collectionRef.path}`, dataStr);
  }
  const data = JSON.parse(dataStr || '[]');
  return {
    docs: data.map((item: any) => ({
      id: item.id,
      data: () => item
    }))
  };
};

export const getDoc = async (docRef: any) => {
  let dataStr = localStorage.getItem(`db_${docRef.path}`);
  if (!dataStr && seedData[docRef.path]) {
    dataStr = JSON.stringify(seedData[docRef.path]);
    localStorage.setItem(`db_${docRef.path}`, dataStr);
  }
  const data = JSON.parse(dataStr || '[]');
  const item = data.find((i: any) => i.id === docRef.id);
  return {
    exists: () => !!item,
    data: () => item
  };
};

export const setDoc = async (docRef: any, data: any, options?: any) => {
  let list = JSON.parse(localStorage.getItem(`db_${docRef.path}`) || '[]');
  const index = list.findIndex((i: any) => i.id === docRef.id);
  if (index >= 0) {
    if (options && options.merge) {
      list[index] = { ...list[index], ...data };
    } else {
      list[index] = { id: docRef.id, ...data };
    }
  } else {
    list.push({ id: docRef.id, ...data });
  }
  localStorage.setItem(`db_${docRef.path}`, JSON.stringify(list));
};

export const deleteDoc = async (docRef: any) => {
  let list = JSON.parse(localStorage.getItem(`db_${docRef.path}`) || '[]');
  list = list.filter((i: any) => i.id !== docRef.id);
  localStorage.setItem(`db_${docRef.path}`, JSON.stringify(list));
};

export const signInWithEmailAndPassword = async (authObj: any, email: string, password: string) => {
  if (email === 'sonnt.credit@gmail.com' && password === '12345678') {
    const user = { uid: '1', email };
    auth.currentUser = user;
    localStorage.setItem('auth_user', JSON.stringify(user));
    fireAuthStateChanged(user);
    return { user };
  }
  throw new Error("Invalid credentials");
};

export const signOut = async (authObj: any) => {
  auth.currentUser = null;
  localStorage.removeItem('auth_user');
  fireAuthStateChanged(null);
};

let authStateListeners: any[] = [];
export const onAuthStateChanged = (authObj: any, callback: any) => {
  authStateListeners.push(callback);
  const stored = localStorage.getItem('auth_user');
  if (stored) {
    try {
      const user = JSON.parse(stored);
      auth.currentUser = user;
      callback(user);
    } catch(e) {
      callback(null);
    }
  } else {
    callback(null);
  }
  return () => {
    authStateListeners = authStateListeners.filter(l => l !== callback);
  };
};

const fireAuthStateChanged = (user: any) => {
  authStateListeners.forEach(l => l(user));
};

export const createUserWithEmailAndPassword = async (authObj: any, email: string, password: string) => {
  return { user: { uid: Math.random().toString(36).substring(7), email } };
};

export const sendPasswordResetEmail = async (authObj: any, email: string) => {
  return true;
};

export const writeBatch = (db: any) => {
  const operations: any[] = [];
  return {
    set: (docRef: any, data: any, options: any) => {
      operations.push(() => setDoc(docRef, data, options));
    },
    delete: (docRef: any) => {
      operations.push(() => deleteDoc(docRef));
    },
    commit: async () => {
      for (const op of operations) {
        await op();
      }
    }
  };
};
