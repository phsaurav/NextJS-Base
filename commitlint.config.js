// build(topic): Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
// BUILD(topic): Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
// ci(topic): Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
// docs(topic): Documentation only changes
// feat(topic): A new feature
// fix(topic): A bug fix
// perf(topic): A code change that improves performance
// refactor(topic): A code change that neither fixes a bug nor adds a feature
// style(topic): Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
// test(topic): Adding missing tests or correcting existing tests

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', []],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', ['upper-case', 'lower-case']],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'BUILD',
        'CHORE',
        'CI',
        'DOCS',
        'FEAT',
        'FIX',
        'PERF',
        'REFACTOR',
        'REVERT',
        'STYLE',
        'TEST',
      ],
    ],
  },
};
