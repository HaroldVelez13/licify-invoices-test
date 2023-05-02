import { Component, Input, OnInit } from '@angular/core';
import { Invoice } from 'src/app/_models/invoice.model';
import { InvoiceService } from 'src/app/_services/invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/_models/item.model';
import { ItemService } from 'src/app/_services/item.service';


@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit{
  @Input() viewMode = false;

  @Input() currentInvoice: Invoice = {
    isPaid: false,
    items:[],
  };

  form: any = {
    isPaid: '',
  };
  listItems: Item[]=[];
  message = '';

  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService) { }
  
    ngOnInit(): void {
      if (!this.viewMode) {
        this.message = '';
        this.getInvoice(this.route.snapshot.params["id"]);
        this.retrieveItems()
      }
    }
    getInvoice(id: string): void {
      this.invoiceService.get(id)
        .subscribe({
          next: (data) => {
            this.currentInvoice = data;
          },
          error: (e) => console.error(e)
        });
    }
  
  
    updateInvoice(): void {
      this.message = '';
  
      this.invoiceService.update(this.currentInvoice._id, this.currentInvoice)
        .subscribe({
          next: (res) => {
            this.message = res.message ? res.message : 'This Invoice was updated successfully!';
          },
          error: (e) => console.error(e)
        });
    }
  
    deleteInvoice(): void {
      this.invoiceService.delete(this.currentInvoice._id)
        .subscribe({
          next: (res) => {
            this.router.navigate(['/invoices']);
          },
          error: (e) => console.error(e)
        });
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
    checkItem(event: Event,item:Item): void { 
      const isChecked = (event.target as HTMLInputElement).checked
      if (isChecked) { 
        this.currentInvoice.items?.push(item)
      } else { 
        this.currentInvoice.items =  this.currentInvoice.items?.filter(currentItem=>currentItem !==item)
      }
    
    }
  isCheck(item:Item) { 
    return this.currentInvoice.items?.filter(i=>i._id===item._id).length
  }

}
