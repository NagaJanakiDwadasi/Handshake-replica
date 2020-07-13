import ConnectedHome,{Login} from './Login';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer'

describe('LOGIN --- REACT-REDUX (Shallow + passing the {store} directly)',()=>{
    const initialState = {output:10}
    const mockStore = configureStore()
    let store,wrapper

    beforeEach(()=>{
        store = mockStore(initialState)
        wrapper = mount( <Provider store={store}><Login /></Provider> )
    })

    it('+++ render the connected(SMART) component', () => {
       expect(container.length).toEqual(1)
    });

    it('+++ check Prop matches with initialState', () => {
       expect(container.prop('output')).toEqual(initialState.output)
    });

});

