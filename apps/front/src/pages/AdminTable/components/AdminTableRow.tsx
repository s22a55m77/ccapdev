import {
  Button,
  Chip,
  Drawer,
  IconButton,
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
import AdminRestroomList = API.AdminRestroomList;
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  getRestroomCreationInfo,
  getRestroomDetail,
} from '../../../services/api';
import { AlertContent } from '../../../declaration';
import { useRequest } from 'ahooks';
import { changeRestroomStatus } from '../../../services/api.ts';

type AdminTableRowProps = AdminRestroomList;

export function AdminTableRow({ id: restroomId }: AdminTableRowProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [alertContent, setAlertContent] = useState<AlertContent>({
    isOpen: false,
    message: 'default message',
    severity: 'success',
  });

  // TODO 使用useRequest请求更详细的数据放到drawer中，API: getRestroomCreationInfo()
  const {
    data: adminRestroomData,
    run,
    mutate,
  } = useRequest(getRestroomCreationInfo, {
    defaultParams: [restroomId],
  });

  // TODO 加删除和通过按钮，跟他们的逻辑。删除也是通过changeRestroomStatus来删除
  const handleApprove = () => {
    modifyRestroomStatus({ newStatus: 1, restroomId });
  };

  const handleDelete = () => {
    modifyRestroomStatus({ newStatus: 0, restroomId });
  };

  const { run: modifyRestroomStatus } = useRequest(changeRestroomStatus, {
    manual: true,
    onSuccess: (data) => {
      // check
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
            <Tooltip title="Title">
              <Typography noWrap fontSize={'inherit'}>
                {adminRestroomData?.title}
              </Typography>
            </Tooltip>
          </div>
        </TableCell>
        <TableCell>
          <div style={{ width: '10vw' }}>
            <Tooltip title="Building">
              <Typography noWrap fontSize={'inherit'}>
                {adminRestroomData?.building}
              </Typography>
            </Tooltip>
          </div>
        </TableCell>
        <TableCell>{adminRestroomData?.floor}</TableCell>
        <TableCell>
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
          {/* 
          <Chip
            label={
              adminRestroomData?.status === 0
                ? 'disapproved'
                : adminRestroomData?.status === 1
                ? 'approved'
                : adminRestroomData?.status === 2
                ? 'pending'
                : 'unknown'
            }
            color="green"
          /> */}
        </TableCell>
        <TableCell>
          <Button
            variant="contained"
            color={'green'}
            onClick={handleApprove}
            disabled={adminRestroomData?.status === 1}
          >
            Approve
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
          <h3 className={'drawer-h3'}>Location Image</h3>
        </motion.div>
        <div className={'image-container'}>
          <img
            src={'src/assets/toilet.png'}
            alt="toilet"
            style={{ width: '20vw' }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3 className={'drawer-h3'}>Restroom Image</h3>
        </motion.div>
        <div className={'image-container'}>
          <img
            src={'src/assets/toilet.png'}
            alt="toilet"
            style={{ width: '20vw' }}
          />
        </div>
      </Drawer>
    </>
  );
}
