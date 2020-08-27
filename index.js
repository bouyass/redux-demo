/**
 * the state of the whole application is stored in an object tree whithin a single store
 * the only way to change state is to emit an action, an object describing what happened
 * to specify how the state tree is transformed by actions, you write pure reducers
 * -- actions are the only way your application can interact with the store, they're plain javascript objects, they have a type (typically defined as string constants) --
 * -- reducers specifies how the app's state changes in response to actions, they're functions that accept state and actions as argument, and returns the next state of the app --
 * -- store is responsible for holding the application state, allows access to state via getState(), allows state to be updated via dispatch(action), registers listeners via
 *    subscribe and handles unregistering of listeners
 **/


const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const BUY_CAKE = 'BUY_CAKE';
const ICE_CREAM = 'ICE_CREAM';

/*const initialState = {
    numberOfCakes: 10,
    numberOfIceCream: 10
};*/

const initialCakeState = {
    numberOfCakes: 10,
};

const initialIcecreamState = {
    numberOfIceCream: 10,
};

function buy_cake(){
    return {
        type:   BUY_CAKE,
        info:   'First redux action'
    }
}

function buy_iceCream(){
    return {
        type:   ICE_CREAM,
        info:   'buying ice cream'
    }
}

/*const reducer = (state = initialState, action) => {
        switch (action.type) {
            case BUY_CAKE:
                return {
                    ...state,
                    numberOfCakes:  state.numberOfCakes - 1
                };
            case ICE_CREAM:
                return {
                    ...state,
                    numberOfIceCream:  state.numberOfIceCream - 1
                };
            default:
                return state;
        }
};*/

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numberOfCakes:  state.numberOfCakes - 1
            };
        default:
            return state;
    }
};

const iceCreamReducer = (state = initialIcecreamState, action) => {
    switch (action.type) {
        case ICE_CREAM:
            return {
                ...state,
                numberOfIceCream:  state.numberOfIceCream - 1
            };
        default:
            return state;
    }
};


const rootReducer = combineReducers({
   cake: cakeReducer,
   iceCream: iceCreamReducer
});
const store = createStore(rootReducer, applyMiddleware(logger));
console.log('initial state ', store.getState());
const unsubscribe =  store.subscribe(() => {});
store.dispatch(buy_cake());
store.dispatch(buy_cake());
store.dispatch(buy_iceCream());
store.dispatch(buy_iceCream());
unsubscribe();
