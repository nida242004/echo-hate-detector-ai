
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Activity,
  PieChart,
  LineChart
} from 'lucide-react';

interface ModelMetricsProps {
  accuracy: number;
}

const ModelMetrics: React.FC<ModelMetricsProps> = ({ accuracy }) => {
  const metrics = {
    accuracy: accuracy,
    precision: 88.7,
    recall: 90.3,
    f1Score: 89.5,
    specificity: 88.1,
    auc: 94.2
  };

  const confusionMatrix = {
    truePositive: 8932,
    falsePositive: 1123,
    trueNegative: 16847,
    falseNegative: 1098
  };

  const crossValidation = [
    { fold: 1, accuracy: 89.2, precision: 88.5, recall: 90.1, f1: 89.3 },
    { fold: 2, accuracy: 89.8, precision: 89.1, recall: 90.5, f1: 89.8 },
    { fold: 3, accuracy: 89.1, precision: 88.3, recall: 89.9, f1: 89.1 },
    { fold: 4, accuracy: 89.6, precision: 88.9, recall: 90.3, f1: 89.6 },
    { fold: 5, accuracy: 89.3, precision: 88.7, recall: 90.0, f1: 89.4 }
  ];

  const calculateMetric = (tp: number, fp: number, tn: number, fn: number, type: string) => {
    switch (type) {
      case 'precision':
        return (tp / (tp + fp) * 100).toFixed(1);
      case 'recall':
        return (tp / (tp + fn) * 100).toFixed(1);
      case 'specificity':
        return (tn / (tn + fp) * 100).toFixed(1);
      case 'accuracy':
        return ((tp + tn) / (tp + fp + tn + fn) * 100).toFixed(1);
      default:
        return '0';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="h-8 w-8 text-blue-600" />
              <Badge variant="default" className="bg-blue-600">Primary</Badge>
            </div>
            <div className="text-3xl font-bold text-blue-900 mb-2">
              {metrics.accuracy.toFixed(1)}%
            </div>
            <div className="text-sm text-blue-700 mb-3">Overall Accuracy</div>
            <Progress value={metrics.accuracy} className="bg-blue-200" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <Badge variant="default" className="bg-green-600">F1-Score</Badge>
            </div>
            <div className="text-3xl font-bold text-green-900 mb-2">
              {metrics.f1Score}%
            </div>
            <div className="text-sm text-green-700 mb-3">Harmonic Mean</div>
            <Progress value={metrics.f1Score} className="bg-green-200" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <Badge variant="default" className="bg-purple-600">AUC</Badge>
            </div>
            <div className="text-3xl font-bold text-purple-900 mb-2">
              {metrics.auc}%
            </div>
            <div className="text-sm text-purple-700 mb-3">Area Under Curve</div>
            <Progress value={metrics.auc} className="bg-purple-200" />
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
            <CardDescription>
              Detailed evaluation metrics for the hate speech detection model
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Precision</span>
                  <span className="text-sm font-bold">{metrics.precision}%</span>
                </div>
                <Progress value={metrics.precision} className="h-2" />
                <p className="text-xs text-gray-500">
                  True positives / (True positives + False positives)
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Recall</span>
                  <span className="text-sm font-bold">{metrics.recall}%</span>
                </div>
                <Progress value={metrics.recall} className="h-2" />
                <p className="text-xs text-gray-500">
                  True positives / (True positives + False negatives)
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Specificity</span>
                  <span className="text-sm font-bold">{metrics.specificity}%</span>
                </div>
                <Progress value={metrics.specificity} className="h-2" />
                <p className="text-xs text-gray-500">
                  True negatives / (True negatives + False positives)
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">F1-Score</span>
                  <span className="text-sm font-bold">{metrics.f1Score}%</span>
                </div>
                <Progress value={metrics.f1Score} className="h-2" />
                <p className="text-xs text-gray-500">
                  2 × (Precision × Recall) / (Precision + Recall)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Confusion Matrix
            </CardTitle>
            <CardDescription>
              Classification results breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">
                  {confusionMatrix.truePositive.toLocaleString()}
                </div>
                <div className="text-sm text-green-800">True Positives</div>
                <div className="text-xs text-green-600">Correctly detected hate speech</div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-600">
                  {confusionMatrix.falsePositive.toLocaleString()}
                </div>
                <div className="text-sm text-red-800">False Positives</div>
                <div className="text-xs text-red-600">Incorrectly flagged as hate</div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {confusionMatrix.falseNegative.toLocaleString()}
                </div>
                <div className="text-sm text-orange-800">False Negatives</div>
                <div className="text-xs text-orange-600">Missed hate speech</div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {confusionMatrix.trueNegative.toLocaleString()}
                </div>
                <div className="text-sm text-blue-800">True Negatives</div>
                <div className="text-xs text-blue-600">Correctly identified safe content</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Samples:</span>
                <span className="font-medium">
                  {(confusionMatrix.truePositive + confusionMatrix.falsePositive + 
                    confusionMatrix.trueNegative + confusionMatrix.falseNegative).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Accuracy:</span>
                <span className="font-medium">
                  {calculateMetric(
                    confusionMatrix.truePositive,
                    confusionMatrix.falsePositive,
                    confusionMatrix.trueNegative,
                    confusionMatrix.falseNegative,
                    'accuracy'
                  )}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cross Validation Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Cross-Validation Results
          </CardTitle>
          <CardDescription>
            5-fold cross-validation performance across different data splits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Fold</th>
                  <th className="text-left p-2">Accuracy</th>
                  <th className="text-left p-2">Precision</th>
                  <th className="text-left p-2">Recall</th>
                  <th className="text-left p-2">F1-Score</th>
                </tr>
              </thead>
              <tbody>
                {crossValidation.map((fold, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">Fold {fold.fold}</td>
                    <td className="p-2">{fold.accuracy}%</td>
                    <td className="p-2">{fold.precision}%</td>
                    <td className="p-2">{fold.recall}%</td>
                    <td className="p-2">{fold.f1}%</td>
                  </tr>
                ))}
                <tr className="border-b bg-blue-50 font-medium">
                  <td className="p-2">Average</td>
                  <td className="p-2">
                    {(crossValidation.reduce((sum, fold) => sum + fold.accuracy, 0) / crossValidation.length).toFixed(1)}%
                  </td>
                  <td className="p-2">
                    {(crossValidation.reduce((sum, fold) => sum + fold.precision, 0) / crossValidation.length).toFixed(1)}%
                  </td>
                  <td className="p-2">
                    {(crossValidation.reduce((sum, fold) => sum + fold.recall, 0) / crossValidation.length).toFixed(1)}%
                  </td>
                  <td className="p-2">
                    {(crossValidation.reduce((sum, fold) => sum + fold.f1, 0) / crossValidation.length).toFixed(1)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Model Stability</h4>
              <p className="text-sm text-gray-600">
                Low variance across folds indicates good model generalization. 
                Standard deviation of accuracy: ±0.3%
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Performance Consistency</h4>
              <p className="text-sm text-gray-600">
                Consistent performance across all metrics suggests robust model 
                that will perform well on unseen data.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelMetrics;
