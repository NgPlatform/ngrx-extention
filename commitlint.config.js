module.exports = {
	extends: ['@commitlint/config-conventional'],
	ignores: [(commit) => commit.startsWith('chore(release):')],
};
