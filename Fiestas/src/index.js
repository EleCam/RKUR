import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import {CustomProvider} from "rsuite";
import { es } from 'date-fns/locale';

// import { setTheme } from 'rsuite';

// setTheme({
//   primaryColor: '#f44336',
// });

const Calendar = {
  // monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  sunday: 'Dom',
  monday: 'Lun',
  tuesday: 'Mar',
  wednesday: 'Mie',
  thursday: 'Jue',
  friday: 'Vie',
  saturday: 'Sab',
  ok: 'OK',
  today: 'Hoy',
  yesterday: 'Yesterday',
  hours: 'Horas',
  minutes: 'Minutos',
  seconds: 'Segundos',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  dateLocale: es
};

const locale = {
  common: {
    loading: 'Cargando...',
    emptyMessage: 'Sin datos'
  },
  Plaintext: {
    unfilled: 'Unfilled',
    notSelected: 'Not selected',
    notUploaded: 'Not uploaded'
  },
  Pagination: {
    more: 'Mas',
    prev: 'Antes',
    next: 'Despues',
    first: 'Primero',
    last: 'Last',
    limit: '{0} / page',
    total: 'Total Rows: {0}',
    skip: 'Go to{0}'
  },
  Calendar,
  DatePicker: {
    ...Calendar
  },
  DateRangePicker: {
    ...Calendar,
    last7Days: 'Last 7 Days'
  },
  Picker: {
    noResultsText: 'Sin resultados',
    placeholder: 'Selecionar',
    searchPlaceholder: 'Buscar',
    checkAll: 'Todos'
  },
  InputPicker: {
    newItem: 'Nuevo Elemento',
    createOption: 'Crear Opcion "{0}"'
  },
  Uploader: {
    inited: 'Initial',
    progress: 'Subiendo',
    error: 'Error',
    complete: 'Finished',
    emptyFile: 'Vacio',
    upload: 'Upload'
  },
  CloseButton: {
    closeLabel: 'Cerrar'
  },
  Breadcrumb: {
    expandText: 'Show path'
  },
  Toggle: {
    on: 'Abrir',
    off: 'Cerrar'
  }
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <CustomProvider locale={locale} theme="dark">
      <App />
    </CustomProvider>
);
