import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db, handleFirestoreError } from "../lib/firebase";
import { OperationType } from "../types";

type MapDoc<T> = (snap: QueryDocumentSnapshot<DocumentData>) => T;

/** Assina uma collection ordenada por createdAt desc enquanto `enabled`. */
export function useOrderedCollection<T>(
  collectionName: string,
  mapDoc: MapDoc<T>,
  enabled: boolean
) {
  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    if (!enabled) {
      setItems([]);
      return;
    }

    const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setItems(snapshot.docs.map(mapDoc));
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, collectionName);
      }
    );

    return unsubscribe;
  }, [collectionName, enabled, mapDoc]);

  return items;
}
