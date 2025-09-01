import * as schema from "../db/schema";
import type { AppRouter as appRouterServer } from "../routers/index";

type TableName<T extends string> = T extends `${infer Name}Table`
  ? Capitalize<Name>
  : never;

export type InsertTypes = {
  [K in keyof typeof schema as K extends `${string}Table`
    ? `${TableName<K & string>}`
    : never]: (typeof schema)[K] extends { $inferInsert: infer I } ? I : never;
};

export type SelectTypes = {
  [K in keyof typeof schema as K extends `${string}Table`
    ? `${TableName<K & string>}`
    : never]: (typeof schema)[K] extends { $inferSelect: infer S } ? S : never;
};

type DateToString<T> = T extends Date
  ? string
  : T extends Date | null
  ? string | null
  : T extends Date | undefined
  ? string | undefined
  : T extends (infer U)[]
  ? DateToString<U>[]
  : T extends object
  ? {
      [K in keyof T]: DateToString<T[K]>;
    }
  : T;

export type ApiSelectTypes = {
  [K in keyof SelectTypes]: DateToString<SelectTypes[K]>;
};

export type DrizzleEnum<T extends readonly string[]> = {
  readonly [K in T[number]]: K;
};

export type AppRouter = appRouterServer;
