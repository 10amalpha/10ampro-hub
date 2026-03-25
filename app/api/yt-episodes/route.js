export const dynamic = 'force-dynamic';

const API_KEY = 'AIzaSyANRsjsV-WdoLxM9yEz-yIgBFBdoUYPXCw';
const CHANNEL_ID = 'UC1yKEFqN6Tzz9DTK7fwS3LQ';

export async function GET() {
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=50&type=video`;
    const res = await fetch(url);
    const data = await res.json();
    
    const episodes = (data.items || [])
      .map(item => ({
        title: item.snippet.title,
        date: item.snippet.publishedAt.slice(0, 10),
        videoId: item.id.videoId,
      }))
      .filter(e => /^E\d{3}/.test(e.title));
    
    return Response.json({ episodes });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
