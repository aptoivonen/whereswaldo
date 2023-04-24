type IsNearByProps = {
  clickedImagePercentageX: number;
  clickedImagePercentageY: number;
  characterX: number;
  characterY: number;
  foundAcceptanceRadius: number;
};

function isNearby({
  clickedImagePercentageX,
  clickedImagePercentageY,
  characterX,
  characterY,
  foundAcceptanceRadius,
}: IsNearByProps): boolean {
  return (
    Math.sqrt(
      (clickedImagePercentageX - characterX) ** 2 +
        (clickedImagePercentageY - characterY) ** 2
    ) < foundAcceptanceRadius
  );
}

export default isNearby;
