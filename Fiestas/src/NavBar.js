import React from "react";
import "rsuite/dist/rsuite.min.css"; // or 'rsuite/dist/rsuite.min.css'
import { Sidenav, Nav, Sidebar } from "rsuite";
const color1 = "#1a1d24";
const BarraNav = ({ items, clickFunction, appearance, ...navProps }) => {
  const [expanded, setExpand] = React.useState(false);
  const onExpand = () => {
    setExpand(!expanded);
  };
  // const [activeKey, setActiveKey] = React.useState("1");
  const [openKeys, setOpenKeys] = React.useState([]);
  // const [openKeys, setOpenKeys] = React.useState(['3', '4']);
  console.log("nav");

  return (
    <>
      <div style={{ marginRight: expanded ? 260 : 56 }}></div>
      <Sidebar
        style={{ background: color1, height: "100vh", position: "fixed" }}
        width={expanded ? 260 : 56}
        collapsible
        // hoverBgColor="#E91E63"
      >
        <Sidenav
          appearance="subtle"
          expanded={expanded}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
          // hoverBgColor="#E91E63"
        >
          <Sidenav.Body>
            <Sidenav.Toggle onToggle={onExpand} />
            <Nav {...navProps}>
              {items.map((item, index) =>
                !item.subMenus ? (
                  item.title && (
                    <Nav.Item
                      key={index}
                      eventKey={index + 1}
                      // active
                      icon={item.icon}
                      style={{ textDecoration: "none" }}
                      onClick={clickFunction.bind(
                        this,
                        item.title,
                        item.module
                      )}
                    >
                      {item.title}
                    </Nav.Item>
                  )
                ) : (
                  <Nav.Menu
                    key={index}
                    eventKey={index + 1}
                    title={item.title}
                    icon={item.icon}
                    style={{ textDecoration: "none !important" }}
                  >
                    {item.subMenus.map(
                      (subItem, subIndex) =>
                         subItem && (
                          <Nav.Item
                            key={subIndex}
                            eventKey={index + 1 + "-" + subIndex + 1}
                            onClick={clickFunction.bind(
                              this,
                              subItem.title,
                              subItem.module
                            )}
                          >
                            {subItem.title}
                          </Nav.Item>
                        )
                    )}
                  </Nav.Menu>
                )
              )}
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </Sidebar>
    </>
  );
};
export default BarraNav;
