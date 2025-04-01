'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useErrorHandler } from '@/hooks/errorHandler.hook';
import { getStatistics } from '@/apis/services/statistics.servic';
import { ClassDistributionChart } from '@/components/classDistributionChart';
import { stringToColor } from '@/lib/strToColor';
import { MetricChart } from '@/components/metricChart';
import { ConfusionMatrix } from '@/components/confusionMatrix';

const classDistributionKeys = ['positive', 'negative', 'neutral'];
const defaultChartOption: IChartOptions = { key: '', value: 0, fill: 'white' };

export const Statistics: React.FC = () => {
  const statistics = useQuery({
    queryKey: ['statistics'],
    queryFn: getStatistics,
  });
  const { checkServerError } = useErrorHandler();

  const classDistributions: IChartOptions[] = React.useMemo(() => {
    if (!statistics.data?.length) return [];
    return statistics.data
      .filter((el) => classDistributionKeys.includes(el.key))
      .map(
        (el) =>
          ({
            key: el.key,
            value: Number(el.value),
            fill: stringToColor(el.key),
          }) as IChartOptions,
      );
  }, [statistics]);

  const f1Score: IChartOptions = React.useMemo(() => {
    if (!statistics.data?.length) return defaultChartOption;
    const f1Score = statistics.data.find((el) => el.key === 'f1-score');
    if (!f1Score) return defaultChartOption;
    return {
      key: 'f1Score',
      value: Number(f1Score.value),
      fill: stringToColor('f1Score'),
    } as IChartOptions;
  }, [statistics]);

  const accuracy: IChartOptions = React.useMemo(() => {
    if (!statistics.data?.length) return defaultChartOption;
    const f1Score = statistics.data.find((el) => el.key === 'accuracy');
    if (!f1Score) return defaultChartOption;
    return {
      key: 'accuracy',
      value: Number(f1Score.value),
      fill: stringToColor('accuracy'),
    } as IChartOptions;
  }, [statistics]);

  const confusionMatrix: IConfusionTableItem[] = React.useMemo(() => {
    if (!statistics.data?.length) return [];
    const cmCells = statistics.data.filter((el) => el.key.startsWith('cm-'));
    if (!cmCells?.length) return [];
    const cmCellsObj: { [key: string]: string } = {};
    for (const cell of cmCells) {
      cmCellsObj[cell.key] = cell.value;
    }
    return [
      {
        name: 'Actual Negatives',
        negativePredicted: cmCellsObj['cm-[0][0]'],
        positivePredicted: cmCellsObj['cm-[0][1]'],
        neutralPredicted: cmCellsObj['cm-[0][2]'],
      },
      {
        name: 'Actual Positives',
        negativePredicted: cmCellsObj['cm-[1][0]'],
        positivePredicted: cmCellsObj['cm-[1][1]'],
        neutralPredicted: cmCellsObj['cm-[1][2]'],
      },
      {
        name: 'Actual Neutrals',
        negativePredicted: cmCellsObj['cm-[2][0]'],
        positivePredicted: cmCellsObj['cm-[2][1]'],
        neutralPredicted: cmCellsObj['cm-[2][2]'],
      },
    ] as IConfusionTableItem[];
  }, [statistics]);

  React.useEffect(() => {
    if (!statistics.error) return;
    if (!statistics.isError) return;
    checkServerError(statistics.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statistics.error, statistics.isError]);

  if (!statistics.isSuccess && !statistics.data?.length) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <p className='text-xl font-bold'>Statistics</p>
      <section className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <div className='md:col-span-2 lg:col-span-1'>
          <ClassDistributionChart chartData={classDistributions} />
        </div>
        <MetricChart
          chartData={f1Score}
          title={'F1-Score'}
          description={'Logistic Regression F1-Score Metric'}
        />

        <MetricChart
          chartData={accuracy}
          title={'Accuracy'}
          description={'Logistic Regression Accuracy Metric'}
        />
      </section>
      <ConfusionMatrix rows={confusionMatrix} />
    </>
  );
};
