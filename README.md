🔐 MERN Authentication System:-
A complete authentication and authorization system built with Node.js, Express, MongoDB, and JWT.
This project includes email verification, OTP-based password reset, session management, and secure authentication using hashed passwords.

🚀 Features:-
✅ User Registration

✅ Email Verification (JWT Token based)

✅ Secure Login System

✅ Session Management

✅ Logout Functionality

✅ Forgot Password with OTP (Email Based)

✅ OTP Verification with Expiry

✅ Resend OTP

✅ Change Password

✅ Password Hashing using bcrypt

✅ Secure Token Handling using JWT

🛠️ Tech Stack:-
Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

Authentication: JWT (Access & Refresh Token)

Password Hashing: bcryptjs

Email Service: Nodemailer

Security: Crypto (SHA256 for OTP hashing)

🔑 Authentication Flow:-
📝 Register

User registers with name, email, password.

Password is hashed using bcrypt.

JWT verification token generated (10 min expiry).

Verification email sent to user.

📧 Verify Email

User verifies email using JWT token.

Account is marked as verified.

🔓 Login

Checks email & password.

Only verified users can login.

Generates:

Access Token (10 days)

Refresh Token (30 days)

Session stored in database.

🔁 Forgot Password

Generates 6-digit OTP.

OTP hashed using SHA256.

OTP expires in 2 minutes.

OTP sent via email.

🔍 Verify OTP

Validates OTP.

Clears stored OTP after successful verification.

🔐 Change Password

Hashes new password.

Updates securely in database.
