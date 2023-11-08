import React, { useEffect, useState } from "react";
import "./Table.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DraggableTable = ({ data, onUpdateOrder }) => {
  const [tableData, setTableData] = useState(data);
  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedData = [...tableData];
    const [reorderedItem] = updatedData.splice(result.source.index, 1);
    updatedData.splice(result.destination.index, 0, reorderedItem);

    onUpdateOrder(updatedData);

    setTableData(updatedData);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="table">
        {(provided) => (
          <table
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="table"
          >
            <thead>
              <tr>
                <th>Moment</th>
                <th>Season</th>
                <th>Episode</th>
                <th>Rank</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <tr
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <td>{item.column1}</td>
                      <td>{item.column2}</td>
                      <td>{item.column3}</td>
                      <td>{index + 1}</td>
                    </tr>
                  )}
                </Draggable>
              ))}
            </tbody>
          </table>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableTable;
