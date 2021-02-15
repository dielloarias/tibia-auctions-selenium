import { CharacterInfo } from "./Interfaces";
import { VarreduraTibiaAuctions } from "./VarreduraTibiaAuctions";
import { VarreduraDelegateCurrentTrades } from "./delegate/VarreduraDelegate";

const varredor = new VarreduraTibiaAuctions();

varredor.delegate = VarreduraDelegateCurrentTrades;

varredor
    .varredura()
    .then((arr: Array<CharacterInfo>) => {
        console.log(arr.length);
    })
    .catch((err) => console.log(err));
