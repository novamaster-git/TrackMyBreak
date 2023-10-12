import {showMessage} from 'react-native-flash-message';

function successMessage(
  title: string = '',
  desc: string = '',
  callBack: () => void = () => {},
) {
  showMessage({
    message: title,
    description: desc,
    type: 'success',
    onPress: callBack,
  });
}
function errorMessage(
  title: string = '',
  desc: string = '',
  callBack: () => void = () => {},
) {
  showMessage({
    message: title,
    description: desc,
    type: 'danger',
    onPress: callBack,
  });
}
function infoMessage(
  title: string = '',
  desc: string = '',
  callBack: () => void = () => {},
) {
  showMessage({
    message: title,
    description: desc,
    type: 'info',
    onPress: callBack,
  });
}
export {successMessage, errorMessage, infoMessage};
