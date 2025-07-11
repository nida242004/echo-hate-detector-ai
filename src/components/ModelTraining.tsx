
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Settings, 
  Play, 
  Pause, 
  RotateCcw,
  TrendingUp,
  Target,
  Cpu,
  Zap
} from 'lucide-react';

const ModelTraining = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [selectedModel, setSelectedModel] = useState('ensemble');

  const models = [
    {
      id: 'svm',
      name: 'Support Vector Machine',
      accuracy: 84.2,
      precision: 82.1,
      recall: 86.3,
      f1: 84.2,
      icon: Target,
      color: 'bg-blue-500',
      description: 'Linear SVM with TF-IDF features'
    },
    {
      id: 'random_forest',
      name: 'Random Forest',
      accuracy: 86.7,
      precision: 85.4,
      recall: 88.1,
      f1: 86.7,
      icon: Brain,
      color: 'bg-green-500',
      description: 'Ensemble of decision trees'
    },
    {
      id: 'neural_network',
      name: 'Neural Network',
      accuracy: 88.3,
      precision: 87.2,
      recall: 89.4,
      f1: 88.3,
      icon: Cpu,
      color: 'bg-purple-500',
      description: 'Deep learning with LSTM layers'
    },
    {
      id: 'ensemble',
      name: 'Ensemble Model',
      accuracy: 89.5,
      precision: 88.7,
      recall: 90.3,
      f1: 89.5,
      icon: Zap,
      color: 'bg-orange-500',
      description: 'Combination of multiple models'
    }
  ];

  const startTraining = () => {
    setIsTraining(true);
    setCurrentEpoch(0);
    setTrainingProgress(0);

    const interval = setInterval(() => {
      setCurrentEpoch(prev => {
        if (prev >= 50) {
          clearInterval(interval);
          setIsTraining(false);
          return 50;
        }
        return prev + 1;
      });
      
      setTrainingProgress(prev => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const stopTraining = () => {
    setIsTraining(false);
  };

  const resetTraining = () => {
    setIsTraining(false);
    setCurrentEpoch(0);
    setTrainingProgress(0);
  };

  return (
    <div className="space-y-6">
      {/* Training Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6" />
            Model Training Center
          </CardTitle>
          <CardDescription>
            Train and evaluate multiple machine learning models for hate speech detection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{currentEpoch}/50</div>
              <div className="text-sm text-blue-800">Current Epoch</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{trainingProgress}%</div>
              <div className="text-sm text-green-800">Training Progress</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {models.find(m => m.id === selectedModel)?.accuracy}%
              </div>
              <div className="text-sm text-purple-800">Best Accuracy</div>
            </div>
          </div>

          <Progress value={trainingProgress} className="mb-4" />

          <div className="flex gap-2">
            <Button 
              onClick={startTraining} 
              disabled={isTraining}
              className="flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Start Training
            </Button>
            <Button 
              onClick={stopTraining} 
              disabled={!isTraining}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Pause className="h-4 w-4" />
              Pause
            </Button>
            <Button 
              onClick={resetTraining}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Model Comparison */}
      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="models">Model Comparison</TabsTrigger>
          <TabsTrigger value="hyperparameters">Hyperparameters</TabsTrigger>
          <TabsTrigger value="features">Feature Engineering</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {models.map((model) => {
              const Icon = model.icon;
              return (
                <Card 
                  key={model.id} 
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedModel === model.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedModel(model.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${model.color}`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{model.name}</h3>
                          <p className="text-sm text-gray-600">{model.description}</p>
                        </div>
                      </div>
                      {selectedModel === model.id && (
                        <Badge variant="default">Selected</Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Accuracy</span>
                          <span className="font-medium">{model.accuracy}%</span>
                        </div>
                        <Progress value={model.accuracy} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">F1-Score</span>
                          <span className="font-medium">{model.f1}%</span>
                        </div>
                        <Progress value={model.f1} className="h-2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{model.precision}%</div>
                        <div className="text-xs text-gray-500">Precision</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{model.recall}%</div>
                        <div className="text-xs text-gray-500">Recall</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="hyperparameters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Hyperparameter Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Neural Network Parameters</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Learning Rate</span>
                      <Badge variant="outline">0.001</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Batch Size</span>
                      <Badge variant="outline">32</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Hidden Layers</span>
                      <Badge variant="outline">3</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Dropout Rate</span>
                      <Badge variant="outline">0.2</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Ensemble Parameters</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">SVM Weight</span>
                      <Badge variant="outline">0.3</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">RF Weight</span>
                      <Badge variant="outline">0.3</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">NN Weight</span>
                      <Badge variant="outline">0.4</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Voting Method</span>
                      <Badge variant="outline">Soft</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Engineering Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">Text Features</h4>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      TF-IDF Vectors
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      N-gram Features
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      Word Embeddings
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      Character N-grams
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">Linguistic Features</h4>
                  <ul className="text-sm text-green-700 space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      POS Tags
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Sentiment Scores
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Readability Metrics
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Lexical Diversity
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-3">Meta Features</h4>
                  <ul className="text-sm text-purple-700 space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      Text Length
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      Caps Ratio
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      Punctuation Count
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      Special Characters
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModelTraining;
