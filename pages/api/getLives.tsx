import { NextApiRequest, NextApiResponse } from "next/types";

const url = "https://api.chzzk.naver.com/service/v1/lives?";

type Response = {
    code: number;
    message: string;
    content: {
        data: any[];
        page: { next: { concurrentUserCount: number; liveId: number } };
        size: number;
    };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let data = [];
    let nextUrl = url;

    let responseData: Response = await (await fetch(nextUrl)).json();

    do {
        data.push(...responseData.content.data);

        if (responseData.content.size > 0) {
            const next = responseData.content.page.next;
            nextUrl = `${url}&concurrentUserCount=${next.concurrentUserCount}&liveId=${next.liveId}`;
            responseData = await (await fetch(nextUrl)).json();
        }
    } while (responseData && responseData.content.size > 0);
    res.status(200).json(data);
}
