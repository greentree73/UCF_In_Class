# GraphQL Intro API (HackHaven)

## Run

```bash
npm install
npm run dev
```

## Endpoint

- `POST /graphql`

## Example Query

```graphql
query {
  post {
    id
    title
    author
  }
}
```

## Example curl

```bash
curl -X POST http://localhost:4001/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"query { post { id title author } }"}'
```

This returns only the fields requested from the post object defined in `app.ts`.
