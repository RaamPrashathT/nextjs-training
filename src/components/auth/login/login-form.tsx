"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useReducer } from "react";
import { login } from "@/actions/auth/login-user";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

type LoginFormState = {
    email: string;
    password: string;
    error: string | null;
    loading: boolean;
};

const initialState: LoginFormState = {
    email: "",
    password: "",
    error: null,
    loading: false,
};

type Action =
    | { type: "SET_EMAIL"; payload: string }
    | { type: "SET_PASSWORD"; payload: string }
    | { type: "SUBMIT_START" }
    | { type: "SUBMIT_SUCCESS" }
    | { type: "SUBMIT_FAILURE"; payload: string };

const reducer = (state: LoginFormState, action: Action) => {
    if (action.type === "SET_EMAIL") {
        return {
            ...state,
            email: action.payload,
        };
    } else if (action.type === "SET_PASSWORD") {
        return {
            ...state,
            password: action.payload,
        };
    } else if (action.type === "SUBMIT_START") {
        return {
            ...state,
            error: "",
            loading: true,
        };
    } else if (action.type === "SUBMIT_SUCCESS") {
        return {
            ...state,
            error: null,
            loading: false,
        };
    } else if (action.type === "SUBMIT_FAILURE") {
        return {
            ...state,
            error: action.payload,
            loading: false,
        };
    } else {
        return state;
    }
};

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const router = useRouter();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            state.email === "" ||
            state.password === ""
        ) {
            dispatch({
                type: "SUBMIT_FAILURE",
                payload: "Please fill out all fields",
            });
        }

        dispatch({
            type: "SUBMIT_START",
        });

        try {
            const request = {
                email: state.email,
                password: state.password,
            };

            const response = await login(request);

            if (response.success) {
                dispatch({
                    type: "SUBMIT_SUCCESS",
                });
            } else {
                dispatch({
                    type: "SUBMIT_FAILURE",
                    payload: response.message,
                });
            }
            router.push("/hooks/UseReducer/Implementation-1");
        } catch (error) {
            dispatch({
                type: "SUBMIT_FAILURE",
                payload: "Something went wrong" + error,
            });
        }
    };
    
    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            {...props}
            onSubmit={handleSubmit}
        >
            <FieldGroup>
                <div>
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h1 className="text-2xl font-bold mb-4">Login</h1>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <Field className="flex flex-col gap-y-1.5">
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                name="email"
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={state.email}
                                onChange={(e) => {
                                    dispatch({
                                        type: "SET_EMAIL",
                                        payload: e.target.value,
                                    });
                                }}
                                required
                            />
                        </Field>
                        <Field className="flex flex-col gap-y-1.5">
                            <div className="flex items-center">
                                <FieldLabel htmlFor="password">
                                    Password
                                </FieldLabel>
                            </div>
                            <Input
                                name="password"
                                id="password"
                                type="password"
                                value={state.password}
                                onChange={(e) => {
                                    dispatch({
                                        type: "SET_PASSWORD",
                                        payload: e.target.value,
                                    });
                                }}
                                required
                            />
                        </Field>
                        <Field className="mt-2">
                            <Button type="submit">
                                {state.loading ? (
                                    <div className="flex items-center gap-x-1">
                                        <Spinner />
                                        <p>Loading...</p>
                                    </div>
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </Field>
                    </div>
                    <div className="mt-3 text-center">
                        {state.error && (
                            <p className="text-destructive">{state.error}</p>
                        )}
                    </div>
                </div>

                <FieldSeparator>Or continue with</FieldSeparator>
                <Field>
                    <Button variant="outline" type="button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                                fill="currentColor"
                            />
                        </svg>
                        Login with GitHub
                    </Button>
                    <FieldDescription className="text-center">
                        Don{"'"}t have an account?{" "}
                        <Link href="#" className="underline underline-offset-4">
                            Register
                        </Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    );
}
