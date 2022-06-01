export default async function handler(req, res) {
    try {
      // Call an external API endpoint to get posts
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const users = await response.json();
        // console.log('users', users);

        res.status(200).json(users)
    } catch (err) {
        console.log('err', err);
        res.status(500).json({ error: err });
    }
}