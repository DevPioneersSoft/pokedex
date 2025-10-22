import { Progress, Text, Group, Stack } from '@mantine/core';

interface BarraStatsProps {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export function BarraStats({ 
  label, 
  value, 
  maxValue = 100, 
  color = 'blue', 
  size = 'md' 
}: BarraStatsProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <Stack gap="xs">
      <Group justify="space-between">
        <Text size="sm" fw={500}>
          {label}
        </Text>
        <Text size="sm" c="dimmed">
          {value}
        </Text>
      </Group>
      <Progress 
        value={percentage} 
        color={color} 
        size={size}
        radius="md"
      />
    </Stack>
  );
}