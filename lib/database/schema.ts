import {index, integer, PgDatabase, pgTable, PgTransaction, text, varchar} from "drizzle-orm/pg-core"
import {ExtractTablesWithRelations} from "drizzle-orm";
import {PostgresJsQueryResultHKT} from "drizzle-orm/postgres-js";

export type DrizzleTransaction = PgTransaction<PostgresJsQueryResultHKT, typeof import("@/lib/database/schema"), ExtractTablesWithRelations<typeof import("@/lib/database/schema")>>;
export type DrizzleDatabase = PgDatabase<PostgresJsQueryResultHKT, typeof import("@/lib/database/schema"), ExtractTablesWithRelations<typeof import("@/lib/database/schema")>>;

export const accountsNoIndex = pgTable("account_no_index", {
    id: text("id").notNull().primaryKey(),

    name: varchar("name", {length: 64}).notNull(),
    profilePictureUrl: text("profile_picture_url").notNull(),
    answeredThreads: integer("answered_threads").default(0),
});

export const accountsWithIndex = pgTable("account_with_index", {
    id: text("id").notNull().primaryKey(),

    name: varchar("name", {length: 64}).notNull(),
    answeredThreads: integer("answered_threads").default(0),
    profilePictureUrl: text("profile_picture_url").notNull(),
}, (t) => {
    return {
        accountAnsweredThreadsIndex: index('account_answered_threads_index').on(t.answeredThreads.desc()),
    };
});