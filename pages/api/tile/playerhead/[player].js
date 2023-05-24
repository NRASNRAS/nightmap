export default async function handler(req, res) {
    const { player } = req.query;
    
    const headUrl = `http://208.104.199.5/tiles/faces/32x32/${player}.png`;

    var tileResponse;
    try {
        tileResponse = await fetch(headUrl);
    } catch (e) {
        return res.status(400).send('Something went wrong');
    }
  
    if (tileResponse.ok) {
        const tileBuffer = Buffer.from(await tileResponse.arrayBuffer());

        res.send(tileBuffer);
    } else {
        res.status(tileResponse.status).send(tileResponse.statusText);
    }
}
