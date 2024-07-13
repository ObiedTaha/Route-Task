import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';
import { CommonModule } from '@angular/common';
import { GraphComponent } from '../graph/graph.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoDataComponent } from '../no-data/no-data.component';

@Component({
  selector: 'app-dispaly',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchPipe, GraphComponent, MatFormFieldModule, MatInputModule, MatIconModule, NoDataComponent ],
  templateUrl: './dispaly.component.html',
  styleUrls: ['./dispaly.component.scss']
})
export class DispalyComponent implements OnInit {
  constructor(private _CustomerService: CustomerService) { }
  data: any = {};
  transactions: any[] = [];
  searchTerm: string = '';
  selectedCustomerTransactions: any[] = [];
  customerTransactionAmounts: { [key: string]: number } = {};
  ngOnInit(): void {
    this.getCustomerData();
    this.calculateTransactionAmounts();
  }

  getCustomerData(): void {
    this._CustomerService.getCustomer().subscribe({
      next: (response) => {
        this.data = response;
        this.transactions = response.transactions;
        this.calculateTransactionAmounts();
      }
    })
  }

  selectCustomer(customerId: string): void {
    this.selectedCustomerTransactions = this.transactions.filter(transaction => transaction.customer_id === +customerId);
    this.calculateTransactionAmounts();

  }

  calculateTransactionAmounts(): void {
    if (this.transactions.length != 0) {
      this.customerTransactionAmounts = this.data.customers.reduce((acc: any, customer: any) => {
        const totalAmount = this.transactions
          .filter(transaction => transaction.customer_id === +customer.id)
          .reduce((sum, transaction) => sum + transaction.amount, 0);
        acc[customer.id] = totalAmount;
        return acc;
      }, {} as { [key: string]: number });
    }
  }
}
