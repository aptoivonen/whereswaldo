export default function getImgUrl(imgUrl: string): string {
  const storageUrl: string = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
  // emulator
  if (storageUrl.startsWith('127.0.0.1')) {
    const projectId: string = import.meta.env.VITE_FIREBASE_PROJECT_ID;
    return `http://${storageUrl}/${projectId}.appspot.com/images/${imgUrl}`;
  }
  return `https://firebasestorage.googleapis.com/v0/b/${storageUrl}/o/images%2F${imgUrl}?alt=media`;
}
