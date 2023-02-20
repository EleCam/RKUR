import React, { useState, useEffect } from "react";
import ModuleDashboard from "./ModuleDashboard";
// import { Button } from 'rsuite';
import "rsuite/dist/rsuite.min.css"; // or 'rsuite/dist/rsuite.min.css'
import { Sidenav, Nav, Container, Header, Content, Sidebar } from "rsuite";
import "./index.css";
import BarraNav from "./NavBar";
import ModuleCefs from "./ModuleCefs";
import ModuleProductos from "./ModuleProductos";
const color1 = "#1a1d24";

const Modules = (props) => {
  // const [openKeys, setOpenKeys] = React.useState(['3', '4']);
  const [titleModule, setTitleModule] = React.useState("Dashboard");
  const [module, setModule] = React.useState(<ModuleProductos />); // (<ModuleDashboard />);
  function viewModule(title, module) {
    setTitleModule(title);
    setModule(module ? module : <div>Sin Modulo</div>);
  }
  function ContetenedorR(props) {
    return (
      <Container style={{ background: "" }}>
        <Header style={{ background: color1 }}>
          <div
            style={{ padding: "5px 20px", textAlign: "center", color: "white" }}
          >
            <h2>{props.title}</h2>
          </div>
        </Header>
        <Content style={{ margin: 35, color: "white" }}>
          <div
            style={{
              paddingLeft: 20,
              paddingBottom: 100,
              paddingTop: 50,
              borderRadius: 25,
              background: color1,
              boxShadow: "12px 16px 19px 0px rgba(0,0,0,0.75)",
            }}
          >
            {props.children}
          </div>
        </Content>
      </Container>
    );
  }

  return (
    <Container style={{ overflow: "hidden" }}>
      <BarraNav items={props.menu} clickFunction={viewModule} />
      <ContetenedorR title={titleModule}>{module}</ContetenedorR>
    </Container>
  );
};
export default Modules;
