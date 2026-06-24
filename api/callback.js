// Vercel serverless function — GitHub OAuth callback for Decap CMS
export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    res.status(400).send('Missing OAuth code.');
    return;
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept':       'application/json',
      },
      body: JSON.stringify({
        client_id:     process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const data = await response.json();

    if (data.error) {
      res.status(400).send(`GitHub error: ${data.error_description}`);
      return;
    }

    const token   = data.access_token;
    const payload = JSON.stringify({ token, provider: 'github' });

    // Return a small HTML page that passes the token back to Decap CMS
    res.setHeader('Content-Type', 'text/html');
    res.send(`<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body>
<p>Autenticando, aguarde...</p>
<script>
(function () {
  var payload = ${JSON.stringify(payload)};
  function onMessage(e) {
    window.opener.postMessage('authorization:github:success:' + payload, e.origin);
    window.removeEventListener('message', onMessage, false);
    setTimeout(function () { window.close(); }, 500);
  }
  window.addEventListener('message', onMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
<\/script>
</body>
</html>`);
  } catch (err) {
    res.status(500).send('Authentication failed: ' + err.message);
  }
}
