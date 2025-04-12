import type {NextApiRequest, NextApiResponse} from 'next';
import {kv} from '@vercel/kv';
import {Constants} from '../../utils/constants';

type ResponseData = any;

export default async function handler(
    _: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const cacheKey = `api-cache:${Constants.END_POINT_SEARCH_ALL}`;

    try {
        const cachedData = await kv.get( cacheKey );

        if ( cachedData ) return res.status( 200 ).json( cachedData );

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}lov/${Constants.END_POINT_SEARCH_ALL}`, {
            headers: {'X-T': process.env.NEXT_PUBLIC_TOKEN!}
        });

        const data = await response.json();

        await kv.setex( cacheKey, 2592000, data );

        res.status( 200 ).json( data );
    } catch ( error ) {
        console.error('Error:', error);
        res.status(500).json({detail: 'Error fetching data'});
    }
}
