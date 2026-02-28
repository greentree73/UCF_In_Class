type Recipe = {
  _id: string;
  title: string;
  cuisine: string;
  prepTimeMinutes: number;
  difficulty: string;
  slug: string;
  ingredients: string[];
};

type GraphQLResponse<TData = unknown> = {
  data?: TData;
  errors?: Array<{
    message: string;
    extensions?: {
      code?: string;
      [key: string]: unknown;
    };
  }>;
};

describe('Week 07 capstone: Recipe API', () => {
  beforeEach(() => {
    cy.task('db:clearRecipes');
  });

  it('returns all recipes from query recipes', () => {
    const seedRecipes: Omit<Recipe, '_id'>[] = [
      {
        title: 'Curry Lentil Soup',
        cuisine: 'Indian',
        prepTimeMinutes: 40,
        difficulty: 'Medium',
        slug: `curry-lentil-soup-${Date.now()}`,
        ingredients: ['lentils', 'onion', 'garlic', 'curry powder'],
      },
      {
        title: 'Avocado Toast',
        cuisine: 'American',
        prepTimeMinutes: 10,
        difficulty: 'Easy',
        slug: `avocado-toast-${Date.now()}-2`,
        ingredients: ['bread', 'avocado', 'salt'],
      },
    ];

    const recipesQuery = `
      query Recipes {
        recipes {
          _id
          title
          cuisine
          prepTimeMinutes
          difficulty
          slug
          ingredients
        }
      }
    `;

    cy.task('db:seedRecipes', seedRecipes);

    cy.gql<GraphQLResponse<{ recipes: Recipe[] }>>(recipesQuery).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.errors).to.be.undefined;
      expect(response.body.data?.recipes).to.have.length(2);
      expect(response.body.data?.recipes.map((recipe) => recipe.title)).to.include('Curry Lentil Soup');
      expect(response.body.data?.recipes.map((recipe) => recipe.title)).to.include('Avocado Toast');
    });
  });

  it('returns one recipe by id from query recipe', () => {
    const seedRecipes: Omit<Recipe, '_id'>[] = [
      {
        title: 'Tacos',
        cuisine: 'Mexican',
        prepTimeMinutes: 25,
        difficulty: 'Easy',
        slug: `tacos-${Date.now()}`,
        ingredients: ['tortillas', 'beef', 'onion', 'cilantro'],
      },
    ];

    const recipeByIdQuery = `
      query Recipe($id: ID!) {
        recipe(id: $id) {
          _id
          title
          cuisine
          prepTimeMinutes
          difficulty
          slug
          ingredients
        }
      }
    `;

    cy.task('db:seedRecipes', seedRecipes).then((inserted) => {
      const created = inserted as Recipe[];

      cy.gql<GraphQLResponse<{ recipe: Recipe }>>(recipeByIdQuery, {
        id: created[0]._id,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.errors).to.be.undefined;
        expect(response.body.data?.recipe.title).to.eq(seedRecipes[0].title);
        expect(response.body.data?.recipe.slug).to.eq(seedRecipes[0].slug);
      });
    });
  });

  it('creates a recipe and persists it in MongoDB', () => {
    const createRecipeMutation = `
      mutation CreateRecipe($input: CreateRecipeInput!) {
        createRecipe(input: $input) {
          _id
          title
          cuisine
          prepTimeMinutes
          difficulty
          slug
          ingredients
        }
      }
    `;

    const uniqueSuffix = Date.now();

    const input = {
      title: `Pasta Primavera ${uniqueSuffix}`,
      cuisine: 'Italian',
      prepTimeMinutes: 30,
      difficulty: 'Medium',
      slug: `pasta-primavera-${uniqueSuffix}`,
      ingredients: ['pasta', 'zucchini', 'tomatoes'],
    };

    cy.gql<GraphQLResponse<{ createRecipe: Recipe }>>(createRecipeMutation, { input }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.errors).to.be.undefined;

      const created = response.body.data?.createRecipe;
      expect(created?._id).to.be.a('string');
      expect(created?.title).to.eq(input.title);
      expect(created?.ingredients).to.deep.equal(input.ingredients);

      cy.task('db:getRecipeById', created?._id).then((dbRecipe) => {
        const persisted = dbRecipe as Recipe;
        expect(persisted.title).to.eq(input.title);
        expect(persisted.slug).to.eq(input.slug);
      });
    });
  });

  it('updates an existing recipe', () => {
    const updateRecipeMutation = `
      mutation UpdateRecipe($id: ID!, $input: UpdateRecipeInput!) {
        updateRecipe(id: $id, input: $input) {
          _id
          title
          cuisine
          prepTimeMinutes
          difficulty
          slug
          ingredients
        }
      }
    `;

    const base = Date.now();

    const seedRecipes: Omit<Recipe, '_id'>[] = [
      {
        title: `Fried Rice ${base}`,
        cuisine: 'Chinese',
        prepTimeMinutes: 20,
        difficulty: 'Easy',
        slug: `fried-rice-${base}`,
        ingredients: ['rice', 'eggs', 'soy sauce'],
      },
    ];

    cy.task('db:seedRecipes', seedRecipes).then((inserted) => {
      const created = inserted as Recipe[];
      const updatedInput = {
        title: `Vegetable Fried Rice ${base}`,
        prepTimeMinutes: 28,
        difficulty: 'Medium',
      };

      cy.gql<GraphQLResponse<{ updateRecipe: Recipe }>>(updateRecipeMutation, {
        id: created[0]._id,
        input: updatedInput,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.errors).to.be.undefined;
        expect(response.body.data?.updateRecipe.title).to.eq(updatedInput.title);
        expect(response.body.data?.updateRecipe.prepTimeMinutes).to.eq(updatedInput.prepTimeMinutes);

        cy.task('db:getRecipeById', created[0]._id).then((dbRecipe) => {
          const persisted = dbRecipe as Recipe;
          expect(persisted.title).to.eq(updatedInput.title);
          expect(persisted.difficulty).to.eq(updatedInput.difficulty);
        });
      });
    });
  });

  it('deletes a recipe by id', () => {
    const deleteRecipeMutation = `
      mutation DeleteRecipe($id: ID!) {
        deleteRecipe(id: $id) {
          _id
          title
        }
      }
    `;

    const seedRecipes: Omit<Recipe, '_id'>[] = [
      {
        title: `Delete Me ${Date.now()}`,
        cuisine: 'American',
        prepTimeMinutes: 12,
        difficulty: 'Easy',
        slug: `delete-me-${Date.now()}`,
        ingredients: ['one', 'two'],
      },
    ];

    cy.task('db:seedRecipes', seedRecipes).then((inserted) => {
      const created = inserted as Recipe[];

      cy.gql<GraphQLResponse<{ deleteRecipe: { _id: string; title: string } }>>(deleteRecipeMutation, {
        id: created[0]._id,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.errors).to.be.undefined;
        expect(response.body.data?.deleteRecipe._id).to.eq(created[0]._id);

        cy.task('db:getRecipeById', created[0]._id).then((dbRecipe) => {
          expect(dbRecipe).to.be.null;
        });
      });
    });
  });

  it('returns validation error when required fields are invalid', () => {
    const createRecipeMutation = `
      mutation CreateRecipe($input: CreateRecipeInput!) {
        createRecipe(input: $input) {
          _id
          title
        }
      }
    `;

    cy.gql<GraphQLResponse>(createRecipeMutation, {
      input: {
        title: 'Pi',
        cuisine: '',
        prepTimeMinutes: 0,
        difficulty: 'Impossible',
        slug: `bad-${Date.now()}`,
        ingredients: [],
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.be.null;
      expect(response.body.errors).to.have.length.greaterThan(0);
      expect(response.body.errors?.[0].message).to.include('validation failed');
    });
  });

  it('returns duplicate key error when slug already exists', () => {
    const createRecipeMutation = `
      mutation CreateRecipe($input: CreateRecipeInput!) {
        createRecipe(input: $input) {
          _id
          slug
        }
      }
    `;

    const slug = `duplicate-slug-${Date.now()}`;

    const validRecipe = {
      title: 'Shakshuka',
      cuisine: 'Middle Eastern',
      prepTimeMinutes: 35,
      difficulty: 'Medium',
      slug,
      ingredients: ['eggs', 'tomato', 'pepper'],
    };

    cy.gql<GraphQLResponse<{ createRecipe: Recipe }>>(createRecipeMutation, {
      input: validRecipe,
    }).then((firstResponse) => {
      expect(firstResponse.status).to.eq(200);
      expect(firstResponse.body.errors).to.be.undefined;

      cy.gql<GraphQLResponse>(createRecipeMutation, {
        input: {
          ...validRecipe,
          title: 'Shakshuka Copy',
        },
      }).then((secondResponse) => {
        expect(secondResponse.status).to.eq(200);
        expect(secondResponse.body.data).to.be.null;
        expect(secondResponse.body.errors).to.have.length.greaterThan(0);
        expect(secondResponse.body.errors?.[0].message).to.match(/duplicate key|E11000/i);
      });
    });
  });

  it('returns NOT_FOUND for updateRecipe when id does not exist', () => {
    const updateRecipeMutation = `
      mutation UpdateRecipe($id: ID!, $input: UpdateRecipeInput!) {
        updateRecipe(id: $id, input: $input) {
          _id
          title
        }
      }
    `;

    const missingId = '64f8f10f2c77f4c2ec09a999';

    cy.gql<GraphQLResponse>(updateRecipeMutation, {
      id: missingId,
      input: {
        title: 'Missing update target',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.be.null;
      expect(response.body.errors).to.have.length(1);
      expect(response.body.errors?.[0].message).to.include('Recipe not found');
      expect(response.body.errors?.[0].extensions?.code).to.eq('NOT_FOUND');
    });
  });
});
