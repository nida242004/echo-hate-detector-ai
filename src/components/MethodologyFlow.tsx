
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Database, 
  Filter, 
  Brain, 
  Target,
  Settings,
  BarChart3,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const MethodologyFlow = () => {
  const steps = [
    {
      id: 1,
      title: "Data Crawling",
      description: "Derogatory words, hashtags, specific profiles, following 'trigger' events",
      icon: Database,
      color: "bg-orange-500",
      details: ["Social media APIs", "Web scraping", "Real-time monitoring", "Event-triggered collection"]
    },
    {
      id: 2,
      title: "Pre-filtering",
      description: "Exclusion of spam, samples that have no content, etc.",
      icon: Filter,
      color: "bg-orange-400",
      details: ["Spam detection", "Content validation", "Duplicate removal", "Quality filtering"]
    },
    {
      id: 3,
      title: "Data Acquisition & Understanding",
      description: "Data source, annotation, and preprocessing",
      icon: Target,
      color: "bg-green-600",
      details: ["Data source analysis", "Manual annotation", "Statistical analysis", "Data exploration"]
    },
    {
      id: 4,
      title: "Pre-processing",
      description: "Lower-casing, stemming, remove punctuation, URLs, stop-words",
      icon: Settings,
      color: "bg-green-500",
      details: ["Text normalization", "Tokenization", "Stop word removal", "Feature extraction"]
    },
    {
      id: 5,
      title: "Feature Engineering",
      description: "Dictionary, n-grams, BoW, embedding, meta-information",
      icon: Brain,
      color: "bg-blue-600",
      details: ["N-gram features", "Word embeddings", "TF-IDF vectors", "Sentiment features"]
    },
    {
      id: 6,
      title: "Feature Selection",
      description: "Dimensionality reduction and feature optimization",
      icon: CheckCircle,
      color: "bg-blue-500",
      details: ["Chi-square test", "Mutual information", "PCA", "Feature importance"]
    },
    {
      id: 7,
      title: "Modeling",
      description: "Classic ML methods, Ensemble, DNN",
      icon: AlertTriangle,
      color: "bg-purple-600",
      details: ["SVM", "Random Forest", "Neural Networks", "Ensemble methods"]
    },
    {
      id: 8,
      title: "Model Training & Evaluation",
      description: "Cross validation, accuracy, F-measure, recall, precision",
      icon: BarChart3,
      color: "bg-purple-500",
      details: ["Cross-validation", "Performance metrics", "Hyperparameter tuning", "Model selection"]
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">ML Pipeline Methodology</CardTitle>
          <CardDescription className="text-center">
            Complete workflow for hate speech detection system based on research methodology
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Flow Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="relative">
              <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${step.color}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <Badge variant="outline">{step.id}</Badge>
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{step.description}</p>
                  <div className="space-y-1">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <span className="text-xs text-gray-500">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Arrow connector */}
              {index < steps.length - 1 && index % 4 !== 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Database className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Data Pipeline</h3>
            </div>
            <p className="text-sm text-blue-700">
              Comprehensive data collection and preprocessing with quality filtering
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Brain className="h-6 w-6 text-purple-600" />
              <h3 className="font-semibold text-purple-900">ML Models</h3>
            </div>
            <p className="text-sm text-purple-700">
              Multiple algorithms including ensemble methods and deep learning
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="h-6 w-6 text-green-600" />
              <h3 className="font-semibold text-green-900">Evaluation</h3>
            </div>
            <p className="text-sm text-green-700">
              Rigorous testing with cross-validation and multiple metrics
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MethodologyFlow;
