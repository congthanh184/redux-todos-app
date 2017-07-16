import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import store from "./store";

let nextTodoId = 0;

const FilterLink = ({ filter, currentFilter, children }) => {
  if (filter === currentFilter) {
    return (
      <span>
        {children}
      </span>
    );
  }

  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        store.dispatch({
          type: "SET_VISIBILITY_FILTER",
          filter
        });
      }}
    >
      {children}
    </a>
  );
};

const setVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter(t => t.completed);
    case "SHOW_ACTIVE":
      return todos.filter(t => !t.completed);
  }
};

const Todo = ({id, onClick, completed, text}) => {
  return (
    <li
      key={id}
      onClick={onClick}
      style={{ textDecoration: completed ? "line-through" : "none" }}
    >
      {text}
    </li>
  );
};

const TodoList = ({todos, onTodoClick}) => {
  return (
    <ul>
      {todos.map(t =>
        <Todo key={t.id} {...t} onClick={() => onTodoClick(t.id)} />
      )}
    </ul>
  );
};

class App extends Component {
  componentWillMount() {
    // store.dispatch({ type: "ADD_TODO", id: 0, text: "test" });
    // store.subcribe( this.render );
  }

  render() {
    const visibleTodos = setVisibleTodos(
      this.props.todos,
      this.props.visibilityFilter
    );

    return (
      <div>
        <div>
          <input
            ref={node => {
              this.input = node;
            }}
          />
          <button
            onClick={() => {
              store.dispatch({
                type: "ADD_TODO",
                id: nextTodoId++,
                text: this.input.value
              });
              this.input.value = "";
            }}
          >
            Add todo
          </button>
        </div>

        <TodoList
          todos={visibleTodos}
          onTodoClick={id => {
            store.dispatch({
              type: 'TOGGLE_TODO', 
              id
            })
          }} />

        <p>
          Show:{" "}
          <FilterLink
            filter="SHOW_ALL"
            currentFilter={this.props.visibilityFilter}
          >
            All
          </FilterLink>{" "}
          <FilterLink
            filter="SHOW_ACTIVE"
            currentFilter={this.props.visibilityFilter}
          >
            Active
          </FilterLink>{" "}
          <FilterLink
            filter="SHOW_COMPLETED"
            currentFilter={this.props.visibilityFilter}
          >
            Completed
          </FilterLink>
        </p>
      </div>
    );
  }
}

export default App;
