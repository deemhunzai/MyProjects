export class LandingPage {
    constructor(page) {
      this.page = page;
    }
  
    async goToLandingPages() {
      await this.page.getByRole('link', { name: 'Landing Pages' }).click();
      await this.page.waitForSelector('text=Create New Landing Page');
    }
  
    async createNewPage() {
      await this.page.getByRole('link', { name: 'Create New Landing Page' }).click();
      await this.page.waitForTimeout(2000);
    }
  }
  