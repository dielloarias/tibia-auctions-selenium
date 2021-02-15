import { CharacterInfo } from "./Interfaces";
import { VarreduraTibiaAuctions } from "./VarreduraTibiaAuctions";
import { VarreduraDelegatePastTrades } from "./delegate/VarreduraDelegate";

const varredor = new VarreduraTibiaAuctions();

varredor.delegate = VarreduraDelegatePastTrades;

varredor
    .historico()
    .then((arr: Array<CharacterInfo>) => {
        console.log(arr.length);
    })
    .catch((err) => console.log(err));
