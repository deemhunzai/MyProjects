export class LoginPage {
    constructor(page) {
      this.page = page;
    }
  
    async goto() {
      await this.page.goto('https://my.leadpagestest.com/');
    }
  
    async login(email, password) {
      await this.page.getByRole('textbox', { name: 'Email Address' }).type(email, { delay: 200 });
      await this.page.getByRole('textbox', { name: 'Password' }).type(password, { delay: 200 });
      await this.page.getByRole('button', { name: 'Log in' }).click();
      await this.page.waitForSelector('text=Landing Pages');
    }
  }
  