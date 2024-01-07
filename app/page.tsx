"use client";
import { useState } from "react";
import Category from "@/components/Category";
import VideoCardContainer from "@/components/VideoCardContainer";
import { useQuery } from "react-query";
import CategoryMobile from "@/components/CategoryMobile";
export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    type Lives = any[];
    const { data, status } = useQuery<Lives, Error>({
        queryKey: [`fetch`],
        queryFn: async () => {
            const response = await fetch(`/api/getLives`);
            return response.json();
        },
        refetchInterval: 300000,
        refetchOnWindowFocus: false,
    });

    let category: { name: string; count: number | null }[] = [{ name: "All", count: null }];
    if (status === "success") {
        category.push(
            ...Object.entries(
                data.reduce((acc: { [key: string]: number }, item) => {
                    const category = item.liveCategoryValue || "카테고리 없음";
                    acc[category] = (acc[category] || 0) + 1;
                    return acc;
                }, {})
            )
                .map(([category, count]): { name: string; count: number } => ({ name: category, count: count }))
                .sort((a, b) => b.count - a.count)
        );
    }

    return (
        <main className="w-full md:max-w-[70vw] py-0 md:py-5">
            <div className="flex gap-1 flex-col items-center pb-5">
                <CategoryMobile category={category} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <Category category={category} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </div>
            <div className="flex flex-wrap justify-center md:justify-normal">
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
