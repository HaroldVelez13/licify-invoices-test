import { Component, OnInit } from '@angular/core';
import { Invoice, InvoiceSave } from 'src/app/_models/invoice.model';
import { Item } from 'src/app/_models/item.model';
import { InvoiceService } from 'src/app/_services/invoice.service';
import { ItemService } from 'src/app/_services/item.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit{
  invoice: InvoiceSave = {
      _id: "",
      isPaid: false,
      items:[]
    };
  listItems: Item[]=[];
  submitted = false;

  constructor(private invoiceService: InvoiceService, private itemService: ItemService) { }

  ngOnInit(): void {
    this.retrieveItems()
  }
  saveInvoice(): void {
    const data = {
      isPaid: this.invoice.isPaid,
      items: this.invoice.items,
    };

    this.invoiceService.create(data)
      .subscribe({
        next: (res) => {
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newIvoice(): void {
    this.submitted = false;
    this.invoice = {
      _id: "",
      isPaid: false,
      items:[]
    };
  }
  retrieveItems(): void {
    this.itemService.getAll()
      .subscribe({
        next: (data) => {
          this.listItems = data;
        },
        error: (e) => console.error(e)
      });
  };
  checkItem(event: Event,item:string): void { 
    const isChecked = (event.target as HTMLInputElement).checked
    if (isChecked) { 
      this.invoice.items?.push(item)
    } else { 
      this.invoice.items =  this.invoice.items?.filter(currentItem=>currentItem !==item)
    }  
  }

}
