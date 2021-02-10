import * as mysql from "mysql";
import { Auth } from "./auth/Auth";

function createConnection() {
    const connection = mysql.createConnection({
        host: Auth.host,
        user: Auth.user,
        password: Auth.password,
        database: Auth.database,
    });

    return connection;
}

module.exports = createConnection;
