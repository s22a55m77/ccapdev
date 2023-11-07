import {
  Alert,
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
import { getImage, getReportDetail } from '../../../services/api';
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
          <Typography noWrap fontSize={'inherit'}>
            {adminRestroomData?.location}
          </Typography>
        </TableCell>
        <TableCell>
          <motion.div
            key={adminRestroomData?.status}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {adminRestroomData?.status === 'closed' ? (
              <CheckCircleIcon color="success" fontSize={'medium'} />
            ) : adminRestroomData?.status === 'resolved' ? (
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
            disabled={adminRestroomData?.status === 'closed'}
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
            disabled={adminRestroomData?.status === 'resolved'}
          >
            Accept
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
                <TableCell>Description</TableCell>
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
          {adminRestroomData?.locationImageIds?.map((imageId, index) => {
            return (
              <img
                key={imageId + index}
                src={getImage(imageId)}
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
              <img
                key={imageId + index}
                src={getImage(imageId)}
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
