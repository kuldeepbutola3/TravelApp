import React from "react";
import RBSheet from 'react-native-raw-bottom-sheet';
import { appColors } from 'src/styles/appColors';

const BottomSheet = ({ children, refRBSheet, onOpen, onClose }) => {
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={330}
      onOpen={onOpen}
      onClose={onClose}
      customStyles={styles}
    >
      {children}
    </RBSheet>
  );
};

const styles = {
  wrapper: {
    backgroundColor: 'transparent',
  },
  draggableIcon: {
    backgroundColor: appColors.black,
  },
  container: {
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
};

export default BottomSheet