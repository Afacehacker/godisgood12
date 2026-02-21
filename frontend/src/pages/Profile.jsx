import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';
import PostCard from '../components/PostCard';

const Profile = () => {
    const { id } = useParams();
    const { user: currentUser } = useAuth();
    const { addToast } = useToast();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', bio: '', avatar: '' });

    const userId = id || (currentUser ? currentUser.id : null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get(`/users/${userId}`);
                setUser(res.data);
                setFormData({ name: res.data.name, bio: res.data.bio || '', avatar: res.data.avatar || '' });
                setLoading(false);
            } catch (err) {
                setError('User not found');
                setLoading(false);
            }
        };

        if (userId) fetchUser();
    }, [userId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!currentUser) return;
        try {
            const res = await api.put('/users/profile', formData);
            setUser({ ...user, ...res.data });
            setIsEditing(false);
            addToast('Profile updated');
        } catch (err) {
            setError('Update failed');
        }
    };

    if (loading) return <div className="container">Loading...</div>;
    if (error) return <div className="container error-msg">{error}</div>;

    const isOwnProfile = currentUser && currentUser.id === user.id;

    return (
        <div className="container">
            <div className="glass-card mb-4">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        overflow: 'hidden'
                    }}>
                        {user.avatar ? <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : user.name[0]}
                    </div>
                    <div style={{ flex: 1 }}>
                        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{user.name}</h1>
                        <p style={{ color: 'var(--text-muted)' }}>{user.email}</p>
                    </div>
                    {isOwnProfile && (
                        <button className="btn-primary" onClick={() => setIsEditing(!isEditing)}>
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                    )}
                </div>

                {isEditing ? (
                    <form onSubmit={handleUpdate}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <textarea
                            placeholder="Bio"
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Avatar URL"
                            value={formData.avatar}
                            onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                        />
                        <button type="submit" className="btn-primary">Save Changes</button>
                    </form>
                ) : (
                    <p style={{ fontStyle: user.bio ? 'normal' : 'italic' }}>{user.bio || 'No bio yet.'}</p>
                )}
            </div>

            <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Posts</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {user.posts && user.posts.length > 0 ? (
                    user.posts.map(post => <PostCard key={post.id} post={post} />)
                ) : (
                    <p style={{ color: 'var(--text-muted)' }}>No posts yet.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
