import { Item } from "src/app/_models/item.model";

export class Invoice {
    _id?: string;
    isPaid?: boolean;
    items?: Item[];
    createdAt?: string;
    priceTotal?: string;
    updatedAt?: string;
    taxTotal?: string;
    references?: string;

}


export class InvoiceSave {
    _id?: string;
    isPaid?: boolean;
    items?: string[];
}
