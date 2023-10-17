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

  it('user selects a game and finishes it', () => {
    const ODLAW_COORDS = [52, 448] as const;
    const WALDO_COORDS = [807, 32] as const;
    const ODLAW_DELAY = 1000;
    const WALDO_DELAY = 2000;
    const ELAPSED_TIME_STRING = `00:${String(
      ODLAW_DELAY / 1000 + WALDO_DELAY / 1000
    ).padStart(2, '0')}`;
    const PLAYER_NAME = 'Jack';
    const LEVEL_ID = '1';

    cy.visit('/');

    cy.get(`[data-cy="level-${LEVEL_ID}-link"]`).click();

    cy.get('h1').contains(/at the fair/i);

    cy.wait(ODLAW_DELAY);

    // find Odlaw
    cy.get('[data-cy="level-img"]').rightclick(...ODLAW_COORDS);
    cy.get('[data-cy="odlaw-menubutton"]')
      .as('odlaw-menubutton')
      .find('img[alt="Odlaw"]');
    cy.get('@odlaw-menubutton').click();

    // Odlaw icon is greyed out and Waldo icon is not
    cy.get('[data-cy="odlaw-found-icon"]').should(
      'have.class',
      'brightness-50'
    );
    cy.get('[data-cy="waldo-found-icon"]').should(
      'have.not.class',
      'brightness-50'
    );

    cy.wait(WALDO_DELAY);

    // find Odlaw
    cy.get('[data-cy="level-img"]').rightclick(...WALDO_COORDS);
    cy.get('[data-cy="waldo-menubutton"]')
      .as('waldo-menubutton')
      .find('img[alt="Waldo"]');
    cy.get('@waldo-menubutton').click();

    // type name
    cy.get('h1').contains(/you found 'em/i);
    cy.get('time').contains(ELAPSED_TIME_STRING);
    cy.get('input').type(`${PLAYER_NAME}{enter}`);

    // see score scrolled into view on scoreboard page
    cy.get('h1').contains(/scoreboard/i);
    cy.get('[data-cy="active-score-row"]')
      .should('be.visible')
      .and('have.length', 1);

    cy.get('[data-cy="active-score-name"]').contains(PLAYER_NAME);
    cy.get('[data-cy="active-score-level-id"]').contains(LEVEL_ID);
    cy.get('[data-cy="active-score-time"]').contains(ELAPSED_TIME_STRING);
  });
});
