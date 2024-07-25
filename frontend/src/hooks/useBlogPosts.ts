import { useState, useEffect } from "react";
import { BlogPost } from "../types";
import { getBlogPosts } from "../services/blog-service";

const useBlogPosts = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const data = await getBlogPosts();

                data.forEach( blogPost => {
                    blogPost.title_url = blogPost.title.replace(/\s+/g, '-').toLowerCase();
                });

                setBlogPosts(data);
            } catch (error) {
                setError('Failed to fetch blog posts');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogPosts();
    }, []);

    return { blogPosts, loading, error };
}

export default useBlogPosts;
