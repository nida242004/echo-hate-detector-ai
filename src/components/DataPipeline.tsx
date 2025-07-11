
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  Filter, 
  Download, 
  CheckCircle, 
  AlertCircle,
  BarChart3,
  FileText,
  Globe,
  Hash
} from 'lucide-react';

const DataPipeline = () => {
  const [pipelineStep, setPipelineStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const pipelineSteps = [
    {
      title: "Data Crawling",
      description: "Collecting data from various sources",
      icon: Globe,
      color: "bg-orange-500",
      status: "completed"
    },
    {
      title: "Pre-filtering",
      description: "Removing spam and invalid content",
      icon: Filter,
      color: "bg-orange-400",
      status: "completed"
    },
    {
      title: "Data Annotation",
      description: "Labeling data for supervised learning",
      icon: FileText,
      color: "bg-green-600",
      status: "completed"
    },
    {
      title: "Pre-processing",
      description: "Text normalization and cleaning",
      icon: Hash,
      color: "bg-green-500",
      status: "running"
    }
  ];

  const runPipeline = () => {
    setIsRunning(true);
    setProgress(0);
    setPipelineStep(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const dataStats = {
    totalSamples: 125000,
    hateSpeech: 38750,
    safeSpeech: 86250,
    sources: ['Twitter', 'Reddit', 'Facebook', 'YouTube'],
    languages: ['English', 'Spanish', 'French'],
    categories: ['Racism', 'Sexism', 'Homophobia', 'Religious Hate', 'General Toxicity']
  };

  return (
    <div className="space-y-6">
      {/* Pipeline Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-6 w-6" />
            Data Processing Pipeline
          </CardTitle>
          <CardDescription>
            Comprehensive data collection and preprocessing for hate speech detection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {pipelineSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <Card className={`border-2 ${pipelineStep >= index ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`p-2 rounded-lg ${step.color}`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        {pipelineStep > index && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {pipelineStep === index && isRunning && <AlertCircle className="h-4 w-4 text-orange-500 animate-pulse" />}
                      </div>
                      <h3 className="font-semibold text-sm">{step.title}</h3>
                      <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Pipeline Progress</span>
            <span className="text-sm text-gray-500">{progress}%</span>
          </div>
          <Progress value={progress} className="mb-4" />
          
          <Button 
            onClick={runPipeline} 
            disabled={isRunning}
            className="w-full"
          >
            {isRunning ? 'Processing...' : 'Run Data Pipeline'}
          </Button>
        </CardContent>
      </Card>

      {/* Data Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Dataset Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {dataStats.totalSamples.toLocaleString()}
                </div>
                <div className="text-sm text-blue-800">Total Samples</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {dataStats.hateSpeech.toLocaleString()}
                </div>
                <div className="text-sm text-red-800">Hate Speech</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Hate Speech</span>
                <Badge variant="destructive">31%</Badge>
              </div>
              <Progress value={31} className="bg-red-100" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Safe Content</span>
                <Badge variant="default">69%</Badge>
              </div>
              <Progress value={69} className="bg-green-100" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Sources & Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Data Sources</h4>
              <div className="flex flex-wrap gap-2">
                {dataStats.sources.map((source, index) => (
                  <Badge key={index} variant="outline">{source}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {dataStats.languages.map((lang, index) => (
                  <Badge key={index} variant="secondary">{lang}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Hate Speech Categories</h4>
              <div className="space-y-1">
                {dataStats.categories.map((category, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-sm">{category}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Processing Details */}
      <Card>
        <CardHeader>
          <CardTitle>Processing Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">1. Data Crawling</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Social media APIs</li>
                <li>• Web scraping</li>
                <li>• Real-time monitoring</li>
                <li>• Event-triggered collection</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">2. Pre-filtering</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Spam detection</li>
                <li>• Content validation</li>
                <li>• Duplicate removal</li>
                <li>• Quality filtering</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">3. Data Annotation</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Manual labeling</li>
                <li>• Inter-annotator agreement</li>
                <li>• Quality control</li>
                <li>• Bias detection</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">4. Pre-processing</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Text normalization</li>
                <li>• Tokenization</li>
                <li>• Stop word removal</li>
                <li>• Feature extraction</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataPipeline;
