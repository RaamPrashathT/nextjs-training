"use client";

import { Button } from "@/components/ui/button";
import { useReducer } from "react";

type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
};

type CartState = {
    cartItems: CartItem[];
    total: number;
};

const initialState: CartState = {
    cartItems: [],
    total: 0,
};

type Action =
    | { type: "ADD_ITEM"; payload: { id: string; name: string; price: number } }
    | { type: "REMOVE_ITEM"; payload: { id: string } }
    | { type: "INCREMENT_QUANTITY"; payload: { id: string } }
    | { type: "DECREMENT_QUANTITY"; payload: { id: string } }
    | { type: "CLEAR_CART" };

const calculateTotal = (items: CartItem[]) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

function reducer(state: CartState, action: Action): CartState {
    if (action.type === "ADD_ITEM") {
        const existing = state.cartItems.find(
            (item) => item.id === action.payload.id,
        );

        let updatedItems: CartItem[];

        if (existing) {
            updatedItems = state.cartItems.map((item) =>
                item.id === action.payload.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
            );
        } else {
            updatedItems = [
                ...state.cartItems,
                { ...action.payload, quantity: 1 },
            ];
        }

        return {
            cartItems: updatedItems,
            total: calculateTotal(updatedItems),
        };
    } else if (action.type === "REMOVE_ITEM") {
        const updatedItems = state.cartItems.filter(
            (item) => item.id !== action.payload.id,
        );
        return {
            cartItems: updatedItems,
            total: calculateTotal(updatedItems),
        };
    } else if (action.type === "INCREMENT_QUANTITY") {
        const updatedItems = state.cartItems.map((item) =>
            item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
        );
        return {
            cartItems: updatedItems,
            total: calculateTotal(updatedItems),
        };
    } else if (action.type === "DECREMENT_QUANTITY") {
        const updatedItems = state.cartItems
            .map((item) =>
                item.id === action.payload.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item,
            )
            .filter((item) => item.quantity > 0);

        return {
            cartItems: updatedItems,
            total: calculateTotal(updatedItems),
        };
    } else if (action.type === "CLEAR_CART") {
        return {
            cartItems: [],
            total: 0,
        };
    } else {
        return state;
    }
}

export default function Implementation1() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div className="p-8 max-w-2xl mx-auto space-y-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
                <div className="flex gap-4">
                    <Button
                        onClick={() =>
                            dispatch({
                                type: "ADD_ITEM",
                                payload: {
                                    id: "ID001",
                                    name: "Laptop",
                                    price: 1000,
                                },
                            })
                        }
                    >
                        Add Laptop
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() =>
                            dispatch({
                                type: "ADD_ITEM",
                                payload: {
                                    id: "ID002",
                                    name: "Phone",
                                    price: 500,
                                },
                            })
                        }
                    >
                        Add Phone
                    </Button>
                </div>
            </div>
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Cart Items</h2>
                <div className="space-y-3">
                    {state.cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 border rounded-xl bg-card shadow-sm">
                            <div className="space-y-1">
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-sm text-muted-foreground">${item.price} each</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() =>
                                        dispatch({
                                            type: "INCREMENT_QUANTITY",
                                            payload: { id: item.id },
                                        })
                                    }
                                >
                                    +
                                </Button>
                                <span className="w-4 text-center font-medium">{item.quantity}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() =>
                                        dispatch({
                                            type: "DECREMENT_QUANTITY",
                                            payload: { id: item.id },
                                        })
                                    }
                                >
                                    -
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 pt-6 border-t flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Total: ${state.total}</h2>
                    <Button variant="destructive" onClick={() => dispatch({ type: "CLEAR_CART" })}>
                        Clear Cart
                    </Button>
                </div>
            </div>
        </div>
    );
}
