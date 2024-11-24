const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route: Fetch Codeforces Stats
app.get('/api/codeforces/:username', async (req, res) => {
    const username = req.params.username;

    try {
        const response = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
        const userStats = response.data.result[0];
        res.json({
            handle: userStats.handle,
            rating: userStats.rating,
            rank: userStats.rank,
        });
    } catch (error) {
        console.error('Error fetching Codeforces stats:', error.message);
        res.status(500).json({ error: 'Failed to fetch Codeforces stats' });
    }
});

// Route: Fetch LeetCode Stats
app.get('/api/leetcode/:username', async (req, res) => {
    const username = req.params.username;

    try {
        const response = await axios.post('https://leetcode.com/graphql', {
            query: `{
                matchedUser(username: "${username}") {
                    username
                    profile {
                        reputation
                        ranking
                    }
                    submitStats: submitStatsGlobal {
                        acSubmissionNum {
                            difficulty
                            count
                        }
                    }
                }
            }`,
        });

        const userStats = response.data.data.matchedUser;
        res.json({
            username: userStats.username,
            profile: userStats.profile,
            submitStats: userStats.submitStats,
        });
    } catch (error) {
        console.error('Error fetching LeetCode stats:', error.message);
        res.status(500).json({ error: 'Failed to fetch LeetCode stats' });
    }
});

// Route: Fetch CodeChef Stats
app.get('/api/codechef/:username', async (req, res) => {
    const username = req.params.username;

    try {
        const response = await axios.get(`https://www.codechef.com/users/${username}`);
        const $ = cheerio.load(response.data);

        const rating = $('.rating-number').text();
        const stars = $('.rating-star').text().trim();
        const userStats = {
            username,
            rating: rating || 'N/A',
            stars: stars || 'N/A',
        };

        res.json(userStats);
    } catch (error) {
        console.error('Error fetching CodeChef stats:', error.message);
        res.status(500).json({ error: 'Failed to fetch CodeChef stats' });
    }
});

// Server Listener
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
