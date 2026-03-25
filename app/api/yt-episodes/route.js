export const dynamic = 'force-dynamic';

const API_KEY = 'AIzaSyANRsjsV-WdoLxM9yEz-yIgBFBdoUYPXCw';
const UPLOADS_PLAYLIST = 'UU1yKEFqN6Tzz9DTK7fwS3LQ'; // UC -> UU

export async function GET() {
  try {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${UPLOADS_PLAYLIST}&part=snippet&maxResults=50`;
    const res = await fetch(url);
    const data = await res.json();
    
    const episodes = (data.items || [])
      .map(item => ({
        title: item.snippet.title,
        date: item.snippet.publishedAt.slice(0, 10),
        videoId: item.snippet.resourceId?.videoId,
      }))
      .filter(e => /^E\d{2,3}/.test(e.title));
    
    return Response.json({ count: episodes.length, episodes });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
