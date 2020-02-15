# Section 5: Styling React Components & Elements

## 69 Using Radium for Media Queries

- install the radium package

        npm install --save radium

- import the necessary packages

        import Radium, {StyleRoot} from 'radium'

- hover: add in style

        ':hover': "lightgreen"

  - useage:

          style[':hover'] = "salmon"

- media queries

        const style = {
            '@media (min-width:500px)': {
                width: '450px'
            }
        }

        <div className = 'Person style={style}'>...</div>

- wrap the code with <StyleRoot> </StyleRoot> for the Media Queries

        export the object with Radium
        export default Radium(Person)

## 70. Introducing Style Components

    npm install --save style-componets

https://styled-components.com

Example:

        import styled from 'styled-components'
        const Button = styled.button``

In course:

        const StyledDiv =  styled.div`
                width: 60%;
                margin: 16px auto;
                border: 1px solid #eee;
                box-shadow: 0 2px 3px #ccc
                padding: 16px;
                text-align: center;

                @media (min-width:500px){
                        width: 450px;
                }
                 `

add the `<StyledDiv></Style>` into `person.js` outside of the person object

## 71 More on Styled Component

How to add hover function of the button:

1.  normal css code
2.  `&:hover{...}`

        const StyledButton = styled.button`
                background-color: green;
                color: white;
                font: inherit;
                border: 1px solid blue;
                padding: 8px;
                cursor: pointer;

                &:hover {
                backgroundColor: lightgreen;
                color: black;
                }
        `

## 72 styled Compoents & Dynamic Styles

```JavaScript
const StyledButton = styled.button`
        background-color: ${props => props.alt ? 'green' : 'red'};
        color: white;
        font: inherit;
        border: 1px solid blue;
        padding: 8px;
        cursor: pointer;

        &:hover {
                background-color: ${props => props.alt ? 'lightgreen': 'salmon'};
                color: black;
                }
```

add the \${javascript codes}

## 73 work with CSS modules

1. setting: eject the npm, to keep react-scripts updatable

```
npm run eject
```

file `src\webpack.config.dev.js` change the following code:

```javascript
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader turns CSS into JS modules that inject <style> tags.
          // In production, we use a plugin to extract that CSS to a file, but
          // in development "style" loader enables hot editing of CSS.
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  modules: true,
                  localIdentName: '[name]__[local]__[hash:base64:5]',
                  camelCase: true,
                },
              },
