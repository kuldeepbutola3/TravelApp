import React, { useCallback } from 'react';
import { useSliceSelector, useBindAction } from 'src/redux/hooks';
import { Toast } from '../../components/Toast';
import { toastSlice, useToast } from './ToastSlice';

export const ToastProvider: React.FC = ({ children }) => {
  const showToast = useToast();
  const { currentToast, currentId } = useSliceSelector('toast');
  const removeToast = useBindAction(toastSlice.actions.removeToast);

  const completion = useCallback(async () => {
    removeToast();
  }, [removeToast]);
  const undoTapped = useCallback(async (): Promise<undefined> => {
    // if (!currentToast?.addCallBackRequest) {
    // return new Promise(resolve => resolve());
    // }
    // const message = await currentToast?.addCallBackRequest(dispatchThunk);
    /**
     * showing the toast message after undo request is completed
     */
    // if (currentToast?.reqType?.deleteChild) {
    //   await dispatchThunk(deleteChildParticipant(currentToast?.reqType?.deleteChild));
    // }

    const message = 'un done';
    showToast({ message });
    return new Promise((resolve) => resolve());
  }, [showToast]);

  return (
    <>
      {children}
      {currentToast && (
        <Toast
          currentToast={currentToast}
          toastId={currentId}
          completion={completion}
          undoTapped={undoTapped}
        />
      )}
    </>
  );
};
