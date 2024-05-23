function verification_content(email, activationlink) {
  const content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f2f2f2;
      margin: 0;
      font-family: 'Arial', sans-serif;
    }

    .content {
      width: 80%;
      text-align: center;
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h4 {
      color: #b03c3c;
      margin: 0 0 10px;
    }

    h3 {
      color: #333;
      margin: 10px 0;
    }

    p {
      color: #555;
      margin: 5px 0;
    }

    a {
      color: #2196F3;
      text-decoration: none;
      font-weight: bold;
    }

    .signature {
      font-weight: bold;
      color: #b03c3c;
    }
  </style>
</head>
<body>
  <div class="content">
    <h3>Reset your password</h3>
    <p>Click on the button below within the next 60 minutes to reset your password for your account</p>
    <p>${email}</p>
    <a href="${activationlink}" target="_blank"><button style="
    background: #667df7;
    color: #ffffff;
    padding: 8px;
    border-radius: 5px;
    border: 1.5px solid #3d2bff;">Reset your password</button></a>
   
    <p>Regards,</p>
    <p class="signature">The Team</p>
  </div>
</body>
</html>
`;
  return content;
}
module.exports = { verification_content };
