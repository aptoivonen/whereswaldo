import { z } from 'zod';
import mapImgUrl from '@/utils/helpers/mapImgUrl';

const BaseSchema = z.object({ id: z.string() });
const BasicDocumentSchema = BaseSchema.passthrough();
export type BasicDocument = z.infer<typeof BasicDocumentSchema>;

const CharacterSchema = z.enum(['Waldo', 'Wizard', 'Odlaw']);
export type Character = z.infer<typeof CharacterSchema>;

const LevelInfoSchema = z
  .object({
    thumbnailUrl: z.string().transform(mapImgUrl),
    title: z.string(),
    characters: z
      .array(CharacterSchema)
      .min(1, 'Levels must have at least one character to find')
      .transform((arr) => new Set(arr)),
  })
  .merge(BaseSchema);
export type LevelInfo = z.infer<typeof LevelInfoSchema>;
export const LevelInfoArraySchema = z.array(LevelInfoSchema);

export const LevelGameInfoSchema = z
  .object({
    imgUrl: z.string().transform(mapImgUrl),
    title: z.string(),
    characterCoordinates: z
      .record(
        CharacterSchema,
        z.tuple([
          z.number().int().gte(0).lte(100),
          z.number().int().gte(0).lte(100),
        ])
      )
      .refine((obj) => Object.values(obj).some((v) => v !== undefined), {
        message: 'A level must have at least one character with coordinates',
      }),
    foundAcceptanceRadius: z.number().int().gte(0).lte(100),
  })
  .merge(BaseSchema);
export type LevelGameInfo = z.infer<typeof LevelGameInfoSchema>;

const ScoreSchema = z
  .object({
    userName: z.string(),
    levelId: z.string(),
    time: z.number(),
  })
  .merge(BaseSchema);
export type Score = z.infer<typeof ScoreSchema>;

function timeAscending(a: Score, b: Score) {
  return a.time - b.time;
}

export const ScoresSchema = z
  .array(ScoreSchema)
  .transform((arr) => arr.sort(timeAscending));
