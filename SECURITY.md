# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please send an email to the development team. All security vulnerabilities will be promptly addressed.

Please do not publicly disclose the issue until it has been addressed by the team.

## Security Measures

This application implements several security best practices:

- **Authentication**: Secure session-based authentication with Laravel Sanctum
- **Authorization**: Role-based access control using Spatie Laravel Permission
- **Password Hashing**: Bcrypt hashing for password storage
- **CSRF Protection**: Enabled on all state-changing requests
- **SQL Injection Prevention**: Eloquent ORM with prepared statements
- **XSS Protection**: React's built-in XSS prevention and input sanitization
- **Session Security**: Secure session cookies with HTTP-only flag
- **Input Validation**: Server-side validation on all user inputs

## Recommended Production Settings

```env
APP_ENV=production
APP_DEBUG=false
SESSION_ENCRYPT=true
SESSION_SECURE_COOKIE=true
```

## Updates

Security updates are released as needed. Please keep your dependencies up to date:

```bash
composer update
npm update
```
