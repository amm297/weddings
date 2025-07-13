import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  QueryConstraint,
  DocumentSnapshot,
  DocumentData,
  Timestamp,
  WithFieldValue,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export type FirestoreTimestamp = Timestamp;

export interface BaseDocument {
  id: string;
  createdAt?: FirestoreTimestamp;
  updatedAt?: FirestoreTimestamp;
}

export abstract class BaseModel<T extends BaseDocument> {
  protected abstract collectionName: string;

  /**
   * Get a reference to the collection
   */
  protected getCollection() {
    return collection(db, this.collectionName);
  }

  /**
   * Get a document reference by ID
   */
  protected getDocRef(id: string) {
    return doc(db, this.collectionName, id);
  }

  /**
   * Convert Firestore document to model
   */
  protected abstract fromFirestore(snapshot: DocumentSnapshot): T | null;

  /**
   * Convert model to Firestore document
   */
  protected toFirestore(data: Partial<T>): WithFieldValue<DocumentData> {
    // Remove id field as it's stored in the document reference
    const { id, ...docData } = data as any;

    return {
      ...docData,
      updatedAt: Timestamp.now(),
    };
  }

  /**
   * Create a new document
   */
  async create(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T> {
    try {
      const docRef = doc(collection(db, this.collectionName));

      const timestamp = Timestamp.now();
      const docData = {
        ...data,
        id: docRef.id,
        createdAt: timestamp,
        updatedAt: timestamp,
      } as T;

      console.log("Creating document in collection:", this.collectionName);
      console.log("Document data:", JSON.stringify(docData, null, 2));

      // Convert the document data to a plain object that Firestore can store
      const firestoreData = this.toFirestore(docData);
      console.log("Firestore data:", JSON.stringify(firestoreData, null, 2));

      // Set the document in Firestore
      await setDoc(docRef, firestoreData);

      console.log("Document created successfully with ID:", docRef.id);

      // Verify the document was created by reading it back
      const verifyDoc = await getDoc(docRef);
      if (verifyDoc.exists()) {
        console.log("Document verified to exist in Firestore");
      } else {
        console.warn("Document was not found after creation!");
      }

      return docData;
    } catch (error) {
      console.error("Error creating document", error);
      throw error;
    }
  }

  /**
   * Create a document with a specific ID
   */
  async createWithId(
    id: string,
    data: Omit<T, "id" | "createdAt" | "updatedAt">
  ): Promise<T> {
    const docRef = this.getDocRef(id);

    const timestamp = Timestamp.now();
    const docData = {
      ...data,
      id,
      createdAt: timestamp,
      updatedAt: timestamp,
    } as T;

    await setDoc(docRef, this.toFirestore(docData));

    return docData;
  }

  /**
   * Create a new document or update if it already exists
   */
  async createOrUpdate(
    id: string,
    data: Omit<T, "id" | "createdAt" | "updatedAt">
  ): Promise<T> {
    const docRef = this.getDocRef(id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Document exists, update it
      const updateData = {
        ...data,
        id,
        updatedAt: Timestamp.now(),
      } as T;

      await updateDoc(docRef, this.toFirestore(updateData));
      return { ...updateData, createdAt: docSnap.data().createdAt } as T;
    } else {
      // Document doesn't exist, create it
      return this.create(data);
    }
  }

  /**
   * Get a document by ID
   */
  async get(id: string): Promise<T | null> {
    const docRef = this.getDocRef(id);
    const docSnap = await getDoc(docRef);

    return this.fromFirestore(docSnap);
  }

  /**
   * Update a document
   */
  async update(
    id: string,
    data: Partial<Omit<T, "id" | "createdAt" | "updatedAt">>
  ): Promise<boolean> {
    const docRef = this.getDocRef(id);

    const updateData = {
      ...data,
      updatedAt: Timestamp.now(),
    };

    await updateDoc(docRef, this.toFirestore(updateData as T));

    return true;
  }

  /**
   * Delete a document
   */
  async delete(id: string): Promise<boolean> {
    const docRef = this.getDocRef(id);
    await deleteDoc(docRef);

    return true;
  }

  /**
   * Find documents by query
   */
  async find(constraints: QueryConstraint[] = []): Promise<T[]> {
    try {
      console.log(`Finding documents in collection '${this.collectionName}'`);
      if (constraints.length > 0) {
        console.log("With constraints:", constraints);
      }

      const q = query(this.getCollection(), ...constraints);
      const querySnapshot = await getDocs(q);

      console.log(`Found ${querySnapshot.size} documents`);

      const results: T[] = [];
      querySnapshot.forEach((doc) => {
        console.log(`Processing document with ID: ${doc.id}`);
        const item = this.fromFirestore(doc);
        if (item) {
          results.push(item);
        } else {
          console.log(`Document ${doc.id} could not be converted to model`);
        }
      });

      console.log(`Returning ${results.length} results`);
      return results;
    } catch (error) {
      console.error(
        `Error finding documents in ${this.collectionName}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Find all documents in the collection
   */
  async findAll(): Promise<T[]> {
    return this.find();
  }
}
