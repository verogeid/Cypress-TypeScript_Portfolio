describe('US # GX3-5646 | ToolsQA | Elements | Checkbox', () => {
	beforeEach('PRC: Abrir url de Checkbox en ToolsQA', () => {
		cy.visit('https://demoqa.com/checkbox');
		cy.url().should('contain', 'checkbox');
	});

	it('GX3-5661 | TC#01: Validar que el boton "Expand All" abra todas las ramas', () => {
		// Localizar el botón Expand
		cy.get('button.rct-option.rct-option-expand-all').as('btnExpandAll');

		// Localizar el botón de toggle de las ramas
		cy.get('button.rct-collapse.rct-collapse-btn').as('btnToggle');
		// Localizar la primera instancia de toggle de la rama (la posición 0 contiene All)
		cy.get('svg[class^="rct-icon rct-icon-expand-"]').eq(1).as('imgToggle');
		// Localizar los checkbox ['check' | 'uncheck' | 'half-check']
		cy.get('svg[class^="rct-icon rct-icon-"][class$="check"]').as('chkNode');

		// Debe haber al menos 1
		cy.get('@btnToggle').should('exist').and('have.length.above', 0);
		cy.get('@imgToggle').should('exist'); // debe existir, pero no sabemos si esta abierta o no
		cy.get('@chkNode').should('exist').and('have.length.above', 0);

		// tras hacer click en Expand
		cy.get('@btnExpandAll').should('exist').click();

		// Localizar los iconos de toggle de la rama
		cy.get('svg[class="rct-icon rct-icon-expand-open"]').as('imgToggleOpen');
		cy.get('@imgToggleOpen').should('exist'); //debe existir y estar abierta tras el click

		// Localizar los icono de la ramas cerrados. No debiera haber ninguno
		cy.get('svg[class="rct-icon rct-icon-expand-close"]').should('not.exist');

		// debe haber más de 1 (en principio son 17, pero puede cambiar)
		cy.get('@chkNode').should('have.length.above', 1);
	});

	it('GX3-5661 | TC#02: Validar que el boton "Collapse All" cierre todas las ramas', () => {
		// PRC: Localizar el botón Expand y hacer click
		cy.get('button.rct-option.rct-option-expand-all').as('btnExpandAll').click();

		// Localizar el botón Collapse All
		cy.get('button.rct-option.rct-option-collapse-all').as('btnCollapseAll');

		// Localizar el botón de colapso de las ramas
		cy.get('.rct-collapse.rct-collapse-btn').as('btnToggle');
		// Localizar el primer icono de colapso de las ramas [open | close]
		cy.get('svg[class^="rct-icon rct-icon-expand-"]').eq(1).as('imgToggle');
		// Localizar los checkbox ['check' | 'uncheck' | 'half-check']
		cy.get('svg[class^="rct-icon rct-icon-"][class$="check"]').as('chkNode');

		// Debe haber al menos 1
		cy.get('@btnToggle').should('exist').and('have.length.above', 0);
		cy.get('@chkNode').should('exist').and('have.length.above', 0);
		cy.get('@imgToggle').should('exist').and('have.length.above', 0);

		// tras hacer click en Collapse
		cy.get('@btnCollapseAll').should('exist').click();
		cy.get('svg[class="rct-icon rct-icon-expand-close"]').as('imgToggleOpen');

		// debe haber sólo 1
		cy.get('@chkNode').should('have.length', 1);
		cy.get('@btnToggle').should('exist').and('have.length', 1);
		cy.get('@imgToggleOpen').should('exist'); // y estar cerrada la rama
	});

	it('GX3-5661 | TC#03: Validar comportamiento de toggles intermedios', () => {
		//Abrir la rama principal
		cy.get('.rct-collapse.rct-collapse-btn').as('btnToggle').first().click();

		// Obtener la lista de nodos (contiene span, que contiene button y label)
		cy.get('li[class^="rct-node rct-node-parent"]')
			.as('lstNodes')
			.then($checkboxItems => {
				const intListIndex = $checkboxItems.length;
				const intIndexRandom = Math.floor(Math.random() * intListIndex);

				// Capturar el botón para trabajar con él
				cy.wrap($checkboxItems[intIndexRandom]).find('button.rct-collapse.rct-collapse-btn').as('btnWrapped').click();

				cy.get('@btnWrapped')
					.should('exist')
					.and('have.length.above', 0)
					.within($the => {
						cy.get('svg').should('have.class', 'rct-icon rct-icon-expand-open');
						//cy.log(cy.get($the.parent().find('label span.rct-title')));
					}); // within
			}); // then
	}); // it

	it('GX3-5661 | TC#04: Validar que muestre mensaje al marcar checkboxs', () => {});
});
