export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, business, email, service, message } = req.body;

  try {
    const response = await fetch('https://formspree.io/f/akhil.code.dev@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        subject: `New Lead: ${name} from ${business || 'Direct'}`,
        name,
        email,
        business,
        service,
        message
      })
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      const err = await response.json();
      return res.status(response.status).json({ error: err });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
