'use client';

import axios from 'axios';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type ReportData = {
  id: number;
  name: string;
  level: string;
  description: string;
};

export default function Page() {
  const [reports, setReports] = useState<ReportData[]>([]);

  useEffect(() => {
    axios.get('/api/reports')
      .then((response) => setReports(response.data))
      .catch((error) => console.error('データ取得エラー:', error));
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        報告書管理システム
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>報告書名</TableCell>
              <TableCell>アクション</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.id}</TableCell>
                <TableCell>{report.name}</TableCell>
                <TableCell>
                  <Link href={`/Foundation/${report.id}`}>
                    <Button variant="outlined">詳細を見る</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}