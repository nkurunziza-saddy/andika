import type { DrizzleEnum } from "../types";

export function drizzleEnumToObject<T extends readonly string[]>(
  enumValues: T
): DrizzleEnum<T> {
  return enumValues.reduce((acc, value) => {
    (acc as any)[value] = value;
    return acc;
  }, {} as DrizzleEnum<T>);
}