```

Do the same in `src\webpack.config.prod.js`

```javascript
          // The notation here is somewhat confusing.
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader normally turns CSS into JS modules injecting <style>,
          // but unlike in development configuration, we do something different.
          // `ExtractTextPlugin` first applies the "postcss" and "css" loaders
          // (second argument), then grabs the result CSS and puts it into a
          // separate file in our build process. This way we actually ship
          // a single CSS file in production instead of JS code injecting <style>
          // tags. If you use code splitting, however, any async bundles will still
          // use the "style" loader inside the async code so CSS from them won't be
          // in the main CSS file.
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
              Object.assign(
                {
                  fallback: {
                    loader: require.resolve('style-loader'),
                    options: {
                      hmr: false,
                    },
                  },
                  use: [
                    {
                      loader: require.resolve('css-loader'),
                      options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: shouldUseSourceMap,
                        modules: true,
                        localIdentName: '[name]__[local]__[hash:base64:5]',
                        camelCase: true,
                      },
```

then, `npm run start`

2. import the css as a module

```javascript
# App.js
import classes from 'App.css'

...
<button className={classes.Button}>...
```

## 74 CSS Modules & Media Queries

just write the normal css, only by import is different

```css
.Person {
	width: 60%;
	margin: 16px auto;
	border: 1px solid #eee;
	box-shadow: 0 2px 3px #ccc;
	padding: 16px;
	text-align: center;
}

@media (min-width: 500px) {
	.Person {
		width: 450px;
	}
}
```

If you use **react-script >=2**, you need to rename the css file as:
`Person.module.css`, and you can do it without `npm run eject`

# Section 6: Debuggin React Apps

# Section 7: Diving Deeper into Components & React Internals

## 85 Splitting an App into Components

1. App.js should have JSX as less as possible.
2. Seprate the code to:
   - assets: for images
   - components: for objects
   - containers: like App.js, App.css
   - index.js, index.css for router
3. css module:

- take care of the last show effect, the later the css style, the dominant the
  style.
- don't forget change the name to "xxx.module.css"

## 90 Component Creation Lifecyle in Aciton

1. constructor(props): set up state, no side effects
2. getDerivedStateFromProps(props, state): sync state, no side effects
3. render(): prepare & structure your jsx code
4. Render child components
5. componentDidMount(): has side-effects, don't update state, butter trigger
   re-render

Notice: componentWillMount() is renamed to UNSAFE_componentWillMount(), it is
not encouraged to use!

## 91 Component Update Lifecycle (for props Changes)

1. getDerivedStateFromProps(props, state): Sync State to Props, no side effects
2. shouldComponentUpdate(nextProps, nextState): Decide whether to continue or
   not, no side-effect, may cancel updating process!
3. render(): Prepare & Structure JSX code
4. Update Child Component Props
5. getSnapshotBeforeUpdate(prevProps, prevState) : Last-minute Dom ops, no side
   effects
6. componentDidUpdate(): don't update state , has side-effect

## 92 Component Update Lifecycle (for state Changes)

1. componentDidMount(netProps, nextState)
2. shouldComponentUpdate()
3. componentDidUpdate()

## 93 Using useEffect() in Functional Components

`useEffect()` running for every change, you can use it to send the http request

```javascript
import react, { useEffect } from "react";
```

in function component:

```javascript
useEffect(()=>{
        ...
})
```

## 97. Using shouldComponentUpdate for Optimization

prevent the virtual dom re-render, make the website more efficient

```javascript
shouldComponentUpdate(nextProps, nextState){
        if (nextProps.persons !== this.props.persons){
                return true;
        }else{
                return false;
        }
}
```

Chrome: develop tool -> weitere tool -> paint flashing

## 98. Optimizing functional Components with React.memo()

In functional components, using `React.memo(your_compoennt)`

## 99. When should you optimize?

Some code you know, that it will update everytime, depends on the parents
element. So you don't need to wrap them with `shouldComponentUpdate` or
`React.memo()`

## 100. PureComponents instead of shouldComponentUpdate

`PureComponent` implemented all check of `shouldComponentUpdate`

## 101. How react updated the dom

copy the old virtual dom, compare with the new virual dom, if difference, then
update only the necessary part, otherwise, not.

## 102. Rendering Adjacent JSX Elements

1. `render()` list is ok, but need `key=xxx`
2. create a new component `<Aux></Aux>`and `props.children`

## 104. Using React.Fragment

`<React.Fragment></React.Fragment>`

## 105. Higher Order Components (HOC) - Introduction

```javascript
const withClass = props => (
	<div className={props.classes}>{props.children}</div>
);
```

take care, you should use:

```javascript
<WithClass classes={props.blabla}></WithClass>
```

Important, you can create other higher order component, for example, error
handling component or other logic component

## 106. Another Form of HOCs

Notice!!! need to rewrite, video finsih, but didn't do it.

## 107. Passing Unknown Props

PropTypes

## 108. Setting State correctly

```javascript
this.setState((prevState, props) => {
	return {};
});
```

## 109. Using PropTypes

Pip install PropTypes

## 110. Using Refs

two methods:

1. ref and compnentDidMouont()
2. React.createRef() in constrocutor()

## 111. Refs with React Hooks

```javascript
import { useRef } from "react";
const toggleBtnRef = useRef(null);

useEffect(() => {
	toggleBtnRef.current.click();
});
toggleBtnRef.current.click();

<button ref={toggleBtnRef} />;
```

## 112. Understanding Prop Chain Problems

## 113. Using the Context API

```javascript
const authContext = React.createContext({});
```

Provider

```javascript
<AuthContext.Provider value={...}>
  blabla...
</AuthContext.Provider>
```

Consumer

```javascript
<AuthContext.Consumer>
  {

          context => {bla...}}
</AuthContext.Consumer>
```

## 114. ContextType & useContext()

These mehtods are easier and more elegant!

```javascript
static contextType = AuthContext();
```

```javascript
this.context.authenticated;
```

Functional component

```javascript
const authContext = useContext(AuthContext);
```

# Section 9: Reaching out to the web (Http/Ajax)

## 191. Understanding our Project and Introducing Axios

```javascript
npm install axios
```

https://jsonplaceholder.typicode.com

## 192. Creating a http request to get data

```javascript
axios.get("https://...").then(response => {
	//do something with response
});
```

## 193. Rendering fetched data to the screen

Conny: notice...I need to complete it.

... ...

## 201.Adding Interceptors to Execute Code Globally

in `index.js` the most global file:

```javascript
axios.interceptors.request.use(
	request => {
		console.log(request);
		//edit the request
		return request;
	},
	error => {
		console.log(error);
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	response => {
		console.log(response);
		//edit response here...
		return response;
	},
	error => {
		console.log(error);
		return Promise.reject(error);
	}
);
```

## 202. Removing Interceptors

```javascript
var myInterceptor = axios.interceptors.request.use(function() {
	/*...*/
});
axios.interceptors.request.eject(myInterceptor);
```

## 203. Setting a default global configuration for Axios

```javascript
// index.js
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";
```

```javascript
// blog.js
axios.get("/posts");
```

## 204. Creating and Using Axios Instances

```javascript
// create a "axios.js" in "src" folder
import axios from "axios";

const instance = axios.create({
	baseURL: "https://jsonplaceholder.typicode.com"
});

instance.defaults.headers.common["Authorization"] = "AUTH TOKEN FROM INSTANCE";

// instance.interceptors.request.use...

export default instance;
```

```javascript
// Blog.js
import axios from "../../axios";

axios.get("/posts");
```

# Section 10. Burger Builder Project: Accessing a Server

## 209. Creating the Firebase Project

Conny: Notice: I am here

## 210 -211

Conny: Notice: maybe I need to do something

## 212. Displaying a Spinner while Sending a Request

1. finde the css loader images: In google se arch css loader
   https://projects.lukehaas.me/css-loaders/

2. make a <Spinner> component with css

3. check in <Modal> shouldCompnentUpdate() function

## 213. Handling Errors

1. make a class based Component
2. use componentDidMount(){}

```javascript
		componentDidMount() {
			axios.interceptors.request.use(req => {
				this.setState({ error: null });

				return req;
			});
			axios.interceptors.response.use(
				res => res,
				error => {
					this.setState({ error: error });
				}
			);
                }
```

3. add an error state
4. add an `errorConfirmedHandler`

## 214. Retrieving data from backend

1. take care that retrieving the data before data loaded
2. create new states in `Burgerbuilder.js`
3. also put the axios.interceptors.response.use() in constructor() in
   `withErrorHandler.js`

## Conny: Notice

Conny Notice: Here I need to do more

## 224. Redering Routers

```javascript
import { Route } from "react-router-dom";

<Route path="/" exact render={() => <h1>Home</h1>} />;
```

## 224. Redering Routers with component

```javascript
import { Route } from "react-router-dom";

<Route path="/" exact component={Posts} />;
```

## 225. Use Link switching between pages

```javascript
import {Link} from "react-router-dom";

<Link to="/"> Home </Link>
<Link to={{
        pathname: "/new-post",
        hash: "#submit",
        search: "?quick-submit=true"
}}>
new post
</Link>
```

## conny: note

```javascript
import {withRouter} from "react-router-dom";

...

export default withRouter(post)

```

## 231. Styling the Active Link

```javascript
import {NavLink} from "react-rouoter-dom";

<NavLink to="/"
exact
activeClassName="my-active"
activeStyle={{
        color: "#fa023f",
        textDecoration: "underline"}}
        >
Home
</NavLine>

<NavLink to={{
        pathname: "/new-post",
        hash: "#submit",
        search: "?quick-submit=true"
}}>
new post
</NavLink>
```

## 232. Passing Router parameters

```javascript
// FullPost.js
import { Route } from "react-router-dom";

<Route path="/:id" component={FullPost} />;
```

```javascript
// Post.js
import {Link} from 'react-router-dom';

<Link to={'/'+post.id}
key={post.id}>
<Post
        title={Post.title}
        author={post.auth}
        clicked={()=>this.postSelectedHandler(post.id)}
>
</Link>
```

## 234. extracting Router Paramters

use `this.props.match.params.id`

```javascript
// Fullpost.js
class FullPost extends Component{

        ComponentDidMount(){
                if(this.props.match.params.id){
                        ...
                }
        }

}
```

## 235. Using switch to load a Single Route

`<Route path="\:id" component={FullPost}>` is similar to
`<Route path="\new-post" component={NewPost}>`

Because `id` can also be `new-post`

Solution:

```javascript
import { Switch, Route } from "react-router-dom";

<Switch>
	<Route path="/" component={Posts} />
	<Route path="/new-post" component={NewPost} />
	<Route path="/:id" component={FullPost} />
</Switch>;
```

## 236. Navigating Programmatically

Alternative way to go to another page.

Don't use `<Link>` but the `this.props.history.push('/'+id)`

```javascript
//Posts.js
postSelectHandler = id => {
	this.props.histroy.push("/" + id);
};
```

## 238. Underständing Nested Routers

## 239. Create Nested Routers

The same as others, but take care of the `<Route>` order and `exact`

For more flexibility of the path, we can use `this.props.match.url`

## 240. Redirect

```javascript
<Redirect from="/" to="/posts">
```

## 241. Conditional Redirects

```javascript
// in NewPost.js
class NewPost extends Component {
	render() {
		let redirect = null;

		if (this.state.submitted) {
			redirect = <Redirect to="posts" />;
		}
	}
}
```

## 242. Using the History Prop to Redirect (Replace)

if you don't want to use `<Redirect>` you can use
`this.props.history.push('/posts')` or `this.props.history.replace('/posts')`

In general, the replace is same as `<redirect>`, but push can let you go back
the to last page.

## 243. Working with Guards

Method 1. in blog.js if auth => do something

Method 2. in NewPost.js componentDidMount: if auth=> do something

## 244. Handling the 404 Case (Unkown Routes)

```javascript
<Router render={()=><h1>Not fount</h1>}>
```

## 245. Loading Routes Lazily

1. add hoc/asyncComponent.js
2. Use the asyncComponent

```javascript
import asyncComponent from "../../hoc/asyncComponent";
import Posts from "./Posts/Posts";
import "./Blog.css";
// import axios from 'axios';

const AsyncNewPost = asyncComponent(() => {
	return import("./NewPost/NewPost");
});
```

3. use the `<AsyncNewPost>` like normal class.

## 246. Lazy Loading with React Suspense

```javascript
// in Blog.js
const Articles = React.lazy(() => import("../../components/Asyn/Articles"));

<Route
	path="/articles"
	render={() => (
		<Suspense fallback={<div>Loading...</div>}>
			{" "}
			<Articles />
		</Suspense>
	)}
></Route>;
```

# 247. Routing and Server Deployment

1. set the start page as index.html on your server
2. set the <BrowerRouter basename="/my-app"> in App.js

# 254. Navigating Back & To Next

`this.props.history.goBack()` `this.props.history.push('/')`
`this.props.history.replace('/checout')`

# 255 Passing Ingredients via Query Parameters

```javascript
// BurgerBuilder.js
purchasingContinueHandler = () => {
	const queryParams = [];
	for (let i in this.state.ingredients) {
		queryParams.push(
			encodeURIComponent(i) +
				"=" +
				encodeURIComponent(this.state.ingredients[i])
		);
	}

	const queryString = queryParams.join("&");

	this.props.history.push({
		pathname: "/checkout",
		search: "?" + queryString
	});
};
```

```javascript
// Checkout.js
class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        for (let param of query.entries()){
            ingredients[param[0]] = +param[1]
        }
        this.setState({ingredients: ingredients})

    }

...

}
```

## 257. Order Submission & Passing Data between Pages

# Section 13: Forms and Form Validation

## 265. Analyzing the App

## 266. Creating a Custom Dynamic Input Component

```javascript
# Input.js
const Input = props => {
	let inputElement = null;

	switch (props.inputtype) {
		case "input":
			inputElement = <input className={classes.inputElement} {...props} />
			break
		case "textarea":
			inputElement = <textarea className={classes.inputElement} {...props} />
			break
		default:
			inputElement = <input className={classes.inputElement} {...props} />
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
	);
};

```

# Section 14. Redux

```javascript
npm install --save react-redux
```

## 285. Setting Up Reducer and Store

## 286. Dispatching Actions

## 287. Adding Subscriptions

```javascript
// redux-basic.js
const redux = require("redux");
const createStore = redux.createStore;
const initialState = { counter: 0 };

// Reducer
const rootReducer = (state = initialState, action) => {
	if (action.type === "INC_COUNTER") {
		return {
			...state,
			counter: state.counter + 1
		};
	}

	if (action.type === "ADD_COUNTER") {
		return {
			...state,
			counter: state.counter + action.value
		};
	}

	return state;
};

// Store
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription
store.subscribe(() => {
	console.log("[Subscription]", store.getState());
});

// Dispatching Action
store.dispatch({ type: "INC_COUNTER" });
store.dispatch({ type: "ADD_COUNTER", value: 10 });
```

## 288. Connecting React to Redux

```javascript
// index.js
const store = createStore(reducer);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
registerServiceWorker();
```

```javascript
// src/store/reducer.js
const initialState = {
	counter: 0
};

const reducer = (state = initialState, action) => {
	if (action.type === "INCREMENT") {
		return {
			counter: state.counter + 1
		};
	}
	return state;
};

export default reducer;
```

## Connecting the Store to React

```javascript
// src/containers/Counter.js
import {connect} from 'react-redux'



class Counter extends Component {



        render() {
		return (
			<div>
                                <CounterOutput value={this.props.ctr} />
                        </div>
                )}


const mapStateToProps = state => {
	return { ctr: state.counter };
};


export default connect(mapStateToProps)(Counter);
```

## 290. Dispatching Actions from within the Component

```javascript
// src/containers/Counter.js

	render() {
		return (
			<div>
				<CounterOutput value={this.props.ctr} />
				<CounterControl
					label="Increment"
                                        clicked={this.props.onIncrementCounter} />
                        </div>
                )
        }

// add this content
const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: 'INCREMENT'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

## 291. Passing and Retrieving Data with Action

## 297. Combining Multiple Reducers

1. create 2 reducers: `counter.js` and `result.js`

2. inform the app there are two reducers and merge them

```javascript
// index.js
import { createStore, combineReducers } from "redux";

import resultReducer from "./store/reducers/result";
import counterReducer from "./store/reducers/counter";

const rootReducer = combineReducers({
	ctr: counterReducer,
	res: resultReducer
});
const store = createStore(rootReducer);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
registerServiceWorker();
```

3. map the state from the respect reducer to props

```javascript
// Counter.js
const mapStateToProps = state => {
	return { ctr: state.ctr.counter, storedResults: state.res.results };
};
```

# 15. Adding Redux to Burger Project

## 304. Installing Redux and React redux

```
npm install --save redux react-redux
```

## 306. Finishing the Reducer for Ingredients

1. in `BurgerBuilder.js` remove the axios in `componentDidMount()`

2. wrap the `<App>`

```javascript
// index.js
const store = createStore(reducer);

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);
```

3. write the reducer

```javascript
// reducer.js
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				}
			};

		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredents[action.ingredientName] - 1
				}
			};
		default:
			return state;
	}
};
```

Notice: in ES6 `[action.ingredientName]` in object: overwrite the correspondant
object key with variable.

# Section 16: Redux Advanced

## 314. Adding Middleware

1. add the middleware function
2. add `applyMiddleware(logger)` into `createStore()`
3. import the `applyMiddleware from "redux"`

```javascript
// index.js

import { createStore, combineReducers, applyMiddleware } from "redux";

const logger = store => {
	return next => {
		return action => {
			console.log("[Middleware] Dispatching", action);
			const result = next(action);
			console.log("[Middleware] next state", store.getState());
			return result;
		};
	};
};

const store = createStore(rootReducer, applyMiddleware(logger));
```

## section 315. Using the Redux Devtools

Github:  
https://github.com/zalmoxisus/redux-devtools-extension

Chrome Extension:
https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en

GitHub standalone: https://github.com/reduxjs/redux-devtools

```javascript
// resource: https://github.com/zalmoxisus/redux-devtools-extension

// index.js
import { createStore, combineReducers, applyMiddleware, compose } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(logger))
);
```

## 317. Introduction Action Creators

Goal: create asynchronous function use `createAction()` which return an Action
object with `{type: actionName, payload: 5}`

```javascript
// action.js
export const increment = () => {
	return {
		type: INCREMENT
	};
};
```

```javascript
// Counter.js
mapDispatchToProps = dispatch => {
	return {
		onIncrementCounter: () => dispatch(increment())
	};
};
```

## 318. Action Creators & Async Code

## 319. Handling Asynchronous Code

- redux thunk  
  https://github.com/reduxjs/redux-thunk

- install:  
  `npm install --save redux-thunk`

- code:

```javascript
// index.js
import thunk from "redux-thunk";

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(logger, thunk))
);
```

```javascript
// actions.js
export const saveResult = res => {
	return {
		type: STORE_RESULT,
		result: res
	};
};

export const storeResult = res => {
	return dispatch => {
		setTimeout(() => {
			dispatch(saveResult(res));
		}, 2000);
	};
};
```

## 320. Restructuring Actions

change the structure for big projects

1. actions -> index.js: add all the function names, for easy import

## 321. Where to Put Data Transforming Logic

You can put the login either in Action or Reducer. Action Creators: can run
Async Code Reducer: Pure, Sync Code Only

Action Creators: shouldn't update the state too much Reducer: update the state

Suggestion: Reducer, and be consistent.

## 322. Using Action Creators and Get State

```javascript
// src/sotre/actions/index.js
export const storeResult = res => {
	return (dispatch, getState) => {
		setTimeout(() => {
			const oldCounter = getState().ctr.counter;
			console.log(oldCounter);
			dispatch(saveResult(res));
		}, 2000);
	};
};
```

but please don't overuse it.

## 323. Using Utility Functions

1. deep object copy, immutability

```javascript
export const updateObject = (oldObject, updatedValues) => {
	return {
		...oldObject,
		...updatedValues
	};
};
```

## 324. A leaner Switch Case Statement

very lean

## 325. An Alternative Folder Structure

For each container put a store folder in there

# Section 17. Redux Advanced: Burger Project

## 330. Installing the Redux Devtools

Github: https://github.com/zalmoxisus/redux-devtools-extension

```javascript
// index.js
const store = createStore(
	reducer /* preloadedState, */,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

## 331. Preparing the Folder Structure

Data Structure

```
store
	actions
		actionTypes.js
		burgerBuilder.js
		order.js
	reducers
		burgerBuilder.js
		order.js
```

## 332. Creating Action Creators

Write the createAciton function codes. and change the correspondent functions in
containers/burgerBuilder/BurgerBuilder.js

## 333. Executing Asynchronous Code

```javascript
// src/containers/burgerBuilder.js

// use the axios take the ingredients from server back
	componentDidMount() {
		console.log(this.props);
		axios
			.get("ingredients.json")
			.then(response => this.setState({ ingredients: response.data }))
			.catch(error => {
				this.setState({ error: true });
			});
	}
```

```javascript
// src/index.js
import thunk from "react-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	burgerBuilderReducer,
	composeEnhancers(applyMiddleware(thunk))
);
```

## 334. Fetching Ingredients Asynchronously

set three createAction functions

```javascript
// src/store/actions/burgerBuilder.js

export const setIngredients = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	};
};

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED
	};
};

