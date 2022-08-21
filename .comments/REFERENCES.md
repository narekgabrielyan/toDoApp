## Style Guide
https://standardjs.com/
https://prettier.io/docs/en/integrating-with-linters.html
https://eslint.org/

## Modular systems
Native ES6 modules ( without bundlers webpack gulp etc. )
https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Modules

### Architecture
https://nanojsx.io (createElement alternative)
SOFTWARE DEVELOPMENT LIFECYCLE

#### READ

- Architecture
    - [`Domain Driven Design`](https://thedomaindrivendesign.io/developing-the-ubiquitous-language/)
    - [`MVC`](https://ru.wikipedia.org/wiki/Model-View-Controller)
      - [`todoMVC`](https://github.com/tastejs/todomvc/tree/master/examples/vanillajs/js)
    - [`FSD`](https://feature-sliced.design/)
        - [`Feature-Sliced Design на примере TodoApp`](https://feature-sliced.design/ru/docs/get-started/quick-start)
        - [`Понимание потребностей`](https://feature-sliced.design/ru/docs/concepts/needs-driven)
- Programming
    - [`Imperative vs Declarative programming in JavaScript`](https://medium.com/weekly-webtips/imperative-vs-declarative-programming-in-javascript-25511b90cdb7)
    - [`Cohesion and Coupling: the difference`](https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/)
    - [`Low coupling, high cohesion`](https://medium.com/clarityhub/low-coupling-high-cohesion-3610e35ac4a6)
- OOP
    - [`The S.O.L.I.D Principles in Pictures`](https://medium.com/backticks-tildes/the-s-o-l-i-d-principles-in-pictures-b34ce2f1e898)
    - [`Separation of concerns`](https://ru.wikipedia.org/wiki/SOLID_(%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BD%D0%BE-%D0%BE%D1%80%D0%B8%D0%B5%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5_%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5))
- JavaScript
    - [`Getting Started with JS Doc`](https://jsdoc.app/)
- Version Control
  - [`Version Control Systems`](https://www.geeksforgeeks.org/version-control-systems/)
  - [`Conventional Commits`](https://www.conventionalcommits.org/en/v1.0.0/)
- git
    - [`How to Write a Good README File for Your GitHub Project`](https://www.freecodecamp.org/news/how-to-write-a-good-readme-file/)
    - [`How to Write Beautiful and Meaningful README.md`](https://medium.com/@silentlad/how-to-write-beautiful-and-meaningful-readme-md-for-your-next-project-897045e3f991)
    - [`Markdown guide`](https://www.markdownguide.org/basic-syntax/)
    - [`JS Doc to MarkDown`](https://github.com/jsdoc2md/jsdoc-to-markdown)
    - [`GIT Push and Pull Tutorial`](https://www.datacamp.com/community/tutorials/git-push-pull?utm_source=adwords_ppc&utm_medium=cpc&utm_campaignid=1455363063&utm_adgroupid=65083631748&utm_device=c&utm_keyword=&utm_matchtype=&utm_network=g&utm_adpostion=&utm_creative=278443377095&utm_targetid=dsa-429603003980&utm_loc_interest_ms=&utm_loc_physical_ms=9070053&gclid=CjwKCAjwloCSBhAeEiwA3hVo_f8bwKYZ0BhBM4oS-t52qSTO72prcKEw5X_WYK_0HhEPuxuNPm_Y4hoCTJMQAvD_BwE#git-push)
    - [`gitignore`](https://git-scm.com/docs/gitignore)
- npm
    - [`npm vs npx — What’s the Difference?`](https://www.freecodecamp.org/news/npm-vs-npx-whats-the-difference/)
    - [`npm global or local packages`](https://nodejs.dev/learn/npm-global-or-local-packages)


#### JavaScript Gotchas

1. [`A method destructured from an object loses its original context`](https://suhanwijaya.medium.com/a-method-destructured-from-an-object-loses-its-original-context-21e73cf1451f)

#### TASKS
* Backend https://sg-task-app.herokuapp.com
* Run performance test for TodoMVC implementation and Varuzh's implementation. (for example here https://jsbench.me/ )
* Change Implementation of View.js to work with ES Template literals ( reference https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Template_literals )
* Architecture
  * https://profy.dev/article/react-folder-structure
  * https://feature-sliced.design/
* Template Engines
    * Interpolation `onClick=${foo}`
    * https://pugjs.org/
    * https://handlebarsjs.com/guide/#what-is-handlebars
  ```javascript
    function tag(strings) {
      console.log(arguments);
      const elName = strings.raw[0].match(/<(.+)\s/)[1];
      const el = document.createElement(elName);
      /*ToDo: implement me*/
      return el;
    }
    
    function foo(){
        alert(1);
    }
    
    tag`<button onClick=${foo}> Click Me </button>`;
  ```
  
#### History
* https://backbonejs.org/
* https://emberjs.com/

#### Questions