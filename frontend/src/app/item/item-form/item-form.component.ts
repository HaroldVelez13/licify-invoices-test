import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/_models/item.model';
import { ItemService } from 'src/app/_services/item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit{
  item: Item = {
    tax: 0,
    price: 0,
    name: ""
  };
  submitted = false;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
  }
  saveItem(): void {
    const data = {
      tax: this.item.tax?.toFixed(2),
      price: this.item.price?.toFixed(2),
      name: this.item.name,
    };

    this.itemService.create(data)
      .subscribe({
        next: (res) => {
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newItem(): void {
    this.submitted = false;
    this.item = {
      tax: 0,
      price: 0,
      name: ""
    };
  }

}
