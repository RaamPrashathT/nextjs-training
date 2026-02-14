"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function UseStateDemo() {
    const [count, setCount] = useState(0);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-sm w-full text-center space-y-8 border border-slate-100">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Counter</h1>
                    <p className="text-slate-500 mt-2">Interactive useState Example</p>
                </div>

                <div className="relative flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-slate-50 flex items-center justify-center border-4 border-slate-100 shadow-inner">
                        <span className="text-5xl font-bold text-slate-700 tabular-nums">
                            {count}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <Button
                        onClick={() => setCount(count - 1)}
                        variant="outline"
                        className="h-12 rounded-xl border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all"
                    >
                        -
                    </Button>
                    <Button
                        onClick={() => setCount(0)}
                        variant="ghost"
                        className="h-12 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                    >
                        Reset
                    </Button>
                    <Button
                        onClick={() => setCount(count + 1)}
                        className="h-12 rounded-xl bg-slate-900 hover:bg-slate-800 shadow-lg transition-all"
                    >
                        +
                    </Button>
                </div>
            </div>
        </div>
    );
}
