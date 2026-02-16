"use client"

import { useMemo, useState } from "react";

const slowFunction = (value: number) => {
    console.log("slowFunction RUNNING");
    for (let i = 0; i < 1000000000; i++) {
    }
    
    return value * 2;
};

export default function UseMemo() {
    const [counter, setCounter] = useState(0);
    const [value, setValue] = useState(0);

    const number = useMemo(() => {
        console.log("memo - COMPUTING");
        return slowFunction(value);
    }, [value]);

    return (
        <div>
            <button onClick={() => setCounter((c) => c + 1)}>
                Count: {counter}
            </button>
            <input
                type="number"
                onChange={(e) => setValue(Number(e.target.value))}
            />
            <span>{number}</span>
        </div>
    );
}

