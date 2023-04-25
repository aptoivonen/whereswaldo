function getImageClickPosition(
  e: React.MouseEvent<HTMLImageElement, MouseEvent>,
  zoom: number
) {
  const rect = e.currentTarget.getBoundingClientRect();
  const [imageX, imageY, imageWidth, imageHeight] = [
    Math.floor((e.clientX - rect.left) / zoom),
    Math.floor((e.clientY - rect.top) / zoom),
    Math.floor(rect.width / zoom),
    Math.floor(rect.height / zoom),
  ];
  return { imageX, imageY, imageWidth, imageHeight };
}

export default getImageClickPosition;
