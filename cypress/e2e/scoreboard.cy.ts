describe('scoreboard', () => {
  it('user goes to scoreboard page and clicks start playing link', () => {
    cy.visit('/');

    cy.get('[data-cy="scoreboard-link"]').click();

    cy.get('[data-cy="playing-link"]').click();
    cy.get('h1').contains(
      /Can you spot the elusive Waldo and top the leaderboard/i
    );
  });
});
