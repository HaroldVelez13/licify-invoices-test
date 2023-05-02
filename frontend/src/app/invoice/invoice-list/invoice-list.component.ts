import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/_models/invoice.model';
import { InvoiceService } from 'src/app/_services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit{
  invoices?: Invoice[];
  currentInvoice: Invoice = {};
  currentIndex = -1;
  reference = '';
  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.retrieveItems()
  }

  retrieveItems(): void {
    this.invoiceService.getAll()
      .subscribe({
        next: (data) => {
          this.invoices= data;
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveItems();
    this.currentInvoice = {};
    this.currentIndex = -1;
  }

  setActiveInvoice(item: Invoice, index: number): void {
    this.currentInvoice = item;
    this.currentIndex = index;
  }
  clearActiveInvoice(): void {
    this.currentInvoice = {};
    this.currentIndex = -1;
  }

 
  searchRef(): void {
    this.currentInvoice = {};
    this.currentIndex = -1;

   this.invoiceService.findByRef(this.reference)
      .subscribe({
        next: (data) => {
          this.invoices = data;
        },
        error: (e) => console.error(e)
      });
  } 

}
