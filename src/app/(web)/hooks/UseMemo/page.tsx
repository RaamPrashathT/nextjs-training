"use client";

import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";

const slowFunction = (x: number) => {
    console.log('Slow Function Start');
    let i = 0;
    while (i < 1000000000) i++;
    console.log('Slow Function End');
    return x * 2;
};

export default function UseMemo() {
    const [value, setValue] = useState(0);


    const memoizedValue = useMemo(() => {
        console.log('Calculating...');
        const y = slowFunction(2)
        console.log(y);
        return y;
    }, [value]);

    return (
        <div>
            <h1>Use Memo</h1>
            <h1>Value: {memoizedValue}</h1>
            <Button
                onClick={() => {
                    setValue(value + 1);
                }}
            >
                Add
            </Button>
        </div>
    );
}
