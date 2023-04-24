function getImageClickPosition(
  e: React.MouseEvent<HTMLImageElement, MouseEvent>
): [number, number] {
  const rect = e.currentTarget.getBoundingClientRect();
  const [imageX, imageY, imageWidth, imageHeight] = [
    Math.floor(e.clientX - rect.left),
    Math.floor(e.clientY - rect.top),
    rect.width,
    rect.height,
  ];
  const [imagePercentageX, imagePercentageY] = [
    Math.floor((100 * imageX) / imageWidth),
    Math.floor((100 * imageY) / imageHeight),
  ];
  return [imagePercentageX, imagePercentageY];
}

export default getImageClickPosition;
