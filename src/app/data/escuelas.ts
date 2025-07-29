
export const escuelasPorModalidadNivel= [{"rural": 0, "total": 1, "urbano": 1, "estatal": 1, "privada": 0, "modalidad": "Adultos", "nivel_oferta": "Domiciliaria"}, {"rural": 12, "total": 105, "urbano": 93, "estatal": 93, "privada": 0, "modalidad": "Adultos", "nivel_oferta": "Formación Profesional"}, {"rural": 26, "total": 76, "urbano": 50, "estatal": 71, "privada": 0, "modalidad": "Adultos", "nivel_oferta": "Primario"}, {"rural": 14, "total": 83, "urbano": 69, "estatal": 76, "privada": 0, "modalidad": "Adultos", "nivel_oferta": "Secundario"}, {"rural": 0, "total": 8, "urbano": 8, "estatal": 8, "privada": 0, "modalidad": "Común", "nivel_oferta": "Ciclos de Enseñanza Artística"}, {"rural": 0, "total": 10, "urbano": 10, "estatal": 6, "privada": 0, "modalidad": "Común", "nivel_oferta": "Cursos de Capacitación de SNU"}, {"rural": 1, "total": 15, "urbano": 14, "estatal": 15, "privada": 0, "modalidad": "Común", "nivel_oferta": "Cursos y Talleres de Artística"}, {"rural": 0, "total": 28, "urbano": 28, "estatal": 28, "privada": 0, "modalidad": "Común", "nivel_oferta": "Domiciliaria"}, {"rural": 110, "total": 318, "urbano": 208, "estatal": 251, "privada": 0, "modalidad": "Común", "nivel_oferta": "Inicial"}, {"rural": 142, "total": 381, "urbano": 239, "estatal": 327, "privada": 0, "modalidad": "Común", "nivel_oferta": "Primario"}, {"rural": 30, "total": 131, "urbano": 101, "estatal": 92, "privada": 0, "modalidad": "Común", "nivel_oferta": "Secundario 5 años"}, {"rural": 3, "total": 41, "urbano": 38, "estatal": 35, "privada": 0, "modalidad": "Común", "nivel_oferta": "Secundario 6 años"}, {"rural": 11, "total": 42, "urbano": 31, "estatal": 41, "privada": 0, "modalidad": "Común", "nivel_oferta": "Servicios complementarios"}, {"rural": 4, "total": 64, "urbano": 60, "estatal": 38, "privada": 0, "modalidad": "Común", "nivel_oferta": "SNU"}, {"rural": 2, "total": 32, "urbano": 30, "estatal": 31, "privada": 0, "modalidad": "Especial", "nivel_oferta": "Cursos/Talleres de la Escuela Especial"}, {"rural": 0, "total": 4, "urbano": 4, "estatal": 4, "privada": 0, "modalidad": "Especial", "nivel_oferta": "Domiciliaria"}, {"rural": 1, "total": 13, "urbano": 12, "estatal": 12, "privada": 0, "modalidad": "Especial", "nivel_oferta": "Educacion integral para adolescentes y jovenes"}, {"rural": 1, "total": 21, "urbano": 20, "estatal": 20, "privada": 0, "modalidad": "Especial", "nivel_oferta": "Inicial"}, {"rural": 9, "total": 43, "urbano": 34, "estatal": 43, "privada": 0, "modalidad": "Especial", "nivel_oferta": "Integración"}, {"rural": 6, "total": 33, "urbano": 27, "estatal": 32, "privada": 0, "modalidad": "Especial", "nivel_oferta": "Primario"}, {"rural": 0, "total": 2, "urbano": 2, "estatal": 2, "privada": 0, "modalidad": "Especial", "nivel_oferta": "Taller de Educación Integral para Adolescentes y Jóvenes/Secundario"}, {"rural": 0, "total": 3, "urbano": 3, "estatal": 3, "privada": 0, "modalidad": "Especial", "nivel_oferta": "Taller de nivel Primario"}]


const totalEscuelasUltimoAnio = escuelasPorModalidadNivel.reduce((acc, val) => acc + val.total, 0);

export const total_escuelas_por_anio = [    
    {
        "anio": 2020, // valor del relevamiento anual 2020
        "total": 1248
    },

    {
        "anio": 2021, // valor del relevamiento anual 2021
        "total":  1238
    },
    {
        "anio": 2022, // valor del relevamiento anual 2022
        "total": 1267
    },
    {
        "anio": 2023, // valor del relevamiento anual 2023
        "total": 1268
    },
    {
        "anio": 2024, // valor del relevamiento anual 2024
        "total": 1266
    },
    { 
        "anio": 2025, // valor del actual dato tomado del padron nacional
        "total":  totalEscuelasUltimoAnio
    }
];













