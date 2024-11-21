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
		classNodeExpanded: () => 'rct-node-expanded',

		checkboxElement: () => 'span.rct-checkbox',
		checkboxTitle: () => '.rct-title',

		txtResult: () => '#result',
		txtSuccess: () => 'span.text-success'
	};

	validateCollapseTreePRC() {
		const BUTTON_COLLAPSE_TOGGLE = checkboxTreePage.getSelector.buttonCollapseToggle();
		const IMG_TOGGLE_BUTTON = checkboxTreePage.getSelector.imgToggleButton();
		const IMG_CHECKBOX = checkboxTreePage.getSelector.imgCheckbox();

		// Localizar el botón de colapso de las ramas
		cy.get(BUTTON_COLLAPSE_TOGGLE).as('btnToggle');
		// Localizar el primer icono de colapso de las ramas [open | close]
		cy.get(IMG_TOGGLE_BUTTON).eq(1).as('imgToggle');
		// Localizar los checkbox ['check' | 'uncheck' | 'half-check']
		cy.get(IMG_CHECKBOX).as('chkNode');

		// Debe haber al menos 1
		cy.get('@btnToggle').should('exist').and('have.length.above', 0);
		cy.get('@chkNode').should('exist').and('have.length.above', 0);
		cy.get('@imgToggle').should('exist').and('have.length.above', 0);
	}

	validateExpandTreePRC() {
		const BUTTON_COLLAPSE_TOGGLE = checkboxTreePage.getSelector.buttonCollapseToggle();
		const IMG_TOGGLE_BUTTON = checkboxTreePage.getSelector.imgToggleButton();
		const IMG_CHECKBOX = checkboxTreePage.getSelector.imgCheckbox();

		// Localizar el botón de toggle de las ramas
		cy.get(BUTTON_COLLAPSE_TOGGLE).as('btnToggle');
		// Localizar la primera instancia de toggle de la rama (la posición 0 contiene All)
		cy.get(IMG_TOGGLE_BUTTON).eq(1).as('imgToggle');
		// Localizar los checkbox ['check' | 'uncheck' | 'half-check']
		cy.get(IMG_CHECKBOX).as('chkNode');

		// Debe haber al menos 1
		cy.get('@btnToggle').should('exist').and('have.length.above', 0);
		cy.get('@imgToggle').should('exist'); // debe existir, pero no sabemos si esta abierta o no
		cy.get('@chkNode').should('exist').and('have.length.above', 0);
	}

	validateToggleCollapsablePRC() {
		const LI_NODES_COLLAPSED = checkboxTreePage.getSelector.liNodesCollapsed();

		// No debe haber nodos colapsados
		cy.get(LI_NODES_COLLAPSED).should('not.exist');
	}

	validateToggleCollapsablePSC() {
		const LI_NODES_EXPANDED = checkboxTreePage.getSelector.liNodesExpanded();

		// Al acabar No debe haber nodos expandidos
		cy.get(LI_NODES_EXPANDED).should('not.exist');
	}

	validateToggleExpandiblePRC() {
		const LI_NODES_EXPANDED = checkboxTreePage.getSelector.liNodesExpanded();

		// No debe haber nodos expandidos
		cy.get(LI_NODES_EXPANDED).should('not.exist');
	}

	validateToggleExpandiblePSC() {
		const LI_NODES_COLLAPSED = checkboxTreePage.getSelector.liNodesCollapsed();

		// AL acabar NO debe haber nodos collapsados
		cy.get(LI_NODES_COLLAPSED).should('not.exist');
	}

	validateSubNodesSelection(pSelector) {
		const CHECKBOX_ELEMENT = checkboxTreePage.getSelector.checkboxElement();
		const IMG_CHECKBOX_CHECKED = checkboxTreePage.getSelector.imgCheckboxChecked();
		const CHECKBOX_TITLE = checkboxTreePage.getSelector.checkboxTitle();

		cy.get(pSelector).then($theList => {
			// Obtener el recuento de elementos
			const intCountNodes = Cypress.$($theList).length;

			// Los checks estan marcados
			cy.get(CHECKBOX_ELEMENT).as('chkListElement');
			cy.get(IMG_CHECKBOX_CHECKED).as('subElement').should('exist').and('have.length', intCountNodes);

			//Los elementos marcados deben estar en el result
			cy.get('@subElement') //svg
				.parent() // span rct-checkbox
				.parent() // label tree-node-xxxx
				.find(CHECKBOX_TITLE) // span rct-title
				.each($subThe => {
					checkboxTreePage.validateTextResult($subThe);
				}); // @subElement each
		}); // @chkListElement then
	}

	validateTextResult(pthe) {
		const TREE_WRAPPER = checkboxTreePage.getSelector.treeWrapper();
		const TXT_SUCCESS = checkboxTreePage.getSelector.txtSuccess();

		// Convertir la cadena al mismo formato que muestra Result
		// Aaaaa Bbbbb.doc -> aaaaaBbbbb (camelCase, sin extensión)

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const txtCadena = pthe.text().toLowerCase().replace('.doc', '');
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const intPosEspacio = txtCadena.indexOf(' ');

		cy.get(pthe).parentsUntil(TREE_WRAPPER).parent().as('theFather');

		if (intPosEspacio > 0) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const txtNewCadena = txtCadena.slice(0, intPosEspacio) + txtCadena.charAt(intPosEspacio + 1).toUpperCase() + txtCadena.slice(intPosEspacio + 2);

			cy.get('@theFather').find(TXT_SUCCESS).as('txtResult').should('exist').and('include.text', txtNewCadena);
		} else {
			cy.get('@theFather').find(TXT_SUCCESS).as('txtResult').should('exist').and('include.text', txtCadena);
		} // if
	}

	expandNodes() {
		const NODE_COLLAPSED = checkboxTreePage.getSelector.liNodesCollapsed();
		const CLASS_NODE_EXPANDED = checkboxTreePage.getSelector.classNodeExpanded();
		const CLASS_NODE_COLLAPSED = checkboxTreePage.getSelector.classNodeCollapsed();
		const IMG_TOGGLE_CLOSED = checkboxTreePage.getSelector.imgToggleClosed();
		const IMG_TOGGLE_OPENED = checkboxTreePage.getSelector.imgToggleOpened();

		const $elements = Cypress.$(NODE_COLLAPSED);

		if ($elements?.length > 0) {
			cy.wrap($elements)
				.each($the => {
					// Dado que no esta expandido no debe tener subelementos
					cy.get($the).find('ol').should('not.exist');
					cy.get($the).should('have.class', CLASS_NODE_COLLAPSED);
					cy.get($the).find(IMG_TOGGLE_CLOSED).should('exist');

					// Debe tener boton Toggle
					cy.wrap($the).find('button').first().as('btnToggle').should('exist').and('be.visible').and('be.enabled').click();

					// Tras expandirlo tiene que tener subelementos
					cy.get($the).find('ol').should('exist');
					cy.get($the).should('have.class', CLASS_NODE_EXPANDED);
					cy.get($the).find(IMG_TOGGLE_OPENED).should('exist');
				})
				.then(() => {
					checkboxTreePage.expandNodes();
				});
		} else {
			cy.get($elements).should('not.exist');
		}
	}

	collapseNodes() {
		const LI_NODES = checkboxTreePage.getSelector.liNodes();

		// Localizar la lista de Li
		// Debe haber al menos 1
		cy.get(LI_NODES).as('expLiNodes').should('exist').and('be.visible').and('have.length.above', 0);

		cy.get('@expLiNodes').then($theList => {
			// Recorrer en orden inverso la lista de elementos
			// para ir cerrandolos uno a uno.
			// Si no la recorremos asi cerrariamos los nodos contenedores
			const arrListRev = $theList.toArray().reverse();

			arrListRev.forEach($the => {
				checkboxTreePage.validateToggleCollapseClick($the);
			});
		});
	}

	validateToggleCollapseClick(pThe) {
		const BUTTON_TOGGLE = checkboxTreePage.getSelector.buttonToggle();
		const CLASS_NODE_EXPANDED = checkboxTreePage.getSelector.classNodeExpanded();
		const CLASS_NODE_COLLAPSED = checkboxTreePage.getSelector.classNodeCollapsed();
		const IMG_TOGGLE_CLOSED = checkboxTreePage.getSelector.imgToggleClosed();
		const IMG_TOGGLE_OPENED = checkboxTreePage.getSelector.imgToggleOpened();

		cy.get(pThe).within(() => {
			// El nodo debe estar expandido
			cy.root().should('have.class', CLASS_NODE_EXPANDED);
			cy.get(IMG_TOGGLE_OPENED).should('exist');

			// Debe haber subelementos
			cy.get('ol').should('exist');

			// Debe tener boton Toggle
			cy.get(BUTTON_TOGGLE).first().as('btnToggle').should('exist').and('be.visible').and('be.enabled').click();

			// Tras pulsar el toggle
			// NO debe haber subelementos
			cy.get('ol').should('not.exist');

			// El nodo debe estar colapsado
			cy.root().should('have.class', CLASS_NODE_COLLAPSED);
			cy.get(IMG_TOGGLE_CLOSED).should('exist');
		});
	}
}

export const checkboxTreePage = new CheckboxTree();
