import React from 'react';
import moment from 'moment';
import { BlogPost } from '../types';
import { Link } from 'react-router-dom';
import './BlogPostList.css';

interface BlogPostListProps {
    blogPosts: BlogPost[];
}

const BlogPostList: React.FC<BlogPostListProps> = ({ blogPosts }) => {
    return (
        <div className='blog-post-list'>
            {blogPosts.map((post: BlogPost) => (
                <Link key={post.id} to={`/post/${post.title_url}`} className='blog-post-item'>
                    {post.s3_image_url ? <img src={post.s3_image_url} alt='Decorative' /> : null}
                    <div>
                        <div className='title-row'>
                            <p className='title'>{post.title}</p>
                            <p className='blog-post-summary'>{moment(post.created_at).format('MMM D, yyyy')}</p>
                        </div>
                        <p>{post.summary}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default BlogPostList;
