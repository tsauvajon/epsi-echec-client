import store from '../utility/store';

it('generates default store', () => {
  expect(store.getState()).toMatchSnapshot();
});
