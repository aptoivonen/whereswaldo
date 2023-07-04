import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export default function schemaParse<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
) {
  const result: z.SafeParseReturnType<unknown, z.output<T>> = schema.safeParse(
    data
  );
  if (!result.success) {
    throw fromZodError(result.error);
  }
  return result.data;
}
