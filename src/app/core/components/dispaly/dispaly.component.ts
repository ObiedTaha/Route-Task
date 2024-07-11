import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-dispaly',
  templateUrl: './dispaly.component.html',
  styleUrls: ['./dispaly.component.scss']
})
export class DispalyComponent implements OnInit {
  constructor(private _CustomerService: CustomerService) { }
  data: any = {};
  searchTerm: any;
  ngOnInit(): void {
    this.getCustomerData();
  }

  getCustomerData(): void {
    this._CustomerService.getCustomer().subscribe({
      next: (response) => {
        this.data = response;
      }
    })
  }

}
