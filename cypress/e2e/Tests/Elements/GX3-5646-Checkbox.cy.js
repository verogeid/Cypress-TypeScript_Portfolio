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
		/* ESTRUCTURA DEL ARBOL
			ol
				li rct-node rct-node-parent rct-node-expanded --> RAMAS
					span rct-text
						button rct-collapse rct-collapse-btn
						label tree-node-xxxx
							input tree-node-xxxx
							span rct-checkbox
							span rct-node-icon
							span rct-title
					ol
						li rct-node rct-node-leaf --> HOJAS
							span rct-text
								span rct-collapse
									span rct-icon
								label tree-node-xxxx
									input tree-node-xxxx
									span rct-check-box
									span rct-node-icon
									span rct-title

		ESTRUCTURA DEL ARBOL */

		// PRC: Localizar el botón Expand All y hacer click
		cy.get('button.rct-option.rct-option-expand-all').as('btnExpandAll').click();

		cy.log('####################################\n     ##  INIT Collapse Nodes VALIDATION  ##\n     ######################################');

		// No debe haber nodos colapsados
		cy.get('li.rct-node.rct-node-parent.rct-node-collapsed').should('not.exist');

		// Localizar la lista de Li
		cy.get('li[class^="rct-node rct-node-parent rct-node-"]').as('expLiNodes');

		// Debe haber al menos 1
		cy.get('@expLiNodes').should('exist').and('be.visible').and('have.length.above', 0);

		cy.get('@expLiNodes').then($theList => {
			// Obtener el recuento de elementos
			const intCountNodes = Cypress.$($theList).length;

			cy.log(`Nodes count = ${intCountNodes}`);

			const arrListRev = $theList.toArray().reverse();

			arrListRev.forEach(($the, index) => {
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
			});

			cy.log('##################################\n     ##  INIT Expand Nodes VALIDATION  ##\n     ####################################');

			function fExpandNodes() {
				if (vCount >= vMaxCount) exit();

				// Inicializar un contador para los elementos
				let contador = 0;

				cy.get('li[class="rct-node rct-node-parent rct-node-collapsed"]').as('colLiNodes');

				cy.get('@colLiNodes').then($theList => {
					// Obtener el recuento de elementos
					const intCountNodes = Cypress.$($theList).length;

					cy.log(`Nodes count = ${intCountNodes}`);

					// Crear un bucle para recorrer la lista
					while (contador < intCountNodes) {
						// Seleccionar el primer elemento de la lista
						cy.get('@colLiNodes')
							.first()
							.within($the => {
								// Debe NO haber subelementos
								cy.get('ol').should('not.exist');

								// Debe tener boton Toggle
								cy.get('button[title="Toggle"]').first().as('btnToggle').should('exist').and('be.visible').and('be.enabled');

								cy.get('.rct-title')
									.invoke('text')
									.then(texto => {
										cy.log(`Nodo que se expande: ${texto}`);
									});

								cy.get('@btnToggle').click();

								vCount = vCount + 1;
							});

						// incrementamos el contador
						contador++;

						cy.log(`vCount: ${vCount} \n vMaxCount: ${vMaxCount}`);

						if (vCount < vMaxCount) {
							// Expandir las subramas
							fExpandNodes();

							// Finaliza el bucle de esta llamada
							break;
						}
					} // while
				}); // then
			} // function fExpandNodes()

			// No debe haber nodos expandidos
			cy.get('li.rct-node.rct-node-parent.rct-node-expanded').should('not.exist');

			var vCount = 1;
			const vMaxCount = intCountNodes;

			// expandir la primera rama, y las sucesivas si las hubiere
			fExpandNodes();
		});

		// NO debe haber nodos collapsados
		cy.get('li.rct-node.rct-node-parent.rct-node-collapsed').should('not.exist');
	}); // it

	it('GX3-5661 | TC#04: Validar comportamiento de checkboxes', () => {
		// PRC: Localizar el botón Expand All y hacer click
		cy.get('button.rct-option.rct-option-expand-all').as('btnExpandAll').click();

		cy.get('li[class^="rct-node rct-node-parent"]').then($checkboxItems => {
			// Obtiene un índice aleatorio
			const randomIndex = Math.floor(Math.random() * ($checkboxItems.length - 1)) + 1;

			cy.log(`Random: ${randomIndex} \n Length: ${$checkboxItems.length}`);

			// No se puede marcar directamente el input porque es invisible
			// Selecciona el checkbox aleatorio y hace clic
			cy.get($checkboxItems[randomIndex]).within($the => {
				cy.get('.rct-title').as('chkName');

				cy.get('@chkName')
					.first()
					.invoke('text')
					.then(texto => {
						cy.log(`Nodo que se marca: ${texto}`);
					});

				cy.get('span.rct-checkbox').as('chkListElement');
				cy.get('@chkListElement').first().click();

				// Comprobar que los subelementos se han seleccionado
				cy.get('@chkListElement').then($theList => {
					// Obtener el recuento de elementos
					const intCountNodes = Cypress.$($theList).length;

					// Los checks estan marcados
					cy.get('svg.rct-icon.rct-icon-check').as('subElement').should('exist').and('have.length', intCountNodes);

					//Los elementos marcados deben estar en el result
					cy.get('@subElement') //svg
						.parent() // span rct-checkbox
						.parent() // label tree-node-xxxx
						.find('.rct-title') // span rct-title
						.each($subThe => {
							cy.get($subThe).parentsUntil('.check-box-tree-wrapper').parent().as('theFather');

							/* Convertir la cadena al mismo formato que muestra Result
							   Aaaaa Bbbbb.doc -> aaaaaBbbbb (camelCase, sin extensión) */
							var txtCadena = $subThe.text().toLowerCase().replace('.doc', '');
							var intPosEspacio = txtCadena.indexOf(' ');

							if (intPosEspacio > 0) {
								var txtNewCadena = txtCadena.slice(0, intPosEspacio) + txtCadena.charAt(intPosEspacio + 1).toUpperCase() + txtCadena.slice(intPosEspacio + 2);

								cy.log(`Texto original: ${$subThe.text()} -> Texto parseado: ${txtNewCadena}`);

								cy.get('@theFather').find('span.text-success').as('txtResult').should('exist').and('include.text', txtNewCadena);
							} else {
								cy.log(`Texto original: ${$subThe.text()} -> Texto parseado: ${txtCadena}`);

								cy.get('@theFather').find('span.text-success').as('txtResult').should('exist').and('include.text', txtCadena);
							} // if
						}); // @subElement each
				}); // @chkListElement then

				// No debe haber subelementos sin seleccionar o seleccionados a medias
				cy.get('svg[class^="rct-icon rct-icon"][class$="-uncheck"][class$="-half-check"]').should('not.exist');

				// El padre (li) del padre (ol) debe estar marcado o semimarcado
				cy.get($the).parent().parent().first().as('liParent').find('svg[class^="rct-icon rct-icon"][class$="-check"][class$="-half-check"]').should('exist');
			}); // $checkboxItems[randomIndex] within

			// El Result debe ser visible
			cy.get('#result').should('exist').and('be.visible');
			cy.get('span.text-success').should('exist').and('be.visible');
		}); // li then
	}); // it TC04
});
