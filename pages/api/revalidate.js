export default async function handler(_req, res) {
  try {
    await res.unstable_revalidate("/get-musics");
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
