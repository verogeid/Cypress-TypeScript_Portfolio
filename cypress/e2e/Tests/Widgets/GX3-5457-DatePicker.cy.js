import { Datepicker } from '../../../support/pages/GX3-5457-DatePicker.page';

describe('ToolsQA | Widgets | Date Picker', () => {
	beforeEach('PRC: User should be on the DemoQA website', () => {
		cy.visit('https://demoqa.com/date-picker');
		cy.url().should('contain', 'date-picker');
		cy.get('h1').should('have.text', 'Date Picker');
	});
	it('5462 | TC1: Validate "Select Date" has default values and current date in the correct format', () => {
		const today = new Date().getDate();
		Datepicker.get.selectDateINput().click();
		Datepicker.get.currentDate().should('exist').should('have.text', today);
	});
	it('5462 | TC2: Validate being able to choose a date on "Select Date"', () => {
		Datepicker.get.selectDateINput().click();
		Datepicker.get.selectMonth().click;
		Datepicker.getMonth('March');
		Datepicker.get.selectYear().click;
		Datepicker.getYear('2016');
		Datepicker.get.selectDate().click;
		Datepicker.getDate('14');
		Datepicker.get.selectDateINput().should('contain.value', '3/14/2016');
	});
	it('5462 | TC3: Validate being able to type a date on "Select Date', () => {
		Datepicker.get.selectDateINput().clear();
		Datepicker.enterSelectDate('4/20/2004 {enter}');
		Datepicker.get.selectDateINput().should('contain.value', '4/20/2004');
	});
	it('5462 | TC4: Validate "Select Date" left arrow button goes to previous month and right arrow button to next month', () => {
		Datepicker.get.selectDateINput().click();
		Datepicker.clickNextMonth();
		Datepicker.get.selectDateHeader().should('contain', 'November');
		Datepicker.clickPreviousMonth();
		Datepicker.get.selectDateHeader().should('contain', 'October');
	});
	it('5462 | TC5: Validate "Select Date" accepts typed years (1899) and (2101)', () => {
		Datepicker.get.selectDateINput().clear();
		Datepicker.enterSelectDate('9/10/1899 {enter}');
		Datepicker.get.selectDateINput().should('contain.value', '9/10/1899');
		Datepicker.get.selectDateINput().clear();
		Datepicker.enterSelectDate('9/10/2101 {enter}');
		Datepicker.get.selectDateINput().should('contain.value', '9/10/2101');
	});
	it('5462 | TC6: Validate being able to choose a date and time on "Select Date and Time"', () => {
		Datepicker.get.dateTimeInput().clear();
		Datepicker.getMonth2();
		Datepicker.get.datePickMonth().contains('June').click();
		Datepicker.getYear2();
		Datepicker.upcomingYear();
		Datepicker.previousYear();
		Datepicker.get.datePickYear().contains('2021').click();
		Datepicker.getDate('10');
		Datepicker.get.dateTime();
		Datepicker.get.dateTimeInput().click();
		Datepicker.selectTime('13:00');
		Datepicker.get.dateTimeInput().should('contain.value', 'June 10, 2021 1:00 PM');
	});
	it('5462 | TC7: Validate being able to type a date and time on "Select Date and Time"', () => {
		Datepicker.get.dateTimeInput().click().clear();
		Datepicker.enterDateTime('December 20, 1999 9:30 PM');
		Datepicker.get.dateTimeInput().should('contain.value', 'December 20, 1999 9:30 PM');
	});
	it('5462 | TC8: Validate "Select Date and Time" has default values and current date and time in the correct format', () => {
		const today = new Date().getDate();
		Datepicker.get.dateTimeInput().click();
		Datepicker.get.currentDate().should('exist').should('have.text', today);
	});
	it('5462 | TC9: Validate " Select Date and Time" left arrow button goes to previous month and right arrow button to next month', () => {
		Datepicker.get.dateTimeInput().click();
		Datepicker.clickNextMonth2();
		Datepicker.get.selectDateHeader().should('contain', 'November');
		Datepicker.clickPreviousMonth2();
		Datepicker.get.selectDateHeader().should('contain', 'October');
	});
	it('5462 | TC10: Validate " Select Date and Time" does not accept invalid time (9:80 PM)', () => {
		Datepicker.get.dateTimeInput().click().clear();
		Datepicker.enterDateTime('November 20, 2004 9:80 PM {enter}');
		Datepicker.get.dateTimeInput().should('not.contain', '9:80 PM');
	});
});
