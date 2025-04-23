export class TemplatePage {
    constructor(page) {
      this.page = page;
    }
  
    async selectTemplate() {
      await this.page.locator('#templates-scrolling-element').click();
  
      const targetContainer = this.page.locator('div').filter({
        hasText: /^Start BuildingPreviewBuster Business$/,
      });
      const startBuildingButton = targetContainer.getByRole('button').first();
  
      for (let i = 0; i < 300; i++) {
        if (await targetContainer.isVisible().catch(() => false)) break;
        await this.page.keyboard.press('ArrowDown');
        await this.page.waitForTimeout(10);
      }
  
      await targetContainer.scrollIntoViewIfNeeded();
      await targetContainer.hover();
      await startBuildingButton.waitFor({ state: 'visible', timeout: 10000 });
      await startBuildingButton.click();
    }
  }
  