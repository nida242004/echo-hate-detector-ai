
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  BarChart3, 
  Brain, 
  Database,
  Settings,
  Activity,
  Target,
  TrendingUp
} from 'lucide-react';
import DataPipeline from '@/components/DataPipeline';
import ModelTraining from '@/components/ModelTraining';
import HateSpeechDetector from '@/components/HateSpeechDetector';
import MethodologyFlow from '@/components/MethodologyFlow';
import ModelMetrics from '@/components/ModelMetrics';

const Index = () => {
  const [activeTab, setActiveTab] = useState('detector');
  const [modelAccuracy, setModelAccuracy] = useState(0);
  const [isModelReady, setIsModelReady] = useState(false);

  useEffect(() => {
    // Simulate model loading and accuracy calculation
    const loadModel = async () => {
      setModelAccuracy(0);
      const interval = setInterval(() => {
        setModelAccuracy(prev => {
          if (prev >= 89.5) {
            clearInterval(interval);
            setIsModelReady(true);
            toast({
              title: "Model Ready!",
              description: "Hate speech detection model loaded with 89.5% accuracy",
            });
            return 89.5;
          }
          return prev + 2.5;
        });
      }, 200);
    };

    loadModel();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent">
            Hate Speech Detection System
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Advanced Machine Learning Pipeline for Content Moderation
          </p>
          
          {/* Model Status */}
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Brain className={`h-5 w-5 ${isModelReady ? 'text-green-500' : 'text-orange-500'}`} />
              <span className="text-sm font-medium">
                Model Status: {isModelReady ? 'Ready' : 'Loading...'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">
                Accuracy: {modelAccuracy.toFixed(1)}%
              </span>
            </div>
          </div>

          <Progress value={modelAccuracy} className="w-64 mx-auto mb-4" />
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="detector" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Detector
            </TabsTrigger>
            <TabsTrigger value="methodology" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Methodology
            </TabsTrigger>
            <TabsTrigger value="pipeline" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Data Pipeline
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Training
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Metrics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="detector">
            <HateSpeechDetector isModelReady={isModelReady} />
          </TabsContent>

          <TabsContent value="methodology">
            <MethodologyFlow />
          </TabsContent>

          <TabsContent value="pipeline">
            <DataPipeline />
          </TabsContent>

          <TabsContent value="training">
            <ModelTraining />
          </TabsContent>

          <TabsContent value="metrics">
            <ModelMetrics accuracy={modelAccuracy} />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <p className="text-sm">
            Built with React, TypeScript, and Hugging Face Transformers
          </p>
          <p className="text-xs mt-2">
            Using state-of-the-art NLP models for accurate hate speech detection
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
