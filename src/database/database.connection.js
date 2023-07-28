import pg from "pg"

const { Pool } = pg

const configDatabase = {
    connectionString: process.env.DATABASE_URL,
}

if(process.env.NODE_ENV === "production") configDatabase.ssl = true

export const db = new Pool(configDatabase)