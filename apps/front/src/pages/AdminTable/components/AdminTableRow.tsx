import {
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
import AdminRestroomList = API.AdminRestroomList;
import { motion } from 'framer-motion';
import { useState } from 'react';
import { getRestroomCreationInfo } from '../../../services/api';
import { useRequest } from 'ahooks';

type AdminTableRowProps = AdminRestroomList;

export function AdminTableRow({
  id,
  title,
  building,
  floor,
  status,
}: AdminTableRowProps) {
  const [isOpen, setIsOpen] = useState(false);

  // TODO 使用useRequest请求更详细的数据放到drawer中，API: getRestroomCreationInfo()
  const { data } = useRequest(getRestroomCreationInfo, {
    defaultParams: [id],
  });

  // TODO 加删除和通过按钮，跟他们的逻辑。删除也是通过changeRestroomStatus来删除

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
        <TableCell>{id}</TableCell>
        <TableCell>
          <div style={{ width: '20vw' }}>
            <Tooltip title="Title">
              <Typography noWrap fontSize={'inherit'}>
                {title}
              </Typography>
            </Tooltip>
          </div>
        </TableCell>
        <TableCell>
          <div style={{ width: '10vw' }}>
            <Tooltip title="Building">
              <Typography noWrap fontSize={'inherit'}>
                {building}
              </Typography>
            </Tooltip>
          </div>
        </TableCell>
        <TableCell>{floor}</TableCell>
        <TableCell>
          <Chip label="Status" color="green" />
        </TableCell>
        <TableCell>
          {status === 0
            ? 'disapproved'
            : status === 1
            ? 'approved'
            : status === 2
            ? 'pending'
            : 'unknown'}
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
                <TableCell>{data?.location}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gender</TableCell>
                <TableCell>{data?.gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Created By</TableCell>
                <TableCell>{data?.createdByUser}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Created At</TableCell>
                <TableCell>{data?.createdAt}</TableCell>
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
            src={'src/assets/toilet.png'} // HERE
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
