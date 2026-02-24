describe("Mongoose schema validation and middleware demo", () => {
  it("TODO: creates a valid book and verifies middleware-generated slug", () => {
    // TODO:
    // 1) Build a valid createBook mutation request.
    // 2) Assert response.status is 200.
    // 3) Assert response.body.errors is undefined.
    // 4) Assert slug is generated from the title.
    throw new Error("TODO: Implement Test 1");
  });

  it("TODO: returns GraphQL errors for a title that is too short", () => {
    // TODO:
    // 1) Send createBook with title shorter than minlength (3).
    // 2) Assert response.status is 200.
    // 3) Assert response.body.errors exists.
    // 4) Assert message includes "validation failed".
    throw new Error("TODO: Implement Test 2");
  });

  it("TODO: returns GraphQL errors when author is missing", () => {
    // TODO:
    // 1) Send createBook mutation with missing/empty author.
    // 2) Assert response.status is 200.
    // 3) Assert response.body.errors exists.
    // 4) Assert message indicates required validation failure.
    throw new Error("TODO: Implement Test 3");
  });
});
