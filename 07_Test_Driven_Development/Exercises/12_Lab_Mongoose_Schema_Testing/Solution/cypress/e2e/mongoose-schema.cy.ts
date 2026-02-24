describe("Mongoose schema testing lab solution", () => {
  it("creates a valid book and verifies middleware-generated slug", () => {
    const mutation = `
      mutation CreateBook($input: CreateBookInput!) {
        createBook(input: $input) {
          id
          title
          author
          slug
        }
      }
    `;

    cy.request({
      method: "POST",
      url: Cypress.env("apiPath"),
      body: {
        query: mutation,
        variables: {
          input: {
            title: "Schema Testing Intro",
            author: "Student"
          }
        }
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.errors).to.be.undefined;
      expect(response.body.data.createBook.title).to.eq("Schema Testing Intro");
      expect(response.body.data.createBook.slug).to.eq("schema-testing-intro");
    });
  });

  it("returns GraphQL errors for a title that is too short", () => {
    const mutation = `
      mutation CreateBook($input: CreateBookInput!) {
        createBook(input: $input) {
          id
          title
          slug
        }
      }
    `;

    cy.request({
      method: "POST",
      url: Cypress.env("apiPath"),
      body: {
        query: mutation,
        variables: {
          input: {
            title: "Hi",
            author: "Student"
          }
        }
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.errors).to.exist;
      expect(response.body.errors[0].message).to.include("validation failed");
    });
  });

  it("returns GraphQL errors when author is missing", () => {
    const mutation = `
      mutation CreateBook($input: CreateBookInput!) {
        createBook(input: $input) {
          id
          title
          slug
        }
      }
    `;

    cy.request({
      method: "POST",
      url: Cypress.env("apiPath"),
      body: {
        query: mutation,
        variables: {
          input: {
            title: "Missing Author Demo",
            author: ""
          }
        }
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.errors).to.exist;
      expect(response.body.errors[0].message).to.include("validation failed");
    });
  });
});
