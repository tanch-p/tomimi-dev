import pako from 'pako';

export async function decompressGzipToJson(url: string) {
	const response = await fetch(url);
	const responseForJSON = response.clone();
	const responseForArrayBuffer = response.clone();

	try {
		return await responseForJSON.json();
	} catch (jsonError) {
		console.warn('Direct JSON parsing failed, trying decompression...');

		try {
			const arrayBuffer = await responseForArrayBuffer.arrayBuffer();
			const firstBytes = new Uint8Array(arrayBuffer.slice(0, 2));
			const isGzipped = firstBytes[0] === 0x1f && firstBytes[1] === 0x8b;

			if (isGzipped) {
				const decompressed = pako.inflate(new Uint8Array(arrayBuffer), { to: 'string' });
				return JSON.parse(decompressed);
			}

			const text = new TextDecoder('utf-8').decode(arrayBuffer);
			return JSON.parse(text);
		} catch (error) {
			console.error('All parsing attempts failed:', error);
			throw new Error('Failed to parse response as JSON, either directly or after decompression');
		}
	}
}
