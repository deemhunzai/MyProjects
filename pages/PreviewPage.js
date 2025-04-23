export class PreviewPage {
    constructor(page) {
      this.page = page;
    }
  
    async previewAndClickCTA() {
      await this.page.waitForSelector('[data-qa-selector="view-title-close-button"]', { visible: true });
      await this.page.evaluate(() => {
        document.querySelector('[data-qa-selector="view-title-close-button"]').click();
      });

      await this.page.getByRole('button', { name: 'Preview check error' }).click();

      await this.page
      .frameLocator('iframe[title="Preview"]')
      .getByRole('link', { name: 'Send Me the Guide!' })
      .click();
  
      
      // const frame = await this.page.frameLocator('iframe[title="Preview"]').frame();
      // await frame.getByRole('link', { name: 'Send Me the Guide!' }).click();
    }
  }
  