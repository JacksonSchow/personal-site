import api from './api';
import { BlogPost } from '../types';

export const getBlogPosts = async (): Promise<BlogPost[]> => {
    const response = await api.get<BlogPost[]>('/blog');
    return response.data;
};

export const createBlogPost = async (blogPost: Omit<BlogPost, 'id'>): Promise<BlogPost> => {
    const response = await api.post('/blog', blogPost);
    return response.data;
};

export const updateBlogPost = async (id: number, blogPost: Partial<BlogPost>): Promise<BlogPost> => {
    const response = await api.put(`/blog/${id}`, blogPost);
    return response.data;
};

export const deleteBlogPost = async (id: number): Promise<void> => {
    const response = await api.delete(`/blog/${id}`);
    return response.data;
};
