import dataForm from '@data/Elements/GX3-5484_TextBox-FillFormAndSubmit.json';

describe('US GX3-5484 | ToolsQA | Elements | Text Box: Fill form and Submit', () => {
	cy.on('uncaught:exception', (err, runnable) => {
		return false;
	});

	beforeEach('PRC: Abrir la url text-box de ToolsQA', () => {
		cy.visit('https://demoqa.com/text-box');
		cy.url().should('contain', 'text-box');
	});

	it('US # GX3-5484 | TC#01: Validar que SI se muestre mensaje si los CAMPOS estan BIEN rellenados', () => {
		/* https://www.infomaniak.com/es/asistencia/faq/438/descubrir-los-caracteres-permitidos-para-una-direccion-de-correo-electronico
		El nombre de usuario debiera poder empezar o finalizar con punto*/

		cy.get('input#userName').type(dataForm.UserName.valid[0]);
		cy.get('input#userEmail').type(dataForm.Email.valid[1]);
		cy.get('textarea#currentAddress').type(dataForm.CurrentAddress.valid[0]);
		cy.get('textarea#permanentAddress').type(dataForm.PermanentAddress.valid[0]);
		cy.get('button#submit').click();

		//Validar que el mensaje existe
		cy.get('p.mb-1').should('exist');

		//Validar que los datos en el mensaje son los mismos que se introdujeron
		cy.get('p#name.mb-1').should('contain.text', dataForm.UserName.valid[0]);
		cy.get('p#email.mb-1').should('contain.text', dataForm.Email.valid[1]);
		cy.get('p#currentAddress.mb-1').should('contain.text', dataForm.CurrentAddress.valid[0]);
		cy.get('p#permanentAddress.mb-1').should('contain.text', dataForm.PermanentAddress.valid[0]);
	});

	it('US # GX3-5484 | TC#02: Validar que NO se muestre mensaje si los CAMPOS estan VACÍOS', () => {
		//No se agregan datos porque cypress no permite insertar cadena vacía ''
		cy.get('input#userName');
		cy.get('input#userEmail');
		cy.get('textarea#currentAddress');
		cy.get('textarea#permanentAddress');
		cy.get('button#submit').click();

		//Validar que no exista el mensaje
		cy.get('p.mb-1').should('not.exist');
	});

	it('US # GX3-5484 | TC#03: Validar que SI se muestre mensaje si los CAMPOS NO estan VACÍOS', () => {
		cy.get('input#userName').type(dataForm.UserName.valid[0]);
		cy.get('textarea#currentAddress').type(dataForm.CurrentAddress.valid[0]);
		cy.get('textarea#permanentAddress').type(dataForm.PermanentAddress.valid[0]);
		cy.get('button#submit').click();

		//Validar que el mensaje existe
		cy.get('p.mb-1').should('exist');

		//Validar que los datos en el mensaje son los mismos que se introdujeron
		cy.get('p#name.mb-1').should('contain.text', dataForm.UserName.valid[0]);
		cy.get('p#currentAddress.mb-1').should('contain.text', dataForm.CurrentAddress.valid[0]);
		cy.get('p#permanentAddress.mb-1').should('contain.text', dataForm.PermanentAddress.valid[0]);
	});

	it('US # GX3-5484 | TC#04: Validar que el input EMAIL tenga BORDE si NO tiene ARROBA', () => {
		cy.get('input#userEmail').type(dataForm.Email.invalid[0]);
		cy.get('button#submit').click();

		//Validar que la clase existe
		cy.get('.mr-sm-2.field-error.form-control').should('exist');
		// Validar que el borde es rojo
		//cy.get('.mr-sm-2.field-error.form-control').should('have.css', 'border-color', 'rgb(255, 0, 0)');
	});

	it('US # GX3-5484 | TC#05: Validar que el input EMAIL tenga BORDE si NO tiene USUARIO', () => {
		cy.get('input#userEmail').type(dataForm.Email.invalid[1]);
		cy.get('button#submit').click();

		//Validar que la clase existe
		cy.get('.mr-sm-2.field-error.form-control').should('exist');
		// Validar que el borde es rojo
		//cy.get('.mr-sm-2.field-error.form-control').should('have.css', 'border-color', 'rgb(255, 0, 0)');
	});

	it('US # GX3-5484 | TC#06: Validar que el input EMAIL tenga BORDE si NO tiene SUBDOMINIO', () => {
		cy.get('input#userEmail').type(dataForm.Email.invalid[2]);
		cy.get('button#submit').click();

		//Validar que la clase existe
		cy.get('.mr-sm-2.field-error.form-control').should('exist');
		// Validar que el borde es rojo
		//cy.get('.mr-sm-2.field-error.form-control').should('have.css', 'border-color', 'rgb(255, 0, 0)');
	});

	it('US # GX3-5484 | TC#07: Validar que el input EMAIL tenga BORDE si no tiene DOMINIO', () => {
		cy.get('input#userEmail').type(dataForm.Email.invalid[3]);
		cy.get('button#submit').click();

		//Validar que la clase existe
		cy.get('.mr-sm-2.field-error.form-control').should('exist');
		// Validar que el borde es rojo
		//cy.get('.mr-sm-2.field-error.form-control').should('have.css', 'border-color', 'rgb(255, 0, 0)');
	});

	it('US # GX3-5484 | TC#08: Validar que el input EMAIL tenga BORDE si NO tiene un DOMINIO VÁLIDO', () => {
		cy.get('input#userEmail').type(dataForm.Email.invalid[4]);
		cy.get('button#submit').click();

		//Validar que la clase existe
		cy.get('.mr-sm-2.field-error.form-control').should('exist');
		// Validar que el borde es rojo
		//cy.get('.mr-sm-2.field-error.form-control').should('have.css', 'border-color', 'rgb(255, 0, 0)');
	});

	it('US # GX3-5484 | TC#09: Validar que el input EMAIL tenga BORDE si contiene DOS ARROBAS', () => {
		cy.get('input#userEmail').type(dataForm.Email.invalid[5]);
		cy.get('button#submit').click();

		//Validar que la clase existe
		cy.get('.mr-sm-2.field-error.form-control').should('exist');
	});

	it('US # GX3-5484 | TC#10: Validar que el input EMAIL tenga BORDE si contiene ACENTOS', () => {
		// https://www.infomaniak.com/es/asistencia/faq/438/descubrir-los-caracteres-permitidos-para-una-direccion-de-correo-electronico
		cy.get('input#userEmail').type(dataForm.Email.invalid[6]);
		cy.get('button#submit').click();

		//Validar que la clase existe
		cy.get('.mr-sm-2.field-error.form-control').should('exist');
	});
});
