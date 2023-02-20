import React, { useState, useEffect } from "react";
import { Calendar, Whisper, Popover, Badge } from "rsuite";
// import "rsuite/dist/rsuite.min.css"; // or 'rsuite/dist/rsuite.min.css'
import "./calendar.css";
import { Modal, Button, ButtonToolbar, Placeholder } from "rsuite";
// import StyleSheet from 'react-style';
function getTodoList(date) {
  const day = date.getDate();

  switch (day) {
    case 10:
      return [
        { time: "09:30 pm", title: "Fiesta " },
        { time: "09:30 pm", title: "Fiesta " },
      ];
    case 15:
      return [
        { time: "09:30 pm", title: "Fiesta " },
        { time: "09:30 pm", title: "Fiesta " },
        { time: "09:30 pm", title: "Fiesta " },
        { time: "09:30 pm", title: "Fiesta " },
        { time: "09:30 pm", title: "Fiesta " },
        { time: "09:30 pm", title: "Fiesta " },
        { time: "09:30 pm", title: "Fiesta " },
        { time: "09:30 pm", title: "Fiesta " },
        { time: "09:30 pm", title: "Fiesta " },
        { time: "09:30 pm", title: "Fiesta " },
        { time: "09:30 pm", title: "Fiesta " },
        { time: "09:30 pm", title: "Fiesta " },
        { time: "09:30 pm", title: "Fiesta " },
        { time: "09:30 pm", title: "Fiesta " },
      ];
    default:
      return [];
  }
}

const ModuleCalendar = () => {
  const [open, setOpen] = React.useState(false);
  const [day, setDay] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const ModalDayDetails = (day) => {
    
    setDay(day);
    handleOpen();  
  };
  // const handleClose = () => setOpen(false);
  const ModalDay = () => {
    return (
      <>
        {/* <ButtonToolbar>
          <Button onClick={handleOpen}> Open</Button>
        </ButtonToolbar> */}

        <Modal open={open} onClose={handleOpen}>
          <Modal.Header>
            <Modal.Title>{day ? day.toLocaleDateString("es-MX",{ weekday:'long', day:'numeric', month:'long', year:'numeric' }) : "" }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <Placeholder.Paragraph /> */}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleOpen} appearance="primary">
              Ok
            </Button>
            <Button onClick={handleOpen} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  function renderCell(date) {
    const list = getTodoList(date);
    const displayList = list.filter((item, index) => index < 8);

    if (list.length) {
      const moreCount = list.length - displayList.length;
      const moreItem = (
        <li>
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
                {list.map((item, index) => (
                  <p key={index}>
                    <b>{item.time}</b> - {item.title}
                  </p>
                ))}
              </Popover>
            }
          >
            <a>{moreCount} mas</a>
          </Whisper>
        </li>
      );

      return (
        <ul
          className="calendar-todo-list"
          style={{ listStyle: "none" }}
          // style={{height:60, background : "red", overflowY: "scroll"}}
        >
          {displayList.map((item, index) => (
            <li key={index} style={{ background: "" }}>
              {/* <Badge /> */}
              <b>{item.time}</b> - {item.title}
            </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }

    return null;
  }
  function modalDay(day) {
    console.log(day);
    return <>{day}</>;
  }
  return (
    <>
      <ModalDay />
      <Calendar
        bordered
        renderCell={renderCell}
        className="dark-theme"
        onSelect={(e) => {
          ModalDayDetails(e);
        }}
      />
    </>
  );
};

export default ModuleCalendar;