// this is the asynchronous code
export const initIngredients = () => {
	return dispatch => {
		axios
			.get("ingredients.json")
			.then(response => dispatch(setIngredients(response.data)))
			.catch(error => {
				dispatch(fetchIngredientsFailed());
			});
	};
};
```

## 335. Initializing Ingredients in the BurgerBuilder

1. map the dispatch(initIngredients()) in
   `containers/BurgerBuilder/BurgerBuilder.js`
2. in `componentDidMount()` call the mapped function: onInitIngredients()
3. also map error, don't forget.

## 336. Changing the Order of our Ingredients Manually

You can change the order of your burger, but you will lose the flexibility

```javascript
// store/reducers/burgerBuilder.js
case actionTypes.SET_INGREDIENTS:
	return {
		...state,
		ingredients: {
			salad: action.ingredients.salad,
			bacon: action.ingredients.bacon,
			cheese: action.ingredients.cheese,
			meat: action.ingredients.meat
		}
	}
```

## 337. Adding Order Actions

Add three actionTypes for order

```javascript
// store/action/actionTypes.js
export const PURCHASE_BURGER_SUCCESS = "PURCHASE_BURGER_SUCCESS";
export const PURCHASE_BURGER_FAIL = "PURCHASE_BURGER_FAIL";
```

add the actionCreator in `store/action/order.js`

```javascript
// store/action/order.js
import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	};
};

