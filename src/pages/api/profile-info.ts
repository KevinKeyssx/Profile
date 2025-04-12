import {Constants} from '../../utils/constants';
import type {NextApiRequest, NextApiResponse} from 'next';

type ResponseData = any;

export default async function handler(
    _: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}lov/${Constants.END_POINT_SEARCH_ALL}`;

    try {
        const response = await fetch(apiUrl, {
            cache: 'force-cache',
            next: {revalidate: 2592000},
            headers: {'X-T': process.env.NEXT_PUBLIC_TOKEN!}
        });

        if ( !response.ok ) {
            const cachedResponse = await fetch( apiUrl, {cache: 'force-cache'});

            if ( cachedResponse.ok ) {
                const cachedData = await cachedResponse.json();
                return res.status(200).json(cachedData);
            }

            throw new Error('API request failed');
        }

        const data = await response.json();

        res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({detail: 'Error fetching data'});
    }
}
