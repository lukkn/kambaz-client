import { ListGroupItem, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";


export default function TodoForm() {
    const dispatch = useDispatch();
    const todo = useSelector((state: any) => state.todos.todo);

    return (
        <ListGroupItem>
            <Button onClick={() => dispatch(addTodo(todo))}
                id="wd-add-todo-click"
                className="btn btn-success float-end me-2"> Add </Button>
            <Button onClick={() => dispatch(updateTodo(todo))}
                id="wd-update-todo-click"
                className="btn btn-warning float-end me-2"> Update </Button>
            <FormControl value={todo.title}
                onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
                className="w-50" />
        </ListGroupItem>
    )
};
