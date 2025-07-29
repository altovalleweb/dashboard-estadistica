export class EscuelasMatriculaDataOption {
    
    
    getEscuelasMatriculaModalidadComun(dataEscuelas:number[] | null, dataMatricula:number[]| null, categories:string[]| null){ 
        return {
              series: [
                {
                  name: "Escuelas",
                  data: dataEscuelas
                },
                {
                  name: "Matricula",

                  data: dataMatricula
                }
              ],
              chart: {
                type: "bar",
                height: 350,
                    toolbar: {
              show: false
            },
              },
        
               
              plotOptions: {
                bar: {
                  horizontal: true,
                  dataLabels: {
                    position: "top"
                  }
                }
              },
              dataLabels: {
                enabled: true,
                offsetX: 10,
                style: {
                  fontSize: "12px",
                  colors: ["#304758"]
                }
              },
              stroke: {
                show: true,
                width: 1,
                colors: ["#fff"]
              },
              xaxis: {
                categories: categories,
                 axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            labels: {
              show: false
            },
            lines: {
              show: false
            }
              }
            }
    }

    
}