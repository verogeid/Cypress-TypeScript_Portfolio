describe('US # GX3-5646 | ToolsQA | Elements | Checkbox', () => {
	beforeEach('PRC: Abrir url de Checkbox en ToolsQA', () => {
		cy.visit('https://demoqa.com/checkbox');
		cy.url().should('contain', 'checkbox');
	});

	it('GX3-5661 | TC#01: Validar que el boton "Expand All" abra todas las ramas', () => {
		// Localizar el botón Expand
		cy.get('button.rct-option.rct-option-expand-all').as('btnExpandAll');

		// Localizar el botón de colapso de las ramas
		cy.get('button.rct-collapse.rct-collapse-btn').as('btnCollapse');
		// Localizar el icono de colapso de las ramas [open | close]
		//cy.get('svg[clash^="rct-icon rct-icon-expand-"]').as('imgCollapse');
		// Localizar los checkbox ['check' | 'uncheck' | 'half-check']
		cy.get('svg[class^="rct-icon rct-icon-"][class$="check"]').as('chkNode');

		// Debe haber al menos 1
		cy.get('@btnCollapse').should('exist').and('have.length.above', 0);
		//cy.get('@imgCollapse').should('exist').and('have.length.above', 0);
		cy.get('@chkNode').should('exist').and('have.length.above', 0);

		// tras hacer click en Expand
		cy.get('@btnExpandAll').should('exist').click();

		// debe haber más de 1 (en principio son 17, pero puede cambiar)
		cy.get('@chkNode').should('have.length.above', 1);
		//cy.get('@imgCollapse').should('have.class', 'rct-icon rct-icon-expand-close');
	});

	it('GX3-5661 | TC#02: Validar que el boton "Collapse All" cierre todas las ramas', () => {
		// Localizar el botón Collapse All
		cy.get('button.rct-option.rct-option-collapse-all').as('btnCollapseAll');

		// Localizar el botón de colapso de las ramas
		cy.get('.rct-collapse.rct-collapse-btn').as('btnCollapse');
		// Localizar el icono de colapso de las ramas [open | close]
		//cy.get('svg[clash^="rct-icon rct-icon-expand-"]').as('imgCollapse');
		// Localizar los checkbox ['check' | 'uncheck' | 'half-check']
		cy.get('svg[class^="rct-icon rct-icon-"][class$="check"]').as('chkNode');

		// Debe haber al menos 1
		cy.get('@btnCollapse').should('exist').and('have.length.above', 0);
		cy.get('@chkNode').should('exist').and('have.length.above', 0);
		//cy.get('@imgCollapse').should('exist').and('have.length.above', 0);

		// tras hacer click en Collapse
		cy.get('@btnCollapseAll').should('exist').click();

		// debe haber sólo 1
		cy.get('@chkNode').should('have.length', 1);
		cy.get('@btnCollapse').should('exist').and('have.length', 1);
		//cy.get('@imgCollapse').should('exist').and('have.length', 1).and('have.class', 'rct-icon rct-icon-expand-open');
	});
});
