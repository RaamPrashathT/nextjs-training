"use client";

import React, { useState } from "react";

interface User {
    name: string;
    email: string;
    password: string;
}

const initialUser: User = {
    name: "",
    email: "",
    password: "",
};

export default function ObjectsInState() {
    const [user, setUser] = useState(initialUser);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(user);
        setUser(initialUser);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
            >
                <h2 className="text-xl font-semibold text-center">User Form</h2>

                <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full border p-2 rounded"
                />

                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                />

                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full border p-2 rounded"
                />

                <button
                    type="submit"
                    disabled={!user.name || !user.email || !user.password}
                    className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-50"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
