export const FETCH_USERS = 'fetch_users';

//api is a customized axios instance
export const fetchUsers = () => async (dispatch, getState, api) => {
    const res = await api.get('http://react-ssr-api.herokuapp.com/users');
    dispatch({
        type: FETCH_USERS,
        payload: res
    })
};