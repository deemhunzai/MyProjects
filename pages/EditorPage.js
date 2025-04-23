export class EditorPage {
    constructor(page) {
      this.page = page;
    }
  
    async editTextAndBold() {
      const guideButton = this.page.getByText('Send Me the Guide!');
      await guideButton.waitFor({ state: 'visible', timeout: 90000 });
      await guideButton.hover();
  
      const editPopup = this.page.getByText('Edit Pop-Up');
      await editPopup.waitFor({ state: 'visible', timeout: 30000 });
      await editPopup.click();
  
      const headlineText = this.page.getByText('Enter Your Email to Get Your Free Business Guide', { exact: true });
      await headlineText.waitFor({ state: 'visible', timeout: 30000 });
      await headlineText.click();
  
      await this.page.evaluate(() => {
        const el = document.activeElement;
        if (el && el.innerText) {
          el.innerText = el.innerText.replace('Business', '').trim();
        }
      });
  
      await this.page.locator('button[aria-label="Bold"]').click();
    }
  }
  