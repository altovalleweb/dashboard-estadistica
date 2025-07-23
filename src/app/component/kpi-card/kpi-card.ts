import { Component, Input, OnInit, ViewChild, AfterViewInit,  PLATFORM_ID, Inject, signal, computed, effect } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

// ApexCharts imports
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';



export interface KPIStat {
  label1: string;
  label2: string;
  color1: string;
  color2: string;
  percent1: number;
  percent2: number;
}

export interface ChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  responsive: ApexResponsive[];
  legend: {
    show: boolean;
  };
  dataLabels: {
    enabled: boolean;
  };
  plotOptions: {
    pie: {
      donut: {
        size: string;
      };
    };
  };
}

export interface KPIData {
  number: string;
  title: string;
  subtitle?: string;
  bgColor: string;
  iconPath: string;
  stats: KPIStat[];
  showChart?: boolean;
  chartType?: 'donut' | 'pie' | 'radialBar';
}



@Component({
  selector: 'app-kpi-card',
  imports: [NgApexchartsModule],
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.css'
})
export class KpiCard implements OnInit, AfterViewInit {
   @Input() set data(value: KPIData) {
    this.kpiData.set(value);
  }
  get data(): KPIData {
    return this.kpiData();
  }


  @ViewChild('chart') chart!: ChartComponent;
  
  // Signals
  private kpiData = signal<KPIData>({} as KPIData);
  public chartOptions = signal<Partial<ChartOptions>>({});
  public legendItems = signal<any[]>([]);
  public isBrowser = signal<boolean>(false);
  public isChartReady = signal<boolean>(false);
  
  // Computed signals
  public showChart = computed(() => 
    this.kpiData().showChart && this.isBrowser() && this.isChartReady()
  );
  
  public showLoading = computed(() => 
    this.kpiData().showChart && !this.isBrowser()
  );
  
  public hasSubtitle = computed(() => 
    !!this.kpiData().subtitle
  );
  
  public chartTitle = computed(() => 
    this.kpiData().title || 'KPI'
  );

 constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser.set(isPlatformBrowser(this.platformId));
    
    // Effect para reaccionar a cambios en los datos
    effect(() => {
      const data = this.kpiData();
      if (data.showChart && this.isBrowser()) {
        this.initializeChart();
      }
    });
  }

  ngOnInit() {
    // Los signals se manejan automáticamente con effects
  }

  ngAfterViewInit() {
    // Marcar que el chart está listo para renderizar
    if (this.isBrowser()) {
      setTimeout(() => {
        this.isChartReady.set(true);
      }, 0);
    }
  }

  private initializeChart() {
    const data = this.kpiData();
    if (!data.stats || data.stats.length === 0) return;
    
    // Preparar datos para ApexCharts
    const series: number[] = [];
    const labels: string[] = [];
    const colors: string[] = [];
    const legendItemsData: any[] = [];
    
    data.stats.forEach(stat => {
      series.push(stat.percent1, stat.percent2);
      labels.push(stat.label1, stat.label2);
      colors.push(stat.color1, stat.color2);
      
      // Preparar items para la leyenda
      legendItemsData.push(
        { label: stat.label1, value: stat.percent1, color: stat.color1 },
        { label: stat.label2, value: stat.percent2, color: stat.color2 }
      );
    });

    // Actualizar signals
    this.legendItems.set(legendItemsData);
    
    this.chartOptions.set({
      series: series,
      chart: {
        type: data.chartType || 'donut',
        width: 192,
        height: 192,
        animations: {
          enabled: true,
          
          speed: 800,
        },
        toolbar: {
          show: false
        }
      },
      labels: labels,
      colors: colors,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 160,
              height: 160
            }
          }
        }
      ],
      legend: {
        show: false // Usamos nuestra propia leyenda
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        pie: {
          donut: {
            size: data.chartType === 'donut' ? '50%' : '0%'
          }
        }
      }
    });
  }

  public updateChart() {
    if (this.chart && this.isBrowser()) {
      this.initializeChart();
    }
  }
  
  // Método helper para actualizar datos desde el padre
  public updateData(newData: Partial<KPIData>) {
    this.kpiData.update(current => ({ ...current, ...newData }));
  }

}
