require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
  console.log('\n=== Testing Email Configuration ===\n');
  
  console.log('Environment Variables:');
  console.log('SMTP_USER:', process.env.SMTP_USER || '❌ NOT SET');
  console.log('SMTP_PASS:', process.env.SMTP_PASS ? '✅ SET (' + process.env.SMTP_PASS.length + ' characters)' : '❌ NOT SET');
  console.log('SMTP_HOST:', process.env.SMTP_HOST || 'smtp.gmail.com (default)');
  console.log('SMTP_PORT:', process.env.SMTP_PORT || '587 (default)');
  console.log('FRONTEND_URL:', process.env.FRONTEND_URL || 'http://localhost:5173 (default)');
  console.log('\n');
  
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('❌ SMTP_USER or SMTP_PASS not set in .env file');
    console.log('Please add them to backend/.env and try again');
    process.exit(1);
  }
  
  // Remove any spaces from password
  const password = process.env.SMTP_PASS.replace(/\s/g, '');
  console.log('Password (after removing spaces):', password.length, 'characters');
  
  // Try both ports
  const portsToTry = [465, 587];
  let workingPort = null;
  let workingTransporter = null;
  
  for (const port of portsToTry) {
    try {
      console.log(`\n🔄 Trying port ${port}...`);
      const useSecure = port === 465;
      
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: port,
        secure: useSecure,
        auth: {
          user: process.env.SMTP_USER,
          pass: password,
        },
        tls: {
          rejectUnauthorized: false
        },
        connectionTimeout: 15000,
        greetingTimeout: 15000,
      });
      
      console.log('   Verifying SMTP connection...');
      await transporter.verify();
      console.log(`   ✅ Port ${port} works!`);
      workingPort = port;
      workingTransporter = transporter;
      break;
      
    } catch (error) {
      if (error.code === 'ETIMEDOUT' || error.code === 'ECONNECTION') {
        console.log(`   ❌ Port ${port} failed: Connection timeout`);
      } else {
        console.log(`   ❌ Port ${port} failed: ${error.message}`);
      }
      continue;
    }
  }
  
  if (!workingTransporter) {
    console.error('\n❌ Both ports (465 and 587) failed!');
    console.error('\n🔍 Troubleshooting:');
    console.error('1. Check your internet connection');
    console.error('2. Check if firewall/antivirus is blocking SMTP ports');
    console.error('3. Try from a different network (some networks block SMTP)');
    console.error('4. Verify App Password is correct at: https://myaccount.google.com/apppasswords');
    console.error('5. Make sure 2-Step Verification is enabled');
    console.error('\n💡 For now, verification links will be logged to console');
    process.exit(1);
  }
  
  try {
    console.log('\n📧 Sending test email...');
    const info = await workingTransporter.sendMail({
      from: `"Labbi Test" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: 'Labbi Email Test',
      text: 'This is a test email from Labbi. If you receive this, email is working!',
      html: '<h1>Labbi Email Test</h1><p>This is a test email from Labbi. If you receive this, email is working!</p>'
    });
    
    console.log('✅ Test email sent successfully!');
    console.log('   Message ID:', info.messageId);
    console.log('   Check your inbox:', process.env.SMTP_USER);
    console.log(`\n✅ Email configuration is working on port ${workingPort}!`);
    console.log(`\n💡 If your .env uses port 587 but ${workingPort} works, update SMTP_PORT=${workingPort}\n`);
    
  } catch (error) {
    console.error('\n❌ Failed to send test email:', error.message);
    if (error.code === 'EAUTH') {
      console.error('\n🔴 Authentication failed!');
      console.error('Generate a new App Password at: https://myaccount.google.com/apppasswords');
    }
    process.exit(1);
  }
}

testEmail();
