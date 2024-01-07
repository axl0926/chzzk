"use client";
import { useState, useEffect } from "react";
import Category from "@/components/Category";
import VideoCardContainer from "@/components/VideoCardContainer";
import { useQuery } from "react-query";
import CategoryMobile from "@/components/CategoryMobile";
import { AutoSizer, Grid, WindowScroller } from "react-virtualized";
type FilteredData = {
    liveId: number;
    liveTitle: string;
    liveImageUrl: string | null;
    defaultThumbnailImageUrl: string | null;
    concurrentUserCount: number;
    accumulateCount: number;
    openDate: string;
    adult: true;
    categoryType: string | null;
    liveCategory: string | null;
    liveCategoryValue: string | null;
    channel: {
        channelId: string;
        channelName: string;
        channelImageUrl: string;
        verifiedMark: boolean;
    };
}[];

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [columnCount, setColumnCount] = useState(5);
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 1024) {
                setColumnCount(2);
            } else if (width < 1280) {
                setColumnCount(3);
            } else if (width < 1536) {
                setColumnCount(4);
            } else {
                setColumnCount(5);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    let filteredData: FilteredData = [];
    const { data, status } = useQuery<any[], Error>({
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
        filteredData = data.filter((data: { [key: string]: any }) => selectedCategory === "All" || data.liveCategoryValue === selectedCategory || (selectedCategory === "카테고리 없음" && data.liveCategoryValue == ""));
    }
    return (
        <main className="w-full md:max-w-[70vw] py-0 md:py-5">
            <div className="flex gap-1 flex-col items-center">
                <CategoryMobile category={category} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <Category category={category} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </div>
            <div className=" md:justify-normal w-full h-screen">
                {status === "success" && (
                    <WindowScroller>
                        {({ height, isScrolling, onChildScroll, scrollTop }) => (
                            <AutoSizer disableHeight>
                                {({ width }) => (
                                    <Grid
                                        autoHeight
                                        width={width}
                                        height={height}
                                        columnCount={columnCount}
                                        rowCount={Math.ceil(filteredData.length / columnCount)}
                                        rowHeight={300}
                                        columnWidth={width / columnCount}
                                        scrollTop={scrollTop}
                                        onScroll={onChildScroll}
                                        cellRenderer={({ columnIndex, rowIndex, key, style }) => {
                                            const index = rowIndex * columnCount + columnIndex;
                                            const data = filteredData[index];
                                            return data ? (
                                                <div key={key} style={style}>
                                                    <VideoCardContainer data={data} />
                                                </div>
                                            ) : null;
                                        }}
                                    />
                                )}
                            </AutoSizer>
                        )}
                    </WindowScroller>
                )}
            </div>
        </main>
    );
}
