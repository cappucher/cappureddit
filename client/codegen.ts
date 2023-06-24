import type { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: './src/**/*.gql',
  generates: {
    './src/generated/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'graphql-codegen-svelte-apollo']
    }
  }
}
export default config