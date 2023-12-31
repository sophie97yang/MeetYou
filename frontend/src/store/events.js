import {csrfFetch} from './csrf';

//Action Constants
export const GET_EVENTS='events/GET-EVENTS';
export const GET_DETAILS ='events/GET-DETAILS';
export const ADD_EVENT = 'events/ADD_EVENT';
export const REMOVE_EVENT ='events/REMOVE_EVENT'

//Action Creators
export const getEvents = (events) => ({
    type:GET_EVENTS,
    events
});

export const getDetails = (event) => ({
    type:GET_DETAILS,
    event
});

export const addEvent = (event) => ({

    type:ADD_EVENT,
    event
});

export const removeEvent = (eventId) => ({
    type:REMOVE_EVENT,
    eventId
})

//Thunk Action Creators
export const allEvents = () => async dispatch => {
    const res = await csrfFetch('/api/events');

    if (res.ok) {
        const events = await res.json();
        dispatch(getEvents(events.Events))
        return events
    } else {
        const data = await res.json();
        return data;
    }
};

export const eventDetails = (eventId) => async dispatch => {
    const res = await csrfFetch(`/api/events/${eventId}`);

    if (res.ok) {
        const event = await res.json();
        dispatch(getDetails(event));
        return event;
    } else {
        const data = await res.json();
        return data;
    }
}

export const addEventImage = (payload,eventId) => async dispatch => {
    const res = await csrfFetch(`/api/events/${eventId}/images`, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(payload)
    });

    return res;
}

export const createEvent = (payload,imagePayload,groupId) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${groupId}/events`, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(payload)
    });

    let imageRes;
    let event;

    if (res.ok) {
        event = await res.json();
        imageRes = await dispatch(addEventImage(imagePayload,event.id));

        if (imageRes.ok) {
            await dispatch(addEvent(event));
            return event;
        } else {
            const imageData = await imageRes.json();
            return {data:event,imageData:imageData};
        }
    } else {
        const data = await res.json();
        return data;
    }


};

export const deleteEvent = (eventId) => async dispatch => {
    const res = await csrfFetch(`/api/events/${eventId}`,{
        method:'DELETE'
    });

    const data = await res.json();
    if (res.ok) {
        dispatch(removeEvent(eventId));
        return data;
    } else return data;

}


const initialState = {events:[],event:null}

const eventsReducer = (state=initialState,action) => {
    switch (action.type) {
        case GET_EVENTS:
            return {...state,events:action.events}
        case GET_DETAILS:{
            return {...state, event:action.event}
        }
        case ADD_EVENT:
            return {...state,events:[...state.events,action.event]}
        case REMOVE_EVENT: {
            const newState = [...state.events];
            if (newState) {
            const index = newState.findIndex(event => event.id === Number(action.eventId));
            newState.splice(index,1);
            }
            return {...state, events:newState, event:null}
        }
        default:
            return state;
    }

};

export default eventsReducer;
