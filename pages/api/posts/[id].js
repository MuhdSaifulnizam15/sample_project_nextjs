export default async function handler(req, res) {
  const {
    query: { id },
  } = req;

  // console.log('id:', id);

  try {
    // Call an external API endpoint to get posts
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
    const comments = await response.json();
    // console.log('comments', comments);
    if (comments.length > 0) res.status(200).json(comments);
    else res.status(404).json({ message: `Posts comments with id: ${id} not found.` });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ error: err });
  }
}
