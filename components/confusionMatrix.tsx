'use client';

import React from 'react';

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from '@/components/ui/table';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/components/ui/card';

interface IConfusionMatrixProps {
  rows: IConfusionTableItem[];
}

export const ConfusionMatrix: React.FC<IConfusionMatrixProps> = ({ rows }) => {
  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Confusion Matrix</CardTitle>
        <CardDescription>
          Logistic Regression Confusion Matrix Metrix
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px] font-semibold'>
                Actual/Predicted
              </TableHead>
              <TableHead className='font-semibold'>
                Predicted Negatives
              </TableHead>
              <TableHead className='font-semibold'>
                Predicted Positives
              </TableHead>
              <TableHead className='font-semibold'>
                Predicted Neutrals
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell className='font-semibold'>{row.name}</TableCell>
                <TableCell>{row.negativePredicted}</TableCell>
                <TableCell>{row.positivePredicted}</TableCell>
                <TableCell>{row.neutralPredicted}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
