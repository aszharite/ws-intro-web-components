# Intro to Web Components

## Presentation

The presentation is available either in the presentation folder in the root of the repository or you can also find it on [Slides](https://slides.com/blitz/intro-to-web-components)


## Exercises context

I've always found it easier to do things when they are fun and for this purpose using gamification for simple tasks helps to deal with the day to day boredom. As such in today's workshop we are going to build an ecosystem of two web components:

1. A `badge` component that displays an image.
1. A `achivement` component that uses the badge and some additional information to display a nice looking card.

And for that matter, let's take a look at https://odindesignthemes.com/vikinger/badges.html, a gamification page done by `Odin Design`, a really cool studio with nice designs.

## Step 0 - Native Web Component

Before we get started, let's take a moment to look over how a native web component looks like.

A web component has 4 building elements:
- HTML Template
- Shadow DOM
- Custom Elements Registry
- ES Modules

So, a web component is just another instance of an [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) and we can define them as a `class X entends HTMLElement`.

In our case, we are going to have two web components, each with it's own file `badge.js` and `achivement.js` but for now we are only going to play with the badge:

```typescript
class Badge extends HTMLElement {
  constructor() {
    super();
  }
}
```

Because we are extending another class, we need to make sure everything initializes correctly and that's where `super();` comes into play.

Now, as a custom element, in order to attach html to a web component, we need to define some elements and attach these on the `Shadow DOM` and by default, an element doesn't have any shadow dom on it so we need to enable it via `Element.attachShadow({ mode: 'open' })` (for this example we are using the open so we can gain access to it).

Let's add some html to our `Badge.ts`:

```typescript
export class Badge extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement('template');

    template.innerHTML = `
      <div>badge works!</div>
    `;

    this.attachShadow({mode: 'open'})
      .appendChild(template.content.cloneNode(true));
  }
}
```

Most of the work is done, all that is left is to define the element in the custom registry:

```javascript
window.customElements.define('jsl-badge', Badge);
```

And in our `index.html` file or where we want to use it just attach the script and use the element with the name you defined it:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Web Component Demo</title>
</head>
<body>
  <jsl-badge></jsl-badge>

  <script type="module" src="./badge.js"></script>
</body>
</html>
```

The tricky part here is to remember to import the script as a module as it will not work otherwise.

And this is the most simple form of a web component.

## Step 1 - Setup Workspace

Open Web Components ([website](https://open-wc.org/)) has set its mission to create a standard for modern Web Components and in the exercise we are going to use their cli to setup a wc project and develop our components.

The whole process is very simple, let's open up a terminal and run the following command in the folder that we want to generate our project:

```bash
npm init @open-wc
```

This is going to open up an interactive menu guiding us to setup the repository. For this exercise this is the configuration we are going to use:

```
✔ What would you like to do today? › Scaffold a new project
✔ What would you like to scaffold? › Application
✔ What would you like to add? › Linting (eslint & prettier), Building (rollup)
✔ Would you like to use typescript? › Yes
✔ Would you like to scaffold examples files for? › Building (rollup)
✔ What is the tag name of your application/web component? › jsl-wc

✔ Do you want to write this file structure to disk? › Yes

✔ Do you want to install dependencies? › Yes, with npm
```

What this has done is generated a `lit-element` application to build modern web components.

Now we just have to `cd` into that folder and run it via `npm start`.

## Step 2 - Cleanup

Before we dive into building our wc, let's do some cleanup and prepare for what we are going to be working on in the next steps.

Start with deleting the files in `jsl-wc/src` and let's create two directories:
- `components` - this is where we create components
- `registry` - this is mostly for registering the web components

The reason why we keep them apart is that some components are going to extend others and that is not done through the registry and in the same time, some components might want to use others just like regular html elements and they will need to import the registered version of them.

Now let's create two simple components, they won't do anything for now, just extend `LitElement` class from `lit-element` library;

```typescript
// example

import { LitElement } from 'lit-element';

export class Example extends LitElement { }
```

`LitElement` is a superset of `HTMLElement` that we previously used, it provides a reactive API to the web component that we are going to use later on.

And we are also going to create the two registry entries for these components.

```typescript
// example
import { Example } from 'Example.js';

if (!customElements.get('custom-example')) {
  customElements.define('custom-example', Example);
}
```

Because of how the eslint compiler works, even though we are importing typescript files, it's ok to define them as `js`. 

All that is left is in `index.html` in the root directory to replace everything inside  `<body>` with:

```html
<jsl-badge></jsl-badge>
<jsl-achievement></jsl-achievement>

<script type="module" src="./out-tsc/src/registry/badge.js"></script>
<script type="module" src="./out-tsc/src/registry/achievement.js"></script>
```

And we are good to start developing our components.

## Step 3 - Rendering

Let's add some html elements to our components and for that we need to also import `html` from `lit-element`, and we are going to use it a function that is called `render`.

For example, a simple wc would look something like:

```javascript
// example
import { html, LitElement } from 'lit-element';

export class Example extends LitElement {
  render() {
    return html`
      <div>example works!</div>
    `;
  }
}
```

For `badge`, it will be fairly simple, just displaying the image at `https://odindesignthemes.com/vikinger/img/badge/bronze-b.png` for now.

As for `achievement`, for now let's just render the badge and some other information, use the following object to display some information:

```json
{
  "title": "Bronze User",
  "description": "Has posted more than 1 post on their profile",
  "progress": 100,
  "tooltip": "UNLOCKED!"
}
```

If we want to also include the `badge` in `achievement` just import the `registry/badge.js` file and use it as a normal element.

You can use the design page to guide yourself how to display them. After we are done, we can delete the element `jsl-badge` from `body` in `index.html` since we are already including it in `jsl-achievement`.

P.S. Don't worry about styling for now, we are going to do that in a bit.

## Step 4 - Styling

Time to add some styling to our `achievement` component.

Similar to rendering, adding styling to a component is done via an api that is available to us from `LitElement` class. It exposes the property `styles` as a static value and we only need to import the `css` utility from `lit-element`. 

And so we can easily provide css:

```typescript
// example
import { html, css, LitElement } from 'lit-element';

export class Example extends LitElement {
  static get styles() {
    return css``;
  }

  render() {
    return html``;
  }
}
```

It looks similary to how we add html.

For this specific case I've provided you with the necessary css and html so we don't spend 3 more workshops doing that.

```css
:host {
  display: block;
}

p {
  color: #3e3f5e;
  font-family: Rajdhani,sans-serif;
  line-height: 1em;
  margin: 0;
}

.achievement-card {
  padding: 32px 28px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 0 40px 0 rgb(94 92 154 / 6%);
  position: relative;
  display: flex;
  flex-direction: column;
}

jsl-badge {
  display: block;
  margin: 0 auto;
}

.stat-title {
  margin-top: 36px;
  font-size: 1.125rem;
  font-weight: 700;
  text-align: center;
}

.stat-description {
  width: 180px;
  margin: 16px auto 0;
  color: #3e3f5e;
  font-size: .875rem;
  font-weight: 500;
  line-height: 1.4285714286em;
  text-align: center;
}

.stat-progress {
  width: 204px;
  heigth: 4px;
  margin: 54px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-progress-bar {
  width: 100%;
  height: 4px;
  position: relative;
  display: flex;
  flex-direction: row;
  background-color: #D6DAE0;
  border-radius: 1px;
}

.stat-progress-bar .fill {
  height: 4px;
  background-color: #0050EF;
  border-top-left-radius: 1px;
  border-bottom-left-radius: 1px;
}

.stat-progress-info {
  font-size: .75rem;
  font-weight: 700;
  margin-top: 28px;
  color: #3e3f5e;
  text-transform: uppercase;
}
```

Regarding fonts, currently wc don't support font imports via `@import` so we are going to have to add the fonts in `index.html` section `style`:

```css
@import url('https://fonts.googleapis.com/css?family=Rajdhani:400,500,600,700&display=swap');

```

As for the html, we are going to update it into:

```html
<div class="achievement-card">
  <jsl-badge></jsl-badge>
  <p class="stat-title">${this.title}</p>
  <p class="stat-description">${this.description}</p>
  <div class="stat-progress">
    <div class="stat-progress-bar">
      <div class="fill" style="width: ${this.progress}%"></div>
    </div>
    <p class="stat-progress-info">${this.tooltip}</p>
  </div>
</div>
```

In order to test our new components, let's do some small changes to `index.html`.

In `style` add:

```css
div.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(300px, 1fr));
  padding: 16px;
}

div.gallery > * {
  margin: 16px;
}
```

And in `body` replace the `jsl-achievement` with a few more in a container:

```html
<div class="gallery">
  <jsl-achievement></jsl-achievement>
  <jsl-achievement></jsl-achievement>
  <jsl-achievement></jsl-achievement>
  <jsl-achievement></jsl-achievement>
  <jsl-achievement></jsl-achievement>
  <jsl-achievement></jsl-achievement>
  <jsl-achievement></jsl-achievement>
  <jsl-achievement></jsl-achievement>
  <jsl-achievement></jsl-achievement>
  <jsl-achievement></jsl-achievement>
  <jsl-achievement></jsl-achievement>
  <jsl-achievement></jsl-achievement>
  <jsl-achievement></jsl-achievement>
  <jsl-achievement></jsl-achievement>
  <jsl-achievement></jsl-achievement>
  <jsl-achievement></jsl-achievement>
</div>
```

## Step 5 - Properties

Properties are a way of sending data inside the component, this creates a more dynamic element and let's us reuse them as much as we want.

Like in the styling part, properties are also part of the `LitElement` and we can provide access to them via:

```typescript
// example
...
static get properties() {
  return { 
    myProperty: { type: String }
  }
}

constructor() {
  super();

  this.myProperty = 'some string';
}
...
```

One important thing here is to also have a constructor that sets a default to the value.

For example, for `badge`, we can provide inside it a map between unique identifiers and the images, so we can load them easier.

```json
{
  "bronze": "https://odindesignthemes.com/vikinger/img/badge/bronze-b.png",
  "silver": "https://odindesignthemes.com/vikinger/img/badge/silver-b.png",
  "gold": "https://odindesignthemes.com/vikinger/img/badge/gold-b.png",
  "platinum": "https://odindesignthemes.com/vikinger/img/badge/platinum-b.png",
  "traveller": "https://odindesignthemes.com/vikinger/img/badge/traveller-b.png",
  "caffeinated": "https://odindesignthemes.com/vikinger/img/badge/caffeinated-b.png",
  "upowered": "https://odindesignthemes.com/vikinger/img/badge/upowered-b.png",
  "scientist": "https://odindesignthemes.com/vikinger/img/badge/scientist-b.png",
  "ncreature": "https://odindesignthemes.com/vikinger/img/badge/ncreature-b.png",
  "warrior": "https://odindesignthemes.com/vikinger/img/badge/warrior-b.png",
  "liked": "https://odindesignthemes.com/vikinger/img/badge/liked-b.png",
  "sloved": "https://odindesignthemes.com/vikinger/img/badge/sloved-b.png",
  "qconq": "https://odindesignthemes.com/vikinger/img/badge/qconq-b.png",
  "villain": "https://odindesignthemes.com/vikinger/img/badge/villain-b.png",
  "age": "https://odindesignthemes.com/vikinger/img/badge/age-b.png",
  "tstruck": "https://odindesignthemes.com/vikinger/img/badge/tstruck-b.png",
  "uexp": "https://odindesignthemes.com/vikinger/img/badge/uexp-b.png",
  "globet": "https://odindesignthemes.com/vikinger/img/badge/globet-b.png",
  "verifieds": "https://odindesignthemes.com/vikinger/img/badge/verifieds-b.png",
  "gempost": "https://odindesignthemes.com/vikinger/img/badge/gempost-b.png",
  "peoplesp": "https://odindesignthemes.com/vikinger/img/badge/peoplesp-b.png",
  "rulerm": "https://odindesignthemes.com/vikinger/img/badge/rulerm-b.png",
  "marketeer": "https://odindesignthemes.com/vikinger/img/badge/marketeer-b.png",
  "tycoon": "https://odindesignthemes.com/vikinger/img/badge/tycoon-b.png",
  "mightiers": "https://odindesignthemes.com/vikinger/img/badge/mightiers-b.png",
  "phantom": "https://odindesignthemes.com/vikinger/img/badge/phantom-b.png",
  "forumsf": "https://odindesignthemes.com/vikinger/img/badge/forumsf-b.png",
  "fcultivator": "https://odindesignthemes.com/vikinger/img/badge/fcultivator-b.png",
  "splanner": "https://odindesignthemes.com/vikinger/img/badge/splanner-b.png",
  "collector": "https://odindesignthemes.com/vikinger/img/badge/collector-b.png",
  "prophoto": "https://odindesignthemes.com/vikinger/img/badge/prophoto-b.png",
  "rmachine": "https://odindesignthemes.com/vikinger/img/badge/rmachine-b.png",
  "bronzec": "https://odindesignthemes.com/vikinger/img/badge/bronzec-b.png",
  "silverc": "https://odindesignthemes.com/vikinger/img/badge/silverc-b.png",
  "goldc": "https://odindesignthemes.com/vikinger/img/badge/goldc-b.png",
  "platinumc": "https://odindesignthemes.com/vikinger/img/badge/platinumc-b.png",
}
```

Now all we need is to change `badge` and `achievement` to use properties.

To help you out with testing, you can update `index.html` to render different achievements.

## Step 6 - Events

Events are part of what makes applications reactive today. Be it that an items is clicked and users get redirected to a new page or somethings triggeres on the current page and madness starts to unfold.

With `LitElement` there are two main motives for which we can use events:

- either the components reacts to a specific event like `click`, `focus` etc. and in this case everything we need is inside the component isolated


```typescript
// example
export class Example extends LitElement {
  constructor() {
    super();

    this.addEventListener('click', this._handleClick);
  }
}
```

- or we want to comunicate outside of the component and let the app react to something that has happened inside and in that case we are exposing an event outside

```typescript
// example
export class Example extends LitElement {
  _handleClick(e) {
    let event = new CustomEvent('my-event', {
      detail: {
        message: 'Something important happened'
      }
    });

    this.dispatchEvent(event);
  }

  render() {
    return html`<button @click="${this._handleClick}">click</button>`;
  }
}
```

This is where it gets more creative, you are free to add some events to your components, play around with them a bit and experiment, have some fun!

## Step 7 - Lifecycle

Any modern frameworks defines a lifecycle for each of its elements: display components, injected services, other factory classes etc. and `LitElement` also exposes two lifecycle sequences for its components:

- one that is triggered at component runtime: `constructor -> connectedCallback -> update -> render -> updated -> firstUpdated`
- and oen that is triggered every time something has updated: `update -> render -> updated`

Now for each of these lifecycle functions, we need to be aware that everytime we want to change that step, we also need to make sure its parent step is also being triggered:

```typescript
// example

export class Example extends LitElement {
  connectedCallback() {
    super.connectedCallback();
  }
}
```

Similar to how constructors need to `super()` the parent constructor, similarly we do it for all the lifecycle steps.

Again, with the creative stuff, you can do something crazy to play around with the lifecycle.

## Step 8 - Decorators

Decorators make life easier and `LitElement` has provided us with some very useful ones. Keep in mind that for javascript and typescript, decorators are still experimental and we need to properly handle them. In typescript this is done just by turning a flag on for the tsc compiler.

```json
// tsconfig.json
{
  ...

  "experimentalDecorators": true,

  ...
}
```

Most common used decorators in `LitElement` are:

- `@customElement` - defines the component in the registry, equivalent of `customElements.define('badge', Badge);`
- `@property` - defines the property configuration without us being needed to specify it explicitly
- `@eventOptions` - defines the event listener, equivalent of `this.addEventListener(...)`

Update our components with decorators and watch how easy it gets.
