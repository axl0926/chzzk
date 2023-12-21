"use client";
import { useState } from "react";
import VideoCardContainer from "@/components/VideoCardContainer";

import { useQuery } from "react-query";

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    type Response = { content: { data: { [key: string]: any }[] } };
    const response = useQuery<Response, Error>({
        queryKey: [`fetch`],
        queryFn: async () => {
            const res = await fetch(`/api/getLives`);
            return res.json();
        },
        refetchInterval: 60000,
        refetchOnWindowFocus: false,
    }).data;

    let category: string[] = ["All"];
    response?.content.data.forEach((data: { [key: string]: any }) => {
        if (!category.includes(data.liveCategoryValue)) {
            category.push(data.liveCategoryValue);
        }
    });

    return (
        <main className="w-[1260px] py-5">
            <div className="flex gap-2">
                {category.map((category) => {
                    return (
                        <div className="bg-[rgba(46,48,51,.6)] rounded-[8px] p-[10px_20px] text-[#9da5b6] font-extrabold text-[20px] leading-[20px] hover:bg-[rgba(60,61,65,0.6)] cursor-pointer" onClick={() => setSelectedCategory(category)}>
                            {category}
                        </div>
                    );
                })}
            </div>
            <div className="grid grid-cols-4">
                {response?.content.data
                    .filter((data: { [key: string]: any }) => selectedCategory === "All" || data.liveCategoryValue === selectedCategory)
                    .map((data: { [key: string]: any }) => {
                        console.log(response);
                        return <VideoCardContainer data={data}></VideoCardContainer>;
                    })}
            </div>
        </main>
    );
}