import { useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RfqContext } from '../../context/RfqContext';
import { segments } from '../../data/segments';
import { toast } from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  type: 'text' | 'choice' | 'multiChoice';
  options?: string[];
}

interface Answer {
  questionId: string;
  value: string | string[];
}

interface UploadedDocument {
  id: string;
  name: string;
  url: string;
  type: string;
}

const questions: Record<string, Question[]> = {
  'cloud-services': [
    {
      id: 'workload_type',
      text: 'What type of workloads are you planning to run?',
      type: 'multiChoice',
      options: ['Web Applications', 'Databases', 'Machine Learning', 'Data Analytics', 'IoT', 'Other']
    },
    {
      id: 'data_volume',
      text: 'What is your expected data volume per month?',
      type: 'choice',
      options: ['< 1TB', '1-10TB', '10-100TB', '> 100TB']
    },
    {
      id: 'compliance',
      text: 'Do you have any specific compliance requirements?',
      type: 'multiChoice',
      options: ['GDPR', 'HIPAA', 'PCI DSS', 'SOC 2', 'ISO 27001', 'Other']
    }
  ],
  'it-infrastructure': [
    {
      id: 'infrastructure_type',
      text: 'What type of infrastructure are you looking for?',
      type: 'multiChoice',
      options: ['Servers', 'Storage', 'Networking', 'Security', 'Other']
    },
    {
      id: 'scale',
      text: 'What is the scale of your infrastructure needs?',
      type: 'choice',
      options: ['Small (< 50 users)', 'Medium (50-200 users)', 'Large (200-1000 users)', 'Enterprise (1000+ users)']
    },
    {
      id: 'location',
      text: 'Where will this infrastructure be deployed?',
      type: 'multiChoice',
      options: ['On-premises', 'Cloud', 'Hybrid', 'Multiple locations']
    }
  ],
  'cybersecurity': [
    {
      id: 'security_focus',
      text: 'What are your primary security concerns?',
      type: 'multiChoice',
      options: ['Network Security', 'Endpoint Protection', 'Data Security', 'Access Management', 'Threat Detection']
    },
    {
      id: 'current_solutions',
      text: 'What security solutions do you currently have in place?',
      type: 'text'
    },
    {
      id: 'incident_response',
      text: 'Do you need incident response capabilities?',
      type: 'choice',
      options: ['Yes, 24/7', 'Yes, business hours only', 'No']
    }
  ],
  'data-center': [
    {
      id: 'power_requirements',
      text: 'What are your power requirements?',
      type: 'choice',
      options: ['< 100kW', '100-500kW', '500kW-1MW', '> 1MW']
    },
    {
      id: 'redundancy',
      text: 'What level of redundancy do you need?',
      type: 'choice',
      options: ['N', 'N+1', '2N', '2N+1']
    },
    {
      id: 'cooling',
      text: 'What type of cooling solution are you looking for?',
      type: 'multiChoice',
      options: ['Air cooling', 'Liquid cooling', 'Free cooling', 'Hybrid cooling']
    }
  ]
};

