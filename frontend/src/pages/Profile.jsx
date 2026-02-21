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
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('');

    const userId = id || (currentUser ? currentUser.id : null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get(`/users/${userId}`);
                setUser(res.data);
                setFormData({ name: res.data.name, bio: res.data.bio || '', avatar: res.data.avatar || '' });
                if (res.data.avatar) {
                    const avatarUrl = res.data.avatar.startsWith('http')
                        ? res.data.avatar
                        : `${api.defaults.baseURL.replace('/api', '')}${res.data.avatar}`;
                    setAvatarPreview(avatarUrl);
                }
                setLoading(false);
            } catch (err) {
                setError('User not found');
                setLoading(false);
            }
        };

        if (userId) fetchUser();
    }, [userId]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!currentUser) return;

        const data = new FormData();
        data.append('name', formData.name);
        data.append('bio', formData.bio);
        if (avatarFile) {
            data.append('avatar', avatarFile);
        }

        try {
            const res = await api.put('/users/profile', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setUser({ ...user, ...res.data });
            setIsEditing(false);
            addToast('Profile updated');

            // Update localStorage user if it's the current user
            if (isOwnProfile) {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                localStorage.setItem('user', JSON.stringify({ ...storedUser, ...res.data }));
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Update failed');
        }
    };

    if (loading) return <div className="container">Loading...</div>;
    if (error) return <div className="container error-msg">{error}</div>;

    const isOwnProfile = currentUser && currentUser.id === user.id;

    const getAvatarUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `${api.defaults.baseURL.replace('/api', '')}${path}`;
    };

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
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        {(avatarPreview || user.avatar) ? (
                            <img
                                src={avatarPreview || getAvatarUrl(user.avatar)}
                                alt={user.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : user.name[0]}
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
                    <form onSubmit={handleUpdate} encType="multipart/form-data">
                        <div className="mb-4">
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Profile Picture</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ padding: '0.5rem', marginBottom: '0.5rem' }}
                            />
                        </div>
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
