import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RfqContext } from '../../context/RfqContext';
import { segments } from '../../data/segments';
import { toast } from 'react-hot-toast';

const CreateRfqPage = () => {
  const [step, setStep] = useState(1);
  const [rfqData, setRfqData] = useState({
    title: '',
    description: '',
    segment: '',
    companies: [] as string[],
    requirements: [] as { key: string; value: string }[],
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 weeks from now
  });
  const [requirementKey, setRequirementKey] = useState('');
  const [requirementValue, setRequirementValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { createRfq } = useContext(RfqContext);
  const navigate = useNavigate();

  const handleNextStep = () => {
    if (step === 1 && (!rfqData.title || !rfqData.description)) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (step === 2 && !rfqData.segment) {
      toast.error('Please select a segment');
      return;
    }
    if (step === 3 && rfqData.companies.length === 0) {
      toast.error('Please select at least one company');
      return;
    }

    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRfqData({
      ...rfqData,
      [name]: value,
    });
  };

  const handleSegmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const segmentId = e.target.value;
    setRfqData({
      ...rfqData,
      segment: segmentId,
      companies: [], // Reset companies when segment changes
    });
  };

  const handleCompanyToggle = (companyName: string) => {
    const companies = [...rfqData.companies];
    const index = companies.indexOf(companyName);
    
    if (index > -1) {
      companies.splice(index, 1);
    } else {
      companies.push(companyName);
    }
    
    setRfqData({
      ...rfqData,
      companies,
    });
  };

  const handleAddRequirement = () => {
    if (!requirementKey || !requirementValue) {
      toast.error('Please fill in both requirement fields');
      return;
    }
    
    setRfqData({
      ...rfqData,
      requirements: [
        ...rfqData.requirements,
        { key: requirementKey, value: requirementValue },
      ],
    });
    
    setRequirementKey('');
    setRequirementValue('');
  };

  const handleRemoveRequirement = (index: number) => {
    const requirements = [...rfqData.requirements];
    requirements.splice(index, 1);
    setRfqData({
      ...rfqData,
      requirements,
    });
  };

  const handleSubmit = async (isDraft: boolean) => {
    setIsLoading(true);
    
    try {
      const rfqId = await createRfq({
        ...rfqData,
        status: isDraft ? 'draft' : 'published',
      });
      
      toast.success(isDraft ? 'RFQ saved as draft' : 'RFQ published successfully');
      navigate(`/rfq/${rfqId}`);
    } catch (error) {
      toast.error('Error creating RFQ');
    } finally {
      setIsLoading(false);
    }
  };

  // Get companies for the selected segment
  const selectedSegment = segments.find(s => s.id === rfqData.segment);
  const segmentCompanies = selectedSegment ? selectedSegment.companies : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New RFQ</h1>
        <p className="mt-2 text-gray-600">
          Follow the steps below to create a detailed Request for Quotation.
        </p>
      </div>

      {/* Progress indicator */}
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
            Basic Info
          </div>
          <div className={step >= 2 ? 'text-[#0A66C2] font-medium' : 'text-gray-500'}>
            Segment
          </div>
          <div className={step >= 3 ? 'text-[#0A66C2] font-medium' : 'text-gray-500'}>
            Vendors
          </div>
          <div className={step >= 4 ? 'text-[#0A66C2] font-medium' : 'text-gray-500'}>
            Requirements
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  RFQ Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={rfqData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0A66C2] focus:border-[#0A66C2]"
                  placeholder="e.g., Cloud Infrastructure Migration"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={rfqData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0A66C2] focus:border-[#0A66C2]"
                  placeholder="Describe your project requirements in detail"
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline for Responses
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={rfqData.deadline}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0A66C2] focus:border-[#0A66C2]"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Segment Selection */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Technology Segment</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="segment" className="block text-sm font-medium text-gray-700 mb-1">
                  Segment <span className="text-red-500">*</span>
                </label>
                <select
                  id="segment"
                  name="segment"
                  value={rfqData.segment}
                  onChange={handleSegmentChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0A66C2] focus:border-[#0A66C2]"
                  required
                >
                  <option value="">Select a segment</option>
                  {segments.map(segment => (
                    <option key={segment.id} value={segment.id}>{segment.name}</option>
                  ))}
                </select>
              </div>
              
              {rfqData.segment && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Segment Details</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-600">{selectedSegment?.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Vendor Selection */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Vendors</h2>
            
            {segmentCompanies.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-gray-500">Please select a segment first to see available vendors.</p>
                <button
                  onClick={handlePrevStep}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0A66C2] hover:bg-[#004182]"
                >
                  Go Back
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600 mb-4">
                  Select the vendors you want to receive proposals from. You can select multiple vendors.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {segmentCompanies.map(company => (
                    <div
                      key={company.id}
                      className={`border rounded-md p-4 cursor-pointer transition-colors ${
                        rfqData.companies.includes(company.name)
                          ? 'border-[#0A66C2] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleCompanyToggle(company.name)}
                    >
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          checked={rfqData.companies.includes(company.name)}
                          onChange={() => {}}
                          className="h-5 w-5 text-[#0A66C2] border-gray-300 rounded mt-0.5"
                        />
                        <div className="ml-3">
                          <h3 className="text-md font-medium text-gray-900">{company.name}</h3>
                          <p className="text-sm text-gray-500 line-clamp-2">{company.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Selected vendors: {rfqData.companies.length} of {segmentCompanies.length}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Requirements */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Specific Requirements</h2>
            <p className="text-gray-600 mb-4">
              Add specific requirements for your project to help vendors provide accurate proposals.
            </p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <label htmlFor="requirementKey" className="block text-sm font-medium text-gray-700 mb-1">
                    Requirement
                  </label>
                  <input
                    type="text"
                    id="requirementKey"
                    value={requirementKey}
                    onChange={(e) => setRequirementKey(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0A66C2] focus:border-[#0A66C2]"
                    placeholder="e.g., Storage"
                  />
                </div>
                <div className="md:col-span-1">
                  <label htmlFor="requirementValue" className="block text-sm font-medium text-gray-700 mb-1">
                    Value
                  </label>
                  <input
                    type="text"
                    id="requirementValue"
                    value={requirementValue}
                    onChange={(e) => setRequirementValue(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0A66C2] focus:border-[#0A66C2]"
                    placeholder="e.g., 500TB"
                  />
                </div>
                <div className="md:col-span-1 flex items-end">
                  <button
                    type="button"
                    onClick={handleAddRequirement}
                    className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0A66C2] hover:bg-[#004182] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A66C2]"
                  >
                    Add Requirement
                  </button>
                </div>
              </div>
              
              {rfqData.requirements.length > 0 ? (
                <div className="mt-4">
                  <h3 className="text-md font-medium text-gray-900 mb-2">Added Requirements</h3>
                  <div className="bg-gray-50 rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Requirement
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Value
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {rfqData.requirements.map((req, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {req.key}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {req.value}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                type="button"
                                onClick={() => handleRemoveRequirement(index)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="mt-4 text-center py-4 bg-gray-50 rounded-md">
                  <p className="text-gray-500">No requirements added yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="mt-8 flex justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A66C2]"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}
          
          <div className="flex space-x-4">
            {step === 4 && (
              <button
                type="button"
                onClick={() => handleSubmit(true)}
                disabled={isLoading}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A66C2] disabled:opacity-50"
              >
                Save as Draft
              </button>
            )}
            
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0A66C2] hover:bg-[#004182] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A66C2]"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleSubmit(false)}
                disabled={isLoading}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0A66C2] hover:bg-[#004182] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A66C2] disabled:opacity-50"
              >
                {isLoading ? 'Publishing...' : 'Publish RFQ'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRfqPage;