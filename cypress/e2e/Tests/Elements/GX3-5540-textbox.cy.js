import { textBoxPage } from '../../../support/pages/GX3-5540-textbox.Page';

describe('GX3-5540 |✅ToolsQA | Elements | Text Box Fill Form and Submit', () => {
	beforeEach(() => {
		cy.visit('https://demoqa.com/text-box');
		cy.url().should('contain', 'text-box');
	});

	it('GX3-5540 | TC1: Validar completar el formulario con data valida', () => {
		cy.fixture('data/Elements/GX3-5540-textbox.json').then(the => {
			textBoxPage.enterFullName(the.FullName.data.valid);
			textBoxPage.enterEmail(the.Email.data.valid);
			textBoxPage.enterCurrentAddress(the.CurrentAddress.data.valid);
			textBoxPage.enterPermanentAddress(the.PermanentAddress.data.valid);
			textBoxPage.submitForm();
			textBoxPage.verifyOutput(the.FullName.data.valid, the.Email.data.valid, the.CurrentAddress.data.valid, the.PermanentAddress.data.valid);
		});
	});

	it('GX3-5540 | TC2: Validar enviar formulario con todos los campos vacíos no muestre ningún mensaje', () => {
		textBoxPage.submitForm();
		textBoxPage.verifyNoOutput();
	});

	it('GX3-5540 | TC3: Validar No enviar formulario cuando Email No contiene “@”', () => {
		cy.fixture('data/Elements/GX3-5540-textbox.json').then(the => {
			textBoxPage.enterEmail(the.Email.data.invalid1);
			textBoxPage.submitForm();
			textBoxPage.verifyEmailError();
		});
	});

	it('GX3-5540 | TC4: Validar No enviar formulario cuando Email No contiene (mínimo) 1 carácter alfanumérico antes de "@"', () => {
		cy.fixture('data/Elements/GX3-5540-textbox.json').then(the => {
			textBoxPage.enterEmail(the.Email.data.invalid2);
			textBoxPage.submitForm();
			textBoxPage.verifyEmailError();
		});
	});

	it('GX3-5540 | TC5: Validar No enviar formulario cuando Email No contiene (mínimo) 1 carácter alfanumérico después de "@"', () => {
		cy.fixture('data/Elements/GX3-5540-textbox.json').then(the => {
			textBoxPage.enterEmail(the.Email.data.invalid3);
			textBoxPage.submitForm();
			textBoxPage.verifyEmailError();
		});
	});

	it('GX3-5540 | TC6: Validar No enviar formulario cuando Email No contiene "." después de 1 carácter alfanumérico después de "@"', () => {
		cy.fixture('data/Elements/GX3-5540-textbox.json').then(the => {
			textBoxPage.enterEmail(the.Email.data.invalid4);
			textBoxPage.submitForm();
			textBoxPage.verifyEmailError();
		});
	});

	it('GX3-5540 | TC7: Validar No enviar formulario cuando Email No contiene (mínimo) 2 caracteres alfanuméricos después de "."', () => {
		cy.fixture('data/Elements/GX3-5540-textbox.json').then(the => {
			textBoxPage.enterEmail(the.Email.data.invalid5);
			textBoxPage.submitForm();
			textBoxPage.verifyEmailError();
		});
	});
});
