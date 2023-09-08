import { DataSource } from "typeorm";
import { User } from "./entity/user";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    synchronize: true,
    logging: false,
    entities: [User],
    subscribers: [],
    migrations: [],
});