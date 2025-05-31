import { Rfq } from '../context/RfqContext';

export const mockRfqs: Rfq[] = [
  {
    id: 'rfq-001',
    title: 'Cloud Infrastructure Migration',
    description: 'Looking for cloud providers to migrate our on-premise infrastructure to the cloud',
    customerId: '1',
    customerName: 'ABC Corp',
    segment: 'cloud-services',
    companies: ['AWS', 'Microsoft', 'Google'],
    status: 'published',
    requirements: [
      { key: 'Region', value: 'US-West' },
      { key: 'Storage', value: '500TB' },
      { key: 'Compute', value: '100 VMs' },
      { key: 'Network', value: 'High Availability' },
      { key: 'Security', value: 'SOC2 Compliance' }
    ],
    responses: [],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'rfq-002',
    title: 'Network Infrastructure Upgrade',
    description: 'Seeking proposals for upgrading our network infrastructure across 3 office locations',
    customerId: '1',
    customerName: 'ABC Corp',
    segment: 'it-infrastructure',
    companies: ['Cisco', 'HP', 'Dell'],
    status: 'in_review',
    requirements: [
      { key: 'Locations', value: '3 offices' },
      { key: 'Bandwidth', value: '10Gbps' },
      { key: 'Routing', value: 'Layer 3 switching' },
      { key: 'Management', value: 'Centralized console' }
    ],
    responses: [
      {
        id: 'resp-001',
        rfqId: 'rfq-002',
        vendorId: 'vendor-cisco',
        vendorName: 'Cisco Systems',
        vendorLogo: 'https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        solution: 'Complete Cisco Meraki network solution with cloud management',
        price: 175000,
        timeframe: '6 weeks',
        status: 'pending',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'resp-002',
        rfqId: 'rfq-002',
        vendorId: 'vendor-hp',
        vendorName: 'HP Enterprise',
        vendorLogo: 'https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        solution: 'HP Aruba network infrastructure with HPE management software',
        price: 162000,
        timeframe: '8 weeks',
        status: 'pending',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'rfq-003',
    title: 'Data Center Cooling Solution',
    description: 'Looking for efficient cooling solutions for our new data center',
    customerId: '1',
    customerName: 'ABC Corp',
    segment: 'data-center',
    companies: ['Schneider Electric', 'Vertiv', 'Eaton'],
    status: 'completed',
    requirements: [
      { key: 'Capacity', value: '500kW' },
      { key: 'Efficiency', value: 'PUE < 1.3' },
      { key: 'Redundancy', value: 'N+1' },
      { key: 'Monitoring', value: 'Real-time' }
    ],
    responses: [
      {
        id: 'resp-003',
        rfqId: 'rfq-003',
        vendorId: 'vendor-schneider',
        vendorName: 'Schneider Electric',
        vendorLogo: 'https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        solution: 'InRow cooling with EcoStruxure DCIM',
        price: 385000,
        timeframe: '12 weeks',
        status: 'accepted',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'resp-004',
        rfqId: 'rfq-003',
        vendorId: 'vendor-vertiv',
        vendorName: 'Vertiv',
        vendorLogo: 'https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        solution: 'Liebert cooling with Vertiv DCIM',
        price: 410000,
        timeframe: '10 weeks',
        status: 'rejected',
        createdAt: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    deadline: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  }
];