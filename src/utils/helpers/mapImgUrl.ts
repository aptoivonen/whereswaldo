export default function getImgUrl(imgUrl: string): string {
  const storageUrl = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
  return `https://firebasestorage.googleapis.com/v0/b/${storageUrl}/o/images%2F${imgUrl}?alt=media`;
}
