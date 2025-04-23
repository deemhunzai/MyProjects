export class NamePage {
    constructor(page) {
      this.page = page;
    }
  
    async namePage() {
      await this.page.getByRole('heading', {
        name: 'Hang on a moment while we load your experience…'
      }).waitFor({ state: 'hidden', timeout: 1000000 });
  
      await this.page.getByText('Give your page a name').waitFor({ state: 'visible', timeout: 90000 });
  
      const uniqueId = Date.now();
      await this.page.getByRole('textbox', { name: 'Page Name' }).type(`leadpages-${uniqueId}`, { delay: 200 });
      const continueButton = this.page.getByRole('button', { name: 'Continue' });
      await continueButton.click();
    }
  }
  