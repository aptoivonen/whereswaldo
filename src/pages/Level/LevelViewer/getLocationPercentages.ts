type GetLocationPercentagesProps = {
  imageX: number;
  imageY: number;
  imageWidth: number;
  imageHeight: number;
};

function getLocationPercentages({
  imageX,
  imageY,
  imageWidth,
  imageHeight,
}: GetLocationPercentagesProps) {
  return [
    Math.floor((100 * imageX) / imageWidth),
    Math.floor((100 * imageY) / imageHeight),
  ];
}

export default getLocationPercentages;
