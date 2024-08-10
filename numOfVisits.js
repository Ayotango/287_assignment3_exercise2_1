const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.use(cookieParser());

app.get('/', (req, res) => {
  let visitCount = parseInt(req.cookies.visitCount) || 0;
  const lastVisit = req.cookies.lastVisit || null;
  visitCount++;

  res.cookie('visitCount', visitCount);
  res.cookie('lastVisit', new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));

  let message = '';
  if (visitCount === 1) {
    message = 'Welcome to my webpage! It is your first time that you are here.';
  } else {
    message = `Hello, this is the ${visitCount} time that you are visiting my webpage.`;
  }

  let lastVisitMessage = '';
  if (lastVisit) {
    const lastVisitDate = new Date(lastVisit);
    lastVisitMessage = `Last time you visited my webpage on: ${lastVisitDate.toDateString()} ${lastVisitDate.toLocaleTimeString()} EST`;
  }

  res.send(`
    <html>
      <head><title>Visit Tracker</title></head>
      <body>
        <h1>${message}</h1>
        <p>${lastVisitMessage}</p>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
