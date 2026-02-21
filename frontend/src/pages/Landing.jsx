import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Rocket, Share2, Shield, Zap, ArrowRight, MessageSquare, Heart, Users } from 'lucide-react';

const Landing = () => {
    const { user } = useAuth();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    const features = [
        {
            icon: <Zap className="text-yellow-400" size={32} />,
            title: "Lightning Fast",
            description: "Experience social media with zero lag. Our platform is built for speed and real-time interactions."
        },
        {
            icon: <Share2 className="text-blue-400" size={32} />,
            title: "Connect Easily",
            description: "Find your friends and build communities faster than ever with our intelligent discovery system."
        },
        {
            icon: <Shield className="text-green-400" size={32} />,
            title: "Privacy First",
            description: "Your data is yours. We use end-to-end encryption to ensure your private moments stay private."
        }
    ];

    const stats = [
        { label: "Active Users", value: "100K+" },
        { label: "Daily Posts", value: "500K+" },
        { label: "Communities", value: "10K+" }
    ];

    return (
        <div style={{ overflowX: 'hidden' }}>
            {/* Hero Section */}
            <section style={{
                minHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '4rem 1rem',
                position: 'relative'
            }}>
                {/* Decorative background elements */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    style={{
                        position: 'absolute',
                        top: '10%',
                        right: '5%',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                        zIndex: -1
                    }}
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [0, -90, 0],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 12, repeat: Infinity }}
                    style={{
                        position: 'absolute',
                        bottom: '10%',
                        left: '5%',
                        width: '400px',
                        height: '400px',
                        background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                        zIndex: -1
                    }}
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ maxWidth: '800px' }}
                >
                    <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
                        <span style={{
                            background: 'rgba(99, 102, 241, 0.1)',
                            color: 'var(--primary)',
                            padding: '0.5rem 1rem',
                            borderRadius: '2rem',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            border: '1px solid rgba(99, 102, 241, 0.2)'
                        }}>
                            Next Generation Social Networking
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        style={{
                            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                            fontWeight: '800',
                            lineHeight: 1.1,
                            marginBottom: '1.5rem',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        Connect with the <br />
                        <span className="gradient-text glow-text">Digital Future</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        style={{
                            fontSize: '1.25rem',
                            color: 'var(--text-muted)',
                            marginBottom: '2.5rem',
                            maxWidth: '600px',
                            marginInline: 'auto'
                        }}
                    >
                        SocialLink is the futuristic platform designed for creators, thinkers, and explorers. Experience a social space that truly understands connectivity.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
                    >
                        {user ? (
                            <Link to="/" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.1rem' }}>
                                Go to Feed <ArrowRight size={20} />
                            </Link>
                        ) : (
                            <>
                                <Link to="/signup" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.1rem' }}>
                                    Join SocialLink <Rocket size={20} />
                                </Link>
                                <Link to="/login" className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                                    Login
                                </Link>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section style={{ padding: '6rem 1rem', background: 'rgba(255, 255, 255, 0.02)' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>Why choose SocialLink?</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Built with cutting-edge technology for the modern web.</p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10, borderColor: 'var(--primary)' }}
                                className="glass-card"
                                style={{
                                    padding: '2.5rem',
                                    textAlign: 'left',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                    transition: 'border-color 0.3s ease'
                                }}
                            >
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '1rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1rem'
                                }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '600' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section style={{ padding: '6rem 1rem' }}>
                <div className="container">
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        gap: '3rem',
                        textAlign: 'center'
                    }}>
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                            >
                                <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--primary)' }} className="glow-text">
                                    {stat.value}
                                </div>
                                <div style={{ color: 'var(--text-muted)', fontWeight: '500', marginTop: '0.5rem' }}>
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ padding: '8rem 1rem', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card"
                    style={{
                        maxWidth: '900px',
                        margin: '0 auto',
                        padding: '4rem 2rem',
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h2 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1.5rem' }}>Ready to jump in?</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '500px', marginInline: 'auto' }}>
                            Join thousands of users who are already shaping the future of social interaction.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            {!user && (
                                <>
                                    <Link to="/signup" className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                                        Get Started
                                    </Link>
                                    <Link to="/login" className="btn-secondary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                                        Login
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
            </section>

            <style>
                {`
                    .btn-primary {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        background: var(--primary);
                        color: white;
                        text-decoration: none;
                        border-radius: 0.75rem;
                        font-weight: 600;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 14px 0 var(--glow-primary);
                    }
                    .btn-primary:hover {
                        background: var(--primary-hover);
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px 0 var(--glow-primary);
                    }
                    .btn-secondary {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        text-decoration: none;
                        transition: all 0.3s ease;
                    }
                    .btn-secondary:hover {
                        transform: translateY(-2px);
                    }
                `}
            </style>
        </div>
    );
};

export default Landing;
