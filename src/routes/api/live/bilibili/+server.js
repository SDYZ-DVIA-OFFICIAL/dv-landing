import { getWridWts } from '$lib/server/getWridWts';
import { env } from '$env/dynamic/private';

export async function GET() {
	const url = `https://api.live.bilibili.com/room/v1/Room/get_info?room_id=22590024&${await getWridWts()}`;
	const data = await (
		await fetch(url, {
			headers: {
				'user-agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.183',
				accept:
					'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
				'accept-language': 'zh',
				'cache-control': 'no-cache',
				pragma: 'no-cache',
				'sec-ch-ua': '"Not/A)Brand";v="99", "Microsoft Edge";v="115", "Chromium";v="115"',
				'sec-ch-ua-mobile': '?0',
				'sec-ch-ua-platform': '"Windows"',
				'sec-fetch-dest': 'document',
				'sec-fetch-mode': 'navigate',
				'sec-fetch-site': 'none',
				'sec-fetch-user': '?1',
				'upgrade-insecure-requests': '1',
				cookie: env.COOKIE,
				referer: 'https://www.bilibili.com/'
			}
		})
	).json();
	const res = new Response(JSON.stringify(data));
	res.headers.set('Content-Type', 'application/json; charset=utf-8');
	res.headers.set('Cache-Control', 'no-cache, max-age=120');
	return res;
}
