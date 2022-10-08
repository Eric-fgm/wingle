export const getTouchedFieldsValues = <
  T extends Record<string, any>,
  A extends { [key in keyof T]?: any }
>(
  fieldsValues: T,
  touchedFields: A
) =>
  (Object.keys(touchedFields) as (keyof T)[]).reduce<{
    [K in keyof T]: T[K]
  }>((acc, curr) => {
    acc[curr] = fieldsValues[curr]
    return acc
  }, {} as { [K in keyof T]: T[K] })
