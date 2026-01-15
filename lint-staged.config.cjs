module.exports = {
  // Match all staged files except JSON
  '**/*.{js,ts,svelte,css,md}': (filenames) => [
    `eslint ${filenames.join(' ')}`,
    `prettier --write ${filenames.join(' ')}`
  ],
};
