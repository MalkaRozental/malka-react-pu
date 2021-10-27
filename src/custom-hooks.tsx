import { get } from "http";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
const TODOS = gql`
{
    Todos{
        text
        checked
    }
}`;

export const useInputValue = (initialValue = "") => {
  const [inputValue, setInputValue] = useState(initialValue);

  return {
    inputValue,
    changeInput: (event: any) => setInputValue(event.target.value),
    clearInput: () => setInputValue(""),
    keyInput: (event: any, callback :any) => {
      if (event.which === 13 || event.keyCode === 13) {
        callback(inputValue);
        return true;
      }

      return false;
    }
  };
};

export const useTodos = (initialValue = []) => {
  const [todos, setTodos] = useState<any[]>(initialValue);
  const { loading, error, data } = useQuery(TODOS);
  useEffect(() => {
      if(!error && !loading){
        if(data && data.Todos.length){
          setTodos(data.Todos);
        }
      }
  }, data);
    
  return {
    todos,
    addTodo: (text: string) => {
      if (text !== "") {
        setTodos([...todos, {text, checked: false}]);
      }
    },
    checkTodo: (idx: any) => {
      setTodos(
        todos.map((todo , index) => {
          if (idx === index) {
            todo.checked = !todo.checked;
          }
          return todo;
        })
      );
    },
    removeTodo: (idx: any) => {
      setTodos(todos.filter((_, index) => idx !== index));
    },
    editTodo: (data: {idx:number, data:{text: string, checked: boolean}}) =>{
      var newTodos = [...todos];
      newTodos[data.idx] = data.data;
      setTodos(newTodos);
    },
   
  }
};