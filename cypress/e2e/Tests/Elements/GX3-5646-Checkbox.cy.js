import { checkboxTreePage } from '@pages/GX3-5646-Checkbox.Page';

describe('US # GX3-5646 | ToolsQA | Elements | Checkbox', () => {
	beforeEach('PRC: Abrir url de Checkbox en ToolsQA', () => {
		cy.visit('https://demoqa.com/checkbox');
		cy.url().should('contain', 'checkbox');
	});

	it('GX3-5661 | TC#01: Validar que el boton "Expand All" abra todas las ramas', () => {
		// Localizar el botón Expand
		cy.get(checkboxTreePage.getSelector.buttonExpandAll()).as('btnExpandAll');

		checkboxTreePage.validateExpandTreePRC();

		// tras hacer click en Expand All
		cy.get('@btnExpandAll').should('exist').click();

		// Localizar los iconos de toggle de la rama
		cy.get(checkboxTreePage.getSelector.imgToggleOpened()).as('imgToggleOpen');
		cy.get('@imgToggleOpen').should('exist'); //debe existir y estar abierta tras el click

		// Localizar los icono de la ramas cerrados. No debiera haber ninguno
		cy.get(checkboxTreePage.getSelector.imgToggleClosed()).should('not.exist');

		// debe haber más de 1 (en principio son 17, pero puede cambiar)
		cy.get('@chkNode').should('have.length.above', 1);
	});

	it('GX3-5661 | TC#02: Validar que el boton "Collapse All" cierre todas las ramas', () => {
		// PRC: Localizar el botón Expand All y hacer click
		cy.get(checkboxTreePage.getSelector.buttonExpandAll()).as('btnExpandAll').click();

		// Localizar el botón Collapse All
		cy.get(checkboxTreePage.getSelector.buttonCollapseAll()).as('btnCollapseAll');

		checkboxTreePage.validateCollapseTreePRC();

		// tras hacer click en Collapse
		cy.get('@btnCollapseAll').should('exist').click();
		cy.get(checkboxTreePage.getSelector.imgToggleClosed()).as('imgToggleClosed');

		// debe haber sólo 1
		cy.get('@chkNode').should('have.length', 1);
		cy.get('@btnToggle').should('exist').and('have.length', 1);
		cy.get('@imgToggleClosed').should('exist'); // y estar cerrada la rama
	});

	it('GX3-5661 | TC#03: Validar comportamiento de expansión de toggles', () => {
		// comprobar que el árbol esta en el estado correcto antes de hacer nada
		checkboxTreePage.validateToggleExpandiblePRC();

		checkboxTreePage.expandNodes();

		// Comprobar que el estado del árbol es correcto tras la expansión
		checkboxTreePage.validateToggleExpandiblePSC();
	});

	it('GX3-5661 | TC#04: Validar comportamiento de colapso de toggles', () => {
		// PRC: Localizar el botón Expand All y hacer click
		cy.get(checkboxTreePage.getSelector.buttonExpandAll()).as('btnExpandAll').click();

		// Comprobar que el toggle esta en el estado correcto antes de empezar
		checkboxTreePage.validateToggleCollapsablePRC();

		// Colapsar en orden inverso los nodos abiertos
		checkboxTreePage.collapseNodes();

		// Comprobar estado del árbol tras la iteración
		checkboxTreePage.validateToggleCollapsablePSC();
	}); // it

	it('GX3-5661 | TC#05: Validar comportamiento de checkboxes', () => {
		// PRC: Localizar el botón Expand All y hacer click
		cy.get(checkboxTreePage.getSelector.buttonExpandAll()).as('btnExpandAll').click();

		cy.get(checkboxTreePage.getSelector.liNodes()).then($checkboxItems => {
			// Obtiene un índice aleatorio
			const randomIndex = Math.floor(Math.random() * ($checkboxItems.length - 1)) + 1;

			// No se puede marcar directamente el input porque es invisible
			// Selecciona el checkbox aleatorio y hace clic
			cy.get($checkboxItems[randomIndex]).within($the => {
				cy.get(checkboxTreePage.getSelector.checkboxTitle()).as('chkName');

				cy.get(checkboxTreePage.getSelector.checkboxElement()).as('chkListElement');
				cy.get('@chkListElement').first().click();

				// Comprobar que los subelementos se han seleccionado
				checkboxTreePage.validateSubNodesSelection('@chkListElement');

				// No debe haber subelementos sin seleccionar o seleccionados a medias
				cy.get(checkboxTreePage.getSelector.imgCheckboxUncheckedOrHalfChecked()).should('not.exist');

				// El padre (li) del padre (ol) debe estar marcado o semimarcado
				cy.get($the).parent().parent().first().as('liParent').find(checkboxTreePage.getSelector.imgCheckboxCheckedOrHalfChecked()).should('exist');
			}); // $checkboxItems[randomIndex] within

			// El Result debe ser visible
			cy.get(checkboxTreePage.getSelector.txtResult()).should('exist').and('be.visible');
			cy.get(checkboxTreePage.getSelector.txtSuccess()).should('exist').and('be.visible');
		}); // li then
	}); // it TC04
});
