import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      dealsTotales: [],
      readyData: false,
      ready2Data: false,
      metasTotales: [],
      ventasTotales: [],
      proyecciones: [],
    };
  }
  dashDataDeals = () => {
    let dataMount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let mes = 0;
    fetch(
      "https://diniz.com.mx/diniz/servicios/services/emp_getDataDashDeals.php"
    )
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          response.forEach((a) => {
            mes = parseInt(a.fecha_inicio.substr(5, 2)) - 1;
            dataMount[mes] += parseInt(a.monto);
          });
          this.setState({ dealsTotales: dataMount, readyData: true });
        }
      });
  };
  dashDataVentas = () => {
    let dataMount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let mes = 0;
    fetch(
      "https://diniz.com.mx/diniz/servicios/services/emp_getDataDashDeals.php?tip=1"
    )
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          response.forEach((a) => {
            mes = parseInt(a.fecha_inicio.substr(5, 2)) - 1;
            dataMount[mes] += parseInt(a.monto);
          });
          this.setState({ ventasTotales: dataMount, readyData: true });
        }
      });
  };
  prospeccionTotal = () => {
    let pros = [];
    for (let i = 0; i < 12; i++) {
      pros.push(this.state.ventasTotales[i] + this.state.dealsTotales[i]);
    }
    this.setState({ proyecciones: pros });
  };
  dashDataMetas = () => {
    let dataMount = [];
    fetch(
      "https://diniz.com.mx/diniz/servicios/services/emp_getDataDashMetas.php"
    )
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          response.forEach((a) => {
            dataMount.push(parseInt(a.meta));
          });
          this.setState({ metasTotales: dataMount, ready2Data: true });
        }
      });
  };
  dashDeals = () => {
    let data = {
      tipo: 1,
    };
    let requestInfo = {
      method: "POST",
      body: JSON.stringify(data),
      header: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };
    fetch(
      "https://diniz.com.mx/diniz/servicios/services/emp_getConveniosDash.php",
      requestInfo
    )
      .then((response) => response.json())
      .then((response) => {
        this.setState({ open: response });
      });
    requestInfo = {
      method: "POST",
      body: JSON.stringify({
        tipo: 0,
      }),
      header: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };
    fetch(
      "https://diniz.com.mx/diniz/servicios/services/emp_getConveniosDash.php",
      requestInfo
    )
      .then((response) => response.json())
      .then((response) => {
        this.setState({ lose: response });
      });
    requestInfo = {
      method: "POST",
      body: JSON.stringify({
        tipo: 2,
      }),
      header: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };
    fetch(
      "https://diniz.com.mx/diniz/servicios/services/emp_getConveniosDash.php",
      requestInfo
    )
      .then((response) => response.json())
      .then((response) => {
        this.setState({ win: response });
      });
  };
  componentDidMount() {
    this.dashDataDeals();
    this.dashDataMetas();
    this.dashDataVentas();
    this.dashDeals();
    setTimeout(() => {
      this.prospeccionTotal();
    }, 1000);
  }
  render() {
    //console.log(this.state.metasTotales)
    var colors = Highcharts.getOptions().colors;

    const options3 = {
      chart: {
        type: "spline",
      },

      legend: {
        symbolWidth: 40,
      },

      title: {
        text: "Gráfica de desempeño",
      },

      yAxis: {
        title: {
          text: "Cantidad en MXN",
        },
        accessibility: {
          description: "Psos MXN",
        },
      },
      xAxis: {
        title: {
          text: "Tiempo",
        },
        accessibility: {
          description: "Historico entre Enero 2022 y Dicienmbre 2022",
        },
        categories: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
          "Total",
        ],
      },

      tooltip: {
        valueSuffix: "MXN",
      },

      plotOptions: {
        series: {
          point: {
            events: {
              click: function() {
                //window.location.href = this.series.options.website;
              },
            },
          },
          cursor: "pointer",
          dataLabels: {
            enabled: true,
          },
        },
      },

      series: [
        {
          name: "Meta",
          data: this.state.metasTotales,
          color: "#6C6C6E",
        },
        {
          name: "Ventas",
          data: this.state.ventasTotales,
          color: colors[2],
        },
        {
          name: "Proyeccion",
          data: this.state.proyecciones,
          color: colors[5],
        },
        {
          name: "Deals",
          data: this.state.dealsTotales,
          //website: 'https://www.nvaccess.org',
          color: colors[4],
          accessibility: {
            description: "This is the most used screen reader in 2019.",
          },
          dashStyle: "ShortDash",
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 1500,
            },
            chartOptions: {
              chart: {
                spacingLeft: 3,
                spacingRight: 3,
              },
              legend: {
                itemWidth: 150,
              },
              xAxis: {
                categories: [
                  "Enero",
                  "Febrero",
                  "Marzo",
                  "Abril",
                  "Mayo",
                  "Junio",
                  "Julio",
                  "Agosto",
                  "Septiembre",
                  "Octubre",
                  "Noviembre",
                  "Diciembre",
                  "Total",
                ],
                title: "",
              },
              yAxis: {
                visible: false,
              },
            },
          },
        ],
      },
    };
    const options = {
      chart: {
        type: "column",
      },

      legend: {
        symbolWidth: 40,
      },

      title: {
        text: "Resumen de Deals",
      },

      yAxis: {
        title: {
          text: "",
        },
        accessibility: {
          description: "",
        },
      },
      xAxis: {
        title: {
          text: "Tiempo",
        },
        accessibility: {
          description: "Historico entre Enero 2022 y Dicienmbre 2022",
        },
        categories: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
          "Total",
        ],
      },

      tooltip: {
        valueSuffix: "",
      },

      plotOptions: {
        series: {
          point: {
            events: {
              click: function() {
                //window.location.href = this.series.options.website;
              },
            },
          },
          cursor: "pointer",
          dataLabels: {
            enabled: true,
          },
        },
        line: {
          dataLabels: {
            enabled: true,
          },
          enableMouseTracking: false,
        },
      },

      series: [
        {
          name: "Abiertos",
          data: this.state.open,
          color: "#DCDCDC",
        },
        {
          name: "Win",
          data: this.state.win,
          color: "#40E0D0",
        },
        {
          name: "Lose",
          data: this.state.lose,
          color: "#FFB6C1",
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 1500,
            },
            chartOptions: {
              chart: {
                spacingLeft: 3,
                spacingRight: 3,
              },
              legend: {
                itemWidth: 150,
              },
              xAxis: {
                categories: [
                  "Enero",
                  "Febrero",
                  "Marzo",
                  "Abril",
                  "Mayo",
                  "Junio",
                  "Julio",
                  "Agosto",
                  "Septiembre",
                  "Octubre",
                  "Noviembre",
                  "Diciembre",
                  "Total",
                ],
                title: "",
              },
              yAxis: {
                visible: false,
              },
            },
          },
        ],
      },
    };
    // console.log(options2)
    return (
      <div className="d-flex justify-content-center" style={{ width: "100%" }}>
        <div
          className="d-flex flex-wrap justify-content-center "
          style={{ width: "1500px" }}
        >
          <HighchartsReact
            highcharts={Highcharts}
            options={options3}
            containerProps={{ style: { width: "100%" } }}
          />
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { width: "100%" } }}
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;
