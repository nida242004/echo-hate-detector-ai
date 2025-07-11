
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { Shield, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';

interface HateSpeechDetectorProps {
  isModelReady: boolean;
}

const HateSpeechDetector: React.FC<HateSpeechDetectorProps> = ({ isModelReady }) => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    isHateSpeech: boolean;
    confidence: number;
    category: string;
    explanation: string;
  } | null>(null);
  const [recentAnalyses, setRecentAnalyses] = useState<Array<{
    text: string;
    isHateSpeech: boolean;
    confidence: number;
    timestamp: Date;
  }>>([]);

  // Simulate ML model prediction
  const analyzeText = async (text: string) => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple hate speech detection logic (in real app, this would call actual ML model)
    const hateSpeechKeywords = [
      'hate', 'stupid', 'idiot', 'kill', 'die', 'ugly', 'worthless', 
      'pathetic', 'loser', 'trash', 'garbage', 'disgusting'
    ];
    
    const text_lower = text.toLowerCase();
    const hasHateKeywords = hateSpeechKeywords.some(keyword => text_lower.includes(keyword));
    const hasExcessiveCaps = (text.match(/[A-Z]/g) || []).length / text.length > 0.5;
    const hasMultipleExclamations = (text.match(/!/g) || []).length > 2;
    
    const isHateSpeech = hasHateKeywords || (hasExcessiveCaps && hasMultipleExclamations);
    const confidence = isHateSpeech ? 
      Math.min(95, 60 + (hasHateKeywords ? 30 : 0) + (hasExcessiveCaps ? 10 : 0)) :
      Math.max(15, 85 - text.length * 0.1);
    
    const category = isHateSpeech ? 
      (hasHateKeywords ? 'Offensive Language' : 'Aggressive Tone') : 
      'Safe Content';
    
    const explanation = isHateSpeech ?
      'Contains potentially harmful language or aggressive tone patterns' :
      'No hate speech patterns detected in the content';

    const analysisResult = {
      isHateSpeech,
      confidence: Math.round(confidence),
      category,
      explanation
    };

    setResult(analysisResult);
    
    // Add to recent analyses
    setRecentAnalyses(prev => [{
      text: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
      isHateSpeech,
      confidence: Math.round(confidence),
      timestamp: new Date()
    }, ...prev.slice(0, 4)]);
    
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis Complete",
      description: `Text classified as ${category} with ${Math.round(confidence)}% confidence`,
    });
  };

  const handleAnalyze = () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to analyze",
        variant: "destructive"
      });
      return;
    }
    
    if (!isModelReady) {
      toast({
        title: "Model Loading",
        description: "Please wait for the model to finish loading",
        variant: "destructive"
      });
      return;
    }
    
    analyzeText(inputText);
  };

  const exampleTexts = [
    "I love this new technology!",
    "This is really helpful, thank you!",
    "You are so stupid and worthless!",
    "I HATE THIS SO MUCH!!!",
    "Have a great day everyone!"
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Section */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Text Analysis
          </CardTitle>
          <CardDescription>
            Enter text below to detect potential hate speech using our ML model
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter text to analyze for hate speech..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[120px]"
            maxLength={1000}
          />
          
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{inputText.length}/1000 characters</span>
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !isModelReady}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Text'
              )}
            </Button>
          </div>

          {/* Example Texts */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {exampleTexts.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputText(example)}
                  className="text-xs"
                >
                  {example.substring(0, 20)}...
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="space-y-4">
              <Alert className={result.isHateSpeech ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
                <div className="flex items-center gap-2">
                  {result.isHateSpeech ? (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  <Badge variant={result.isHateSpeech ? "destructive" : "default"}>
                    {result.category}
                  </Badge>
                </div>
                <AlertDescription className="mt-2">
                  {result.explanation}
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Confidence Score</span>
                  <span className="text-sm font-bold">{result.confidence}%</span>
                </div>
                <Progress 
                  value={result.confidence} 
                  className={`w-full ${result.isHateSpeech ? 'bg-red-100' : 'bg-green-100'}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Classification:</span>
                  <p className={result.isHateSpeech ? 'text-red-600' : 'text-green-600'}>
                    {result.isHateSpeech ? 'Hate Speech Detected' : 'Safe Content'}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Category:</span>
                  <p className="text-gray-700">{result.category}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No analysis yet</p>
              <p className="text-sm">Enter text and click analyze to see results</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Analyses */}
      {recentAnalyses.length > 0 && (
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Analyses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAnalyses.map((analysis, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{analysis.text}</p>
                    <p className="text-xs text-gray-500">
                      {analysis.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={analysis.isHateSpeech ? "destructive" : "default"}>
                      {analysis.confidence}%
                    </Badge>
                    {analysis.isHateSpeech ? (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HateSpeechDetector;
