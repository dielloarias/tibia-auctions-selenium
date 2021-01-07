import { CharacterInfo } from "./Interfaces";
import Parametros from "./Parametros";

const { Key, until, By, Condition } = require("selenium-webdriver");

const webdriver = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");

const delegate = {
	personagem(personagem) {
        // Incluir no banco de dados
		console.log(personagem);
	},
};

const varredura = async function () {
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

	// const driver = await new webdriver.Builder().forBrowser("firefox").build();
	const driver = await new webdriver.Builder()
		.forBrowser("firefox")
		.setFirefoxOptions(new firefox.Options().headless())
		.build();

	for (let pagina = 1; pagina < 20; pagina++) {
		const BASE_URL = `https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&filter_profession=${Parametros.PROFESSION}&filter_levelrangefrom=${Parametros.LEVEL_MIN}&filter_levelrangeto=${Parametros.LEVEL_MAX}&filter_world=${Parametros.WORLD}&filter_worldpvptype=9&filter_worldbattleyestate=0&filter_skillid=&filter_skillrangefrom=0&filter_skillrangeto=0&order_column=101&order_direction=1&searchtype=1&currentpage=${pagina}`;

		await driver.get(BASE_URL);
		await driver.wait(until.titleContains("Tibia - Free Multiplayer"), 2000);

		const leiloes = await driver.findElements(By.className("Auction"));
		const length = leiloes.length;

		for (let i = 0; i < length; i++) {
			const leilao = leiloes[i];

			const auctionHeader = await (await leilao.findElement(By.className("AuctionHeader"))).getText();

			const infoLeilao = await leilao.findElements(By.className("ShortAuctionDataValue"));
			const auctionStart = await infoLeilao[0].getText();
			const auctionEnd = await infoLeilao[1].getText();
			const currentBid = await (await infoLeilao[2].getText()).replace(",", "");

			// incluir logica p/ transformar auctionStart e auctionEnd em datas
			const charinfo = characterInfo(auctionHeader);
			charinfo.auctionStart = auctionStart;
			charinfo.auctionEnd = auctionEnd;
			charinfo.currentBid = Number(currentBid);
			charinfo.date = new Date();

			arr.push(charinfo);

			delegate.personagem(charinfo);
		}
	}

	await driver.quit();

	return arr;
};

varredura()
	.then((arr) => {
		// console.log(arr);
		console.log(arr.length);
	})
	.catch((err) => console.log);