export const purchaseBurgerFail = error => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error
	};
};

export const purchaseBurgerStart = orderData => {
	return dispatch => {
		axios
			.post("/orders.json", orderData)
			.then(response => {
				console.log(response.data);
				dispatch(purchaseBurgerSuccess(response.data, orderData));
			})
			.catch(error => {
				dispatch(purchaseBurgerFail(error));
			});
	};
};
```

## 338. Connecting Contact Data Container & Actions

1. export the actions in the `store/action/index.js`
2. map the dispatch() to the props in `containers/contactData.js`
3. call the mapped dispatch action in `containers/contactData.js`

## 339. The Order Reducer

```javascript
// store/reducers/order.js
import * as actionTypes from "../actions/actionTypes";

const initialState = {
	orders: [],
	loading: false
};

const reducer = (state = initialState, aciton) => {
	switch (action.type) {
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			const newOrder = {
				...action.orderData,
				id: action.orderId
			};
			return {
				...state,
				loading: false,
				orders: state.orders.concat(newOrder)
			};
		case actionTypes.PURCHASE_BURGER_FAIL:
			return {
				...state,
				loading: false
			};
		default:
			return state;
	}
};
```

## 340. Working on Order Actions

Conny: too much, a little chaos

## 341. Redirect to imporve UX

Notes: before the ingredients loaded from database, there is nothing to show on
the website, so `<Redirect to='/' />` to the start page. Of course, you can also
show a <Spin /> instead.

## 342. Combining Reducers

# Section 18. Adding Authentication to our Burger Project

## 353. Required App Adjustments

1. Singup & Signin Views
2. Guards
3. Pass Auth Information to Backend

## 354. Adding an Auth Form

1. add `src/containers/Auth/Auth.js`

## 356. Getting a token from backend

1. filebase: set the authentification method, enable: email
2. search "firebase auth rest api" and go to
   https://firebase.google.com/docs/reference/rest/auth
3. get the link:
   `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]`
4. find your api at your firebase account "project settings":
   AIzaSyCD74DfHNUuEv4yJstHifY9y1j6Nboc8jE
5. API Example: https://firebase.google.com/docs/reference/rest/auth

```javascript
// src/store/action/auth.js
export const auth = (email, password) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};
		axios
			.post(
				"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCD74DfHNUuEv4yJstHifY9y1j6Nboc8jE",
				authData
			)
			.then(response => {
				console.log(response);
				dispatch(authSuccess(response.data));
			})
			.catch(err => {
				console.log(err);
				dispatch(authFail(err));
			});
	};
};
```

6. If registration not success, then at develop tools: Network -> All ->
   accounts:signUp?key=AIza... will retrun a error message:

```javascript
{
  "error": {
    "code": 400,
    "message": "WEAK_PASSWORD : Password should be at least 6 characters",
    "errors": [
      {
		//   Here tell you what's wrong with the registration
        "message": "WEAK_PASSWORD : Password should be at least 6 characters",
        "domain": "global",
        "reason": "invalid"
      }
    ]
  }
}
```

## 357. Adding Sign-In

1. add a button called "switch to SIGNUP/SIGNIN"
2. add a state: `isSignup` in `Auth.js`
3. change the url under different situation:

```javascript
// src/containers/Auth/Auth.js
let url =
	"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCD74DfHNUuEv4yJstHifY9y1j6Nboc8jE";

