import * as mysql from "mysql";
import { CharacterInfo } from "../../Interfaces";

export class AuctionDAO {
    constructor(private _connection: mysql.Connection) {}

    adiciona(personagem: CharacterInfo) {
        let sql = "";
        sql += "INSERT INTO DB_TIBIA_AUCTIONS.TB_AUCTIONS ";
        sql += "(";
        sql += "	  DT_REG";
        sql += "	, CHARACTER_NAME";
        sql += "	, CHARACTER_LEVEL";
        sql += "	, CHARACTER_VOCATION";
        sql += "	, CHARACTER_WORLD";
        sql += "	, CHARACTER_SEX";
        sql += "	, TS_AUCTION_START";
        sql += "	, TS_AUCTION_END";
        sql += "	, CURRENT_BID";
        sql += "	, OBS";
        sql += ")";
        sql += " ";
        sql += "VALUES (NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?) ";
        sql += "ON DUPLICATE KEY UPDATE TS_AUCTION_END = ? ";
        sql += "                      , CURRENT_BID    = ? ";
        sql += "                      , DT_REG         = NOW() ";
        sql += ";";

        const values = [
            personagem.characterName,
            personagem.level,
            personagem.vocation,
            personagem.world,
            personagem.sex,
            personagem.auctionStart,
            personagem.auctionEnd,
            personagem.currentBid,
            personagem.obs,
            personagem.auctionEnd,
            personagem.currentBid,
        ];

        const self = this;
        self._connection.query(sql, values, function (err, result, fields) {
            if (err) {
                console.log(err.message);
                return;
            }
            // console.log(`ID: ${result.insertId}`);
        });
    }
}
