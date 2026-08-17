export default async function handler(req, res) {
    try {
        const response = await fetch('https://sonhoenegocios.com/wp-json/wp/v2/posts?author=19&_embed');
        if (!response.ok) {
            throw new Error(`WordPress API returned status ${response.status}`);
        }
        
        const posts = await response.json();
        
        const formatted = posts.map(post => {
            let image = '';
            try {
                image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
            } catch (e) {
                // Ignore image fallback
            }
            return {
                id: post.id,
                title: post.title?.rendered || '',
                link: post.link || '',
                date: post.date || '',
                image: image
            };
        });
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(formatted);
    } catch (error) {
        console.error("Error fetching news:", error);
        return res.status(500).json({ error: error.message });
    }
}
