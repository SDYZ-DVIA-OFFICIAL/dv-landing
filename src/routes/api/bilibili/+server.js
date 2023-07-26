export async function GET() {
	const data = new Response(
		JSON.stringify(
			await (
				await fetch('https://api.live.bilibili.com/room/v1/Room/get_info?room_id=22590024')
			).json()
		)
	);
	data.headers.set('Content-Type', 'application/json; charset=utf-8');
	return data;
}