if (!isSignup) {
	url =
		"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCD74DfHNUuEv4yJstHifY9y1j6Nboc8jE";
}
```

## 358. Storing the Token

## 359. Adding a Spinner

Error Message list:
https://firebase.google.com/docs/reference/rest/auth#section-create-email-password

## 360. Logging Users Out

## 361. Accessing Protected Resources

In Firebase:
https://console.firebase.google.com/project/conny-burgerbuilder/database/conny-burgerbuilder/rules

change the rules to

```javascript
{
  "rules": {
    	"ingredients": {
        ".read": "true",
        ".write": "true"
      },
      "orders": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
  }
}
```

access state outside of a component:

https://daveceddia.com/access-redux-store-outside-react/

4 methods:

1. Export the store, but don't use this method with server side rendering
2. access redux state from a thunk
3. use middleware and intercept an action
4. Pass the value from a react component

In the course, we used the 4th method.

## 362. UPdating the UI Depending on Auth State

pass the auth state in `hoc/Layout/Layout.js` to `<Toolbar>` and `<Sidbar>`,
then to `<NavigationItems>`

## 363. Adding a Logout Link

Practice: click a button or a link, then logout and automatically redirect to
the first page.

usage: `<Redirect>`

1. create a component `<Logout>`: function: redirect to main page
2. process:
   1. write an logout action: 1. action/action.js: call the dispatch 2.
      action/actionTypes.js 3. action/index.js: export the logout action 2.
      write the logout reducer 3. map the dispatch to props in `<Logout>` 4.
      call the this.props.logout() function

## 364. Forwarding Unauthenticated Users

## 366. Persistent Auth State with localStorage

1. localStorage.setItem(key, value)
2. localStorage.removeItem(key)
3. localStorage.getItem(key)
4. new Date("a time a string") # convert the string to Date object
5. (new Date()).getSeconds() # get current seconds
6. (new DAte()).getTime() # get the current time in milliseconds

## 369. Guarding Routes

1. map the `isAuthenticated` state to the props
2. conditional set the `<Switch><Router>`

## 370. Displaying User Specific Orders

1. set the Firebase restapi:

```javascript
const queryParameters =
	"?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';

