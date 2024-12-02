import { faker } from '@faker-js/faker';

const DATA_FIRST_NAME = faker.person.firstName();
const DATA_LAST_NAME = faker.person.lastName();
const DATA_USER_EMAIL = faker.internet.email();
const DATA_PHONE_NUMBER = faker.string.numeric({ length: 10 });
const DATA_CHAR_SUBJECT = faker.string.alpha({
	length: 1,
	casing: 'lower',
	exclude: ['f', 'j', 'k', 'ñ', 'q', 'w', 'x', 'z']
});
const DATA_PICTURE_PATH = 'cypress/fixtures/images/upexgalaxy.gif';
const DATA_CURRENT_ADDRESS = faker.location.direction();

import { objPracticeForm } from '@pages/GX3-5746-Practice-Form.Page';
// faker usage guide: https://fakerjs.dev/guide/usage
// faker modules: https://fakerjs.dev/api/

describe('GX3-5746 |ToolsQA | Forms | Practice Form', () => {
	beforeEach('PRC: Usuario debe estar en la url Practice Form de ToolsQA', () => {
		cy.visit('https://demoqa.com/automation-practice-form');
		cy.url().should('contain', 'practice-form');
	});

	it('GX-5746 - TC01: Validar que se pueda enviar el formulario correctamente (HP)', () => {
		objPracticeForm.typeFirthName(DATA_FIRST_NAME);
		objPracticeForm.typeLastName(DATA_LAST_NAME);
		objPracticeForm.typeUserEmail(DATA_USER_EMAIL);
		objPracticeForm.selectGender();
		objPracticeForm.typePhoneNumber(DATA_PHONE_NUMBER);
		objPracticeForm.selectRandomDate();
		objPracticeForm.typeRandomSubjects(DATA_CHAR_SUBJECT);
		objPracticeForm.clickUploadPicture(DATA_PICTURE_PATH);
		objPracticeForm.typeCurrentAddress(DATA_CURRENT_ADDRESS);
		objPracticeForm.selectRandomState();
		objPracticeForm.selectRandomCity();

		objPracticeForm.clickSubmit();

		objPracticeForm.validateResult();
	});
});
