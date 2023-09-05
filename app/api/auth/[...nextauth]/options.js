import SpotifyProvider from 'next-auth/providers/spotify';

export default {
    providers: [
        SpotifyProvider({
            authorization:
                'https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private,playlist-modify-private,playlist-modify-public',
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.refresh_token;
            }
            return token;
        },
        async session(session, user) {
            session.user = user;
            return session;
        },
    },
}; 