axios.get("/orders.json" + queryParameters);
```

2. modify firebase rule to let the database searchable:

```javascript
{
  "rules": {
    	"ingredients": {
        ".read": "true",
        ".write": "true"
      },
      "orders": {
        ".read": "auth != null",
        ".write": "auth != null",
          ".indexOn": ["userId"]
      }
  }
}
```

## 377. Using Environment Variables

in `config/env.js`:

```javascript
// here set default as "development"
NODE_ENV: process.env.NODE_ENV || 'development',
PUBLIC_URL: publicUrl
```

in `src/index.js`

```javascript
// src/index.js

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composeEnhancers =
	process.env.NODE_ENV === "development"
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPSE__
		: null || compose;
```

## 379. Adding lazy Loading

Notice: 246 has a new method of lazy loading

```javascript
React.Lazy(()=>import('.../Orders'))

<Route path="/orders" render={
	<Suspense fallback={<p>Loading Orders...</p>}>
<Orders />
</Suspensef>
}/>
```

# 20. Testing

## 384. Required Testing Tools

need: jest, enzyme, enzyme adapter for react 16

https://airbnb.io/enzyme/docs/installation/

Jest and Enzyme API:  
https://airbnb.io/enzyme/docs/guides/jest.html

```javscript
npm install jest
npm install --save-dev enzyme enzyme-adapter-react-16
npm install --save-dev react-test-renderer
```

## 386. Writing our First Test

```javascript
import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link="/" exact={true}>
				Burger Builder
			</NavigationItem>
			{props.isAuthenticated ? (
				<NavigationItem link="/orders">Orders</NavigationItem>
			) : null}

			{props.isAuthenticated ? (
				<NavigationItem link="/logout">Logout</NavigationItem>
			) : (
				<NavigationItem link="/auth">Authenticate</NavigationItem>
			)}
		</ul>
	);
};

