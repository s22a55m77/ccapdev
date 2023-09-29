import { AlertColor } from '@mui/material';

declare namespace JSX {
  interface IntrinsicElements {
    'ion-icon': any;
  }
}

export interface AlertContent {
  isOpen: boolean;
  message: string;
  severity: AlertColor;
}
