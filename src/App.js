import React, { useState } from 'react';
import { useEffect } from 'react';
import querystring from 'query-string';
import './App.scss';
import Pagination from './components/Pagination';
import PostList from './components/PostList';
import TodoFrom from './components/TodoFrom';
import TodoList from './components/TodoList';
import PostFiltersForm from './components/PostFiltersForm';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I love Easy Frontend! 😍 ' },
    { id: 2, title: 'We love Easy Frontend! 🥰 ' },
    { id: 3, title: 'They love Easy Frontend! 🚀 ' },
  ]);

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 11,
  });
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    title_like: '',
  });

  useEffect(() => {
    async function fetchPostList() {

      try {
        const paramsString = querystring.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const reponse = await fetch(requestUrl);
        const reponseJSON = await reponse.json();

        const { data, pagination } = reponseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch post list: ', error.message)
      }
    }

    fetchPostList();
  }, [filters])

  function handleTodoClick(todo) {
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    //add new todo to current todo list
    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    };
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  function handelPageChange(newPage) {
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  function handleFitersChange(newFiters) {
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFiters.searchTerm,
    })
  }

  return (
    <div className="app">
      <h1>React Hook - PostList</h1>
      {/* <TodoFrom onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}

      <PostFiltersForm onSubmit={handleFitersChange} />
      <PostList posts={postList} />
      <Pagination
        pagination={pagination}
        onPageChange={handelPageChange}
      />
    </div>
  );
}

export default App;
