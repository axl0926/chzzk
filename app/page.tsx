"use client";
import { useState } from "react";
import VideoCardContainer from "@/components/VideoCardContainer";

import { useQuery } from "react-query";

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    type Lives = any[];
    const { data, status } = useQuery<Lives, Error>({
        queryKey: [`fetch`],
        queryFn: async () => {
            const response = await fetch(`/api/getLives`);
            return response.json();
        },
        refetchInterval: 60000,
        refetchOnWindowFocus: false,
    });

    let category: string[] = ["All"];
    if (status === "success") {
        data.forEach((data: { [key: string]: any }) => {
            if (data.liveCategoryValue !== "" && !category.includes(data.liveCategoryValue)) {
                category.push(data.liveCategoryValue);
            }
        });
    }

    category.push("카테고리 없음");
    return (
        <main className="w-[1260px] py-5">
            <div className="flex gap-2 flex-wrap">
                {category.map((category, i) => {
                    return (
                        <div key={i} className="bg-[rgba(46,48,51,.6)] rounded-[8px] p-[10px_20px] text-[#9da5b6] font-extrabold text-[20px] leading-[20px] hover:bg-[rgba(60,61,65,0.6)] cursor-pointer whitespace-nowrap " onClick={() => setSelectedCategory(category)}>
                            {category}
                        </div>
                    );
                })}
            </div>
            <div className="grid grid-cols-4">
                {status === "success" &&
                    data
                        .filter((data: { [key: string]: any }) => selectedCategory === "All" || data.liveCategoryValue === selectedCategory || (selectedCategory === "카테고리 없음" && data.liveCategoryValue == ""))
                        .map((data: { [key: string]: any }, i) => {
                            return <VideoCardContainer data={data} key={i}></VideoCardContainer>;
                        })}
            </div>
        </main>
    );
}
