# Hopper

![Hopper Logo](https://user-images.githubusercontent.com/3800704/70901059-549bc080-1ffa-11ea-8436-d4669dad1f28.png)

Electric bikes enable you to travel faster & further so that you get better connections. But they also have special needs such as safe parking.

Hopper is a **route-planner** that takes all those needs into account and allows you to combine your e-bike with train journeys. Change your commuting habits and contribute to sustainability!

Hopper is powered by Linked Open Data and [Itinero](https://www.itinero.tech).

## Technologies

Hopper's frontend is built on top of the following tech:

  - ReactJS with `create-react-app`
  - SCSS

## Hop right in!

Want to start working on Hopper? A single command line will get you started:

```sh
$ yarn start
```

### Development environment

Hopper features a few opinionated libraries and scripts built right in to help you develop your web app.

#### Linting

Based on [Airbnb's Javascript Guidelines](https://github.com/airbnb/javascript), `.eslintrc` (and `.babelrc`) are preconfigured and bundled to keep a defined coding style throughout many contributors.

(S)CSS is not forgotten either thanks to `stylelint`.

While the `start` script is running, code will always be linted on each save. If you want to lint your entire codebase, simply run:

```sh
$ yarn lint
```

#### Flow

To help along with linting, [Flow](https://flow.org) helps development as a JavaScript static type checker.

#### Storybook

Essential for React component development, [Storybook](https://storybook.js.org) is prepackaged and ready to run. Just add the relevant `index.stories.js` file inside your component, and then run the following command to see it show up in your browser:

```sh
$ yarn storybook
```

#### CI-ready

The `test` script is ready for you to use in your favorite CI tool.

## Deployment

Ready to deploy, you or your CI tool? Make an optimized build with this command:

```sh
$ yarn build
```

## Maps

Hopper was built with the intent of using the [open-source vectorial maps built on top of Mapbox GL technology for the SMOP](https://github.com/nextmoov/nextmoov-smop-maps).

You need to set it up first in order to provide a valid URL in the `mapConfig.js` file.

You'll need to edit:

- `mapServerBase`: with your base URL from your map server
- `glyphs`: with an URL pointing to the provided fonts
- `sprite`: with an URL pointing to the provided sprite sheet images and JSON files
