import React from "react";
import { useState } from "react";

export default function DragDropTest() {
  const [widgets, setWidgets] = useState([]);

  const handleOnDrag = (e, widgetType) => {
    e.dataTransfer.setData("widgetType", widgetType);
  };

  const handleOnDrop = (e) => {
    const widgetType = e.dataTransfer.getData("widgetType");
    console.log("widgetType", widgetType);
    setWidgets([...widgets, widgetType]);
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="stock">
        <div
          className="widget"
          draggable
          onDragStart={(e) => handleOnDrag(e, "Widget 1")}
        >
          Widget 1
        </div>
        <div
          className="widget"
          draggable
          onDragStart={(e) => handleOnDrag(e, "Widget 2")}
        >
          Widget 2
        </div>
        <div
          className="widget"
          draggable
          onDragStart={(e) => handleOnDrag(e, "Widget 3")}
        >
          Widget 3
        </div>
      </div>
      <div
        className="container"
        onDrop={handleOnDrop}
        onDragOver={handleOnDragOver}
      >
        {widgets.map((widget, i) => {
          return (
            <div
              className="widget"
              key={i}
              draggable
              onDragStart={(e) => handleOnDrag(e, `Widget ${i + 1}`)}
            >
              {widget}
            </div>
          );
        })}
      </div>
    </div>
  );
}