export default navigationItems;
```

go to package.json find the "test" npm test

## 387. Testing Components Continued

```javascript
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<NavigationItems />);
	});

	it("should render 2 <NavigationItem /> elements if not authenticated", () => {
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});

	it("should render 3 <NavigationItem /> elements if authenticated", () => {
		wrapper.setProps({ isAuthenticated: true });
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});

	it('should have the node <NavigationItem link="/">Logout</NavigationItem>', () => {
		wrapper.setProps({ isAuthenticated: true });
		expect(
			wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
		).toEqual(true);
	});
});
```

## 388. Jest and Enzyme Documentations

Jest: https://jestjs.io/docs/en/getting-started

Jest it()/test(): https://jestjs.io/docs/en/api.html#testname-fn-timeout

Jest Expect(): https://jestjs.io/docs/en/expect

Enzyme with Jest: https://airbnb.io/enzyme/docs/guides/jest.html

## 389. Testing Components Correctly

Notice:

1. add `export` before `class BurgerBuilder extends Component{}`, because the
   default export at the end of the page has a `connect()`. We want to get rid
   of the redux and simulate the props function.

2. delete "App.test.js"!!!

```javascript
// BurgerBuilder.test.js

import React from "react";
import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
	});

	it("should render <BuildControls /> when receiving ingredients", () => {
		wrapper.setProps({ ings: { salad: 0 } });
		expect(wrapper.find(BuildControls)).toHaveLength(1);
	});
});
```

## How to Test Redux

Just like test the simplest code, you don't even need enzyme.

But don't forget: `expect(reducer(undefined, {}))`

Notice:

- `undefined` is the state, means the original state.
- `{}` is the empty action.

```javascript
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<NavigationItems />);
	});

	it("should render 2 <NavigationItem /> elements if not authenticated", () => {
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});

	it("should render 3 <NavigationItem /> elements if authenticated", () => {
		wrapper.setProps({ isAuthenticated: true });
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});

	it('should have the node <NavigationItem link="/">Logout</NavigationItem>', () => {
		wrapper.setProps({ isAuthenticated: true });
		expect(
			wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
		).toEqual(true);
	});
});
```

# 21. Deploying the App to the Web

# 26. React Hooks

## 456. The Starting Project

```javscript
// import useSate
import React, {useState} from 'react'
```

useState(blabla): the params can be object or anything else

```javascript
useState({ title: "", amount: "" });
```

**Note: ** The useState don't merge the states for us

## 457. Getting Started with useState()

useState return an array with two elements, the first teh value of the state,
second is a funtion, which can set the state.

## 458. More on useState() & state Updating

Event problem:

```javascript
					<div className="form-control">
						<label htmlFor="amount">Amount</label>
						<input
							type="number"
							id="amount"
							value={setInputState.amout}
							onChange={event => {
								let newAmount = event.target.value;
								setInputState(prevInputState => ({
									title: prevInputState.title,
									amount: newAmount
								}));
							}}
						/>
