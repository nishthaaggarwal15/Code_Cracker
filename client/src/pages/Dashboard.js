import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [platform, setPlatform] = useState('Codeforces'); // Default platform
    const [username, setUsername] = useState('');
    const [userStats, setUserStats] = useState(null);
    const [error, setError] = useState(null);

    const fetchStats = async () => {
        if (!username.trim()) {
            setError('Please enter a username');
            return;
        }
        setError(null); // Clear previous errors
        setUserStats(null); // Clear previous stats

        try {
            const response = await axios.get(
                `http://localhost:5000/api/${platform.toLowerCase()}/${username}`
            );
            setUserStats(response.data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch stats. Please check the username or platform.');
        }
    };

    return (
        <div className="container">
            <h1>CodeCracker Dashboard</h1>
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="platform" style={{ marginRight: '10px' }}>
                    Select Platform:
                </label>
                <select
                    id="platform"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    style={{ padding: '10px', marginRight: '10px' }}
                >
                    <option value="Codeforces">Codeforces</option>
                    <option value="LeetCode">LeetCode</option>
                    <option value="CodeChef">CodeChef</option>
                </select>
            </div>

            <div>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={`Enter ${platform} Username`}
                    style={{ padding: '10px', marginRight: '10px', width: '60%' }}
                />
                <button onClick={fetchStats} style={{ padding: '10px 20px' }}>
                    Get Stats
                </button>
            </div>

            {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

            {userStats && (
                <div className="stats">
                    <h2>Stats for {userStats.username || userStats.handle}</h2>
                    {platform === 'Codeforces' && (
                        <>
                            <p>Rating: {userStats.rating}</p>
                            <p>Rank: {userStats.rank}</p>
                        </>
                    )}
                    {platform === 'LeetCode' && userStats.profile && (
                        <>
                            <p>Reputation: {userStats.profile.reputation}</p>
                            <p>Ranking: {userStats.profile.ranking}</p>
                            <p>
                                Solved Problems (Easy/Medium/Hard):{' '}
                                {userStats.submitStats.acSubmissionNum.map(
                                    (stat, idx) =>
                                        `${stat.count}${
                                            idx < userStats.submitStats.acSubmissionNum.length - 1
                                                ? ' / '
                                                : ''
                                        }`
                                )}
                            </p>
                        </>
                    )}
                    {platform === 'CodeChef' && (
                        <>
                            <p>Rating: {userStats.rating}</p>
                            <p>Stars: {userStats.stars}</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
