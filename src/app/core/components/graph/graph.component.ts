import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Chart } from 'chart.js/auto';
import { ChartModule } from 'primeng/chart';
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
    selector: 'app-graph',
    standalone: true,
    imports: [CommonModule, ChartModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule

    ],
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements AfterViewInit, OnChanges, OnDestroy {
    constructor() { }
    @Input() transactions: any[] = [];
    chart: Chart | null = null;

    ngAfterViewInit(): void {
        if (this.transactions.length > 0) {
            this.renderChart();
        }
    }

    ngOnChanges(): void {
        if (this.chart) {
            this.chart.destroy(); // Destroy existing chart if it exists
        }
        if (this.transactions.length > 0) {
            this.renderChart();
        }
    }

    ngOnDestroy(): void {
        if (this.chart) {
            this.chart.destroy(); // Ensure chart is destroyed when component is destroyed
        }
    }

    renderChart(): void {
        const labels = this.transactions.map(transaction => transaction.date);
        const data = this.transactions.map(transaction => transaction.amount);
        console.log(this.transactions)
        console.log(labels)
        console.log(data)


        this.chart = new Chart('Transactions', {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Transactions',
                    data: data,
                    fill: false,
                    borderColor: '#3252dfda',
                    tension: 0.1
                }]
            }
        });
    }

}
