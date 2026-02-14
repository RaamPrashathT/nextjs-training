"use client";

import { useState, useLayoutEffect } from "react";

interface PostSchema {
    id: number;
    title: string;
    body: string;
}

export default function UseLayoutEffectDemo() {
    const [posts, setPosts] = useState<PostSchema[] | null>(null);

    useLayoutEffect(() => {

        const fetchedPosts = [
            {
                id: 1,
                title: "Understanding useMemo",
                body: "useMemo is a React hook used to memoize expensive calculations to improve performance.",
            },
            {
                id: 2,
                title: "React useCallback Explained",
                body: "useCallback returns a memoized version of a function that only changes if its dependencies change.",
            },
            {
                id: 3,
                title: "TypeScript Interfaces",
                body: "Interfaces in TypeScript define the structure of an object and help with type safety.",
            },
        ];
        setPosts(fetchedPosts);
    },[]);

    return (
        <div className="max-w-2xl mx-auto mt-10 px-4">
            {posts === null ? (
                <p className="text-center text-gray-500 text-lg">Loading...</p>
            ) : (
                posts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white p-6 mb-6 rounded-xl border hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                    >
                        <h2 className="text-xl font-semibold mb-2">
                            {post.title}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            {post.body}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}
