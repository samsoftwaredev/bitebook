import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
  alpha,
} from '@mui/material';
import React from 'react';

import { PageHeader } from '@/components';
import { ShoppingItem, ShoppingStats } from '@/interfaces';

interface Props {
  toBuyItems: ShoppingItem[];
  purchasedItems: ShoppingItem[];
  stats: ShoppingStats;
  setToBuyItems: React.Dispatch<React.SetStateAction<ShoppingItem[]>>;
  setPurchasedItems: React.Dispatch<React.SetStateAction<ShoppingItem[]>>;
  setStats: React.Dispatch<React.SetStateAction<ShoppingStats>>;
  handleClear: () => void;
}

export default function ShoppingListPage({
  toBuyItems: toBuy,
  purchasedItems: purchased,
  stats,
  setToBuyItems,
  setPurchasedItems,
  setStats,
  handleClear,
}: Props) {
  const toggle = (id: string) => {
    if (toBuy.find((it) => it.id === id)) {
      setToBuyItems((prev) => {
        const item = prev.find((it) => it.id === id);
        if (item) {
          // Move to purchased
          setPurchasedItems((purchasedPrev) => [
            ...purchasedPrev,
            { ...item, purchased: true },
          ]);
          return prev.filter((it) => it.id !== id);
        }
        return prev;
      });
    } else {
      setPurchasedItems((prev) => {
        const item = prev.find((it) => it.id === id);
        if (item) {
          // Move to toBuy
          setToBuyItems((toBuyPrev) => [
            ...toBuyPrev,
            { ...item, purchased: false },
          ]);
          return prev.filter((it) => it.id !== id);
        }
        return prev;
      });
    }
    setStats((prev) => ({
      ...prev,
      purchased: prev.purchased + (toBuy.find((it) => it.id === id) ? 1 : -1),
      remaining: prev.remaining + (toBuy.find((it) => it.id === id) ? -1 : 1),
    }));
  };

  const remove = (id: string) => {
    setPurchasedItems((prev) => prev.filter((it) => it.id !== id));
    setToBuyItems((prev) => prev.filter((it) => it.id !== id));
    setStats((prev) => ({
      ...prev,
      total: prev.total - 1,
      purchased:
        prev.purchased - (purchased.find((it) => it.id === id) ? 1 : 0),
      remaining: prev.remaining - (toBuy.find((it) => it.id === id) ? 1 : 0),
    }));
  };

  const clearCompleted = () => {
    handleClear();
  };

  return (
    <>
      {/* Page header */}
      <PageHeader title="Shopping List" subTitle="Check off items as you shop">
        <Button
          variant="contained"
          startIcon={<DeleteRoundedIcon />}
          sx={{
            bgcolor: '#FFE847',
            color: 'text.primary',
            '&:hover': { bgcolor: '#FDE047' },
          }}
          onClick={clearCompleted}
        >
          Clear Completed
        </Button>
      </PageHeader>

      <Grid container spacing={2.5}>
        {/* Left – checklist */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ borderRadius: 1, overflow: 'hidden' }}>
            {/* Gradient header */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                px: 2,
                py: 1.25,
                background:
                  'linear-gradient(90deg, rgba(15,183,122,.12), rgba(59,130,246,.10))',
                borderBottom: (t) =>
                  `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <ShoppingCartRoundedIcon color="success" />
                <Typography fontWeight={800}>Shopping Checklist</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {toBuy.length} items remaining
              </Typography>
            </Stack>

            <Box sx={{ p: 1.25 }}>
              {/* To Buy */}
              <SectionHeader
                dotColor="#16A34A"
                title={`To Buy (${toBuy.length})`}
              />
              <List disablePadding sx={{ m: 1 }}>
                {toBuy.map((it) => (
                  <ItemRow
                    key={it.id}
                    item={it}
                    onToggle={toggle}
                    onDelete={remove}
                  />
                ))}
              </List>

              <Divider sx={{ my: 1 }} />

              {/* Purchased */}
              <SectionHeader
                icon={
                  <CheckCircleRoundedIcon fontSize="small" color="success" />
                }
                title={`Purchased (${purchased.length})`}
              />
              <List disablePadding sx={{ m: 1 }}>
                {purchased.map((it) => (
                  <ItemRow
                    key={it.id}
                    item={it}
                    onToggle={toggle}
                    onDelete={remove}
                    purchasedStyle
                  />
                ))}
              </List>
            </Box>
          </Paper>
        </Grid>

        {/* Right – tips & stats */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={2}>
            <Paper
              sx={{
                borderRadius: 1,
                p: 2,
                background: (t) =>
                  alpha('#60A5FA', t.palette.mode === 'dark' ? 0.08 : 0.08),
                border: (t) => `1px solid ${alpha('#60A5FA', 0.25)}`,
              }}
            >
              <Typography fontWeight={800} sx={{ mb: 1 }}>
                Shopping Tips
              </Typography>
              <TipList
                tips={[
                  'Check items off as you add them to your cart',
                  'Items are automatically dated when checked',
                  'Watch for expiration alerts on purchased items',
                  'Plan to use items with shorter shelf life first',
                ]}
              />
            </Paper>

            <Paper
              sx={{
                borderRadius: 1,
                p: 2,
                background: (t) =>
                  alpha('#C084FC', t.palette.mode === 'dark' ? 0.08 : 0.08),
                border: (t) => `1px solid ${alpha('#C084FC', 0.25)}`,
              }}
            >
              <Typography fontWeight={800} sx={{ mb: 1 }}>
                Stats
              </Typography>
              <StatRow
                label="Total Items"
                value={stats.total}
                color="#7C3AED"
              />
              <StatRow
                label="Purchased"
                value={stats.purchased}
                color="#16A34A"
              />
              <StatRow
                label="Remaining"
                value={stats.remaining}
                color="#F97316"
              />
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

/* ----------------- Subcomponents ----------------- */

function SectionHeader({
  title,
  dotColor,
  icon,
}: {
  title: string;
  dotColor?: string;
  icon?: React.ReactNode;
}) {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{ px: 0.75, py: 0.75 }}
    >
      {icon ? (
        icon
      ) : (
        <FiberManualRecordRoundedIcon
          sx={{ fontSize: 12, color: dotColor ?? 'text.secondary' }}
        />
      )}
      <Typography fontWeight={700}>{title}</Typography>
    </Stack>
  );
}

function ItemRow({
  item,
  onToggle,
  onDelete,
  purchasedStyle = false,
}: {
  item: ShoppingItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  purchasedStyle?: boolean;
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 1,
        mb: 1,
        px: 2,
        py: 0.75,
        bgcolor: purchasedStyle ? 'rgba(16,185,129,.10)' : 'background.paper',
        borderColor: (t) =>
          purchasedStyle
            ? alpha('#16A34A', 0.4)
            : alpha(t.palette.text.primary, 0.12),
      }}
    >
      <ListItem
        disableGutters
        secondaryAction={
          <IconButton
            edge="end"
            onClick={() => onDelete(item.id)}
            aria-label="delete"
          >
            <DeleteOutlineRoundedIcon />
          </IconButton>
        }
      >
        <Checkbox
          edge="start"
          checked={item.purchased}
          onChange={() => onToggle(item.id)}
          sx={{ mr: 1 }}
        />
        <ListItemText
          primary={
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                fontWeight={800}
                sx={{
                  textDecoration: purchasedStyle ? 'line-through' : 'none',
                }}
              >
                {item.name}
              </Typography>
              <Typography variant="body2" color="success.main" fontWeight={800}>
                {item.qty} {item.unit}
              </Typography>
            </Stack>
          }
          secondary={
            <Box sx={{ mt: 0.25 }}>
              {/* details / bought / expires */}
              {item.details?.map((d, i) => (
                <Typography
                  key={i}
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  {d}
                </Typography>
              ))}
              {item.bought && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  {item.bought}
                </Typography>
              )}
              {item.expires && (
                <Typography
                  variant="caption"
                  color="warning.main"
                  display="block"
                  fontWeight={700}
                >
                  {item.expires}
                </Typography>
              )}
            </Box>
          }
        />
      </ListItem>
    </Paper>
  );
}

function TipList({ tips }: { tips: string[] }) {
  return (
    <Stack spacing={1}>
      {tips.map((t, i) => (
        <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
          <FiberManualRecordRoundedIcon
            sx={{ fontSize: 8, mt: 0.75, color: 'success.main' }}
          />
          <Typography variant="body2" color="text.secondary">
            {t}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

function StatRow({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 0.75 }}
    >
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Chip
        size="small"
        label={value}
        sx={{ bgcolor: alpha(color, 0.12), color, fontWeight: 800 }}
      />
    </Stack>
  );
}
