"use client";

import { ListGroup } from "react-bootstrap";

import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

import { useSelector } from "react-redux";

export default function TodoList() {
    const { todos } = useSelector((state: any) => state.todos);

    return (
        <div className="mt-4">
            <h2>Todo List</h2>
            <ListGroup>
                <TodoForm />
                {todos?.map((todo: any) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ListGroup >
            <hr />
        </div >
    );
}