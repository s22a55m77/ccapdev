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
import { getAdminRestroomsList } from '../../../services/api';
import { useRequest } from 'ahooks';

type AdminTableRowProps = AdminRestroomList;

export function AdminTableRow({}: AdminTableRowProps) {
  const [isOpen, setIsOpen] = useState(false);

  // TODO 使用useRequest请求更详细的数据放到drawer中，API: getRestroomCreationInfo()
  const { data, error, loading } = useRequest(getAdminRestroomsList);
  console.log(data); // 这里拿到的数据是undefined。哭了

  // TODO 加删除和通过按钮，跟他们的逻辑。删除也是通过changeRestroomStatus来删除

  return (
    <>
      {data?.map((restroom) => (
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
            <TableCell>{restroom.id}</TableCell>
            <TableCell>
              <div style={{ width: '20vw' }}>
                <Tooltip title="Title">
                  <Typography noWrap fontSize={'inherit'}>
                    {restroom.title}
                  </Typography>
                </Tooltip>
              </div>
            </TableCell>
            <TableCell>
              <div style={{ width: '10vw' }}>
                <Tooltip title="Building">
                  <Typography noWrap fontSize={'inherit'}>
                    {restroom.building}
                  </Typography>
                </Tooltip>
              </div>
            </TableCell>
            <TableCell>{restroom.floor}</TableCell>
            <TableCell>
              <Chip label="Status" color="green" />
            </TableCell>
            <TableCell>action</TableCell>
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
                    <TableCell>cell 1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Gender</TableCell>
                    <TableCell>cell 2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Gender</TableCell>
                    <TableCell>cell 3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Created By</TableCell>
                    <TableCell>cell 4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Created At</TableCell>
                    <TableCell>cell 5</TableCell>
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
      ))}
    </>
  );
}
