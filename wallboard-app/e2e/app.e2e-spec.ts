import {AppPage} from './app.po';

describe('Voxxed Days Luxembourg Wallboard App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display current conference', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toContain('works');
    });
});
