import { YouTubeCrowdSourcingPage } from './app.po';

describe('you-tube-crowd-sourcing App', () => {
  let page: YouTubeCrowdSourcingPage;

  beforeEach(() => {
    page = new YouTubeCrowdSourcingPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
