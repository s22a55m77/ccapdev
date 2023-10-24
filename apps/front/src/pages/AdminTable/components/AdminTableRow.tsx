import {
  Alert,
  Breadcrumbs,
  Button,
  Drawer,
  IconButton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { getReportDetail } from '../../../services/api';
import { AlertContent } from '../../../declaration';
import { useRequest } from 'ahooks';
import { changeReportStatus } from '../../../services/api.ts';
import { Link } from 'react-router-dom';

type AdminTableRowProps = API.AdminReportList;

export function AdminTableRow({ id: reportId }: AdminTableRowProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [alertContent, setAlertContent] = useState<AlertContent>({
    isOpen: false,
    message: 'default message',
    severity: 'success',
  });

  const { data: adminRestroomData, mutate } = useRequest(getReportDetail, {
    defaultParams: [reportId],
  });

  const handleReject = () => {
    modifyReportStatus({ newStatus: 1, reportId });
  };

  const handleDelete = () => {
    modifyReportStatus({ newStatus: 0, reportId });
  };

  const { run: modifyReportStatus } = useRequest(changeReportStatus, {
    manual: true,
    onSuccess: (data) => {
      mutate(data);
      setAlertContent({
        isOpen: true,
        message: 'Status changed',
        severity: 'success',
      });
    },
    onError: () => {
      setAlertContent({
        isOpen: true,
        message: 'Error Occurred',
        severity: 'error',
      });
    },
  });

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <KeyboardArrowLeftIcon />
            ) : (
              <KeyboardArrowRightIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell>{adminRestroomData?.id}</TableCell>
        <TableCell>
          <div style={{ width: '20vw' }}>
            <Tooltip title={adminRestroomData?.title}>
              <Typography noWrap fontSize={'inherit'}>
                {adminRestroomData?.title}
              </Typography>
            </Tooltip>
          </div>
        </TableCell>
        <TableCell>
          <div style={{ width: '10vw' }}>
            <Tooltip title={adminRestroomData?.building}>
              <Typography noWrap fontSize={'inherit'}>
                {adminRestroomData?.building}
              </Typography>
            </Tooltip>
          </div>
        </TableCell>
        <TableCell>
          <Tooltip
            title={
              <Breadcrumbs
                style={{
                  height: '10px',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '10px',
                }}
              >
                <span>MUI</span>
                <span>MUI</span>
              </Breadcrumbs>
            }
          >
            <Typography noWrap fontSize={'inherit'}>
              Location Location
            </Typography>
          </Tooltip>
        </TableCell>
        <TableCell>
          <motion.div
            key={adminRestroomData?.status}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {adminRestroomData?.status === 1 ? (
              <CheckCircleIcon color="success" fontSize={'medium'} />
            ) : adminRestroomData?.status === 0 ? (
              <CancelIcon color="error" fontSize={'medium'} />
            ) : (
              <AccessTimeFilledOutlinedIcon
                color="warning"
                fontSize={'medium'}
              />
            )}
          </motion.div>
        </TableCell>
        <TableCell>
          <Button
            variant="contained"
            color={'green'}
            onClick={handleReject}
            disabled={adminRestroomData?.status === 1}
            style={{
              marginRight: 5,
            }}
          >
            Reject
          </Button>

          <Button
            variant="contained"
            color={'error'}
            onClick={handleDelete}
            disabled={adminRestroomData?.status === 0}
          >
            Remove
          </Button>
        </TableCell>
      </TableRow>
      <Drawer
        open={isOpen}
        anchor={'right'}
        onClose={() => setIsOpen(false)}
        style={{
          overflow: 'scroll',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3 className={'drawer-h3'}>Details</h3>
        </motion.div>
        <TableContainer sx={{ width: '30vw', minHeight: '40%' }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>{adminRestroomData?.location}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Floor</TableCell>
                <TableCell>{adminRestroomData?.floor}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gender</TableCell>
                <TableCell>{adminRestroomData?.gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Created By</TableCell>
                <TableCell>{adminRestroomData?.createdByUser}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Created At</TableCell>
                <TableCell>{adminRestroomData?.createdAt}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Link to={`/restroom/${adminRestroomData?.id}`}>
            <Button color="green">To the Post</Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3 className={'drawer-h3'}>Location Image</h3>
        </motion.div>
        <div className={'image-container'}>
          {adminRestroomData?.locationImageIds.map((imageId, index) => {
            return (
              // TODO MCO2
              <img
                key={imageId + index}
                src={imageId}
                alt="toilet"
                style={{ width: '20vw' }}
              />
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3 className={'drawer-h3'}>Restroom Image</h3>
        </motion.div>
        <div className={'image-container'}>
          {adminRestroomData?.restroomImageIds.map((imageId, index) => {
            return (
              // TODO MCO2
              <img
                key={imageId + index}
                src={imageId}
                alt="toilet"
                style={{ width: '20vw' }}
              />
            );
          })}
        </div>
      </Drawer>
      <tr>
        <td>
          <Snackbar
            open={alertContent.isOpen}
            autoHideDuration={1000}
            onClose={() => {
              setAlertContent({ ...alertContent, isOpen: false });
            }}
          >
            <Alert severity={alertContent.severity}>
              {alertContent.message}
            </Alert>
          </Snackbar>
        </td>
      </tr>
    </>
  );
}
