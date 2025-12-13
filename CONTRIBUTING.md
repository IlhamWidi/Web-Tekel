# Contributing to PT Surya Multi Cemerlang Production Report System

Thank you for your interest in contributing to this project!

## Development Setup

1. Fork the repository
2. Clone your fork
3. Create a feature branch
4. Make your changes
5. Run tests
6. Submit a pull request

## Code Standards

### PHP Code Style

Follow PSR-12 coding standards:

```bash
# Run PHP CS Fixer
./vendor/bin/pint
```

### JavaScript/React Code Style

- Use functional components with hooks
- Follow ESLint rules
- Use meaningful variable names
- Keep components small and focused

### Commit Messages

Use conventional commit format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Example:
```
feat(reports): add batch export functionality

- Implement batch PDF export
- Add Excel export option
- Update UI with export buttons

Closes #123
```

## Pull Request Process

1. Update README.md with details of changes if needed
2. Update documentation for any new features
3. Ensure all tests pass
4. Get approval from at least one maintainer
5. Squash commits if necessary

## Testing

### Run PHP Tests
```bash
php artisan test
```

### Manual Testing Checklist

- [ ] Login/logout functionality
- [ ] CRUD operations for all entities
- [ ] Role-based access control
- [ ] Data validation
- [ ] Error handling
- [ ] Mobile responsiveness

## Code Review Guidelines

- Keep PRs focused and small
- Write descriptive PR descriptions
- Respond to feedback promptly
- Be respectful and constructive

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Documentation improvements
- General questions

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
