/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //test that loops through all feeds to confirm all url's are defined and are not empty
        it('url defined', function() {
          for(let feed of allFeeds) {
            expect(feed.url).toBeDefined();
            expect(feed.url.length).not.toBe(0);
          }
        });


        //test that loops through all feeds to confirm all name's are defined and are not empty
        it('name defined', function() {
          for(let feed of allFeeds) {
            expect(feed.name).toBeDefined();
            expect(feed.name.length).not.toBe(0);
          }
        });

    });


    //These test ensure that the menu toggle function is working properly
    describe('The menu', function() {


      //Check to make sure body has a classList of menu-hidden
      it('is hidden', function() {
        const body = document.querySelector('body');
        expect(body.classList.contains('menu-hidden')).toBe(true);
      });


      //Check to make sure body classList of menu-hidden is false when clicked again
      it('menu toggles', function() {
        const body = document.querySelector('body');
        const menu = document.querySelector('.menu-icon-link');

        menu.click();
        expect(body.classList.contains('menu-hidden')).toBe(false);

        menu.click();
        expect(body.classList.contains('menu-hidden')).toBe(true);
      });

    });


    //This test ensures that after loadFeed is called at least 1 element is in .entry.
    describe('Initial Entries', function() {


      //After loadFeed() has executed we check to make sure .entry's firstElementChild's length is not 0
      beforeEach(function(done) {
        loadFeed(0, done);
      });

      it('is element', function() {
        const feed = document.querySelector('.entry');
        expect(feed.firstElementChild.length).not.toBe(0);
      });

    });


    //This test suite makes sure that when loadFeed() is ran the content changes.
    describe('New Feed Selection', function() {

      const feed = document.querySelector('.feed');
      //stores first instance of loadFeed function to an array
      const prevUrl = [];
      //stores second instance of loadFeed function to an array
      const newUrl = [];


      //Runs loadFeed() twice and stores the contents from each time to a variable
      beforeEach(function(done) {
        loadFeed(0, function() {

          Array.from(feed.children).forEach(function(entry) {
            prevUrl.push(entry.innerText);
          });

          loadFeed(1, function() {
            Array.from(feed.children).forEach(function(entry) {
              newUrl.push(entry.innerText);
              done();
            });
          });
        });
      });

      //Checks to make sure the two intances of loadFeed are not the same
      it('content changes', function() {
          expect(newUrl).not.toBe(prevUrl);
      });


    });


}());
