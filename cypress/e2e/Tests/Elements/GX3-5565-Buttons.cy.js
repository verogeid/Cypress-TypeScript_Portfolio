describe('US GX3-5565 | ToolsQA | Elements | Buttons', () => {
	cy.on('uncaught:exception', (err, runnable) => {
		return false;
	});

	beforeEach('PRC: Abrir la url buttons de ToolsQA', () => {
		cy.visit('https://demoqa.com/buttons');
		cy.url().should('contain', 'buttons');
	});

	it('US # GX3-5565 | TC#01: Validar la existencia de los buttons', () => {
		cy.get('button.btn.btn-primary').should('exist').and('have.length', 3).and('contain.text', 'Double Click Me').and('contain.text', 'Right Click Me').and('contain.text', 'Click Me');
	});

	it('US # GX3-5565 | TC#02: Validar comportamiento del button "DOUBLE Click" al hacer dblClick', () => {
		cy.get('button#doubleClickBtn').should('be.enabled').and('be.visible');
		cy.get('button#doubleClickBtn').dblclick();
		cy.get('p[id=doubleClickMessage]').should('exist').and('be.visible').and('contain.text', 'You have done a double click');
	});

	it('US # GX3-5565 | TC#03: Validar que NO haga nada el button "DOUBLE Click" con OTRO EVENTO', () => {
		cy.get('button#doubleClickBtn').should('be.enabled').and('be.visible');

		cy.get('button#doubleClickBtn').click();
		cy.get('button#doubleClickBtn').rightclick();

		cy.get('p[id=doubleClickMessage]').should('not.exist');
		cy.get('p[id=rightClickMessage]').should('not.exist');
		cy.get('p[id=dynamicClickMessage]').should('not.exist');
	});

	it('US # GX3-5565 | TC#04: Validar comportamiento del button "RIGHT Click" al hacer rightClick', () => {
		cy.get('button#rightClickBtn').should('be.enabled').and('be.visible');
		cy.get('button#rightClickBtn').rightclick();
		cy.get('p[id=rightClickMessage]').should('exist').and('be.visible').and('contain.text', 'You have done a right click');
	});

	it('US # GX3-5565 | TC#05: Validar que NO haga nada el button "RIGHT Click" con OTRO EVENTO', () => {
		cy.get('button#rightClickBtn').should('be.enabled').and('be.visible');

		cy.get('button#rightClickBtn').click();
		cy.get('button#rightClickBtn').dblclick();

		cy.get('p[id=doubleClickMessage]').should('not.exist');
		cy.get('p[id=rightClickMessage]').should('not.exist');
		cy.get('p[id=dynamicClickMessage]').should('not.exist');
	});

	it('US # GX3-5565 | TC#06: Validar comportamiento del button "CLICK" al hacer click', () => {
		// button#fcmdZ es un randomId. Hay que localizar el botón de otra manera
		cy.get('div.mt-4:nth-child(4) > button').should('be.enabled').and('be.visible');

		cy.get('div.mt-4:nth-child(4) > button').click();
		cy.get('p[id=dynamicClickMessage]').should('exist').and('be.visible').and('contain.text', 'You have done a dynamic click');
	});

	it('US # GX3-5565 | TC#07: Validar que NO haga nada el button "CLICK" con OTRO EVENTO', () => {
		cy.get('div.mt-4:nth-child(4) > button').should('be.enabled').and('be.visible');

		cy.get('div.mt-4:nth-child(4) > button').rightclick();
		cy.get('div.mt-4:nth-child(4) > button').dblclick();

		cy.get('p[id=doubleClickMessage]').should('not.exist');
		cy.get('p[id=rightClickMessage]').should('not.exist');

		// Al hacer doble click estamos haciendo si o si click
		//cy.get('p[id=dynamicClickMessage]').should('exist');
	});
});