const CreateRfqPage = () => {
  const [step, setStep] = useState(1);
  const [segment, setSegment] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { createRfq } = useContext(RfqContext);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newDocuments = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type
    }));
    setDocuments(prev => [...prev, ...newDocuments]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setAnswers(prev => {
      const existing = prev.find(a => a.questionId === questionId);
      if (existing) {
        return prev.map(a => a.questionId === questionId ? { ...a, value } : a);
      }
      return [...prev, { questionId, value }];
    });
  };

  const removeDocument = (documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  const generateTitle = () => {
    const selectedSegment = segments.find(s => s.id === segment);
    if (!selectedSegment) return '';

    const focus = answers.find(a => a.questionId.includes('type'))?.value;
    return `${selectedSegment.name} Solution - ${Array.isArray(focus) ? focus[0] : focus}`;
  };

  const generateDescription = () => {
    let description = '';

    // Add segment-specific information
    const segmentQuestions = questions[segment] || [];
    segmentQuestions.forEach(question => {
      const answer = answers.find(a => a.questionId === question.id);
      if (answer) {
        description += `${question.text}\n`;
        description += Array.isArray(answer.value) 
          ? answer.value.join(', ') 
          : answer.value;
        description += '\n\n';
      }
    });

    // Add additional information if provided
    if (additionalInfo) {
      description += `Additional Requirements:\n${additionalInfo}\n\n`;
    }

    return description.trim();
  };

  const generateRequirements = () => {
    return answers.map(answer => ({
      key: questions[segment]?.find(q => q.id === answer.questionId)?.text || '',
      value: Array.isArray(answer.value) ? answer.value.join(', ') : answer.value
    }));
  };

  const handleSubmit = async (isDraft: boolean) => {
    if (!segment) {
      toast.error('Please select a segment');
      return;
    }

    if (!isDraft && answers.length === 0) {
      toast.error('Please answer at least one question');
      return;
    }

    setIsLoading(true);

    try {
      const selectedSegment = segments.find(s => s.id === segment);
      const companies = selectedSegment?.companies.map(c => c.name) || [];

      const rfqId = await createRfq({
        title: generateTitle(),
        description: generateDescription(),
        segment,
        companies,
        requirements: generateRequirements(),
        status: isDraft ? 'draft' : 'published'
      });

      // Here you would typically send emails to vendors
      // Using a service like Resend or your backend email service

      toast.success(isDraft ? 'RFQ saved as draft' : 'RFQ published successfully');
      navigate(`/rfq/${rfqId}`);
    } catch (error) {
      toast.error('Error creating RFQ');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New RFQ</h1>
        <p className="mt-2 text-gray-600">
          Our AI-powered system will help you create a detailed RFQ based on your requirements
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-[#0A66C2] h-2.5 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <div className={step >= 1 ? 'text-[#0A66C2] font-medium' : 'text-gray-500'}>
            Select Segment
          </div>
          <div className={step >= 2 ? 'text-[#0A66C2] font-medium' : 'text-gray-500'}>
            Requirements
          </div>
          <div className={step >= 3 ? 'text-[#0A66C2] font-medium' : 'text-gray-500'}>
            Documents
          </div>
          <div className={step >= 4 ? 'text-[#0A66C2] font-medium' : 'text-gray-500'}>
            Review
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Step 1: Select Segment */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Technology Segment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {segments.map((s) => (
                <div
                  key={s.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    segment === s.id
                      ? 'border-[#0A66C2] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSegment(s.id)}
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      {React.createElement(s.icon, { className: 'h-6 w-6 text-[#0A66C2]' })}
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">{s.name}</h3>
                      <p className="text-sm text-gray-500">{s.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Answer Questions */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements Questionnaire</h2>
            <div className="space-y-6">
              {questions[segment]?.map((question) => (
                <div key={question.id} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">{question.text}</h3>
                  {question.type === 'text' ? (
                    <textarea
                      value={(answers.find(a => a.questionId === question.id)?.value as string) || ''}
                      onChange={(e) => handleAnswer(question.id, e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0A66C2] focus:border-[#0A66C2]"
                      placeholder="Enter your answer"
                    />
                  ) : question.type === 'choice' ? (
                    <div className="space-y-2">
                      {question.options?.map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name={question.id}
                            value={option}
                            checked={answers.find(a => a.questionId === question.id)?.value === option}
                            onChange={(e) => handleAnswer(question.id, e.target.value)}
                            className="h-4 w-4 text-[#0A66C2] border-gray-300 focus:ring-[#0A66C2]"
                          />
                          <span className="ml-2 text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {question.options?.map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            value={option}
                            checked={(answers.find(a => a.questionId === question.id)?.value as string[] || []).includes(option)}
                            onChange={(e) => {
                              const current = (answers.find(a => a.questionId === question.id)?.value as string[]) || [];
                              const value = e.target.checked
                                ? [...current, option]
                                : current.filter(v => v !== option);
                              handleAnswer(question.id, value);
                            }}
                            className="h-4 w-4 text-[#0A66C2] border-gray-300 rounded focus:ring-[#0A66C2]"
                          />
                          <span className="ml-2 text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Additional Requirements</h3>
                <textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0A66C2] focus:border-[#0A66C2]"
                  placeholder="Add any additional requirements or specifications"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Upload Documents */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Supporting Documents</h2>
            
            <div 
              {...getRootProps()} 
              className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-[#0A66C2] transition-colors cursor-pointer"
            >
              <input {...getInputProps()} />
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-1 text-sm text-gray-600">
                  Drag & drop files here, or click to select files
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX, PNG, JPG up to 10MB each
                </p>
              </div>
            </div>

            {documents.length > 0 && (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Uploaded Documents</h3>
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-sm font-medium text-gray-900">{doc.name}</span>
                    </div>
                    <button
                      onClick={() => removeDocument(doc.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Review RFQ</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Title</h3>
                <p className="text-gray-700">{generateTitle()}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Requirements</h3>
                <div className="space-y-4">
                  {questions[segment]?.map((question) => {
                    const answer = answers.find(a => a.questionId === question.id);
                    if (!answer) return null;
                    return (
                      <div key={question.id}>
                        <p className="font-medium text-gray-700">{question.text}</p>
                        <p className="text-gray-600">
                          {Array.isArray(answer.value) ? answer.value.join(', ') : answer.value}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {additionalInfo && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Additional Requirements</h3>
                  <p className="text-gray-700 whitespace-pre-line">{additionalInfo}</p>
                </div>
              )}

              {documents.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Attached Documents</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {documents.map((doc) => (
                      <li key={doc.id}>{doc.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}
          
          <div className="flex space-x-4">
            {step === 4 && (
              <button
                onClick={() => handleSubmit(true)}
                disabled={isLoading}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Save as Draft
              </button>
            )}
            
            <button
              onClick={() => step < 4 ? setStep(step + 1) : handleSubmit(false)}
              disabled={isLoading || (step === 1 && !segment)}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0A66C2] hover:bg-[#004182] disabled:opacity-50"
            >
              {step < 4 ? 'Next' : isLoading ? 'Publishing...' : 'Publish RFQ'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRfqPage;