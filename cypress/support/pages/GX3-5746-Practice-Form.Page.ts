class JsonDataHandler {
	constructor() {
		this.data = {}; // Propiedad para almacenar datos en memoria
	}

	// Método para establecer datos en memoria
	setData(newData) {
		this.data = { ...this.data, ...newData };
	}

	// Método para obtener datos de memoria
	getData() {
		return this.data;
	}

	// Método para leer un valor específico de los datos
	readValue(key) {
		return this.data[key];
	}

	// Método para escribir un valor específico en los datos
	writeValue(key, value) {
		this.data[key] = value;
	}
}

class PracticeForm {
	private jsonHandler = new JsonDataHandler();

	private get = {
		inputFirstName: () => cy.get('input#firstName'),
		inputLastName: () => cy.get('input#lastName'),
		inputUserEmail: () => cy.get('input#userEmail'),
		//optionsGenders: () => Cypress.$('label[for^="gender-radio-"]'),
		optionsGenders: () => cy.get('label[for^="gender-radio-"]'),
		inputPhoneNumber: () => cy.get('input#userNumber'),

		inputDateOfBirth: () => cy.get('input#dateOfBirthInput'),
		inputDateOfBirthCy: () => Cypress.$('input[id="dateOfBirthInput"]'),
		selectDatePickerYear: () => cy.get('select.react-datepicker__year-select'),
		selectDatePickerMonth: () => cy.get('select.react-datepicker__month-select'),
		selectDatePickerDay: () => cy.get('.react-datepicker__day:not([class$="outside-month"])'),

		inputSubject: () => cy.get('input#subjectsInput'),
		selectSubjectOption: () => cy.get('.subjects-auto-complete__option'),
		labelSubjects: () => cy.get('.subjects-auto-complete__multi-value__label'),

		optionsHobbies: () => cy.get('[for*="hobbies-checkbox"]'),

		selectUploadFile: () => cy.get('#uploadPicture'),

		inputCurrentAddress: () => cy.get('#currentAddress'),

		selectState: () => cy.get('#state'),
		selectStateOption: () => cy.get('[id^="react-select-3-option-"]'),
		selectStateLabel: () => cy.get('#state [class$="-singleValue"]'),

		selectCity: () => cy.get('#city'),
		selectCityOption: () => cy.get('[id^="react-select-4-option-"]'),
		selectCityLabel: () => cy.get('#city [class$="-singleValue"]'),

		buttonSubmit: () => cy.get('#submit'),

		// 0:<tr><td>label</td>   1: <td>value</td><tr>
		resultTable: () => cy.get('.table-responsive'),

		resultName: () => this.get.resultTable().find('tbody tr td').eq(1),
		resultEmail: () => this.get.resultTable().find('tbody tr td').eq(3),
		resultGenders: () => this.get.resultTable().find('tbody tr td').eq(5),
		resultMobile: () => this.get.resultTable().find('tbody tr td').eq(7),
		resultBirth: () => this.get.resultTable().find('tbody tr td').eq(9),
		resultSubjects: () => this.get.resultTable().find('tbody tr td').eq(11),
		resultHobbies: () => this.get.resultTable().find('tbody tr td').eq(13),
		resultPicture: () => this.get.resultTable().find('tbody tr td').eq(15),
		resultAddress: () => this.get.resultTable().find('tbody tr td').eq(17),
		resultStateCity: () => this.get.resultTable().find('tbody tr td').eq(19)
	};

	public typeFirthName(pstrData: string) {
		this.get.inputFirstName().as('firstName').should('exist').type(pstrData);

		this.jsonHandler.writeValue('firstName', pstrData);
	}

	public typeLastName(pstrData: string) {
		this.get.inputLastName().as('lastName').should('exist').type(pstrData);

		this.jsonHandler.writeValue('lastName', pstrData);
	}

	public typeUserEmail(pstrData: string) {
		this.get.inputUserEmail().as('userEmail').should('exist').type(pstrData);

		this.jsonHandler.writeValue('userEmail', pstrData);
	}

	public selectGender() {
		const INT_RANDOM = Cypress._.random(0, 2);

		this.get.optionsGenders().eq(INT_RANDOM).click();

		this.get
			.optionsGenders()
			.eq(INT_RANDOM)
			.invoke('text')
			.then(the => this.jsonHandler.writeValue('userGender', the));
	}

	public typePhoneNumber(pstrData: string) {
		this.get.inputPhoneNumber().as('phoneNumber').should('exist').type(pstrData);

		this.jsonHandler.writeValue('phoneNumber', pstrData);
	}

	public selectRandomDate() {
		/* Años bisiestos:
			- los múltiplos de 4
			- salvo los múltiplos de 100
			- a excepción de los múltiplos de 1000
			(ej. el año 2000 fue bisiesto pese a ser múltiplo de 100)
			Seleccionamos primero el año, luego el mes y por último el día,
			para cercionarnos que febrero tiene el número correcto de días
		*/

		this.get.inputDateOfBirth().as('birthDate').click();

		this.get
			.selectDatePickerYear()
			.find('option')
			.its('length')
			.then($intElem => {
				const INT_RANDOM_YEAR = Cypress._.random(0, $intElem - 1);
				this.get.selectDatePickerYear().select(INT_RANDOM_YEAR);
			});

		const INT_RANDOM_MONTH = Cypress._.random(0, 11);
		this.get.selectDatePickerMonth().select(INT_RANDOM_MONTH);

		this.get
			.selectDatePickerDay()
			.its('length')
			.then($intElem => {
				const INT_RANDOM_DAY = Cypress._.random(0, $intElem - 1);

				this.get.selectDatePickerDay().eq(INT_RANDOM_DAY).click();
			});

		cy.get('@birthDate')
			.invoke('val')
			.then($the => {
				this.jsonHandler.writeValue('birthDate', $the);
			});
	}

	public typeRandomSubjects(pstrChar: string) {
		this.get.inputSubject().as('subject').should('exist').type(pstrChar);

		this.get
			.selectSubjectOption()
			.should('exist')
			.its('length')
			.then($intElem => {
				const INT_RANDOM_OPTION = Cypress._.random(0, $intElem - 1);

				this.get.selectSubjectOption().eq(INT_RANDOM_OPTION).click();
			});

		this.get
			.labelSubjects()
			.should('exist')
			.invoke('text')
			.then(the => {
				// Leer el array existente o inicializar uno nuevo
				const DATA_ARRAY = this.jsonHandler.readValue('userSubject') || [];

				DATA_ARRAY.push(the);

				this.jsonHandler.writeValue('userSubject', DATA_ARRAY);
			});
	}

	public selectRandomHobbies() {
		const INT_RANDOM_OPTION = Cypress._.random(0, 2);

		this.get
			.optionsHobbies()
			.eq(INT_RANDOM_OPTION)
			.click()
			.invoke('text')
			.then(the => {
				const DATA_ARRAY = this.jsonHandler.readValue('userHobbies') || [];

				DATA_ARRAY.push(the);

				this.jsonHandler.writeValue('userHobbies', DATA_ARRAY);
			});
	}

	public clickUploadPicture(pstrData: string) {
		this.get.selectUploadFile().as('pictureName').should('exist').selectFile(pstrData);

		cy.get('@pictureName').then($input => {
			const DATA_FILES = $input[0].files;
			const DATA_FILE_NAME = DATA_FILES[0].name;

			this.jsonHandler.writeValue('fileName', DATA_FILE_NAME);
		});
	}

	public typeCurrentAddress(pstrData: string) {
		this.get.inputCurrentAddress().as('currentAddress').should('exist').type(pstrData);

		this.jsonHandler.writeValue('currentAddress', pstrData);
	}

	public selectRandomState() {
		this.get.selectState().as('state').should('exist').click();

		this.get
			.selectStateOption()
			.should('exist')
			.its('length')
			.then($intElem => {
				const INT_RANDOM_OPTION = Cypress._.random(0, $intElem - 1);

				this.get.selectStateOption().eq(INT_RANDOM_OPTION).click();
			});

		this.get
			.selectStateLabel()
			.invoke('text')
			.then(the => this.jsonHandler.writeValue('userState', the));
	}

	public selectRandomCity() {
		this.get.selectCity().as('city').should('exist').click();

		this.get
			.selectCityOption()
			.should('exist')
			.its('length')
			.then($intElem => {
				const INT_RANDOM_OPTION = Cypress._.random(0, $intElem - 1);

				this.get.selectCityOption().eq(INT_RANDOM_OPTION).click();
			});

		this.get
			.selectCityLabel()
			.invoke('text')
			.then(the => this.jsonHandler.writeValue('userCity', the));
	}

	public clickSubmit() {
		this.get.buttonSubmit().should('exist').click();
	}

	private formatDate(pstrDate: string): string {
		const DATA_BIRTH_DATE = new Date(pstrDate);
		const DATA_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		const DATA_DAY = DATA_BIRTH_DATE.getDate(); // Obtener el día
		const DATA_MONTH = DATA_MONTHS[DATA_BIRTH_DATE.getMonth()]; // Obtener el nombre del mes
		const DATA_YEAR = DATA_BIRTH_DATE.getFullYear(); // Obtener el año
		const DATA_FORMATED_DATE = `${DATA_DAY} ${DATA_MONTH},${DATA_YEAR}`;

		return DATA_FORMATED_DATE;
	}

	public validateResult() {
		this.get
			.resultTable()
			.should('exist')
			.then(() => {
				this.get.resultName().should('exist').and('contain.text', this.jsonHandler.readValue('firstName')).and('contain.text', this.jsonHandler.readValue('lastName'));

				this.get.resultEmail().should('exist').and('contain.text', this.jsonHandler.readValue('userEmail'));
				this.get.resultGenders().should('exist').and('have.text', this.jsonHandler.readValue('userGender'));
				this.get.resultMobile().should('exist').and('have.text', this.jsonHandler.readValue('phoneNumber'));

				this.get
					.resultBirth()
					.should('exist')
					.invoke('text')
					.then(the => {
						expect(this.formatDate(the)).to.equal(this.formatDate(this.jsonHandler.readValue('birthDate')));
					});

				const DATA_ARRAY_SUBJECT = this.jsonHandler.readValue('userSubject');
				DATA_ARRAY_SUBJECT.forEach((the, index) => {
					this.get.resultSubjects().should('exist').and('contain.text', the[index]);
				});

				const DATA_ARRAY_HOBBIES = this.jsonHandler.readValue('userHobbies');
				DATA_ARRAY_HOBBIES.forEach((the, index) => {
					this.get.resultHobbies().should('exist').and('contain.text', the[index]);
				});

				this.get.resultPicture().should('exist').and('have.text', this.jsonHandler.readValue('fileName'));
				this.get.resultAddress().should('exist').and('have.text', this.jsonHandler.readValue('currentAddress'));

				this.get.resultStateCity().should('exist').and('contain.text', this.jsonHandler.readValue('userState')).and('contain.text', this.jsonHandler.readValue('userCity'));
			});
	}
}

export const objPracticeForm = new PracticeForm();
