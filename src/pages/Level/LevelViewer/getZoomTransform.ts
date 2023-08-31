function getZoomTransform(value: number, zoom: number) {
  return Math.floor(value / zoom);
}

export default getZoomTransform;
