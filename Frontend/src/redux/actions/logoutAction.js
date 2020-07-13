export function logout(payload) {
  return (dispatch) => {    
    dispatch({type: payload});
  }  
}