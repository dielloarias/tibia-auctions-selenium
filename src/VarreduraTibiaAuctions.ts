import { CharacterInfo } from "./Interfaces";
import Parametros from "./Parametros";

const { Key, until, By, Condition } = require("selenium-webdriver");

const webdriver = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");

export interface VarreduraTibiaAuctionsDelegate {
    personagem(personagem: CharacterInfo);
}

export class VarreduraTibiaAuctions {
    public delegate: VarreduraTibiaAuctionsDelegate = {
        personagem(personagem: CharacterInfo) {
            console.log(personagem);
        },
    };

    constructor() {}

    async varredura() {
        const characterInfo = function (auctionHeader): CharacterInfo {
            const splitHeader = auctionHeader.split("\n");
            const charName = splitHeader[0];
            const basicInfo = splitHeader[1].split("|");

            const level = Number(basicInfo[0].replace("Level:", "").trim());
            const vocation = basicInfo[1].replace("Vocation:", "").trim();
            const sex = basicInfo[2].trim();
            const world = basicInfo[3].replace("World:", "").trim();

            return {
                characterName: charName,
                level: level,
                vocation: vocation,
                sex: sex,
                world: world,
            };
        };

        const arr = [];

        // Variável p/ carregar quantidade de páginas a ser percorrida
        let quantidadePaginas = 1;

        // const driver = await new webdriver.Builder().forBrowser("firefox").build();
        const driver = await new webdriver.Builder()
            .forBrowser("firefox")
            .setFirefoxOptions(new firefox.Options().headless())
            .build();

        for (let pagina = 1; pagina <= quantidadePaginas; pagina++) {
            const BASE_URL = `https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&filter_profession=${Parametros.PROFESSION}&filter_levelrangefrom=${Parametros.LEVEL_MIN}&filter_levelrangeto=${Parametros.LEVEL_MAX}&filter_world=${Parametros.WORLD}&filter_worldpvptype=9&filter_worldbattleyestate=0&filter_skillid=&filter_skillrangefrom=0&filter_skillrangeto=0&order_column=101&order_direction=1&searchtype=1&currentpage=${pagina}`;

            await driver.get(BASE_URL);
            await driver.wait(
                until.titleContains("Tibia - Free Multiplayer"),
                2000
            );

            // Condicional para checar quantidade de páginas a serem percorridas;
            if (quantidadePaginas == 1) {
                try {
                    const tdPageNavigation = await driver.findElement(
                        By.className("PageNavigation")
                    );
                    const results = (await tdPageNavigation.getText()) as string;
                    const indexOf = results.indexOf("Results: ");
                    const length = results.length;

                    if (indexOf > 0) {
                        const quantidadePersonagens = Number(
                            results
                                .substring(indexOf, length)
                                .replace(/[^0-9.]/g, "")
                        );

                        // Quantidade de páginas a percorrer = quantidade de personagem / 25
                        quantidadePaginas = Math.ceil(
                            quantidadePersonagens / 25
                        );
                    }
                } catch (error) {
                    console.log(error);
                    // await driver.quit();
                    break;
                }
            }

            const leiloes = await driver.findElements(By.className("Auction"));
            const length = leiloes.length;

            for (let i = 0; i < length; i++) {
                const leilao = leiloes[i];

                const auctionHeader = await (
                    await leilao.findElement(By.className("AuctionHeader"))
                ).getText();

                const infoLeilao = await leilao.findElements(
                    By.className("ShortAuctionDataValue")
                );
                const auctionStart = await infoLeilao[0].getText();
                const auctionEnd = await infoLeilao[1].getText();
                const currentBid = await (
                    await infoLeilao[2].getText()
                ).replace(",", "");

                // incluir logica p/ transformar auctionStart e auctionEnd em datas
                const charinfo = characterInfo(auctionHeader);
                charinfo.auctionStart = auctionStart;
                charinfo.auctionEnd = auctionEnd;
                charinfo.currentBid = Number(currentBid);
                charinfo.date = new Date();

                arr.push(charinfo);

                this.delegate.personagem(charinfo);
            }
        }

        await driver.quit();

        return arr;
    }

    async historico() {
        const characterInfo = function (auctionHeader): CharacterInfo {
            const splitHeader = auctionHeader.split("\n");
            const charName = splitHeader[0];
            const basicInfo = splitHeader[1].split("|");

            const level = Number(basicInfo[0].replace("Level:", "").trim());
            const vocation = basicInfo[1].replace("Vocation:", "").trim();
            const sex = basicInfo[2].trim();
            const world = basicInfo[3].replace("World:", "").trim();

            return {
                characterName: charName,
                level: level,
                vocation: vocation,
                sex: sex,
                world: world,
            };
        };

        const arr = [];

        // Variável p/ carregar quantidade de páginas a ser percorrida
        let quantidadePaginas = 1;

        // const driver = await new webdriver.Builder().forBrowser("firefox").build();
        const driver = await new webdriver.Builder()
            .forBrowser("firefox")
            .setFirefoxOptions(new firefox.Options().headless())
            .build();

        for (let pagina = 1; pagina <= quantidadePaginas; pagina++) {
            const BASE_URL = `https://www.tibia.com/charactertrade/?subtopic=pastcharactertrades&currentpage=${pagina}`;

            await driver.get(BASE_URL);
            await driver.wait(
                until.titleContains("Tibia - Free Multiplayer"),
                2000
            );

            // Condicional para checar quantidade de páginas a serem percorridas;
            if (quantidadePaginas == 1) {
                try {
                    const tdPageNavigation = await driver.findElement(
                        By.className("PageNavigation")
                    );
                    const results = (await tdPageNavigation.getText()) as string;
                    const indexOf = results.indexOf("Results: ");
                    const length = results.length;

                    if (indexOf > 0) {
                        const quantidadePersonagens = Number(
                            results
                                .substring(indexOf, length)
                                .replace(/[^0-9.]/g, "")
                        );

                        // Quantidade de páginas a percorrer = quantidade de personagem / 25
                        quantidadePaginas = Math.ceil(
                            quantidadePersonagens / 25
                        );
                    }
                } catch (error) {
                    console.log(error);
                    // await driver.quit();
                    break;
                }
            }

            const leiloes = await driver.findElements(By.className("Auction"));
            const length = leiloes.length;

            for (let i = 0; i < length; i++) {
                const leilao = leiloes[i];

                const auctionHeader = await (
                    await leilao.findElement(By.className("AuctionHeader"))
                ).getText();

                const infoLeilao = await leilao.findElements(
                    By.className("ShortAuctionDataValue")
                );
                const auctionStart = await infoLeilao[0].getText();
                const auctionEnd = await infoLeilao[1].getText();
                const currentBid = await (
                    await infoLeilao[2].getText()
                ).replace(",", "");

                const label: string = await leilao
                    .findElement(By.className("ShortAuctionDataBidRow"))
                    .findElement(By.className("ShortAuctionDataLabel"))
                    .getText();

                const sold = label.includes("Winning Bid");

                const charinfo = characterInfo(auctionHeader);
                charinfo.auctionStart = auctionStart;
                charinfo.auctionEnd = auctionEnd;
                charinfo.currentBid = Number(currentBid);
                charinfo.date = new Date();
                charinfo.sold = sold;

                arr.push(charinfo);

                this.delegate.personagem(charinfo);
            }
        }

        await driver.quit();

        return arr;
    }
}
