import React, { useState, useEffect } from "react";
import ModuleDashboard from "./ModuleDashboard";
// import { Button } from 'rsuite';
import "rsuite/dist/rsuite.min.css"; // or 'rsuite/dist/rsuite.min.css'
import "./index.css";
import Modules from "./Modules";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import CalendarIcon from "@rsuite/icons/Calendar";
import ModuleClientes from "./ModuleClientes";
import ModuleProductos from "./ModuleProductos";
import ModuleFiestas from "./ModuleFiestas";
import ModuleCefs from "./ModuleCefs";
import ModuleCotizador from "./ModuleCotizador";
import ModuleCalendar from "./ModuleCalendar";
import AdminIcon from "@rsuite/icons/Admin";
import PeoplesIcon from "@rsuite/icons/Peoples";
import DetailIcon from "@rsuite/icons/Detail";
import ModuleCotizacionesFiestologo from "./ModuleCotizacionesFiestologo";
import ModuleInformeComisiones from "./ModuleInformeComisiones";
import ModuleUsuarios from "./ModuleUsuarios";
import ModuleMetasLocales from "./ModuleMetasLocales";
import ModulePagos from "./ModulePagos";
import ModuleContrato from "./ModuleContrato";
import ModuleAutorizaCotizacion from "./ModuleAutorizaCotizacion";
import { fetchQuery} from "./el3cam/el3cam";
const color1 = "#1a1d24";

//Funcion usando la libreria el3cam estandarizada
export async function fetchF(data, service = "fiestas_services.php") {
  const settings = {
    data,
    url: "https://diniz.com.mx/diniz/servicios/services/",
    service,
    qa: true,
  };
  return await fetchQuery(settings);
}
//Esta se queda por lo que ya se desarrollo 
export const fetchServer = async (info, infoReturn) => {
  const data = new FormData();
  info.forEach((item) => data.append(item[0], item[1]));
  const response = await fetch(
    "https://diniz.com.mx/diniz/servicios/services/fiestas_services.php?" +
      info[0][1],
    {
      method: "POST",
      body: data,
      header: new Headers({
        "Content-Type": "application/json",
      }),
    }
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.OK && !infoReturn) return response;
      else if (response.OK && response[infoReturn]) return response[infoReturn];
      else return false;
    })
    .catch(() => console.log("Error"));
  return await response;
  // await 'q'
};
window.empleado = { noempl: 37604, cef: 1, rol: 10 }; //Esta variable debe de contener el noempl, cef default
const App = () => {
  var rol = false;
  const [menu, setMenu] = useState(null);
  const consultarRoles = () => {
    let data = {
      optionService: "UsersRol",
      noempl: window.empleado.noempl,
    };
    fetchF(data).then(({ UsersRol }) => {
      window.empleado.rol = rol = parseInt(UsersRol.rol);
      let menu = [
        rol >= 1 && {
          title: "PDF",
          icon: <DashboardIcon />,
          module: <ModuleContrato />,
        },
        rol >= 1 && {
          title: "Dashboard",
          icon: <DashboardIcon />,
          module: <ModuleDashboard />,
        },
        rol >= 1 && {
          title: "Calendario",
          icon: <CalendarIcon />,
          module: <ModuleCalendar />,
        },
        rol >= 2 && {
          title: "Administrador",
          icon: <AdminIcon />,
          subMenus: [
            { title: "Productos", module: <ModuleProductos /> },
            rol >= 3 && { title: "CEFs", module: <ModuleCefs /> },
            rol >= 3 && { title: "Metas CEFs", module: <ModuleMetasLocales /> },
            rol >= 3 && {
              title: "Autorizar Cotizacion",
              module: <ModuleAutorizaCotizacion />,
            },
            rol >= 3 && {
              title: "Usuarios",
              module: <ModuleUsuarios />,
            },
            rol >= 3 && {
              title: "Pagos",
              module: <ModulePagos />,
            },
          ],
        },
        ((rol >= 1 && rol <= 2) || rol >= 10) && {
          title: "Fiestologos",
          icon: <PeoplesIcon />,
          subMenus: [
            { title: "Fiestas", module: <ModuleFiestas /> },
            { title: "Invitados", module: <ModuleClientes /> },
            { title: "Cotizador", module: <ModuleCotizador /> },
            {
              title: "Cotizaciones",
              module: <ModuleCotizacionesFiestologo />,
            },
          ],
        },
        rol >= 2 && {
          title: "Informes",
          icon: <DetailIcon />,
          subMenus: [
            { title: "Ventas/Comisiones", module: <ModuleInformeComisiones /> },
          ],
        },
      ];
      setMenu(menu);
    });
  };
  if (menu === null) {
    consultarRoles();
  } else if (window.empleado.rol > 0) {
    return <Modules menu={menu} />;
  } else
    return (
      <h2 className="" style={{ color: "white", textAlign: "center" }}>
        Aun no te encuentras registrado.
      </h2>
    );
};
export default App;
