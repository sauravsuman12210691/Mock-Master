import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar/Navbar';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [atsScores, setAtsScores] = useState([]);
    const [interviews, setInterviews] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
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
            try {
                const token = localStorage.getItem('auth-token');

                if (token === null) {
                    navigate('/login');
                    return;
                }

                const res = await fetch('http://localhost:3000/api/profile', {
                    headers: {
                        'auth-token': token,
                    },
                });
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
            const res = await fetch('http://localhost:3000/api/profile', {
                method: 'PUT',
                headers: {
                    'auth-token': token,
                },
                body: formDataToSend,
            });

            const data = await res.json();
            console.log('Updated user:', data);
            setUser(data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }


    return (
        <>
        <Navbar onLogout={handleLogout} />
        <div className={styles.profileContainer}>
            <div className={styles.profileContent}>
                <div className={styles.leftPanel}>
                    <img
                        src={`http://localhost:3000${user.profileImg}`}
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
        </>
    );
};

export default Profile;
