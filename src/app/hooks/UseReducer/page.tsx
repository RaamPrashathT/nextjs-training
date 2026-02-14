"use client";

import { Button } from "@/components/ui/button";
import { useReducer } from "react";

interface StateSchema {
    count: number;
    error: null | string;
}

const initialState: StateSchema = {
    count: 0,
    error: null,
};

function reducer(state, action) {
    if (action.type === "increment") {
        const currentCount = state.count + 1;
        const errorMsg =
            currentCount > 5 ? "Countern cannot count beyond 5" : null;
        return {
            ...state,
            count: errorMsg ? state.count : currentCount,
            error: errorMsg,
        };
    } else if (action.type === "decrement") {
        const currentCount = state.count - 1;
        const errorMsg =
            currentCount < 0 ? "Countern cannot count below 0" : null;
        return {
            ...state,
            count: errorMsg ? state.count : currentCount,
            error: errorMsg,
        };
    } else if (action.type === "reset") {
        return {
            ...state,
            count: 0,
            error: null,
        };
    } else {
        return state;
    }
}

export default function UseReducerDemo() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 rounded-xl space-y-6 bg-card ">
            <div className="text-center">
                <h1 className="text-3xl font-semibold tracking-tight">
                    Count: {state.count}
                </h1>
            </div>

            

            <div className="flex justify-center gap-3">
                <Button onClick={() => dispatch({ type: "increment" })}>
                    Increment
                </Button>
                <Button
                    onClick={() => dispatch({ type: "decrement" })}
                    variant="secondary"
                >
                    Decrement
                </Button>

                <Button
                    onClick={() => dispatch({ type: "reset" })}
                    variant="outline"
                >
                    Reset
                </Button>
            </div>
            {state.error && (
                <p className="text-sm text-destructive text-center">
                    {state.error}
                </p>
            )}
        </div>
    );
}
