describe('US GX3-5565 | ToolsQA | Elements | Buttons', () => {
	beforeEach('PRC: Abrir la url buttons de ToolsQA', () => {
		cy.visit('https://demoqa.com/buttons');
		cy.url().should('contain', 'buttons');
	});

	it('US # GX3-5565 | TC#01: Validar comportamiento del button "DOUBLE Click" al hacer dblClick', () => {
		cy.get('button#doubleClickBtn').as('doubleClickBtn');
		cy.get('@doubleClickBtn').within(() => {
			should('exist');
			should('be.enabled');
			should('be.visible');
			should('contain.text', 'Double Click Me');

			dblclick();
		});

		cy.get('p[id=doubleClickMessage]').as('doubleClickMessage');
		cy.get('@doubleClickMessage').within(() => {
			should('exist');
			should('be.visible');
			should('contain.text', 'You have done a double click');
		});
	});

	it('US # GX3-5565 | TC#02: Validar comportamiento del button "RIGHT Click" al hacer rightClick', () => {
		cy.get('button#rightClickBtn').as('rightClickBtn');
		cy.get('@rightClickBtn').within(() => {
			should('exist');
			should('be.enabled');
			should('be.visible');
			should('contain.text', 'Right Click Me');

			rightclick();
		});

		cy.get('p[id=rightClickMessage]').as('rightClickMessage');
		cy.get('@rightClickMessage').within(() => {
			should('exist');
			should('be.visible');
			should('contain.text', 'You have done a right click');
		});
	});

	it('US # GX3-5565 | TC#03: Validar comportamiento del button "CLICK" al hacer click', () => {
		// button#fcmdZ es un randomId. Hay que localizar el botón de otra manera
		//cy.get('button.btn.btn-primary').eq(2).as('clickBtn');
		cy.get('button[key=randomId]').as('clickBtn');
		cy.get('@clickBtn').within(() => {
			should('exist');
			should('be.enabled');
			should('be.visible');
			should('contain.text', 'Click Me');

			click();
		});

		cy.get('p[id=dynamicClickMessage]').as('dynamicClickMessage');
		cy.get('@dynamicClickMessage').within(() => {
			should('exist');
			should('be.visible');
			should('contain.text', 'You have done a dynamic click');
		});
	});

	it('US # GX3-5565 | TC#04: Validar que NO haga nada el button "DOUBLE Click" con OTRO EVENTO', () => {
		cy.get('button#doubleClickBtn').as('doubleClickBtn');
		cy.get('@doubleClickBtn').within(() => {
			should('exist');
			should('be.enabled');
			should('be.visible');

			click();
			rightclick();
		});

		cy.get('p[id=doubleClickMessage]').as('doubleClickMessage').should('not.exist');
		cy.get('p[id=rightClickMessage]').as('rightClickMessage').should('not.exist');
		cy.get('p[id=dynamicClickMessage]').as('dynamicClickMessage').should('not.exist');
	});

	it('US # GX3-5565 | TC#05: Validar que NO haga nada el button "RIGHT Click" con OTRO EVENTO', () => {
		cy.get('button#rightClickBtn').as('rightClickBtn');
		cy.get('@rightClickBtn').within(() => {
			should('be.enabled');
			should('be.visible');

			click();
			dblclick();
		});

		cy.get('p[id=doubleClickMessage]').as('doubleClickMessage').should('not.exist');
		cy.get('p[id=rightClickMessage]').as('rightClickMessage').should('not.exist');
		cy.get('p[id=dynamicClickMessage]').as('dynamicClickMessage').should('not.exist');
	});

	it('US # GX3-5565 | TC#06: Validar que NO haga nada el button "CLICK" con OTRO EVENTO', () => {
		cy.get('button.btn.btn-primary').eq(2).as('clickBtn');
		cy.get('@clickBtn').within(() => {
			should('be.enabled');
			should('be.visible');

			rightclick();
			dblclick();
		});

		cy.get('p[id=doubleClickMessage]').as('doubleClickMessage').should('not.exist');
		cy.get('p[id=rightClickMessage]').as('rightClickMessage').should('not.exist');
		// Al hacer doble click estamos haciendo si o si click
	});
});
