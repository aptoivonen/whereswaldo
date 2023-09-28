const LEVELS_DB = {
  levels: {
    '1': {
      imgUrl: 'level-1.jpg',
      thumbnailUrl: 'thumbnail-level-1.jpg',
      title: 'Level 1',
      characterCoordinates: { Waldo: [1, 1] },
      characters: ['Waldo'],
      foundAcceptanceRadius: 3,
    },
    '2': {
      imgUrl: 'level-2.jpg',
      thumbnailUrl: 'thumbnail-level-2.jpg',
      title: 'Level 2',
      characterCoordinates: { Waldo: [1, 1], Odlaw: [22, 22] },
      characters: ['Waldo', 'Odlaw'],
      foundAcceptanceRadius: 5,
    },
  },
};

const LEVELS_AND_SCORES_DB = {
  levels: {
    '1': {
      imgUrl: 'level-1.jpg',
      thumbnailUrl: 'thumbnail-level-1.jpg',
      title: 'Level 1',
      characterCoordinates: { Waldo: [1, 1] },
      characters: ['Waldo'],
      foundAcceptanceRadius: 3,
    },
    '2': {
      imgUrl: 'level-2.jpg',
      thumbnailUrl: 'thumbnail-level-2.jpg',
      title: 'Level 2',
      characterCoordinates: { Waldo: [1, 1], Odlaw: [22, 22] },
      characters: ['Waldo', 'Odlaw'],
      foundAcceptanceRadius: 5,
    },
  },
  scores: {
    abc: {
      userName: 'Mikko',
      levelId: '1',
      time: 11,
    },
    def: {
      userName: 'Jack',
      levelId: '1',
      time: 16,
    },
    ghi: {
      userName: 'Anna',
      levelId: '2',
      time: 11,
    },
  },
};

export { LEVELS_DB, LEVELS_AND_SCORES_DB };
