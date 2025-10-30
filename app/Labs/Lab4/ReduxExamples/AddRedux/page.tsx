"use client";

import { useSelector, useDispatch } from "react-redux";
import { add } from "./addReducer";

import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { FormControl } from "react-bootstrap";

export default function AddRedux() {
    const [a, setA] = useState(12);
    const [b, setB] = useState(23);

    const { sum } = useSelector((state: any) => state.add);
    const dispatch = useDispatch();

    return (
        <div id="wd-add-redux" className="w-25">
            <h1>Add Redux</h1>
            <h2>{a} + {b} = {sum}</h2>
            <FormControl type="number"
                defaultValue={a}
                placeholder="enter number"
                onChange={(e) => setA(parseInt(e.target.value))}
                id="wd-add-redux-input-a" />
            <FormControl type="number"
                defaultValue={b}
                placeholder="enter number"
                onChange={(e) => setB(parseInt(e.target.value))}
                id="wd-add-redux-input-b" />
            <br />
            <Button onClick={() => dispatch(add({ a, b }))}
                id="wd-add-redux-add-click"> Add Redux </Button>
        </div>
    )
};
