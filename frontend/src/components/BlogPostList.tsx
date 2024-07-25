import React from 'react';
import { BlogPost } from '../types';
import { Link } from 'react-router-dom';

interface BlogPostListProps {
    blogPosts: BlogPost[];
}

const BlogPostList: React.FC<BlogPostListProps> = ({ blogPosts }) => {
    return (
        <div>
            {blogPosts.map((post: BlogPost) => (
                <div key={post.id}>
                    <Link to={`/post/${post.title_url}`}>
                        <div>
                            <h3>{post.title}</h3>
                            <p>{post.author}</p>
                            <p>{post.created_at}</p>
                            <p>{post.summary}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default BlogPostList;
