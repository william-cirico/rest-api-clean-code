import { AppDataSource } from "./infra/database/typeorm";

AppDataSource.initialize()
    .then(async () => {
        const PORT = process.env.PORT || 8080;
        const app = (await import("./infra/router/express/config/app")).default;

        app.listen(PORT, () => console.log(`O servidor está rodando na porta: ${PORT}`));
    })
    .catch(console.error);
