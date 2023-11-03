import './index.css';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { motion } from 'framer-motion';
import { AdminTableRow } from './components/AdminTableRow.tsx';
import { useRequest } from 'ahooks';
import { getAdminReportList } from '../../services/api';

export default function AdminTable() {
  const { data } = useRequest(getAdminReportList);

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
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((restroom) => (
                <AdminTableRow
                  key={restroom?.id}
                  id={restroom?.id}
                  title={restroom?.title}
                  region={restroom?.region}
                  province={restroom?.province}
                  city={restroom?.city}
                  building={restroom?.building}
                  floor={restroom?.floor}
                  status={restroom?.status}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </motion.div>
    </div>
  );
}
