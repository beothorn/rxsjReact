(this.webpackJsonptwitterlike=this.webpackJsonptwitterlike||[]).push([[0],{35:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var i=n(15),r=n.n(i),s=n(28),a=n.n(s),c=(n(35),n(1)),l=function(e){var t=e.count;return Object(c.jsxs)("p",{children:[t," liked tweet"]})},u="toggleSelected",o="toggleNotSelected",d=function(e){var t=e.dispatcher,n=e.selected;return Object(c.jsxs)("p",{children:["Show:",Object(c.jsx)("span",{className:"All"===n?u:o,onClick:function(){return t.next({type:"TweesView/ToggleView",payload:"All"})},children:"All"}),Object(c.jsx)("span",{className:"Liked"===n?u:o,onClick:function(){return t.next({type:"TweesView/ToggleView",payload:"Liked"})},children:"Liked"})]})},w=function(e){var t=e.dispatcher,n=e.visibility,i=e.tweets,r=i;"Liked"===n&&(r=i.filter((function(e){return e.liked})));if(0===r.size)return Object(c.jsx)("div",{id:"noTweetsMsg",children:"No tweets"});var s=r.map((function(e){var n=Object(c.jsx)("button",{className:"likeButton","data-testid":"like-button-"+e.timestamp,onClick:function(){return n=e.timestamp,t.next({type:"TweesView/LikeTweet",payload:n});var n},children:"Like"}),i=Object(c.jsx)("button",{className:"unlikeButton","data-testid":"unlike-button-"+e.timestamp,onClick:function(){return n=e.timestamp,t.next({type:"TweesView/UnlikeTweet",payload:n});var n},children:"Unlike"});return Object(c.jsxs)("p",{className:e.liked?"likedTweet":"tweet",children:[Object(c.jsx)("span",{className:"accountHandler",children:e.account}),Object(c.jsx)("span",{className:"tweetContent",children:e.content}),Object(c.jsxs)("span",{className:"tweetDate",children:["tweeted at ",new Date(e.timestamp).toLocaleString()]}),e.liked?i:n]},e.timestamp)}));return Object(c.jsxs)("div",{className:"tweetList",children:[Object(c.jsx)("button",{id:"clearAllButton",onClick:function(){return t.next({type:"TweesView/ClearTweets"})},children:"Clear All"}),s]})},p=function(e){var t=e.dispatcher,n=e.likedCounter,i=e.tweetsVisibility,r=e.tweets;return Object(c.jsxs)("div",{className:"TweetView",children:[Object(c.jsxs)("div",{id:"headerOptions",children:[Object(c.jsx)(l,{count:n}),Object(c.jsx)(d,{dispatcher:t,selected:i})]}),Object(c.jsx)(w,{dispatcher:t,visibility:i,tweets:r})]})},b=function(e){var t=e.dispatcher,n=e.app;return Object(c.jsxs)("div",{className:"App",children:[Object(c.jsx)("h1",{children:"Twitterlike"}),Object(c.jsx)(p,{dispatcher:t,likedCounter:n.getIn(["tweetsView","likedCounter"]),tweetsVisibility:n.getIn(["tweetsView","tweetsVisibility"]),tweets:n.getIn(["tweetsView","tweets"])})]})},j=n(42),f=n(38),m=n(40),k=n(29),O=n(12),h=function(e){var t=O.a.fromJS({});for(var n in e)t=t.set(n,e[n](void 0,{type:"LoadInitialState",payload:""}));var i=new k.a,r=i.pipe(Object(j.a)((function(e){false})),Object(f.a)((function(t,n){var i=t;for(var r in e)i=i.set(r,e[r](t.get(r),n));return i}),t),Object(j.a)((function(e){false})),Object(m.a)(1));return r.subscribe((function(){})),i.next({type:"HeatState",payload:""}),{dispatcher:i,stateObservable:r}},T=n(14),v=n(30),x=function(e,t){return e.pipe(Object(v.a)((function(e){return{type:"TweesView/AddTweet",payload:Object(T.a)(Object(T.a)({},e),{},{liked:!1})}}))).subscribe((function(e){t.next(e)}))},y=n(41),V=function(e,t,n){Object(y.a)(e).pipe(Object(v.a)((function(e){return{type:"TweesView/RemoveTweets",payload:(new Date).getTime()-t}}))).subscribe((function(e){return n.next(e)}))},g=O.a.fromJS({likedCounter:0,tweetsVisibility:"All",tweets:O.a.fromJS([])}),C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,t=arguments.length>1?arguments[1]:void 0,n=t.type,i=t.payload;switch(n){case"TweesView/AddTweet":return e.update("tweets",(function(e){return e.insert(0,i)}));case"TweesView/RemoveTweets":var r=e.update("tweets",(function(e){return e.filter((function(e){return e.timestamp>i}))})),s=r.get("tweets").filter((function(e){return e.liked})).size;return r.set("likedCounter",s);case"TweesView/ClearTweets":return e.update("tweets",(function(){return O.a.fromJS([])})).set("likedCounter",0);case"TweesView/LikeTweet":case"TweesView/UnlikeTweet":var a=e.get("tweets").findIndex((function(e){return e.timestamp===i}));if(-1===a)return e;var c=!0;"TweesView/LikeTweet"===n&&(c=!0),"TweesView/UnlikeTweet"===n&&(c=!1);var l=e.update("likedCounter",(function(e){return e+(c?1:-1)}));return l.update("tweets",(function(e){return e.update(e.findIndex((function(e){return e.timestamp===i})),(function(e){return Object(T.a)(Object(T.a)({},e),{},{liked:c})}))}));case"TweesView/ToggleView":return e.set("tweetsVisibility",i)}return e},N=n(39),S=function(e,t,n){return Object(y.a)(e).pipe(Object(v.a)((function(e){return{account:t,timestamp:Date.now(),content:"".concat(n," Tweet number ").concat(e+1)}})))},L=Object(N.a)(S(5e3,"AwardsDarwin","Facepalm"),S(3e3,"iamdevloper","Expert"),S(5e3,"CommitStrip","Funny")),A=h({tweetsView:C}),I=A.dispatcher,J=A.stateObservable;x(L,I),V(1e3,3e4,I),J.subscribe((function(e){return a.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(b,{dispatcher:I,app:e})}),document.getElementById("root"))}))}},[[37,1,2]]]);
//# sourceMappingURL=main.00ddb387.chunk.js.map