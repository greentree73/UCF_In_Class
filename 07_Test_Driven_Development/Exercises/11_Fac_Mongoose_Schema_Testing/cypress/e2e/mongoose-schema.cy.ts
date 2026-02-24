describe("Mongoose schema validation and middleware demo", () => {
  it("creates a valid book and returns middleware-generated slug", () => {
    // This mutation sends valid input. Mongoose validation should pass.
    // The pre('validate') middleware should generate the slug from title.
    const createBookMutation = `
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
        query: createBookMutation,
        variables: {
          input: {
            title: "Mongoose Testing Basics",
            author: "Facilitator"
          }
        }
      }
    }).then((response) => {
      // GraphQL responds with 200 even when operations can fail logically,
      // so we always inspect response.body.data/errors.
      expect(response.status).to.eq(200);
      expect(response.body.errors).to.be.undefined;
      expect(response.body.data.createBook.title).to.eq("Mongoose Testing Basics");
      expect(response.body.data.createBook.slug).to.eq("mongoose-testing-basics");
    });
  });

  it("returns GraphQL errors when Mongoose validation fails", () => {
    // Title is too short for schema minlength: 3, so Mongoose should reject this write.
    const invalidMutation = `
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
        query: invalidMutation,
        variables: {
          input: {
            title: "Hi",
            author: "Facilitator"
          }
        }
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      // For GraphQL validation/runtime failures, Apollo returns an errors array.
      expect(response.body.errors).to.exist;
      expect(response.body.errors[0].message).to.include("validation failed");
    });
  });
});
