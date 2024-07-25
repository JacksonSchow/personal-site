import React from "react";
import useBlogPosts from "../hooks/useBlogPosts";
import BlogPostList from "../components/BlogPostList";

const Blog: React.FC = () => {
    const { blogPosts, loading, error } = useBlogPosts();

    if (loading) return <div>Loading...</div>
    if (error) return <div>{ error }</div>

    return <BlogPostList blogPosts={blogPosts} />
};

export default Blog;
