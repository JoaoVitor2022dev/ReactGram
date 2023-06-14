import { resetMessage } from "../redux/slices/photoSlice"

export const useResetComponentMessage = (dispatch) => {
    return () => {
      setTimeout(() => {
        dispatch(resetMessage());
      }, 2000);
    };
};