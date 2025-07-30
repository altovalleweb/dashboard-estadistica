

export const matriculaPorModalidadNivel = [
  {
    anio: '2025',
    rural: 0,
    total: 30,
    urbano: 30,
    estatal: 30,
    privada: 0,
    modalidad: 'Adultos',
    nivel_oferta: 'Formación Profesional',
  },
  {
    anio: '2025',
    rural: 240,
    total: 2284,
    urbano: 2044,
    estatal: 2232,
    privada: 0,
    modalidad: 'Adultos',
    nivel_oferta: 'Primario',
  },
  {
    anio: '2025',
    rural: 10,
    total: 18,
    urbano: 8,
    estatal: 18,
    privada: 0,
    modalidad: 'Adultos',
    nivel_oferta: 'Secundario 2 años',
  },
  {
    anio: '2025',
    rural: 272,
    total: 5349,
    urbano: 5077,
    estatal: 4957,
    privada: 0,
    modalidad: 'Adultos',
    nivel_oferta: 'Secundario 3 años',
  },
  {
    anio: '2025',
    rural: 19,
    total: 4362,
    urbano: 4343,
    estatal: 4362,
    privada: 0,
    modalidad: 'Adultos',
    nivel_oferta: 'Secundario 4 años',
  },
  {
    anio: '2025',
    rural: 0,
    total: 377,
    urbano: 377,
    estatal: 377,
    privada: 0,
    modalidad: 'Adultos',
    nivel_oferta: 'Secundario 5 años',
  },
  {
    anio: '2025',
    rural: 0,
    total: 39,
    urbano: 39,
    estatal: 39,
    privada: 0,
    modalidad: 'Común',
    nivel_oferta: 'Ciclos de Enseñanza Artística',
  },
  {
    anio: '2025',
    rural: 976,
    total: 21403,
    urbano: 20427,
    estatal: 17261,
    privada: 0,
    modalidad: 'Común',
    nivel_oferta: 'Inicial',
  },
  {
    anio: '2025',
    rural: 4487,
    total: 81148,
    urbano: 76661,
    estatal: 67507,
    privada: 0,
    modalidad: 'Común',
    nivel_oferta: 'Primario',
  },
  {
    anio: '2025',
    rural: 2052,
    total: 39605,
    urbano: 37553,
    estatal: 31630,
    privada: 0,
    modalidad: 'Común',
    nivel_oferta: 'Secundario 5 años',
  },
  {
    anio: '2025',
    rural: 433,
    total: 21666,
    urbano: 21233,
    estatal: 20409,
    privada: 0,
    modalidad: 'Común',
    nivel_oferta: 'Secundario 6 años',
  },
  {
    anio: '2025',
    rural: 55,
    total: 55,
    urbano: 0,
    estatal: 55,
    privada: 0,
    modalidad: 'Común',
    nivel_oferta: 'Servicios Complementarios',
  },
  {
    anio: '2025',
    rural: 34,
    total: 3052,
    urbano: 3018,
    estatal: 2769,
    privada: 0,
    modalidad: 'Común',
    nivel_oferta: 'SNU',
  },
  {
    anio: '2025',
    rural: 0,
    total: 40,
    urbano: 40,
    estatal: 40,
    privada: 0,
    modalidad: 'Especial',
    nivel_oferta: 'Inicial',
  },
  {
    anio: '2025',
    rural: 0,
    total: 880,
    urbano: 880,
    estatal: 880,
    privada: 0,
    modalidad: 'Especial',
    nivel_oferta: 'Primario',
  },
];




const totalEscuelasUltimoAnio = matriculaPorModalidadNivel.reduce((acc, val) => acc + val.total, 0);

export const total_matricula_por_anio = [
    {
        "anio": 2020,
        "total": 233530
    },

    {
        "anio": 2021,
        "total": 231727
    },
    {
        "anio": 2022,
        "total": 231412
    },
    {
        "anio": 2023,
        "total": 234794
    },
    {
        "anio": 2024,
        "total": 234625
    },
    {
        "anio": 2025,
        "total": totalEscuelasUltimoAnio
    }
];