import { CharacterInfo } from "./Interfaces";
import { VarreduraTibiaAuctions } from "./VarreduraTibiaAuctions";

const varredor = new VarreduraTibiaAuctions();

varredor
    .varredura()
    .then((arr: Array<CharacterInfo>) => {
        console.log(arr.length);
    })
    .catch((err) => console.log(err));
