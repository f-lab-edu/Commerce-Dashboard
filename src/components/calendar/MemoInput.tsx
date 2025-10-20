import { Box, Button, TextField, Typography } from '@mui/material';
import {
  useDailyMemo,
  useCreateMemo,
  useUpdateMemo,
} from '@/hooks/queries/useCalendar';
import { useModal } from '@/hooks/useModal';
import { FormEvent } from 'react';

interface MemoInputProps {
  date: string;
}

export default function MemoInput({ date }: MemoInputProps) {
  const modal = useModal();
  const { memo } = useDailyMemo(date, true);
  const { createMemo, isCreating } = useCreateMemo();
  const { updateMemo, isUpdating } = useUpdateMemo();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const memoText = formData.get('memo') as string;

    if (!memoText.trim()) {
      modal.alert({
        title: '알림',
        description: '메모 내용을 입력하세요.',
      });
      return;
    }

    const data = { date, memo: memoText.trim() };

    const options = {
      onSuccess: () => {
        modal.success({
          title: '성공',
          description: `메모가 ${memo ? '수정' : '저장'}되었습니다.`,
        });
      },
      onError: (error: Error) => {
        modal.error({
          title: '실패',
          description:
            error.message || `메모 ${memo ? '수정' : '저장'}에 실패했습니다.`,
        });
      },
    };

    if (memo) {
      updateMemo(data, options);
    } else {
      createMemo(data, options);
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Typography variant='subtitle2' gutterBottom>
        메모
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={4}
        name='memo'
        key={memo?.memo}
        defaultValue={memo?.memo || ''}
        placeholder='메모를 입력하세요...'
        disabled={isPending}
        sx={{ mb: 2 }}
      />

      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button
          type='submit'
          variant='contained'
          size='small'
          disabled={isPending}
        >
          {isPending ? '저장 중...' : '저장'}
        </Button>
      </Box>
    </Box>
  );
}
