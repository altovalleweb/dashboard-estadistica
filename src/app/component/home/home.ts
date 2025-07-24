import { Component, signal } from '@angular/core';
import {  KPIData } from '../kpi-card/kpi-card';
import { matriculaPorModalidadNivelTotalProvinciaDataOptions, matriculaPorSectorTotalProvinciaDataOptions } from '../../data/matricula-data-options';
import { KpiCardV2, KPIDataV2 } from '../kpi-card-v2/kpi-card-v2';
import { UnidadesDeServicioPorModalidadNivelTotalProvinciaDataOptions } from '../../data/unidadesDeServicio-data-options';
import { KpiCardV3, KPIDataV3 } from "../kpi-card-v3/kpi-card-v3";


@Component({
  selector: 'app-home',
  imports: [ KpiCardV2, KpiCardV3],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
kpiData: KPIData[] = [
    {
      number: "1.015",
      title: "Escuelas",
      subtitle: "(Unidades de Servicio)",
      bgColor: "#334155",
       iconPath: "M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm12-6.5v3h2v-3h-2z",
      
      stats: [
        {
          label1: "Estatal",
          label2: "Privado",
          color1: "#334155",
          color2: "#2dd4bf",
          percent1: 77,
          percent2: 23
        },
        {
          label1: "Rural",
          label2: "Urbano",
          color1: "#fb923c",
          color2: "#9ca3af",
          percent1: 46,
          percent2: 54
        }
      ]
    },
    {
      number: "236.951",
      title: "Alumnos/as",
      bgColor: "#475569",
      iconPath: "M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z",
       showChart: true,
      chartType: 'pie',
      stats: [
        {
          label1: "Estatal",
          label2: "Privado",
          color1: "#475569",
          color2: "#2dd4bf",
          percent1: 70,
          percent2: 30
        },
        {
          label1: "Rural",
          label2: "Urbano",
          color1: "#fb923c",
          color2: "#9ca3af",
          percent1: 9,
          percent2: 91
        }
      ]
    }
  ];

  option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  series: [
    {
      name: 'Direct',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [320, 302, 301, 334, 390, 330, 320]
    },
    {
      name: 'Mail Ad',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Affiliate Ad',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ad',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [150, 212, 201, 154, 190, 330, 410]
    },
    {
      name: 'Search Engine',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [820, 832, 901, 934, 1290, 1330, 1320]
    }
  ]
};

dataOptions = signal(matriculaPorSectorTotalProvinciaDataOptions)
matriculaPorModalidadNivelTotalProvinciaDataOptions = signal(matriculaPorModalidadNivelTotalProvinciaDataOptions)


kpiDataV2: KPIDataV2[] = [
   {
      number: "1.015",
      title: "Escuelas",
      subtitle: "(Unidades de Servicio)",
      bgColor: "#334155",
       iconPath: "M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm12-6.5v3h2v-3h-2z",
      showChart: true,
      chartType: 'donut',
      chartDataOptions:     UnidadesDeServicioPorModalidadNivelTotalProvinciaDataOptions
     
   },
    {
      number: "236.951",
      title: "Alumnos/as",
      bgColor: "#475569",
      iconPath: "M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z",
       showChart: true,
      chartType: 'pie',
      chartDataOptions: matriculaPorModalidadNivelTotalProvinciaDataOptions
    }

]

kpiDataV3: KPIDataV3[] = [
   {
      number: "1.015",
      title: "Escuelas",
      subtitle: "(Unidades de Servicio)",
      bgColor: "#334155",
       iconPath: "M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm12-6.5v3h2v-3h-2z",
      showChart: true,
      chartType: 'donut',
      chartDataOptions:     UnidadesDeServicioPorModalidadNivelTotalProvinciaDataOptions
     
   },
]

}
