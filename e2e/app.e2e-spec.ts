import { AlmostTheaBlogPage } from './app.po';

describe('almost-thea-blog App', () => {
  let page: AlmostTheaBlogPage;

  beforeEach(() => {
    page = new AlmostTheaBlogPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
