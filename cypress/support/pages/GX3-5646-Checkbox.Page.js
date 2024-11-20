class CheckboxTree {
	getSelector = {
		treeWrapper: () => '.check-box-tree-wrapper',

		buttonExpandAll: () => 'button.rct-option.rct-option-expand-all',
		buttonCollapseAll: () => 'button.rct-option.rct-option-collapse-all',
		buttonCollapseToggle: () => 'button.rct-collapse.rct-collapse-btn',
		buttonToggle: () => 'button[title="Toggle"]',

		imgToggleButton: () => 'svg[class^="rct-icon rct-icon-expand-"]',
		imgToggleOpened: () => 'svg[class="rct-icon rct-icon-expand-open"]',
		imgToggleClosed: () => 'svg[class="rct-icon rct-icon-expand-close"]',

		imgCheckbox: () => 'svg[class^="rct-icon rct-icon-"][class$="check"]',
		imgCheckboxChecked: () => 'svg.rct-icon.rct-icon-check',
		imgCheckboxUncheckedOrHalfChecked: () => 'svg[class^="rct-icon rct-icon"][class$="-uncheck"][class$="-half-check"]',
		imgCheckboxCheckedOrHalfChecked: () => 'svg[class^="rct-icon rct-icon"][class$="-check"][class$="-half-check"]',

		liNodes: () => 'li[class^="rct-node rct-node-parent rct-node-"]',
		liNodesCollapsed: () => 'li.rct-node.rct-node-parent.rct-node-collapsed',
		liNodesExpanded: () => 'li.rct-node.rct-node-parent.rct-node-expanded',
		classNodeCollapsed: () => 'rct-node-collapsed',

		checkboxElement: () => 'span.rct-checkbox',
		checkboxTitle: () => '.rct-title',

		txtResult: () => '#result',
		txtSuccess: () => 'span.text-success'
	};

	validateCollapsePRC() {
		// Localizar el botón de colapso de las ramas
		cy.get(checkboxTreePage.getSelector.buttonCollapseToggle()).as('btnToggle');
		// Localizar el primer icono de colapso de las ramas [open | close]
		cy.get(checkboxTreePage.getSelector.imgToggleButton()).eq(1).as('imgToggle');
		// Localizar los checkbox ['check' | 'uncheck' | 'half-check']
		cy.get(checkboxTreePage.getSelector.imgCheckbox()).as('chkNode');

		// Debe haber al menos 1
		cy.get('@btnToggle').should('exist').and('have.length.above', 0);
		cy.get('@chkNode').should('exist').and('have.length.above', 0);
		cy.get('@imgToggle').should('exist').and('have.length.above', 0);
	}

	validateExpandPRC() {
		// Localizar el botón de toggle de las ramas
		cy.get(checkboxTreePage.getSelector.buttonCollapseToggle()).as('btnToggle');
		// Localizar la primera instancia de toggle de la rama (la posición 0 contiene All)
		cy.get(checkboxTreePage.getSelector.imgToggleButton()).eq(1).as('imgToggle');
		// Localizar los checkbox ['check' | 'uncheck' | 'half-check']
		cy.get(checkboxTreePage.getSelector.imgCheckbox()).as('chkNode');

		// Debe haber al menos 1
		cy.get('@btnToggle').should('exist').and('have.length.above', 0);
		cy.get('@imgToggle').should('exist'); // debe existir, pero no sabemos si esta abierta o no
		cy.get('@chkNode').should('exist').and('have.length.above', 0);
	}

	validateToggleCollapsablePRC() {
		// No debe haber nodos colapsados
		cy.get(checkboxTreePage.getSelector.liNodesCollapsed()).should('not.exist');
	}

	validateToggleExpandiblePRC() {
		// No debe haber nodos expandidos
		cy.get(checkboxTreePage.getSelector.liNodesExpanded()).should('not.exist');
	}

	validateToggleExpandiblePSC() {
		// AL acabar NO debe haber nodos collapsados
		cy.get(checkboxTreePage.getSelector.liNodesCollapsed()).should('not.exist');
	}

	validateToggleClick($the) {
		cy.get($the).within(() => {
			// Debe haber subelementos
			cy.get('ol').should('exist');

			// Debe tener boton Toggle
			cy.get('button[title="Toggle"]').first().as('btnToggle').should('exist').and('be.visible').and('be.enabled').click();

			// Tras pulsar el toggle
			// NO debe haber subelementos
			cy.get('ol').should('not.exist');
		});

		// La clase del Li ha cambiado a Collapsed
		cy.get($the).should('have.class', 'rct-node-collapsed');
	}

	validateSubNodesSelection(pSelector) {
		cy.get(pSelector).then($theList => {
			// Obtener el recuento de elementos
			const intCountNodes = Cypress.$($theList).length;

			// Los checks estan marcados
			cy.get(checkboxTreePage.getSelector.checkboxElement()).as('chkListElement');
			cy.get(checkboxTreePage.getSelector.imgCheckboxChecked()).as('subElement').should('exist').and('have.length', intCountNodes);

			//Los elementos marcados deben estar en el result
			cy.get('@subElement') //svg
				.parent() // span rct-checkbox
				.parent() // label tree-node-xxxx
				.find(checkboxTreePage.getSelector.checkboxTitle()) // span rct-title
				.each($subThe => {
					checkboxTreePage.validateTextResult($subThe);
				}); // @subElement each
		}); // @chkListElement then
	}

	validateTextResult($the) {
		// Convertir la cadena al mismo formato que muestra Result
		// Aaaaa Bbbbb.doc -> aaaaaBbbbb (camelCase, sin extensión)

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const txtCadena = $the.text().toLowerCase().replace('.doc', '');
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const intPosEspacio = txtCadena.indexOf(' ');

		cy.get($the).parentsUntil(checkboxTreePage.getSelector.treeWrapper()).parent().as('theFather');

		if (intPosEspacio > 0) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const txtNewCadena = txtCadena.slice(0, intPosEspacio) + txtCadena.charAt(intPosEspacio + 1).toUpperCase() + txtCadena.slice(intPosEspacio + 2);

			cy.get('@theFather').find(checkboxTreePage.getSelector.txtSuccess()).as('txtResult').should('exist').and('include.text', txtNewCadena);
		} else {
			cy.get('@theFather').find(checkboxTreePage.getSelector.txtSuccess()).as('txtResult').should('exist').and('include.text', txtCadena);
		} // if
	}
}

export const checkboxTreePage = new CheckboxTree();
