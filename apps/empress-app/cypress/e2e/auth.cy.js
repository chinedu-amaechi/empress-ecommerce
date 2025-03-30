describe("Authentication Pages", () => {
  it("displays sign-in page with correct form fields", () => {
    // Visit sign-in page
    cy.visit("/auth/sign-in");

    // Verify page title
    cy.contains("h2", "Sign In").should("be.visible");

    // Verify form fields exist
    cy.get('input[type="email"]').should("be.visible");
    cy.get('input[type="password"]').should("be.visible");
    cy.get('input[type="checkbox"]').should("be.visible");

    // Verify Remember me label
    cy.contains("Remember me").should("be.visible");

    // Verify Forgot password link
    cy.contains("Forgot password?").should("be.visible");

    // Verify sign-in button
    cy.get("button").contains("Sign In").should("be.visible");

    // Verify create account link
    cy.contains("Create an Account").should("be.visible");
  });

  it("navigates to sign-up page from sign-in", () => {
    // Start at sign-in page
    cy.visit("/auth/sign-in");

    // Click create account link
    cy.contains("Create an Account").click();

    // Verify redirect to sign-up page
    cy.url().should("include", "/auth/sign-up");

    // Verify sign-up form appears
    cy.contains("h2", "Sign Up").should("be.visible");
  });

  it("displays sign-up page with correct form fields", () => {
    // Visit sign-up page directly
    cy.visit("/auth/sign-up");

    // Verify heading
    cy.contains("h2", "Sign Up").should("be.visible");

    // Verify all required form fields exist
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get('input[name="confirmPassword"]').should("be.visible");
    cy.get('input[name="firstName"]').should("be.visible");
    cy.get('input[name="lastName"]').should("be.visible");

    // Verify additional fields
    cy.get('input[name="username"]').should("be.visible");
    cy.get('input[name="address"]').should("be.visible");
    cy.get('input[name="city"]').should("be.visible");
    cy.get('input[name="province"]').should("be.visible");
    cy.get('input[name="postcode"]').should("be.visible");

    // Verify create account button
    cy.contains("Create Account").should("be.visible");

    // Verify sign in link for existing users
    cy.contains("Sign in").should("be.visible");
  });

  it("shows password validation error on sign-up", () => {
    cy.visit("/auth/sign-up");

    // Enter different passwords
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("differentpassword");

    // Verify error message appears
    cy.contains("Passwords do not match").should("be.visible");

    // Now fix the password to match
    cy.get('input[name="confirmPassword"]').clear().type("password123");

    // Verify error message disappears
    cy.contains("Passwords do not match").should("not.exist");
  });

  it("displays forgot password page", () => {
    // Visit forgot password page
    cy.visit("/auth/forget-password");

    // Verify heading
    cy.contains("h2", "Forgot Password").should("be.visible");

    // Verify email field exists
    cy.get('input[type="email"]').should("be.visible");

    // Verify send reset link button
    cy.contains("Send Reset Link").should("be.visible");

    // Verify sign in link
    cy.contains("Sign in").should("be.visible");
  });
});
