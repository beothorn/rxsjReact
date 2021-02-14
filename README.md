# RxJs+React+Flux demo App

This is an example app that shows some "tweets".

It uses [React](https://reactjs.org/) for rendering and [RxJs](https://rxjs-dev.firebaseapp.com/) for data manipulation.

It uses a [Flux architecture](https://facebook.github.io/flux/docs/in-depth-overview/#:~:text=Flux%20is%20the%20application%20architecture,a%20lot%20of%20new%20code.) where both the state and dispatcher are observables.

This is only a demo, all data is local and it does not call any endpoint.

# Design decisions

## Why Flux?

Reactive programming is great to make clean understandable code.

The disadvantage is that debugging reactive code can be hard. The worst case scenario
is having a component depending on a single point of entry that agregates many observables.
In this case, hunting down the actual flow of changes that got the component to that state
can become a jorney through a rabbit hole of different observables dispatching data on different
places on your source code.

Using Flux can be a middle ground solution. 

With Flux it is not possible to pipe data directly to a react component, but, in return, you have a 
single entrypoint and exit point for your ui state. This may be a bottle neck for
the ui state changes, but it improves traceability.

## Folders separate different domains

Instead of grouping reducers and components together, source code relating to one domain goes together.

In this case there is only the tweetView, but that is the general idea. That is why the reducer is in the
same folder as the component.


## Todo

- Use typescript
- Use Sass

## Running

Use ```npm start``` to run the app

## Features

- Renders a list of fake tweets 
- Tweets older than 30 secs are removed from the list 
- Ability to like and unlike tweets 
- Liked tweet looks visually different than the other tweets 
- Shows liked count 
- Filter between "all tweets" and "liked tweets" 
- Button that clears the list of tweets. 
- Tweets are ordered by date descending (newest first) 