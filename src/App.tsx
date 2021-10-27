import "./App.css";

import React from "react";

import { useInputValue, useTodos } from "./custom-hooks";

import Layout from "./components/Layout";

import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
//import ExchangeRates from "./components/ExchangeRates";
import { gql, useQuery } from "@apollo/client";
const EXCHANGE_RATES = gql`
{
    Todos{
        text
        checked
    }
}`;
/*function ExchangeRates() {
  debugger;
  const { loading, error, data } = useQuery(EXCHANGE_RATES);
debugger;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ text, checked }:any) => (
    <div key={text}>
      <p>
        {text}: {checked}
      </p>
    </div>
  ));
}*/

const App = React.memo(() => {
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();
  const { todos, addTodo, checkTodo, removeTodo, editTodo } = useTodos();
  const clearInputAndAddTodo = () => {
    clearInput();
    addTodo(inputValue);
  };

  return (
    <Layout>
      <AddTodo
        style={{width: '80%'}}
        inputValue={inputValue}
        onInputChange={changeInput}
        onButtonClick={clearInputAndAddTodo}
        onInputKeyPress={(event: any) => keyInput(event, clearInputAndAddTodo)}
      />
      <TodoList
        style={{width: '80%'}}
        items={todos}
        onItemCheck={checkTodo}
        onItemEdit={editTodo}
        onItemRemove={removeTodo}
      />
    </Layout>
  );
});
export default App;
