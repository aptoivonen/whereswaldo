import { describe, it } from 'vitest';
import Level from './Level';
import { LevelGameInfo } from './schemas';

describe('Level class', () => {
  const testLevelGameInfo: LevelGameInfo = {
    id: 'testId',
    title: 'testTitle',
    imgUrl: 'testUrl',
    foundAcceptanceRadius: 3,
    characterCoordinates: {
      Waldo: [5, 5],
      Odlaw: [2, 2],
    },
  };

  it('gets correct characters', () => {
    const level = new Level(testLevelGameInfo);

    expect(level.characters).toEqual(['Waldo', 'Odlaw']);
  });

  it('has correct characters', () => {
    const level = new Level(testLevelGameInfo);

    expect(level.has('Waldo')).toBe(true);
    expect(level.has('Odlaw')).toBe(true);
    expect(level.has('Wizard')).toBe(false);
  });

  it('isCharacterNear returns false when too far', () => {
    const level = new Level(testLevelGameInfo);

    expect(level.isCharacterNear('Waldo', 5, 9)).toEqual(false);
  });

  it('isCharacterNear returns true when close', () => {
    const level = new Level(testLevelGameInfo);

    expect(level.isCharacterNear('Waldo', 5, 8)).toEqual(true);
  });
});
