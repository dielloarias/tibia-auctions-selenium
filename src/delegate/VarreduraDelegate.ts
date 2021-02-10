import { CharacterInfo } from "../Interfaces";
import { VarreduraTibiaAuctionsDelegate } from "../VarreduraTibiaAuctions";

import * as mysql from "mysql";
import { AuctionDAO } from "../db/dao/AuctionDAO";
const ConnectionFactory = require("../db/conexoes/ConnectionFactory");

function converteDataTibia(dataSite: string): string {
    const converteMes = function (mes: string): number {
        const meses = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        return meses.indexOf(mes) + 1;
    };

    const valores = dataSite.split(",");

    const data = valores[0].split(" ");
    const timestamp = valores[1].trim().split(" ");

    const ano = Number(data[2]);
    const mes = converteMes(data[0]);
    const dia = Number(data[1]);

    const horario = timestamp[0].split(":");
    const hora = Number(horario[0]);
    const minuto = Number(horario[1]);

    const value = `${ano}-${mes}-${dia} ${hora}:${minuto}`;

    return value;
}

const VarreduraDelegate: VarreduraTibiaAuctionsDelegate = {
    personagem(personagem: CharacterInfo) {
        const obs = `Auction Start: ${personagem.auctionStart} / Auction End: ${personagem.auctionEnd}`;
        const start = converteDataTibia(personagem.auctionStart as string);
        const end = converteDataTibia(personagem.auctionEnd as string);

        personagem.auctionStart = start;
        personagem.auctionEnd = end;
        personagem.obs = obs;

        const connection: mysql.Connection = new ConnectionFactory();
        const dao = new AuctionDAO(connection);

        dao.adiciona(personagem);
        console.log(new Date(), personagem.characterName);
        connection.end();
    },
};

export { VarreduraDelegate };
