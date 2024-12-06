'use client';

import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type ReportData = {
  id: number | null;
  name: string;
  level: string;
  description: string;
};

export default function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [report, setReport] = useState<ReportData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { id } = React.use(params);

  useEffect(() => {
    if (!id) return; 

    const fetchReport = async () => {
      try {
        const response = await axios.get(`/api/reports/${id}`);
        setReport(response.data);
      } catch (error) {
        console.error('データ取得エラー:', error);
      }
    };

    fetchReport();
  }, [id]);

  const handleSave = () => {
    if (report) {
      axios
        .put(`/api/reports/${report.id}`, report)
        .then(() => {
          alert('報告書を更新しました');
          setIsEditing(false);
        })
        .catch((error) => console.error('更新エラー:', error));
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      {report ? (
        <>
          <Typography variant="h5" gutterBottom>
            報告書: {report.name}
          </Typography>
          {isEditing ? (
            <>
              <TextField
                label="報告書名"
                value={report.name}
                onChange={(e) => setReport({ ...report, name: e.target.value })}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="レベル"
                value={report.level}
                onChange={(e) => setReport({ ...report, level: e.target.value })}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="説明"
                value={report.description}
                onChange={(e) => setReport({ ...report, description: e.target.value })}
                multiline
                rows={4}
                fullWidth
              />
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" onClick={handleSave}>
                  保存
                </Button>
                <Button variant="outlined" sx={{ ml: 2 }} onClick={() => setIsEditing(false)}>
                  キャンセル
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography>レベル: {report.level}</Typography>
              <Typography>説明: {report.description}</Typography>
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" onClick={() => setIsEditing(true)}>
                  編集
                </Button>
                <Button variant="outlined" sx={{ ml: 2 }} onClick={() => router.push('/Foundation')}>
                  戻る
                </Button>
              </Box>
            </>
          )}
        </>
      ) : (
        <Typography>読み込み中...</Typography>
      )}
    </Box>
  );
}