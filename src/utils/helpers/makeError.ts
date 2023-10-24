/**
 * Makes error object out of thrown value.
 * @param errorValue thrown value
 * @returns error object
 */
export default function makeError(errorValue: unknown): Error {
  if (errorValue instanceof Error) return errorValue;
  // object with message property was thrown
  if (
    typeof errorValue === 'object' &&
    errorValue &&
    'message' in errorValue &&
    typeof errorValue.message === 'string'
  ) {
    return new Error(errorValue.message);
  }
  return new Error(String(errorValue));
}
