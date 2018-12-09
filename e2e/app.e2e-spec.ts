import { FarMetaGeneratorPage } from './app.po';

describe('far-meta-generator App', () => {
  let page: FarMetaGeneratorPage;

  beforeEach(() => {
    page = new FarMetaGeneratorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('fm works!');
  });
});
