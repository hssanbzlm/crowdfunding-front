import { Feedback } from './feedback';

export class Project { 
  _id:string;
  title:string;
  description:string;
  totalFund:number;
  budget:number;
  feedback:Array<Feedback>;

}