```

The `event` in the function is reused by react, because it is not the dom event,
it only copy the dom event. So you need to assign it to a new variable.

## 459 Array Destruction

## 460. Multiple States

Since the useState doesn't merge the state for us, so we need to define mulitple
state.

```javascript
<input
	type="number"
	id="amount"
	value={enteredAmount}
	onChange={event => {
		setEnteredAmount(event.target.value);
	}}
/>
```
## 461. Rules of Hooks
`useXXX()` must be used in the first level of the function

## 462. Passing State Data Across Components

The `setXXX()` can take a callfunction with an given argument: `prevXXX`

```javascript
const addIngredientHandler = ingredient => {
		setUserIngredients(prevIngredients => [
			...prevIngredients,
			{ id: Math.random().toString(), ...ingredient }
		]);
```

## 463. Sending Http Requests
With fetch, you need to  
1. you need to define the body
2. `.then()` will get the `response` and make a promise, you need to turn the `response` to json
3. use `.then()` again to set the state.

```javascript
	const addIngredientHandler = ingredient => {
		fetch("https://react-hooks-8efdb.firebaseio.com/ingredients.json", {
			method: "POST",
			body: JSON.stringify(ingredient),
			headers: { "Content-Type": "application/json" }
		})
			.then(response => {
				return response.json();
			})
			.then(responseData => {
				setUserIngredients(prevIngredients => [
					...prevIngredients,
					{ id: responseData.name, ...ingredient }
				]);
			});
	};
```

## 464. useEffect() & Loading Data

`useEffect( ()=>{}, dependency)`

`useEffect(()=>{})` like `componentDidUpdate()`
`useEffect(()=>{}, [])` like `componentDidMount()`

```javascript
//after the component every render cycle.Like componentDidUpdate, the second parameter is the dependency

// Ingredients.js
useEffect(()=>{
 
}, [])

```
## 465. Understanding useEffect() Dependencies
You can use multiple `useEffect()` as much as you like

## 466. More on useEffects()

## 467. What's use Callback()

## Working with Refs & useRef()

## 470. Deleting Ingredients

use `fetch()` for delelte in firebase

```javascript
const removeIngredientHandler = ingredientId => {

	fetch(`https://react-hooks-8efdb.firebaseio.com/ingredients/${ingredientId}.json`, {
		method: "DELETE"
	}).then(response => {

		setUserIngredients(prevIngredients =>
			prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
		);

	})
```

## 471. Loading Errors & State Batching
```javascript
fetch(...)
.then(...)
.then(...)
.catch(error=>{
	...
})
```

States will be batched together at every render cycle. 

## 473. Understanding useReducer()
1. create a reducer function
2. useReducer: return two variable: 
	1. state
	2. dispatch function
3. apply the `dispatch({type:.., ingredient:...})` in suitable place 

## 474. Using useReducer() for the Http State
the same like the 473, but with multiple state elements.

## 475. Working with useContext.
1. create an <AuthContext> and an <AuthContextProvider> with the initialized value.
2. wrap a component with the Context Provider
3. use the 'useContext(AuthContext)'

## 476. Performance Optimizations with useMemo()
Conny: here need to be written
`useMemo(<()=>{...return <any>}>, [depencies])`: Can wrap anything, e.g. Comopnent, codes
Ability: can memory anything, and let the wrappered code only update when it needs. Can use in anywhere

`React.memo(<Component>)`: only wrap component

`useCallback(func, [dependencies])`, wrap function, to avoid unnecssary update. 


## 477. Getting Started with Custom Hooks
it is a pattern:

1. import your useXXX hook to the Component you want
2. initialize it
3. use it