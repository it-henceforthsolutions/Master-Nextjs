
export default async function handler(req:any, res:any) {
  try {
    const response = await fetch(`apiurl`);
    if (!response.ok) {
      throw new Error('Failed to fetch video');
    }
    const videoBuffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'video/mp4');
    res.send(Buffer.from(videoBuffer));
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}