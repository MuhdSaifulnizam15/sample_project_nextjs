export default async function handler(req, res) {
    const {
      query: { id },
    } = req;
  
    console.log('id:', id);
  
    try {
      // Call an external API endpoint to get posts
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id[0]}/${id[1]}`
      );
      const comments = await response.json();
      // console.log('comments', comments);
      if (comments.length > 0) res.status(200).json(comments);
      else res.status(404).json({ message: `Users ${id[1]} with id: ${id[0]} not found.` });
    } catch (err) {
      console.log("err", err);
      res.status(500).json({ error: err });
    }
  }
  