describe('GX3-5504 |ToolsQA | Widgets | Dropdown - Select Menu', () => {
	const opcionesTc1 = ['#react-select-2-option-0-0', '#react-select-2-option-0-1', '#react-select-2-option-1-0', '#react-select-2-option-1-1', '#react-select-2-option-2', '#react-select-2-option-3'];
	const opcionesTc2 = ['#react-select-3-option-0-0', '#react-select-3-option-0-1', '#react-select-3-option-0-2', '#react-select-3-option-0-3', '#react-select-3-option-0-4', '#react-select-3-option-0-5'];
	const opcionesTc3 = ['red', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
	const opcionesTc4 = ['#react-select-4-option-0', '#react-select-4-option-1', '#react-select-4-option-2', '#react-select-4-option-3'];
	const opcionesTc5 = ['volvo', 'opel', 'audi', 'saab'];
	const randomOptionTc1 = opcionesTc1[Math.floor(Math.random() * opcionesTc1.length)];
	const randomOptionTc2 = opcionesTc2[Math.floor(Math.random() * opcionesTc2.length)];
	const randomOptionTc3 = opcionesTc3[Math.floor(Math.random() * opcionesTc3.length)];
	const randomOptionTc4 = opcionesTc4[Math.floor(Math.random() * opcionesTc4.length)];
	const randomOptionTc5 = opcionesTc5[Math.floor(Math.random() * opcionesTc5.length)];
	beforeEach(() => {
		cy.visit('https://demoqa.com/select-menu');
		cy.url().should('include', '/select-menu');
		cy.get('h1.text-center').should('have.text', 'Select Menu');
	});
	it('GX3-5539 | TC1: Validar poder seleccionar de a una las opciones del Dropdown Select Value.', () => {
		cy.get('.css-yk16xz-control').eq(0).click();
		cy.get('#react-select-2-option-0-0').click();
		opcionesTc1.forEach(opcionTc1 => {
			cy.get('.css-1pahdxg-control').eq(0).click();
			cy.get(opcionTc1).click();
		});
		const randomOptionTc1 = opcionesTc1[Math.floor(Math.random() * opcionesTc1.length)];
		cy.get('.css-1pahdxg-control').eq(0).click();
		cy.get(randomOptionTc1).click();
	});
	it('GX3-5539 | TC2: Validar poder seleccionar de a una las opciones del Dropdown Select One.', () => {
		cy.get('.css-yk16xz-control').eq(1).click();
		cy.get('#react-select-3-option-0-0').click();
		opcionesTc2.forEach(opcionTc2 => {
			cy.get('.css-1pahdxg-control').eq(0).click();
			cy.get(opcionTc2).click();
		});
		const randomOptionTc2 = opcionesTc2[Math.floor(Math.random() * opcionesTc2.length)];
		cy.get('.css-1pahdxg-control').eq(0).click();
		cy.get(randomOptionTc2).click();
	});
	it('GX3-5539 | TC3: Validar poder seleccionar de a una las opciones del Dropdown Old Style Select Menu.', () => {
		opcionesTc3.forEach(opcionTc3 => {
			cy.get('#oldSelectMenu').select(opcionTc3).invoke('val').should('equal', opcionTc3);
		});
		const randomOptionTc3 = opcionesTc3[Math.floor(Math.random() * opcionesTc3.length)];
		cy.get('#oldSelectMenu').select(randomOptionTc3);
		cy.get('#oldSelectMenu').should('have.value', randomOptionTc3);
	});
	it('GX3-5539 | TC4: Validar poder seleccionar uno ó todas las opciones del Dropdown Multiselect drop down.', () => {
		cy.get('.css-yk16xz-control').eq(2).click();
		cy.get('#react-select-4-option-0').click();
		cy.get('.css-19bqh2r').eq(2).click();
		cy.get('#react-select-4-option-0').click();
		cy.get('#react-select-4-option-1').click();
		cy.get('#react-select-4-option-2').click();
		cy.get('#react-select-4-option-3').click();
		cy.get('.css-1gl4k7y').should('have.text', 'No options');
		cy.get('.css-1pahdxg-control > .css-1wy0on6 > :nth-child(1)').click();
		const randomOptionTc4 = opcionesTc4[Math.floor(Math.random() * opcionesTc4.length)];
		cy.get(randomOptionTc4).click();
	});
	it('GX3-5539 | TC5: Validar poder seleccionar uno ó varias opciones del Dropdown Standard multi select.', () => {
		cy.get('#cars').select('volvo');
		cy.get('#cars').select(['opel', 'audi']).invoke('val').should('deep.equal', ['opel', 'audi']);
		const randomOptionTc5 = opcionesTc5[Math.floor(Math.random() * opcionesTc5.length)];
		cy.get('#cars').select(randomOptionTc5);
	});
	it('GX3-5539 | TC6: Validar interactuar con una opcion de cada Dropdown al seleccionarlos todos juntos.', () => {
		cy.get('.css-yk16xz-control').eq(0).click();
		cy.get(randomOptionTc1).click();
		cy.get('.css-yk16xz-control').eq(0).click();
		cy.get(randomOptionTc2).click();
		cy.get('#oldSelectMenu').select(randomOptionTc3);
		cy.get('.css-yk16xz-control').eq(2).click();
		cy.get(randomOptionTc4).click();
		cy.get('.css-1wy0on6 > :nth-child(3)').click();
		cy.get('#cars').select(randomOptionTc5);
	});
});
