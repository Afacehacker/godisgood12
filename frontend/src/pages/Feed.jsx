import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import { Send } from 'lucide-react';

const Feed = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const { data } = await api.get('/posts');
            setPosts(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        try {
            await api.post('/posts', { content });
            setContent('');
            fetchPosts();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container">
            {user && (
                <form onSubmit={handleCreatePost} className="glass-card" style={{ marginBottom: '2rem' }}>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's on your mind?"
                        style={{ height: '100px', resize: 'none' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Send size={18} /> <span>Post</span>
                        </button>
                    </div>
                </form>
            )}

            {loading ? (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading posts...</p>
            ) : (
                <div>
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} onUpdate={fetchPosts} />
                    ))}
                    {posts.length === 0 && (
                        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No posts yet. Be the first!</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Feed;
