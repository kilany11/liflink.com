import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { segments } from '../../data/segments';
import { Plus, X, Edit2, Save, Upload, File } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  documents: ServiceDocument[];
}

interface ServiceDocument {
  id: string;
  name: string;
  url: string;
  uploadDate: string;
}

const ManageServicesPage = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState<Service[]>([]);
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [uploadingForServiceId, setUploadingForServiceId] = useState<string | null>(null);
  
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    category: ''
  });

  // Get unique categories from segments
  const categories = Array.from(
    new Set(segments.flatMap(segment => 
      segment.companies.flatMap(company => company.services)
    ))
  ).sort();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    onDrop: (acceptedFiles) => {
      if (uploadingForServiceId) {
        handleDocumentUpload(uploadingForServiceId, acceptedFiles);
      }
    }
  });

  const handleAddService = () => {
    if (!newService.name || !newService.description || !newService.category) {
      toast.error('Please fill in all fields');
      return;
    }

    const service: Service = {
      id: Math.random().toString(36).substring(2, 9),
      ...newService,
      documents: []
    };

    setServices([...services, service]);
    setNewService({ name: '', description: '', category: '' });
    setIsAddingService(false);
    toast.success('Service added successfully');
  };

  const handleEditService = (service: Service) => {
    setEditingServiceId(service.id);
    setNewService({
      name: service.name,
      description: service.description,
      category: service.category
    });
  };

  const handleUpdateService = (serviceId: string) => {
    setServices(services.map(service => 
      service.id === serviceId
        ? { ...service, ...newService }
        : service
    ));
    setEditingServiceId(null);
    setNewService({ name: '', description: '', category: '' });
    toast.success('Service updated successfully');
  };

  const handleDeleteService = (serviceId: string) => {
    setServices(services.filter(service => service.id !== serviceId));
    toast.success('Service deleted successfully');
  };

  const handleDocumentUpload = (serviceId: string, files: File[]) => {
    const updatedServices = services.map(service => {
      if (service.id === serviceId) {
        const newDocuments = files.map(file => ({
          id: Math.random().toString(36).substring(2, 9),
          name: file.name,
          url: URL.createObjectURL(file),
          uploadDate: new Date().toISOString()
        }));
        return {
          ...service,
          documents: [...service.documents, ...newDocuments]
        };
      }
      return service;
    });
    
    setServices(updatedServices);
    setUploadingForServiceId(null);
    toast.success('Documents uploaded successfully');
  };

  const handleDeleteDocument = (serviceId: string, documentId: string) => {
    setServices(services.map(service => {
      if (service.id === serviceId) {
        return {
          ...service,
          documents: service.documents.filter(doc => doc.id !== documentId)
        };
      }
      return service;
    }));
    toast.success('Document deleted successfully');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Services</h1>
        <p className="mt-2 text-gray-600">Add and manage your company's services and documentation</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          {/* Add Service Button */}
          {!isAddingService && (
            <button
              onClick={() => setIsAddingService(true)}
              className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0A66C2] hover:bg-[#004182]"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Service
            </button>
          )}

          {/* Add/Edit Service Form */}
          {(isAddingService || editingServiceId) && (
            <div className="mb-8 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {editingServiceId ? 'Edit Service' : 'Add New Service'}
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Service Category
                  </label>
                  <select
                    value={newService.category}
                    onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A66C2] focus:ring-[#0A66C2]"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Service Name
                  </label>
                  <input
                    type="text"
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A66C2] focus:ring-[#0A66C2]"
                    placeholder="Enter service name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A66C2] focus:ring-[#0A66C2]"
                    placeholder="Describe your service"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => {
                      setIsAddingService(false);
                      setEditingServiceId(null);
                      setNewService({ name: '', description: '', category: '' });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => editingServiceId ? handleUpdateService(editingServiceId) : handleAddService()}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-[#0A66C2] hover:bg-[#004182]"
                  >
                    {editingServiceId ? 'Update Service' : 'Add Service'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Services List */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Services</h2>
            {services.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No services added yet. Add your first service to get started.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-gray-50 rounded-lg p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                        <p className="text-sm text-[#0A66C2] mb-2">{service.category}</p>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditService(service)}
                          className="p-2 text-gray-400 hover:text-[#0A66C2]"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service.id)}
                          className="p-2 text-gray-400 hover:text-red-600"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Documents Section */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-medium text-gray-900">Documents</h4>
                        <button
                          onClick={() => setUploadingForServiceId(service.id)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-[#0A66C2] bg-blue-50 hover:bg-blue-100"
                        >
                          <Upload className="h-4 w-4 mr-1" />
                          Add Documents
                        </button>
                      </div>

                      {uploadingForServiceId === service.id && (
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
                      )}

                      {service.documents.length > 0 ? (
                        <div className="mt-2 space-y-2">
                          {service.documents.map((doc) => (
                            <div
                              key={doc.id}
                              className="flex items-center justify-between p-3 bg-white rounded-md"
                            >
                              <div className="flex items-center">
                                <File className="h-5 w-5 text-gray-400 mr-2" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                                  <p className="text-xs text-gray-500">
                                    Uploaded {new Date(doc.uploadDate).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <a
                                  href={doc.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#0A66C2] hover:text-[#004182] text-sm"
                                >
                                  View
                                </a>
                                <button
                                  onClick={() => handleDeleteDocument(service.id, doc.id)}
                                  className="text-red-600 hover:text-red-800 text-sm"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No documents uploaded yet.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageServicesPage;