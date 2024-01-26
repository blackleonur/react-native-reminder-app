import { CommonActions } from '@react-navigation/native';

let navigator: {
  navigate: (arg0: any, arg1: any) => any;
  dispatch: (arg0: CommonActions.Action) => any;
  goBack: () => any;
};

function setTopLevelNavigator(navigatorRef: any) {
  navigator = navigatorRef;
}

function navigate(routeName: string, params: object = {}) {
  return navigator && navigator.navigate(routeName, params);
}

function navigateToStack(stack: string, params: object = {}) {
  return navigator && navigator.dispatch(CommonActions.navigate(stack, params));
}

function resetToStack(stack: string, params: object = {}) {
  return (
    navigator &&
    navigator.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: stack, params }],
      })
    )
  );
}

function goBack() {
  return navigator && navigator.goBack();
}

export default {
  navigate,
  navigateToStack,
  resetToStack,
  setTopLevelNavigator,
  goBack,
};
