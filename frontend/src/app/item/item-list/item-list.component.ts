import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/_models/item.model';
import { ItemService } from 'src/app/_services/item.service';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit{
  items?: Item[];
  currentItem: Item = {};
  currentIndex = -1;
  name = '';
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.retrieveItems()
  }

  retrieveItems(): void {
    this.itemService.getAll()
      .subscribe({
        next: (data) => {
          this.items = data;
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveItems();
    this.currentItem = {};
    this.currentIndex = -1;
  }

  setActiveItem(item: Item, index: number): void {
    this.currentItem = item;
    this.currentIndex = index;
  }
  clearActiveItem(): void {
    this.currentItem = {};
    this.currentIndex = -1;
  }

 
  searchName(): void {
    this.currentItem = {};
    this.currentIndex = -1;
   this.itemService.findByTitle(this.name)
      .subscribe({
        next: (data:Item[]) => {
          this.items = data;
        },
        error: (e:any) => console.error(e)
      });
  } 

}
