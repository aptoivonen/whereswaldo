export default function formatTime(time: number) {
  if (time < 3600) return new Date(time * 1000).toISOString().substring(14, 19);
  return new Date(time * 1000).toISOString().substring(11, 19);
}
