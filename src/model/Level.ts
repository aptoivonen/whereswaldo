import { Character, LevelGameInfo } from '@/model/schemas';
import isNearby from './isNearby';

export default class Level {
  private level: LevelGameInfo;

  constructor(level: LevelGameInfo) {
    this.level = level;
  }

  get imgUrl() {
    return this.level.imgUrl;
  }

  get id() {
    return this.level.id;
  }

  get title() {
    return this.level.title;
  }

  get foundAcceptanceRadius() {
    return this.level.foundAcceptanceRadius;
  }

  get characters() {
    return Object.keys(this.level.characterCoordinates) as Character[];
  }

  characterCoordinates(character: Character): [number, number] | undefined {
    return this.level.characterCoordinates[character];
  }

  has(character: Character): boolean {
    return this.characters.includes(character);
  }

  /**
   * Tells, if a character near enough.
   * @param character Character to look for
   * @param percentageX image percentage coordinate x
   * @param percentageY image percentage coordinate y
   */
  isCharacterNear(
    character: Character,
    percentageX: number,
    percentageY: number
  ): boolean {
    const characterCoordinates = this.characterCoordinates(character);
    if (!characterCoordinates) {
      return false;
    }
    const [characterX, characterY] = characterCoordinates;
    return isNearby({
      clickedImagePercentageX: percentageX,
      clickedImagePercentageY: percentageY,
      characterX,
      characterY,
      foundAcceptanceRadius: this.foundAcceptanceRadius,
    });
  }
}
