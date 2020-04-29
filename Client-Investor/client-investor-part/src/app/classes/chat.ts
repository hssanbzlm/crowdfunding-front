import { Message } from './message';
import { Investor } from './investor';

export class Chat {  
    _id:string;
    idClient:string;
    idProject:string;
    idInvestors:Investor[];
    idMessages:Message[];
    
}
