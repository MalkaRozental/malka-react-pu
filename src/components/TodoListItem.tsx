import React, { useState } from "react";
import {
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
  TextField
} from "@material-ui/core";
import {DeleteOutlined} from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    ListItemSecondaryAction :{
      paddingRight: 48,
    },
    markDone:{
      textDecorationLine: 'line-through'
    },
    input: {
      width: 130,
      height: 40
    }
  }));   

const TodoListItem = React.memo(({editData,idx, text, checked, divider,onEditClick,  onCheckBoxToggle, onDeleteClick }: any) => {
    const classes = useStyles();
    const [isEditMode, setIsEditMode] = useState(false);
    const [editValue, setEditValue] = useState(text);

    const editItem = () =>{
      editData({idx: idx,data:{text:editValue, checked: false}});
      setIsEditMode(false); 
    };
    return(
    <ListItem divider={divider}>
      <Checkbox onClick={onCheckBoxToggle} checked={checked} disableRipple />
      <>
      {isEditMode ? (
          <TextField
            value={editValue}
            name='editTodo'
            onChange={(e:any) => setEditValue(e.target.value)}
            className={classes.input}
          />
        ) : (
          <ListItemText className={checked? classes.markDone: ''} primary={text} />
        )}
        </>
      <>
      {isEditMode ? (
      <ListItemSecondaryAction>
        <IconButton aria-label="Save" onClick={editItem}>
        <SaveIcon />
       </IconButton>
       <IconButton edge="end" aria-label="Cancel Edit" onClick={() => setIsEditMode(false)}>
         <CancelIcon />
       </IconButton>
      </ListItemSecondaryAction>

      ) :(
      <ListItemSecondaryAction>
        <IconButton disabled={checked} aria-label="Edit Todo" onClick={() => setIsEditMode(true)}>
         <EditIcon />
        </IconButton>
        <IconButton edge="end" aria-label="Delete Todo" onClick={onDeleteClick}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
      )}
      </>        
    </ListItem>
    );
    });

export default TodoListItem;


