import { TransactionLine} from '../app/transactionLine'
export class ResponseData
{
    lines : TransactionLine[];
    count : number;
    success : boolean;
    errors : string[];
}