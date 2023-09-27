import './index.css';
import {
  Card,
  Chip,
  Drawer,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminTable() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={'admin-table-container'}>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <TableContainer component={Card}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '10px' }} />
                <TableCell>ID</TableCell>
                <TableCell sx={{ width: '20vw' }}>Title</TableCell>
                <TableCell sx={{ width: '10vw' }}>Building</TableCell>
                <TableCell>Floor</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
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
                <TableCell>id</TableCell>
                <TableCell>
                  <div style={{ width: '20vw' }}>
                    <Tooltip title="Title">
                      <Typography noWrap fontSize={'inherit'}>
                        Title Title Title Title Title Title Title Title
                        Title Title Title Title
                      </Typography>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell>
                  <div style={{ width: '10vw' }}>
                    <Tooltip title="Building">
                      <Typography noWrap fontSize={'inherit'}>
                        Building
                      </Typography>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell>floor</TableCell>
                <TableCell>
                  <Chip label="Status" color="green" />
                </TableCell>
                <TableCell>action</TableCell>
              </TableRow>
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
                <TableCell>id</TableCell>
                <TableCell>
                  <div style={{ width: '20vw' }}>
                    <Tooltip title="Title">
                      <Typography noWrap fontSize={'inherit'}>
                        Title Title Title Title Title Title Title Title
                        Title Title Title Title
                      </Typography>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell>
                  <div style={{ width: '10vw' }}>
                    <Tooltip title="Building">
                      <Typography noWrap fontSize={'inherit'}>
                        Building Building Building Building
                      </Typography>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell>floor</TableCell>
                <TableCell>
                  <Chip label="Status" color="error" />
                </TableCell>
                <TableCell>action</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </motion.div>

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
    </div>
  );
}
