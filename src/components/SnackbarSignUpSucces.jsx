import * as React from 'react';
import { Transition } from 'react-transition-group';
import { useTheme } from '@mui/system';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Snackbar } from '@mui/base/Snackbar';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function SnackbarSignUpSuccess({ snackbar, error }) {
  const isDarkMode = useIsDarkMode();

  const [open, setOpen] = React.useState();
  const [exited, setExited] = React.useState(true);
  const nodeRef = React.useRef(null);

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const handleOnEnter = () => {
    setExited(false);
  };

  const handleOnExited = () => {
    setExited(true);
  };

  return (

      <Snackbar
        autoHideDuration={5000}
        open={snackbar}
        onClose={handleClose}
        exited={exited}
        className="fixed z-50 font-sans flex right-4 bottom-4 left-auto max-w-xl	min-w-xs"
      >
        <Transition
          timeout={{ enter: 400, exit: 400 }}
          in={snackbar}
          appear
          unmountOnExit
          onEnter={handleOnEnter}
          onExited={handleOnExited}
          nodeRef={nodeRef}
        >
          {(status) => (
            <div
              className="flex gap-4	overflow-hidden	bg-white dark:bg-slate-900 rounded-sm	border border-solid border-slate-200 dark:border-slate-700 shadow-md text-slate-900 dark:text-slate-50 p-3	text-start"
              style={{
                transform: positioningStyles[status],
                transition: 'transform 300ms ease',
              }}
              ref={nodeRef}
            >
              <CheckRoundedIcon
                sx={{
                  color: error ? 'red' : 'green',
                  flexShrink: 0,
                  width: '1.25rem',
                  height: '1.5rem',
                }}
              />
              <div className="flex-1	max-w-full">
                {error ?
                <>
                    <p className="m-0 leading-normal mr-2 font-medium">
                        Napaka!
                    </p>
                    <p className="m-0 leading-normal font-normal	text-slate-800 dark:text-slate-400">

                    </p>
                </>
                :
                <>
                    <p className="m-0 leading-normal mr-2 font-medium">
                        Uspešno!
                    </p>
                    <p className="m-0 leading-normal font-normal	text-slate-800 dark:text-slate-400">
                        Uspešno ste se registrirali.
                    </p>
                </>
                }
                
              </div>
            </div>
          )}
        </Transition>
      </Snackbar>

  );
}

const positioningStyles = {
  entering: 'translateX(0)',
  entered: 'translateX(0)',
  exiting: 'translateX(500px)',
  exited: 'translateX(500px)',
  unmounted: 'translateX(500px)',
};