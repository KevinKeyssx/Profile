import type {NextApiRequest, NextApiResponse} from 'next';

import {Constants} from '../../utils/constants';

type ResponseData = any;

export default async function handler(
    _: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}lov/${Constants.END_POINT_SEARCH_ALL}`;

    try {
        const response = await fetch(apiUrl, {
            headers: { 'X-T': process.env.NEXT_PUBLIC_TOKEN! },
        });

        const data = await response.json();

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ detail: 'Error fetching data' });
    }
}
