describe('scoreboard', () => {
  beforeEach(() => {
    cy.task('empty:db');
    cy.visit('/');
  });

  it('user goes to scoreboard page and clicks start playing link', () => {
    cy.get('[data-cy="scoreboard-link"]').click();

    cy.get('[data-cy="playing-link"]').click();
    cy.get('h1').contains(
      /Can you spot the elusive Waldo and top the leaderboard/i
    );
  });
});
