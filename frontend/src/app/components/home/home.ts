import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { TableStateService } from '../home/table-state.service'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    CardModule, 
    ChartModule, 
    TableModule,
    ChipModule, 
    ButtonModule, 
    InputTextModule, 
    BadgeModule,
    DialogModule,
    AutoCompleteModule,
    FormsModule,
    TooltipModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  nextRunTimer = '7H:52M:25S';
  filterVisible: boolean = false;
  isTableExpanded: boolean = false;

  // Filter data
  filterConditions: any[] = [
    { column: 'Bwic Cover', operator: 'is equal to', values: 'JPMO' }
  ];

  columnOptions = ['Bwic Cover', 'Ticker', 'CUSIP', 'Bias', 'Date', 'Source'];
  filteredColumnOptions: string[] = [];
  
  operatorOptions = ['is equal to', 'is not equal to', 'contains', 'does not contain', 'is greater than', 'is less than'];
  filteredOperatorOptions: string[] = [];

  availableColorsChart: any;
  availableColorsOptions: any;

  // Table data
  tableData = [
    {
      messageId: '17588122041460511',
      ticker: 'BBSBPTS 12X A1',
      cusip: '860443AC4',
      bias: 'BWIC_COVER',
      date: '07/19/2025',
      bid: '100.2',
      mid: '101.2',
      ask: '102.2',
      source: 'Bwic Cover'
    },
    {
      messageId: '17588122041460581',
      ticker: 'BBSBPTS 12X A1',
      cusip: '860443AC4',
      bias: 'MARKET',
      date: '07/19/2025',
      bid: '100.2',
      mid: '101.2',
      ask: '102.2',
      source: 'Market'
    },
    {
      messageId: '17588122041460582',
      ticker: 'BBSBPTS 12X A2',
      cusip: '860443AC5',
      bias: 'BWIC_COVER',
      date: '07/20/2025',
      bid: '101.5',
      mid: '102.5',
      ask: '103.5',
      source: 'Bwic Cover'
    },
    {
      messageId: '17588122041460583',
      ticker: 'BBSBPTS 12X A3',
      cusip: '860443AC6',
      bias: 'MARKET',
      date: '07/21/2025',
      bid: '99.8',
      mid: '100.8',
      ask: '101.8',
      source: 'Market'
    },
    {
      messageId: '17588122041460584',
      ticker: 'BBSBPTS 12X A4',
      cusip: '860443AC7',
      bias: 'BWIC_COVER',
      date: '07/22/2025',
      bid: '102.1',
      mid: '103.1',
      ask: '104.1',
      source: 'Bwic Cover'
    },
    {
      messageId: '17588122041460585',
      ticker: 'BBSBPTS 12X A5',
      cusip: '860443AC8',
      bias: 'MARKET',
      date: '07/23/2025',
      bid: '98.5',
      mid: '99.5',
      ask: '100.5',
      source: 'Market'
    }
  ];

  constructor(private tableStateService: TableStateService) {}

  ngOnInit() {
    this.initChart();
    // Initialize filtered options with all options
    this.filteredColumnOptions = [...this.columnOptions];
    this.filteredOperatorOptions = [...this.operatorOptions];
  }

  private initChart() {
    // Data exactly matches your pattern: alternating 1.2k and 2.1k
    const data = [1200, 2100, 1200, 2100, 1200, 2100, 1200, 2100, 1200, 2100, 1200, 2100];

    this.availableColorsChart = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Colors',
        data: data,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, data: chartData, chartArea } = chart;
          if (!chartArea) return '#374151'; // fallback

          // Create gradient once per bar
          return data.map((value, index) => {
            const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, '#3D3D3D');    // Bottom: Dark Gray
            gradient.addColorStop(0.5, '#A6A6A6');   // Middle: Medium Gray
            gradient.addColorStop(1, '#D9D9D9');    // Top: Light Gray
            return gradient;
          });
        },
        borderRadius: 6,
        barThickness: 28,
        categoryPercentage: 0.8,
        barPercentage: 0.9,
        borderWidth: 0
      }]
    };

    this.availableColorsOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          callbacks: {
            label: (context: any) => {
              const value = context.parsed.y;
              return value >= 1000 ? `${(value / 1000).toFixed(1)}k Colors` : `${value} Colors`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: '#6B7280',
            font: { size: 11 }
          },
          border: { display: false }
        },
        y: {
          grid: { color: '#E5E7EB', drawTicks: false },
          ticks: {
            color: '#6B7280',
            font: { size: 11 },
            callback: (value: any) => value >= 1000 ? `${value / 1000}k` : value,
            padding: 10
          },
          border: { display: false },
          beginAtZero: true,
          max: 2500
        }
      },
      animation: {
        duration: 800
      }
    };
  }

  // AutoComplete search methods
  searchColumn(event: any) {
    const query = event.query.toLowerCase();
    this.filteredColumnOptions = this.columnOptions.filter(option => 
      option.toLowerCase().includes(query)
    );
  }

  searchOperator(event: any) {
    const query = event.query.toLowerCase();
    this.filteredOperatorOptions = this.operatorOptions.filter(option => 
      option.toLowerCase().includes(query)
    );
  }

  // Filter methods
  showFilterDialog() {
    this.filterVisible = true;
  }

  addCondition() {
    this.filterConditions.push({ column: 'Bwic Cover', operator: 'is equal to', values: '' });
  }

  addSubgroup() {
    // Implementation for adding subgroup
    console.log('Add subgroup clicked');
  }

  addGroup() {
    // Implementation for adding group
    console.log('Add group clicked');
  }

  removeAllFilters() {
    this.filterConditions = [];
  }

  applyFilters() {
    this.filterVisible = false;
    // Apply your filter logic here
    console.log('Filters applied:', this.filterConditions);
  }

  removeCondition(index: number) {
    this.filterConditions.splice(index, 1);
  }

  // Table expansion methods
  toggleTableExpansion() {
    this.isTableExpanded = !this.isTableExpanded;
    this.tableStateService.setTableExpanded(this.isTableExpanded);
  }
}