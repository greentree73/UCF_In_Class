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

const updateBookMutation = `
  mutation UpdateBook($id: ID!, $input: UpdateBookInput!) {
    updateBook(id: $id, input: $input) {
      id
      title
      author
      slug
    }
  }
`;

const booksQuery = `
  query Books {
    books {
      id
      title
      author
      slug
    }
  }
`;

const seedBooks = [
  {
    title: "Original Mutation Title",
    author: "Facilitator"
  }
];

describe("Testing GraphQL write mutations against API response and DB state", () => {
  beforeEach(() => {
    cy.task("db:clearBooks");
  });

  it("Create mutation persists data and returns expected GraphQL payload", () => {
    const uniqueTitle = `Create Operation Demo ${Date.now()}`;

    cy.gql(createBookMutation, {
      input: {
        title: uniqueTitle,
        author: "Facilitator"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.errors).to.be.undefined;

      const createdBook = response.body.data.createBook;
      expect(createdBook.title).to.eq(uniqueTitle);
      expect(createdBook.author).to.eq("Facilitator");
      expect(createdBook.slug).to.eq(uniqueTitle.toLowerCase().replace(/\s+/g, "-"));

      cy.task("db:getBookById", createdBook.id).then((dbBook) => {
        const persistedBook = dbBook as
          | { title: string; author: string; slug: string }
          | null;

        expect(persistedBook).to.exist;
        expect(persistedBook?.title).to.eq(uniqueTitle);
        expect(persistedBook?.author).to.eq("Facilitator");
        expect(persistedBook?.slug).to.eq(uniqueTitle.toLowerCase().replace(/\s+/g, "-"));
      });
    });
  });

  it("Update mutation changes stored data and DB reflects same values", () => {
    cy.task("db:seedBooks", seedBooks);

    cy.gql(booksQuery).then((booksResponse) => {
      const seededBook = booksResponse.body.data.books[0];
      expect(seededBook).to.exist;

      cy.gql(updateBookMutation, {
        id: seededBook.id,
        input: {
          title: "Updated Mutation Title",
          author: "Facilitator Updated"
        }
      }).then((updateResponse) => {
        expect(updateResponse.status).to.eq(200);
        expect(updateResponse.body.errors).to.be.undefined;

        const updatedBook = updateResponse.body.data.updateBook;
        expect(updatedBook.id).to.eq(seededBook.id);
        expect(updatedBook.title).to.eq("Updated Mutation Title");
        expect(updatedBook.author).to.eq("Facilitator Updated");
        expect(updatedBook.slug).to.eq("updated-mutation-title");

        cy.task("db:getBookById", seededBook.id).then((dbBook) => {
          const persistedBook = dbBook as
            | { title: string; author: string; slug: string }
            | null;

          expect(persistedBook).to.exist;
          expect(persistedBook?.title).to.eq("Updated Mutation Title");
          expect(persistedBook?.author).to.eq("Facilitator Updated");
          expect(persistedBook?.slug).to.eq("updated-mutation-title");
        });
      });
    });
  });
});
