import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Navbar/Footer';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [atsScores, setAtsScores] = useState([]);
    const [interviews, setInterviews] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        contact: '',
        email: '',
        github: '',
        profileImg: null,
    });

    useEffect(() => {
        
        const fetchData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('auth-token');

                if (token === null) {
                    navigate('/login');
                    return;
                }

                const res = await fetch('https://mock-master-9dhj.onrender.com/api/profile', {
                    headers: {
                        'auth-token': token,
                    },
                });

                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await res.json();
                console.log('Fetched data:', data);

                setUser(data.user);
                setAtsScores(data.atsScores);
                setInterviews(data.interviews);
                setFormData({
                    name: data.user.name,
                    bio: data.user.bio,
                    contact: data.user.contact,
                    email: data.user.email,
                    github: data.user.github,
                    profileImg: null, 
                });
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }finally{
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            profileImg: e.target.files[0], 
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        navigate('/login');
    };

    const handleSaveClick = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const token = localStorage.getItem('auth-token');
            const res = await fetch('https://mock-master-9dhj.onrender.com/api/profile', {
                method: 'PUT',
                headers: {
                    'auth-token': token,
                },
                body: formDataToSend,
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            console.log('Updated user:', data);
            setUser(data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (loading) {
        return (
            <div className={styles.profileContainer}>
                <Navbar />
                <div className={styles.profileContent}>
                    <div className={styles.leftPanel}>
                        <Skeleton circle={true} height={256} width={256} />
                        <Skeleton height={25} width={150} style={{ marginTop: '10px' , marginBottom: '50px' }} />
                        <Skeleton height={25} width={250} count={4} style={{ marginTop: '10px' }}/>
                        <Skeleton height={25} width={100} style={{ marginTop: '20px' }} />
                    </div>
                    <div className={styles.rightPanel}>
                        <div className={styles.upperPart}>
                            <h3>Recent ATS Scores</h3>
                            <div className={styles.cardContainer}>
                                <Skeleton height={80} width={200} style={{ marginRight: '20px', padding: '20px'}} />
                                <Skeleton height={80} width={200} style={{ marginRight: '20px', padding: '20px'}} />
                                <Skeleton height={80} width={200} style={{ marginRight: '20px', padding: '20px'}} />
                            </div>
                        </div>
                        <div className={styles.lowerPart}>
                            <h3>Recent Interviews</h3>
                            <div className={styles.cardContainer}>
                            <Skeleton height={80} width={200} style={{ marginRight: '20px', padding: '20px'}} />
                                <Skeleton height={80} width={200} style={{ marginRight: '20px', padding: '20px'}} />
                                <Skeleton height={80} width={200} style={{ marginRight: '20px', padding: '20px'}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <>
        <Navbar onLogout={handleLogout} />
        <div className={styles.profileContainer}>
            <div className={`${styles.profileContent} ${isEditing ? styles.blur : ''}`}>
                <div className={styles.leftPanel}>
                    <img
                        src={`https://mock-master-9dhj.onrender.com${user.profileImg}`}
                        alt="Profile"
                        className={styles.profilePic}
                    />
                    <h2>{user.name}</h2>
                    <p>{user.bio}</p>
                    <p>Contact: {user.contact}</p>
                    <p>Email: {user.email}</p>
                    <a href={user.github}></a>
                    <button onClick={handleEditClick}>Edit</button>
                </div>
                <div className={styles.rightPanel}>
                    <div className={styles.upperPart}>
                        <h3>Recent ATS Scores</h3>
                        <div className={styles.cardContainer}>
                            {atsScores.length > 0 ? (
                                atsScores.map((score, index) => (
                                    <div key={index} className={styles.card}>
                                        <p>{score.resumeName}</p>
                                        <p>Score: {score.score}</p>
                                        <p>Date: {new Date(score.date).toLocaleDateString()}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No ATS scores available.</p>
                            )}
                        </div>
                    </div>
                    <div className={styles.lowerPart}>
                        <h3>Recent Interviews</h3>
                        <div className={styles.cardContainer}>
                            {interviews.length > 0 ? (
                                interviews.map((interview, index) => (
                                    <div key={index} className={styles.card}>
                                        <p>Score: {interview.score}</p>
                                        <p>Mode: {interview.mode}</p>
                                        <p>Minutes Ago: {Math.floor((Date.now() - new Date(interview.createdAt)) / 60000)}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No interviews available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {isEditing && (
                <div className={styles.editModal}>
                     <span className={styles.close} onClick={()=>{setIsEditing(false)}}>&times;</span>
                    <form className={styles.editForm} onSubmit={handleSaveClick}>
                        <label>
                            Name:
                            <input type="text" name="name" value={formData.name} onChange={handleChange} />
                        </label>
                        <label>
                            Profession:
                            <input type="text" name="bio" value={formData.bio} onChange={handleChange} />
                        </label>
                        <label>
                            Contact:
                            <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
                        </label>
                        <label>
                            Email:
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </label>
                        <label>
                            GitHub:
                            <input type="text" name="github" value={formData.github} onChange={handleChange} />
                        </label>
                        <label>
                            Profile Picture:
                            <input type="file" name="profileImg" onChange={handleFileChange} />
                        </label>
                        <button type="submit">Save</button>
                    </form>
                </div>
            )}
        </div>
        <Footer/>
        </>
    );
};

export default Profile;
