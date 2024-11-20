import { checkboxTreePage } from '@pages/GX3-5646-Checkbox.Page';

describe('US # GX3-5646 | ToolsQA | Elements | Checkbox', () => {
	beforeEach('PRC: Abrir url de Checkbox en ToolsQA', () => {
		cy.visit('https://demoqa.com/checkbox');
		cy.url().should('contain', 'checkbox');
	});

	it('GX3-5661 | TC#01: Validar que el boton "Expand All" abra todas las ramas', () => {
		// Localizar el botón Expand
		cy.get(checkboxTreePage.getSelector.buttonExpandAll()).as('btnExpandAll');

		checkboxTreePage.validateExpandPRC();

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

		checkboxTreePage.validateCollapsePRC();

		// tras hacer click en Collapse
		cy.get('@btnCollapseAll').should('exist').click();
		cy.get(checkboxTreePage.getSelector.imgToggleClosed()).as('imgToggleClosed');

		// debe haber sólo 1
		cy.get('@chkNode').should('have.length', 1);
		cy.get('@btnToggle').should('exist').and('have.length', 1);
		cy.get('@imgToggleClosed').should('exist'); // y estar cerrada la rama
	});

	it('GX3-5661 | TC#03: Validar comportamiento de toggles intermedios', () => {
		// PRC: Localizar el botón Expand All y hacer click
		cy.get(checkboxTreePage.getSelector.buttonExpandAll()).as('btnExpandAll').click();

		// Comprobar que el toggle esta en el estado correcto
		checkboxTreePage.validateToggleCollapsablePRC();

		// Localizar la lista de Li
		cy.get(checkboxTreePage.getSelector.liNodes()).as('expLiNodes');

		// Debe haber al menos 1
		cy.get('@expLiNodes').should('exist').and('be.visible').and('have.length.above', 0);

		cy.get('@expLiNodes').then($theList => {
			// Obtener el recuento de elementos
			const intCountNodes = Cypress.$($theList).length;

			// Recorrer en orden inverso la lista de elementos
			// para ir cerrandolos uno a uno.
			// Si no la recorremos asi cerrariamos los nodos contenedores
			const arrListRev = $theList.toArray().reverse();

			arrListRev.forEach(($the, index) => {
				checkboxTreePage.validateToggleClick($the);
			});

			// funcion recursiva para abrir los nodos.
			// localiza el primero, lo expande y busca si hay más,
			// en cuyo caso vuelve a llamar a la función para expandir el nuevo nodo
			function fExpandNodes() {
				if (vCount >= vMaxCount) exit();

				// Inicializar un contador para los elementos
				let contador = 0;

				cy.get(checkboxTreePage.getSelector.liNodesCollapsed()).as('colLiNodes');

				cy.get('@colLiNodes').then($theList => {
					// Obtener el recuento de elementos
					const intCountNodes = Cypress.$($theList).length;

					// Crear un bucle para recorrer la lista
					while (contador < intCountNodes) {
						// Seleccionar el primer elemento de la lista
						cy.get('@colLiNodes')
							.first()
							.within($the => {
								// Debe NO haber subelementos
								cy.get('ol').should('not.exist');

								// Debe tener boton Toggle
								cy.get(checkboxTreePage.getSelector.buttonToggle()).first().as('btnToggle').should('exist').and('be.visible').and('be.enabled');

								cy.get('@btnToggle').click();

								vCount = vCount + 1;
							});

						// incrementamos el contador
						contador++;

						// Si quedan elementos
						if (vCount < vMaxCount) {
							// Expandir las dubramas
							fExpandNodes();

							// Finaliza el bucle de esta llamada
							break;
						}
					} // while
				}); // then
			} // function fExpandNodes()

			// comprobar que el árbol esta en el estado correcto
			checkboxTreePage.validateToggleExpandiblePRC();

			var vCount = 1;
			const vMaxCount = intCountNodes;

			// expandir la primera rama, y las sucesivas si las hubiere
			fExpandNodes();
		});

		checkboxTreePage.validateToggleExpandiblePSC();
	}); // it

	it('GX3-5661 | TC#04: Validar comportamiento de checkboxes', () => {
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
