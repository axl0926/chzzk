import { NextApiRequest,NextApiResponse } from "next/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response = await fetch(`https://api.chzzk.naver.com/service/v1/lives?`);
    const data = await response.json();
    res.status(200).json(data);
}

