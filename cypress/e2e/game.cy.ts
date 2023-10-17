describe('game', () => {
  it('user selects a game and quits it', () => {
    cy.visit('/');

    cy.get('[data-cy="level-1-link"]').click();

    cy.get('h1').contains(/at the fair/i);
    cy.get('[data-cy="level-quit-link"]').click();

    cy.get('h1').contains(
      /Can you spot the elusive Waldo and top the leaderboard/i
    );
  });
});
