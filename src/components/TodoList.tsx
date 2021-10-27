import React, { useState } from "react";
import { List, Paper } from "@material-ui/core";

import TodoListItem from "./TodoListItem";
const TodoList = React.memo(({ items, onItemCheck, onItemRemove, onItemEdit }: any) => {
  const [editValue, setEditValue] = useState();
  const getEditData = (data: any) =>{
    setEditValue(data);
    onItemEdit(data);
  }
  return(
    <>
  {items.length > 0 &&  (
      <Paper style={{ margin: 16 }}>
        <List>
          {items.map((todo: any, idx: any) => (
            <TodoListItem
              key={`TodoItem.${idx}`}
              editData={getEditData}
              idx={idx}
              {...todo}
              divider={idx !== items.length - 1}              
              onEditClick={() => onItemEdit(idx, editValue)}
              onDeleteClick={() => onItemRemove(idx)}
              onCheckBoxToggle={() => onItemCheck(idx)}/>
          ))}
        </List>
      </Paper>
      )
    }
    </>
  );
});
export default TodoList;



