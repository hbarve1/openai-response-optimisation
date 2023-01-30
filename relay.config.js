module.exports = {
  src: './apps/app',
  language: 'typescript', // "javascript" | "typescript" | "flow"
  schema: './graphql/server.graphql',
  exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
};
