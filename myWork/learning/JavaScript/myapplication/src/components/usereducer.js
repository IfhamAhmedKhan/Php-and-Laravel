import {useReducer} from 'react';


function UserReducer(){
    let count = 10;
    const reducer = (state, action)=> {
        switch (action.type) {
            case "INCREMENT":
                return {count: state.counter + 1}
                break;
            
            case "DECREMENT":
                return {count: state.counter - 1}
                break;
        
            default:
                break;
        }
        return (
            <>
            <h1>{count}</h1>
            </>
        )

    }

}

export default UserReducer;