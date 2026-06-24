// Vercel serverless function — GitHub OAuth initiation for Decap CMS
export default function handler(req, res) {
  const host     = req.headers['x-forwarded-host'] || req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const baseUrl  = `${protocol}://${host}`;

  const params = new URLSearchParams({
    client_id:    process.env.GITHUB_CLIENT_ID,
    redirect_uri: `${baseUrl}/api/callback`,
    scope:        'repo,user',
  });

  res.redirect(302, `https://github.com/login/oauth/authorize?${params}`);
}
