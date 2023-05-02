import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/_models/item.model';
import { ItemService } from 'src/app/_services/item.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit{
  @Input() viewMode = false;

  @Input() currentItem: Item = {
    name: '',
    tax: 0.0,
    price: 0.0
  };

  form: any = {
    name: '',
    tax: 0.0,
    price: 0.0
  };
  message = '';

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router) { }
  
    ngOnInit(): void {
      if (!this.viewMode) {
        this.message = '';
        this.getItem(this.route.snapshot.params["id"]);
      }
    }
    getItem(id: string): void {
      this.itemService.get(id)
        .subscribe({
          next: (data) => {
            this.currentItem = data;
          },
          error: (e) => console.error(e)
        });
    }
  
  
    updateItem(): void {
      this.message = '';
  
      this.itemService.update(this.currentItem._id, this.currentItem)
        .subscribe({
          next: (res) => {
            this.message = res.message ? res.message : 'This item was updated successfully!';
          },
          error: (e) => console.error(e)
        });
    }
  
    deleteItem(): void {
      this.itemService.delete(this.currentItem._id)
        .subscribe({
          next: (res) => {
            this.router.navigate(['/items']);
          },
          error: (e) => console.error(e)
        });
    }

}
